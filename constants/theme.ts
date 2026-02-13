/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
import { FigmaColors } from './figma-colors';

const tintColorLight = FigmaColors.primary;
const tintColorDark = FigmaColors.white;

/** Input/field background color used in auth and forms */
export const INPUT_BACKGROUND = FigmaColors.darkSurface;

export const Colors = {
  light: {
    text: FigmaColors.text,
    textMuted: FigmaColors.lightMuted,
    background: FigmaColors.lightBackground,
    surface: FigmaColors.lightSurfaceSoft,
    inputBackground: INPUT_BACKGROUND,
    primary: FigmaColors.primary,
    primaryLight: FigmaColors.primaryActiveLight,
    tint: tintColorLight,
    icon: FigmaColors.text,
  },
  dark: {
    text: FigmaColors.white,
    textMuted: '#FFFFFFB2',
    background: FigmaColors.darkBackground,
    surface: FigmaColors.darkSurface,
    inputBackground: INPUT_BACKGROUND,
    primary: FigmaColors.primary,
    primaryLight: '#44104D',
    tint: tintColorDark,
    icon: FigmaColors.white,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
