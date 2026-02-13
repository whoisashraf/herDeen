import { useColorScheme } from '@/hooks/use-color-scheme';
import { FigmaColors } from '@/constants/figma-colors';

export type ThemePalette = {
  background: string;
  surface: string;
  surfaceSoft: string;
  section: string;
  border: string;
  text: string;
  textMuted: string;
  textFaint: string;
  icon: string;
  input: string;
  overlay: string;
  chip: string;
  destructiveBg: string;
  destructiveText: string;
};

const lightPalette: ThemePalette = {
  background: FigmaColors.lightBackground,
  surface: FigmaColors.lightSurface,
  surfaceSoft: FigmaColors.lightSurfaceSoft,
  section: '#F5F5F5',
  border: FigmaColors.lightBorder,
  text: FigmaColors.text,
  textMuted: FigmaColors.lightMuted,
  textFaint: '#A6A6A6',
  icon: FigmaColors.text,
  input: FigmaColors.lightSurface,
  overlay: 'rgba(10, 14, 21, 0.26)',
  chip: FigmaColors.primaryActiveLight,
  destructiveBg: '#FCE8EA',
  destructiveText: FigmaColors.red,
};

const darkPalette: ThemePalette = {
  background: FigmaColors.darkBackground,
  surface: FigmaColors.darkSurface,
  surfaceSoft: FigmaColors.darkSurfaceSoft,
  section: FigmaColors.darkSurface,
  border: FigmaColors.darkBorder,
  text: FigmaColors.white,
  textMuted: '#FFFFFFB2',
  textFaint: FigmaColors.darkBorder,
  icon: FigmaColors.white,
  input: FigmaColors.darkSurfaceSoft,
  overlay: 'rgba(0, 0, 0, 0.30)',
  chip: FigmaColors.primary,
  destructiveBg: 'rgba(255, 59, 48, 0.16)',
  destructiveText: FigmaColors.red,
};

export function useAppColors() {
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';
  const colors = isDark ? darkPalette : lightPalette;

  return { scheme, isDark, colors };
}
