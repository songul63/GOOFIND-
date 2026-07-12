export const FONT_BODY = '"Plus Jakarta Sans", system-ui, sans-serif';
export const FONT_DISPLAY = '"Plus Jakarta Sans", system-ui, sans-serif';
export const FONT_BODY_QUOTED = '"Plus Jakarta Sans", system-ui, sans-serif';
export const FONT_DISPLAY_QUOTED = '"Plus Jakarta Sans", system-ui, sans-serif';

export function canvasFont(
  weight: string | number,
  size: number | string,
  family: 'body' | 'display' = 'body',
): string {
  const stack = family === 'display' ? FONT_DISPLAY : FONT_BODY;
  return `${weight} ${size}px ${stack}`;
}
