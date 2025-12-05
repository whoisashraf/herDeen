import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import quranIcon from '@/assets/icons/quran_icon.png';

export const AdhkarBanner = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/card-bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.iconBackground}>
          <Image source={quranIcon} style={{ width: 32, height: 32, tintColor: '#62206E' }} />
        </View>

        <View style={styles.textContainer}>
          <ThemedText type="poppins-medium" style={styles.title}>
            Morning Adhkar
          </ThemedText>
          <ThemedText type="amiri-regular" style={styles.arabicText}>
            اللهم إنك عفو تحب العفو فاعف عني
          </ThemedText>
        </View>

        <IconSymbol name="chevron.right" size={20} color="white" />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: 0,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backgroundImage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
  },
  iconBackground: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginBottom: 7,
  },
  arabicText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
  },
});

