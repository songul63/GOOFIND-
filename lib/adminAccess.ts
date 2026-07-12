export const PLATFORM_ADMIN_EMAILS = [
  'songululuca02@gmail.com',
  'admin@goofind.ca',
  'admin@admin.com',
] as const;

export function isPlatformAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return PLATFORM_ADMIN_EMAILS.includes(email.trim().toLowerCase() as (typeof PLATFORM_ADMIN_EMAILS)[number]);
}
