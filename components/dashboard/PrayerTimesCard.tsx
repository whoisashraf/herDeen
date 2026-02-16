import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ImageBackground, StyleSheet, View, ViewStyle } from 'react-native';

type PrayerTimesCardProps = {
  greeting?: string;
  todayLabel?: string;
  hijriDate?: string;
  gregorianDate?: string;
  prayerLabel?: string;
  prayerTime?: string;
  countdown?: string;
  containerStyle?: ViewStyle;
};

export const PrayerTimesCard = ({
  greeting = 'Asalam Alaikum',
  todayLabel = 'Today is',
  hijriDate = '17 Ramadan, 1447',
  gregorianDate = '40 Jan, 2025',
  prayerLabel = 'Fajr',
  prayerTime = '16:14',
  countdown = '-05:37:43',
  containerStyle,
}: PrayerTimesCardProps = {}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.card, { backgroundColor: colors.primary }]}>
        <ImageBackground
          source={require('@/assets/images/bg-image.png')}
          style={styles.imageBackground}
          imageStyle={styles.mosqueImage}
          resizeMode="cover">
          <View style={styles.content}>
            <View style={styles.leftContent}>
              <ThemedText type="poppins-medium" style={styles.greetingText}>
                {greeting}
              </ThemedText>
              <View style={styles.dateContainer}>
                {todayLabel ? (
                  <ThemedText type="poppins-regular" style={styles.todayIs}>
                    {todayLabel}
                  </ThemedText>
                ) : null}
                <ThemedText type="poppins-bold" style={styles.dateText}>
                  {hijriDate}
                </ThemedText>
                <ThemedText type="poppins-regular" style={styles.gregorianDate}>
                  {gregorianDate}
                </ThemedText>
              </View>
            </View>

            <View style={styles.rightContent}>
              <View style={styles.clockCircle}>
                <View style={styles.clockContent}>
                  <ThemedText type="poppins-medium" style={styles.prayerLabel}>
                    {prayerLabel}
                  </ThemedText>
                  <ThemedText type="poppins-bold" style={styles.prayerTime}>
                    {prayerTime}
                  </ThemedText>
                  <ThemedText type="poppins-regular" style={styles.countdownText}>
                    {countdown}
                  </ThemedText>
                </View>
                {/* Circular Progress simulating the 3/4 ring */}
                <View style={styles.progressRing} />
                <View style={styles.progressDot} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
  },
  card: {
    minHeight: 160,
  },
  imageBackground: {
    padding: 24,
    flex: 1,
  },
  mosqueImage: {
    opacity: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  leftContent: {
    flex: 1,
  },
  greetingText: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
  },
  dateContainer: {
    gap: 2,
  },
  todayIs: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  dateText: {
    fontSize: 16,
    color: 'white',
  },
  gregorianDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressRing: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: 'white',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  progressDot: {
    position: 'absolute',
    top: -2,
    right: 32,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  clockContent: {
    alignItems: 'center',
  },
  prayerLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  prayerTime: {
    fontSize: 28,
    color: 'white',
    lineHeight: 34,
  },
  countdownText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
