import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const DEFAULT_BUSINESS_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

async function uploadImageBlob(
  blob: Blob,
  ownerId: string,
  batchId: string,
  filename: string,
): Promise<string> {
  const path = `business-images/${ownerId}/${batchId}/${filename}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, { contentType: blob.type || 'image/jpeg' });
  return getDownloadURL(storageRef);
}

async function uploadImageSource(
  source: string,
  ownerId: string,
  batchId: string,
  filename: string,
): Promise<string> {
  if (source.startsWith('http://') || source.startsWith('https://')) {
    return source;
  }
  if (!source.startsWith('data:image/')) {
    throw new Error('invalid_image_source');
  }
  const blob = dataUrlToBlob(source);
  if (blob.size > 5 * 1024 * 1024) {
    throw new Error('image_too_large');
  }
  return uploadImageBlob(blob, ownerId, batchId, filename);
}

export async function resolveBusinessMediaForSave(
  ownerId: string,
  imageUrl: string,
  gallery: string[],
  fallbackImageUrl: string,
): Promise<{ imageUrl: string; gallery: string[]; uploadFailed?: boolean }> {
  const existingHttpGallery = gallery.filter((item) => item.trim().startsWith('http')).slice(0, 10);
  const trimmedCover = imageUrl.trim();
  const hasDataUploads =
    trimmedCover.startsWith('data:image/') || gallery.some((item) => item.trim().startsWith('data:image/'));

  if (!hasDataUploads) {
    return {
      imageUrl: trimmedCover.startsWith('http') ? trimmedCover : fallbackImageUrl,
      gallery: existingHttpGallery,
    };
  }

  const batchId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const coverSource = trimmedCover || fallbackImageUrl;

  try {
    let resolvedCover = fallbackImageUrl;
    if (coverSource.startsWith('http')) {
      resolvedCover = coverSource;
    } else if (coverSource.startsWith('data:image/')) {
      resolvedCover = await uploadImageSource(coverSource, ownerId, batchId, 'cover.jpg');
    }

    const resolvedGallery = await Promise.all(
      gallery.map(async (item, index) => {
        const source = item.trim();
        if (!source) return null;
        if (source.startsWith('http')) return source;
        if (source.startsWith('data:image/')) {
          return uploadImageSource(source, ownerId, batchId, `gallery-${index}.jpg`);
        }
        return null;
      }),
    );

    return {
      imageUrl: resolvedCover,
      gallery: resolvedGallery.filter((url): url is string => !!url).slice(0, 10),
    };
  } catch (err) {
    console.error('Business media upload failed, falling back to text-only save', err);
    return {
      imageUrl: trimmedCover.startsWith('http') ? trimmedCover : fallbackImageUrl,
      gallery: existingHttpGallery,
      uploadFailed: true,
    };
  }
}
