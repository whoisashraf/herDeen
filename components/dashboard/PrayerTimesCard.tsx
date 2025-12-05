import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const prayers = [
  { name: 'Fajr', time: '06:00', icon: 'cloud', active: false },
  { name: 'Dhuhr', time: '06:00', icon: 'sun.max', active: false },
  { name: 'Asr', time: '06:00', icon: 'cloud.sun', active: true },
  { name: 'Maghrib', time: '06:00', icon: 'sunset', active: false },
  { name: 'Ishai', time: '06:00', icon: 'moon', active: false },
];

export const PrayerTimesCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <ThemedText type="poppins-medium" style={styles.currentPrayerName}>
            Asr
          </ThemedText>
          <ThemedText type="poppins-regular" style={styles.currentPrayerTime}>
            15:50
          </ThemedText>
        </View>
        <View style={styles.dateContainer}>
          <ThemedText type="poppins-semibold" style={styles.dateText}>
            17 Ramadan 1446 AH
          </ThemedText>
          <View style={styles.countdownPill}>
            <ThemedText type="poppins-regular" style={styles.countdownText}>
              03:04 Minutes to Asr
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.prayerTimesGrid}>
        {prayers.map((prayer, index) => (
          <View key={index} style={styles.prayerItem}>
            <ThemedText
              type="poppins-medium"
              style={[styles.prayerName, prayer.active && styles.prayerNameActive]}>
              {prayer.name}
            </ThemedText>
            <View style={[styles.iconContainer, prayer.active && styles.iconContainerActive]}>
              <IconSymbol
                name={prayer.icon as any}
                size={20}
                color={prayer.active ? '#62206E' : '#000000'}
              />
            </View>
            <ThemedText
              type="poppins-semibold"
              style={[styles.prayerTime, prayer.active && styles.prayerTimeActive]}>
              {prayer.time}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 0,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  currentPrayerName: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  currentPrayerTime: {
    fontSize: 36,
    color: '#111827',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 18,
  },
  countdownPill: {
    backgroundColor: '#FF00001F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  countdownText: {
    fontSize: 12,
    color: '#444444',
  },
  separator: {
    height: 1,
    backgroundColor: '#D6BCDB',
    marginBottom: 20,
  },
  prayerTimesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prayerItem: {
    alignItems: 'center',
    gap: 8,
  },
  prayerName: {
    fontSize: 14,
    color: '#000000',
  },
  prayerNameActive: {
    color: '#62206E',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerActive: {
    backgroundColor: 'transparent',
  },
  prayerTime: {
    fontSize: 14,
    color: '#000000',
  },
  prayerTimeActive: {
    color: '#62206E',
  },
});

