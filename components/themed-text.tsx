import { useFont } from '@/hooks/use-font';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
  | 'default'
  | 'title'
  | 'defaultSemiBold'
  | 'subtitle'
  | 'link'
  | 'amiri-regular'
  | 'amiri-bold'
  | 'poppins-regular'
  | 'poppins-medium'
  | 'poppins-semibold'
  | 'poppins-bold'
  | 'poppins-italic';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  children,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const { isArabic, fonts } = useFont(children as string);

  const getFontFamily = () => {
    if (isArabic) {
      switch (type) {
        case 'amiri-bold':
          return fonts.bold;
        default:
          return fonts.regular;
      }
    } else {
      const f = fonts as {
        regular: string;
        medium: string;
        semiBold: string;
        bold: string;
        italic: string;
      };
      switch (type) {
        case 'poppins-medium':
          return f.medium;
        case 'poppins-semibold':
          return f.semiBold;
        case 'poppins-bold':
          return f.bold;
        case 'poppins-italic':
          return f.italic;
        default:
          return f.regular;
      }
    }
  };

  return (
    <Text
      style={[
        { color, fontFamily: getFontFamily() },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
