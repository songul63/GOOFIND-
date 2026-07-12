const PHONE_PATTERN = /(\+?\d[\d\s().-]{6,}\d)/;

export function normalizePhoneForDial(raw?: string | null): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;

  const phoneMatch = trimmed.match(PHONE_PATTERN);
  const candidate = phoneMatch ? phoneMatch[1] : trimmed;
  const cleaned = candidate.replace(/[^\d+]/g, '');
  const digitsOnly = cleaned.replace(/\D/g, '');

  if (digitsOnly.length < 7) return null;

  return cleaned.startsWith('+') ? cleaned : digitsOnly;
}

export function dialPhoneNumber(phone?: string | null): boolean {
  const normalized = normalizePhoneForDial(phone);
  if (!normalized || typeof window === 'undefined') return false;

  const telUrl = `tel:${normalized}`;

  try {
    const link = document.createElement('a');
    link.href = telUrl;
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch {
    try {
      window.location.href = telUrl;
      return true;
    } catch {
      return false;
    }
  }
}

export function resolveUserPhone(
  user: { id?: string; phone?: string | null },
  dbUsers: Array<{ id?: string; phone?: string | null }> = [],
): string | null {
  const direct = normalizePhoneForDial(user.phone);
  if (direct) return user.phone!.trim();

  if (user.id) {
    const fromDb = dbUsers.find((u) => u?.id === user.id)?.phone;
    if (normalizePhoneForDial(fromDb)) return fromDb!.trim();
  }

  return null;
}
