import { CommunityModal } from '@/components/modals/CommunityModal';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = 4;
const gap = 22;
const containerPadding = 20;
const totalGapWidth = (numColumns - 1) * gap;
const itemWidth = (width - containerPadding * 2 - totalGapWidth) / numColumns;

const actions = [
  { name: 'Quran', icon: 'book' },
  { name: 'Adhkar', icon: 'hands.sparkles' },
  { name: 'Prayer', icon: 'alarm' },
  { name: 'Qibla', image: require('@/assets/images/qibla.png') },
  { name: 'Tasbih', image: require('@/assets/images/tasbih.png') },
  { name: 'Sukūni', image: require('@/assets/images/sukuni.png'), customColor: true },
  { name: 'Track', icon: 'calendar' },
  { name: 'More', icon: 'square.grid.3x3' },
];

export const QuickActionsGrid = () => {
  const router = useRouter();
  const [isCommunityModalVisible, setIsCommunityModalVisible] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <>
      <View style={styles.container}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionItem}
            onPress={() => {
              if (action.name === 'Quran') {
                router.push('/quran');
              } else if (action.name === 'Adhkar') {
                router.push('/adhkar');
              } else if (action.name === 'Prayer') {
                router.push('/prayer-times');
              } else if (action.name === 'Qibla') {
                router.push('/qibla');
              } else if (action.name === 'Tasbih') {
                router.push('/tasbih');
              } else if (action.name === 'Sukūni') {
                // router.push('/sukuni');
              } else if (action.name === 'Track') {
                router.push('/tracker');
              } else if (action.name === 'More') {
                // open more
              }
            }}>
            <View style={[styles.iconBackground, { backgroundColor: colors.surface }]}>
              {action.image ? (
                <Image
                  source={action.image}
                  style={[
                    styles.actionImage,
                    !action.customColor && { tintColor: colors.text }
                  ]}
                  resizeMode="contain"
                />
              ) : (
                <IconSymbol
                  name={action.icon as any}
                  size={28}
                  color={colors.text}
                />
              )}
            </View>
            <ThemedText type="poppins-medium" style={[styles.actionText, { color: colors.text }]}>
              {action.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <CommunityModal
        visible={isCommunityModalVisible}
        onClose={() => setIsCommunityModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  actionItem: {
    width: itemWidth,
    alignItems: 'center',
    marginBottom: 24,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionImage: {
    width: 32,
    height: 32,
  },
  actionText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
  },
});
