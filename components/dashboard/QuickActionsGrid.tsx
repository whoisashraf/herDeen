import qiblaIcon from '@/assets/icons/qibla_icon.png';
import quranIcon from '@/assets/icons/quran_icon.png';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = 4;
const gap = 22;
const containerPadding = 20;
const totalGapWidth = (numColumns - 1) * gap;
const itemWidth = (width - containerPadding * 2 - totalGapWidth) / numColumns;

const actions = [
  { name: 'Quran', icon: 'quran_image' },
  { name: 'Adhkar', icon: 'hands.sparkles' },
  { name: 'Prayer Times', icon: 'clock' },
  { name: 'AI Planner', icon: 'brain.head.profile' },
  { name: 'Qibla', icon: 'qibla_image' },
  { name: 'Journal', icon: 'book' },
  { name: 'Tasbih', icon: 'circle.grid.3x3' },
  { name: 'Community', icon: 'person.3' },
];

export const QuickActionsGrid = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.actionItem}
          onPress={() => {
            if (action.name === 'Quran') {
              router.push('/(drawer)/quran');
            } else if (action.name === 'Adhkar') {
              router.push('/(drawer)/adhkar');
            } else if (action.name === 'Prayer Times') {
              router.push('/(drawer)/prayer-times');
            }
          }}>
          <View
            style={[
              styles.iconBackground,
              (action.icon === 'qibla_image' || action.icon === 'quran_image') && {
                backgroundColor: '#EBE0EC',
              },
            ]}>
            {action.icon === 'qibla_image' ? (
              <Image source={qiblaIcon} style={{ width: 24, height: 24, tintColor: '#62206E' }} />
            ) : action.icon === 'quran_image' ? (
              <Image source={quranIcon} style={{ width: 24, height: 24, tintColor: '#62206E' }} />
            ) : (
              <IconSymbol name={action.icon as any} size={24} color="#6C2A75" />
            )}
          </View>
          <ThemedText type="poppins-semibold" style={styles.actionText}>
            {action.name}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  actionItem: {
    width: itemWidth,
    alignItems: 'center',
    marginBottom: 28,
  },
  iconBackground: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4EAF6',
  },
  actionText: {
    fontSize: 12,
    color: '#4A4A4A',
    textAlign: 'center',
    marginTop: 10,
  },
});
