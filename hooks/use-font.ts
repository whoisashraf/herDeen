import { Platform } from 'react-native';

const arabicRegex = /[\u0600-\u06FF]/;

export const useFont = (text: string) => {
  const isArabic = arabicRegex.test(text);

  const fontFamilies = {
    arabic: {
      regular: Platform.OS === 'ios' ? 'Amiri' : 'Amiri_400Regular',
      bold: Platform.OS === 'ios' ? 'Amiri-Bold' : 'Amiri_700Bold',
      italic: Platform.OS === 'ios' ? 'Amiri-Italic' : 'Amiri_400Regular_Italic',
    },
    english: {
      regular: Platform.OS === 'ios' ? 'Poppins' : 'Poppins_400Regular',
      medium: Platform.OS === 'ios' ? 'Poppins-Medium' : 'Poppins_500Medium',
      semiBold: Platform.OS === 'ios' ? 'Poppins-SemiBold' : 'Poppins_600SemiBold',
      bold: Platform.OS === 'ios' ? 'Poppins-Bold' : 'Poppins_700Bold',
      italic: Platform.OS === 'ios' ? 'Poppins-Italic' : 'Poppins_400Regular_Italic',
    },
  };

  return {
    isArabic,
    fonts: isArabic ? fontFamilies.arabic : fontFamilies.english,
  };
};
