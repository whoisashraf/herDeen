import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const METHODS = [
  { id: 'mwl', label: 'Muslim World League (MWL)', flagCode: 'sa' },
  { id: 'isna', label: 'North America (ISNA)', flagCode: 'us' },
  { id: 'umm', label: 'Umm al-Qura University, Makkah', flagCode: 'sa' },
  { id: 'muis', label: 'MUIS (Majis Ugama Islam Singapura)', flagCode: 'sg' },
  { id: 'egypt', label: 'Egyptian General Authority of Survey', flagCode: 'eg' },
  { id: 'uzb', label: 'Muslim Board of Uzbekistan', flagCode: 'uz' },
  { id: 'karachi', label: 'University of Islamic Sciences, Karachi', flagCode: 'pk' },
  { id: 'turkey', label: 'Turkey Presidency of Religious Affairs', flagCode: 'tr' },
];

const ACCENT = '#A978E8';

export default function CalculationMethodScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();
  const [selectedId, setSelectedId] = useState('mwl');
  const pageBg = isDark ? colors.background : '#F1F1F1';
  const titleColor = isDark ? colors.text : '#121923';
  const rowTextColor = isDark ? colors.text : '#5C636D';
  const headerBtnBg = isDark ? colors.surface : '#E9E9E9';
  const flagBg = isDark ? colors.surface : '#ECECEC';

  return (
    <View style={[styles.container, { backgroundColor: pageBg, paddingTop: insets.top + 8 }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.headerBtn, { backgroundColor: headerBtnBg }]}>
          <IconSymbol name="arrow.left" size={24} color={titleColor} />
        </TouchableOpacity>
        <ThemedText type="poppins-semibold" style={[styles.headerTitle, { color: titleColor }]}>
          Calculation Method
        </ThemedText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {METHODS.map((method) => {
          const isSelected = method.id === selectedId;
          return (
            <TouchableOpacity
              key={method.id}
              activeOpacity={0.8}
              style={styles.row}
              onPress={() => setSelectedId(method.id)}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.flagCircle, { backgroundColor: flagBg }]}>
                  <Image
                    source={{ uri: `https://flagcdn.com/w80/${method.flagCode}.png` }}
                    style={styles.flagImage}
                    resizeMode="cover"
                  />
                </View>
                <ThemedText
                  type="poppins-regular"
                  style={[styles.rowLabel, { color: rowTextColor }]}
                >
                  {method.label}
                </ThemedText>
              </View>
              <View style={styles.rightSlot}>
                {isSelected ? (
                  <View style={styles.doubleCheck}>
                    <IconSymbol name="checkmark" size={18} color={ACCENT} />
                    <IconSymbol name="checkmark" size={18} color={ACCENT} style={styles.doubleCheckBack} />
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginLeft: 14,
    fontSize: 22,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  flagCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagImage: {
    width: '100%',
    height: '100%',
  },
  rowLabel: {
    flex: 1,
    flexShrink: 1,
    fontSize: 18,
    lineHeight: 25,
  },
  rightSlot: {
    width: 38,
    alignItems: 'flex-end',
  },
  doubleCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doubleCheckBack: {
    marginLeft: -6,
  },
});
