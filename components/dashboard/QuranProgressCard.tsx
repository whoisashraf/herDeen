import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';

export const QuranProgressCard = () => {
  return (
    <TouchableOpacity style={styles.card}>
      <ImageBackground
        source={require('@/assets/images/card-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.contentContainer}>
          <ThemedText type="poppins-bold" style={styles.title}>
            My Quran Progress
          </ThemedText>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
            <ThemedText type="poppins-semibold" style={styles.progressText}>
              20%
            </ThemedText>
          </View>

          <View style={styles.linkContainer}>
            <ThemedText type="poppins-semibold" style={styles.linkText}>
              Go to HerQuran
            </ThemedText>
            <IconSymbol name="chevron.right" size={16} color="white" />
          </View>
        </View>

        <View style={styles.quranImageContainer}>
          <Image
            source={require('@/assets/images/quran-book.png')}
            style={styles.quranImage}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 0,
    marginBottom: 20,
    overflow: 'hidden',
    height: 120,
    shadowColor: '#E18DFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
    width: '20%',
  },
  progressText: {
    color: 'white',
    fontSize: 14,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
  },
  quranImageContainer: {
    width: 100,
    alignItems: 'center',
    marginRight: -10,
  },
  quranImage: {
    width: 200,
    height: 100,
  },
});

