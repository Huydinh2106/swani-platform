import { Platform, type TextStyle } from 'react-native';

// Bộ màu thương hiệu cố định. Starter chỉ hỗ trợ light mode có chủ đích.
export const colors = {
  background: '#FAF9F6',
  surface: '#FFFFFF',
  ink: '#182A27',
  muted: '#52615C',
  primary: '#214D3E',
  onPrimary: '#FFFFFF',
  accent: '#E5F2A3',
  onAccent: '#243C26',
  border: '#DCDDD5',
  subtle: '#EFEEE8',
  success: '#267346',
  danger: '#A63B35',
  transparent: 'transparent',
  scrim: '#182A271A',
} as const;
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
  hero: 48,
} as const;
export const radius = { sm: 8, md: 12, lg: 20, xl: 28, pill: 999 } as const;
export const size = {
  touch: 44,
  button: 48,
  search: 52,
  icon: 22,
  iconSm: 16,
  avatar: 48,
  contentMax: 680,
  heroArt: 156,
  preview: 220,
  tabBar: 72,
} as const;
export const motion = { fast: 150, base: 250, slow: 400 } as const;
export const opacity = { pressed: 0.65, disabled: 0.4, full: 1 } as const;
export const shadows = { card: '0 4px 16px rgba(24, 42, 39, 0.06)' } as const;
export const glass = {
  tint: '#FFFFFF33',
  border: '#FFFFFFCC',
  shadow: '0 8px 24px rgba(24, 42, 39, 0.10)',
} as const;
// iOS resolves system-ui to Apple's system font; other platforms use their native font.
const fontFamily = Platform.select({
  ios: 'system-ui',
  web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  default: 'sans-serif',
});
export const type = {
  display: { fontFamily, fontWeight: '700', fontSize: 32, lineHeight: 43, letterSpacing: -1 },
  title: { fontFamily, fontWeight: '700', fontSize: 24, lineHeight: 34, letterSpacing: -0.5 },
  heading: { fontFamily, fontWeight: '600', fontSize: 18, lineHeight: 28 },
  body: { fontFamily, fontWeight: '400', fontSize: 14, lineHeight: 23 },
  search: { fontFamily, fontWeight: '400', fontSize: 17, lineHeight: 24 },
  label: { fontFamily, fontWeight: '600', fontSize: 13, lineHeight: 21 },
  caption: { fontFamily, fontWeight: '400', fontSize: 11, lineHeight: 18 },
  eyebrow: {
    fontFamily,
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: 1.6,
  },
  price: { fontFamily, fontWeight: '700', fontSize: 14, lineHeight: 23 },
} as const satisfies Record<string, TextStyle>;
export const garmentPalette = {
  blue: { backdrop: '#E5EBED', fabric: '#8FAAC1', seam: '#5C7890' },
  sand: { backdrop: '#EEE9E0', fabric: '#CFBDA5', seam: '#9C876E' },
  olive: { backdrop: '#E6E9E1', fabric: '#88937D', seam: '#5A6853' },
  charcoal: { backdrop: '#E7E6E3', fabric: '#4B504D', seam: '#252C28' },
} as const;
