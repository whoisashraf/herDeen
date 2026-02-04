/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

/** Input/field background color used in auth and forms */
export const INPUT_BACKGROUND = '#1F2125';

export const Colors = {
  light: {
    text: '#11181C',
    textMuted: '#6B7280',
    background: '#FFFFFF',
    surface: '#F7F7F7',
    inputBackground: INPUT_BACKGROUND,
    primary: '#7F47DD',
    primaryLight: '#F3E8FF',
    tint: '#7F47DD',
    icon: '#111827',
  },
  dark: {
    text: '#FFFFFF',
    textMuted: '#9CA3AF',
    background: '#111111',
    surface: '#1F2125',
    inputBackground: INPUT_BACKGROUND,
    primary: '#AA74E0',
    primaryLight: '#2D1F3D',
    tint: '#AA74E0',
    icon: '#FFFFFF',
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
