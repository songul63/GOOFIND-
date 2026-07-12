const MAX_DIMENSION = 1200;
const JPEG_QUALITY = 0.7;
const MAX_DATA_URL_LENGTH = 1_000_000;

export async function compressChatImageFile(file: File): Promise<string> {
  const dataUrl = await readFileAsDataUrl(file);
  const img = await loadImage(dataUrl);

  const canvas = document.createElement('canvas');
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > MAX_DIMENSION) {
      height *= MAX_DIMENSION / width;
      width = MAX_DIMENSION;
    }
  } else if (height > MAX_DIMENSION) {
    width *= MAX_DIMENSION / height;
    height = MAX_DIMENSION;
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas_unavailable');

  ctx.drawImage(img, 0, 0, width, height);
  const compressed = canvas.toDataURL('image/jpeg', JPEG_QUALITY);

  if (compressed.length > MAX_DATA_URL_LENGTH) {
    throw new Error('image_too_large');
  }

  return compressed;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('read_failed'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('load_failed'));
    img.src = src;
  });
}

export function buildChatMessagePayload(content: string, imageUrl?: string | null) {
  const trimmed = content.trim();
  if (imageUrl) {
    return {
      content: trimmed || '📷',
      type: 'image' as const,
      imageUrl,
    };
  }
  return {
    content: trimmed,
    type: 'text' as const,
  };
}

export function formatChatPreviewText(content: string, hasImage?: boolean, lang: 'en' | 'tr' = 'tr') {
  if (content && content !== '📷') return content;
  if (hasImage) return lang === 'en' ? '📷 Photo' : '📷 Görsel';
  return content;
}
