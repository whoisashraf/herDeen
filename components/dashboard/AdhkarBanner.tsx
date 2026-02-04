import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40;

const CARDS = [
  {
    id: 'adhkar-of-day',
    title: 'Adhkar of the day',
    arabic: 'اللهم إنك عفو تحب العفو فاعف عني',
    translation: "So whoever does an atom's weight of good...",
    buttonText: 'View',
    light: { bgColor: '#F7F2FF', tintColor: '#AA74E0' },
    dark: { bgColor: '#2D1D44', tintColor: '#AA74E0' },
  },
  {
    id: 'quran',
    title: 'Quran of the day',
    arabic: 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',
    translation: "So whoever does an atom's weight of good w...",
    buttonText: 'View',
    light: { bgColor: '#D1FAE5', tintColor: '#059669' },
    dark: { bgColor: '#064E3B', tintColor: '#10B981' },
  },
  {
    id: 'adhkar',
    title: 'Morning Adhkar',
    arabic: 'اللهم إنك عفو تحب العفو فاعف عني',
    translation: "So whoever does an atom's weight of good...",
    buttonText: 'Read now',
    light: { bgColor: '#FFEDD5', tintColor: '#D97706' },
    dark: { bgColor: '#78350F', tintColor: '#F59E0B' },
  }
];

export const AdhkarBanner = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={CARD_WIDTH + 16}
      decelerationRate="fast"
      contentContainerStyle={styles.scrollContainer}
    >
      {CARDS.map((card) => {
        const cardTheme = card[colorScheme];
        return (
          <View key={card.id} style={[styles.cardContainer, { backgroundColor: cardTheme.bgColor }]}>
            <ImageBackground
              source={require('@/assets/images/card-bg.png')}
              style={styles.imageBackground}
              imageStyle={[styles.waveImage, { tintColor: cardTheme.tintColor }]}
              resizeMode="cover"
            >
              <View style={styles.header}>
                <ThemedText type="poppins-medium" style={[styles.title, { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }]}>
                  {card.title}
                </ThemedText>
                <TouchableOpacity style={styles.viewButton}>
                  <ThemedText type="poppins-medium" style={[styles.viewButtonText, { color: colors.text }]}>
                    {card.buttonText}
                  </ThemedText>
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                <ThemedText
                  type="amiri-regular"
                  style={[styles.arabicText, { color: colors.text }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {card.arabic}
                </ThemedText>
                <ThemedText type="poppins-regular" style={[styles.translationText, { color: colors.textMuted }]}>
                  {card.translation}
                </ThemedText>
              </View>
            </ImageBackground>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingRight: 20,
    gap: 16,
    paddingBottom: 24,
  },
  cardContainer: {
    width: CARD_WIDTH,
    borderRadius: 24,
    overflow: 'hidden',
  },
  imageBackground: {
    padding: 20,
    minHeight: 150,
  },
  waveImage: {
    opacity: 0.15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
  },
  viewButton: {
    backgroundColor: '#FFFFFF1F',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  viewButtonText: {
    fontSize: 12,
  },
  content: {
    alignItems: 'center',
    gap: 10,
  },
  arabicText: {
    fontSize: 26,
    textAlign: 'right',
    lineHeight: 36,
    width: '100%',
  },
  translationText: {
    fontSize: 13,
    textAlign: 'center',
  },
});

