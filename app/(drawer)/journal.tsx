import { BOTTOM_NAV_HEIGHT, BottomNav } from '@/components/dashboard/BottomNav';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOODS = [
  { day: 'Tue', emoji: ':)', color: '#F7C84B' },
  { day: 'Wed', emoji: ':(', color: '#FF8A52' },
  { day: 'Thur', emoji: '-', color: '#CFB9AE' },
  { day: 'Fri', emoji: 'x', color: '#FF3B30', dashed: true },
  { day: 'Sat', emoji: ':)', color: '#A7C36D' },
  { day: 'Sun', emoji: ':(', color: '#9A8AF8', crossed: true },
  { day: 'Mon', emoji: '+', color: '#201734' },
];

const ENTRIES = Array.from({ length: 4 }, (_, index) => ({
  id: `entry-${index}`,
  day: '11',
  month: 'Jan',
  title: 'It takes courage to be kind',
  preview: "Today, I found myself reflecting on the power of kindness. It's something that seems so sim...",
}));

export default function JournalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 12, paddingBottom: BOTTOM_NAV_HEIGHT + insets.bottom + 42 },
        ]}>
        <View style={styles.header}>
          <ThemedText type="poppins-medium" style={[styles.headerTitle, { color: colors.text }]}>
            Journal
          </ThemedText>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.surface }]}>
            <IconSymbol name="hexagon" size={24} color={colors.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.moodRow}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.day}
              style={styles.moodItem}
              onPress={() => {
                if (mood.day === 'Mon') {
                  router.push('/journal-mood');
                }
              }}>
              {mood.dashed ? (
                <View style={styles.dashedMoodCircle}>
                  <Text style={[styles.moodEmoji, { color: mood.color }]}>{mood.emoji}</Text>
                </View>
              ) : (
                <View style={[styles.moodCircle, { backgroundColor: mood.color }]}>
                  <Text style={styles.moodEmoji}>{mood.crossed ? 'x(' : mood.emoji}</Text>
                </View>
              )}
              <ThemedText type="poppins-regular" style={styles.moodDay}>
                {mood.day}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <IconSymbol name="magnifyingglass" size={26} color={colors.textFaint} />
          <ThemedText type="poppins-regular" style={[styles.searchText, { color: colors.textFaint }]}>
            Search your thoughts...
          </ThemedText>
        </View>

        <View style={styles.cardsWrap}>
          {ENTRIES.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={[styles.card, { backgroundColor: colors.section }]}
              onPress={() => router.push('/journal-entry')}>
              <View style={[styles.cardDate, { backgroundColor: isDark ? '#FFFFFF1A' : '#EEF2F8', borderRightColor: colors.border }]}>
                <ThemedText type="poppins-semibold" style={[styles.dateDay, { color: colors.text }]}>
                  {entry.day}
                </ThemedText>
                <ThemedText type="poppins-regular" style={[styles.dateMonth, { color: colors.textMuted }]}>
                  {entry.month}
                </ThemedText>
              </View>
              <View style={styles.cardContent}>
                <ThemedText type="poppins-medium" style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1} ellipsizeMode="tail">
                  {entry.title}
                </ThemedText>
                <ThemedText type="poppins-regular" style={[styles.cardPreview, { color: colors.textMuted }]} numberOfLines={2} ellipsizeMode="tail">
                  {entry.preview}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.fab, { bottom: BOTTOM_NAV_HEIGHT + insets.bottom + 18 }]} onPress={() => router.push('/journal-mood')}>
        <IconSymbol name="plus" size={44} color="#FFFFFF" />
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13181C',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: '#FFFFFF',
  },
  headerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1F2125',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  moodItem: {
    alignItems: 'center',
    width: 44,
  },
  moodCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dashedMoodCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  moodEmoji: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  moodDay: {
    color: '#FFFFFFB2',
    fontSize: 13,
  },
  searchBar: {
    height: 66,
    borderRadius: 33,
    backgroundColor: '#1F2125',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  searchText: {
    color: '#4C5261',
    fontSize: 18,
  },
  cardsWrap: {
    gap: 12,
  },
  card: {
    height: 104,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1F2125',
    flexDirection: 'row',
  },
  cardDate: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF1A',
    borderRightWidth: 1,
    borderRightColor: '#31394A',
  },
  dateDay: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22,
  },
  dateMonth: {
    color: '#D0D3DB',
    fontSize: 12,
    lineHeight: 16,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 4,
  },
  cardPreview: {
    color: '#A3A8B3',
    fontSize: 12,
    lineHeight: 16,
  },
  fab: {
    position: 'absolute',
    right: 24,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E18DFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 8,
    elevation: 5,
  },
});
