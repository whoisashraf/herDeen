import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const METHODS = [
  { id: 'mwl', label: 'Muslim World League (MWL)', flag: '🇸🇦' },
  { id: 'isna', label: 'North America (ISNA)', flag: '🇺🇸' },
  { id: 'umm', label: 'Umm al-Qura University, Makkah', flag: '🇸🇦' },
  { id: 'muis', label: 'MUIS (Majlis Ugama Islam Singapura)', flag: '🇸🇬' },
  { id: 'egypt', label: 'Egyptian General Authority of Survey', flag: '🇪🇬' },
  { id: 'uzb', label: 'Muslim Board of Uzbekistan', flag: '🇺🇿' },
  { id: 'karachi', label: 'University of Islamic Sciences, Karachi', flag: '🇵🇰' },
  { id: 'turkey', label: 'Turkey Presidency of Religious Affairs', flag: '🇹🇷' },
];

const ACCENT = '#A978E8';

export default function CalculationMethodScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();
  const [selectedId, setSelectedId] = useState('mwl');

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 8 }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.headerBtn, { backgroundColor: colors.surface }]}> 
          <IconSymbol name="arrow.left" size={20} color={colors.text} />
        </TouchableOpacity>
        <ThemedText type="poppins-semibold" style={[styles.headerTitle, { color: colors.text }]}> 
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
                <View style={[styles.flagCircle, { backgroundColor: colors.surface }]}> 
                  <Text style={styles.flagText}>{method.flag}</Text>
                </View>
                <ThemedText
                  type="poppins-medium"
                  style={[styles.rowLabel, { color: isSelected ? colors.text : colors.textMuted }]}
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
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 24,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 24,
    gap: 26,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagText: {
    fontSize: 18,
  },
  rowLabel: {
    flex: 1,
    flexShrink: 1,
    fontSize: 18,
    lineHeight: 24,
  },
  rightSlot: {
    width: 44,
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
