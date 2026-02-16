import { BOTTOM_NAV_HEIGHT, BottomNav } from '@/components/dashboard/BottomNav';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MoodKind = 'happy' | 'sad' | 'neutral' | 'great' | 'tired' | 'reset' | 'add';

type MoodItem = {
  day: string;
  kind: MoodKind;
  color: string;
};

const MOODS: MoodItem[] = [
  { day: 'Tue', kind: 'happy', color: '#F7C84B' },
  { day: 'Wed', kind: 'sad', color: '#FF8A52' },
  { day: 'Thur', kind: 'neutral', color: '#C5AEA4' },
  { day: 'Fri', kind: 'reset', color: '#FF5A4E' },
  { day: 'Sat', kind: 'great', color: '#9DB765' },
  { day: 'Sun', kind: 'tired', color: '#9E8EFF' },
  { day: 'Mon', kind: 'add', color: '#EEDFF4' },
];

const ENTRIES = Array.from({ length: 4 }, (_, index) => ({
  id: `entry-${index}`,
  day: '11',
  month: 'Jan',
  title: 'It takes courage to be kind',
  preview: "Today, I found myself reflecting on the power of kindness. It's something that seems so sim...",
}));

function MoodIcon({ kind, fill }: { kind: MoodKind; fill: string }) {
  if (kind === 'reset') {
    return (
      <View style={styles.dashedMoodCircle}>
        <IconSymbol name="xmark" size={21} color="#FF5A4E" />
      </View>
    );
  }

  if (kind === 'add') {
    return (
      <View style={[styles.moodCircle, { backgroundColor: fill }]}>
        <IconSymbol name="plus" size={24} color="#1D1F23" />
      </View>
    );
  }

  return (
    <View style={[styles.moodCircle, { backgroundColor: fill }]}>
      {kind !== 'great' && kind !== 'tired' ? (
        <>
          <View style={[styles.eyeBar, styles.leftEye]} />
          <View style={[styles.eyeBar, styles.rightEye]} />
        </>
      ) : null}

      {kind === 'great' ? (
        <>
          <View style={[styles.curveEye, styles.leftCurveEye]} />
          <View style={[styles.curveEye, styles.rightCurveEye]} />
        </>
      ) : null}

      {kind === 'tired' ? (
        <>
          <Text style={[styles.xEyeMark, styles.leftXEye]}>×</Text>
          <Text style={[styles.xEyeMark, styles.rightXEye]}>×</Text>
        </>
      ) : null}

      {kind === 'neutral' ? <View style={styles.flatMouth} /> : null}
      {kind === 'happy' || kind === 'great' ? <View style={styles.smileMouth} /> : null}
      {kind === 'sad' || kind === 'tired' ? <View style={styles.frownMouth} /> : null}
    </View>
  );
}

export default function JournalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();

  const pageBg = isDark ? colors.background : '#F5F5F5';
  const headerIconBg = isDark ? colors.surface : '#E9E9E9';
  const searchBg = isDark ? colors.surface : '#ECECEF';
  const cardBg = isDark ? colors.section : '#ECECEF';
  const moodDayColor = isDark ? '#FFFFFFB2' : '#1E232B';
  const cardDateBg = isDark ? '#FFFFFF1A' : '#F2F2F4';
  const cardTitleColor = isDark ? colors.text : '#1A1F25';
  const cardPreviewColor = isDark ? colors.textMuted : '#5F6672';

  return (
    <View style={[styles.container, { backgroundColor: pageBg }]}>
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
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: headerIconBg }]}>
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
              <MoodIcon kind={mood.kind} fill={mood.color} />
              <ThemedText type="poppins-regular" style={[styles.moodDay, { color: moodDayColor }]}>
                {mood.day}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.searchBar, { backgroundColor: searchBg }]}>
          <IconSymbol name="magnifyingglass" size={26} color={colors.textFaint} />
          <ThemedText type="poppins-regular" style={[styles.searchText, { color: colors.textFaint }]}>
            Search your thoughts...
          </ThemedText>
        </View>

        <View style={styles.cardsWrap}>
          {ENTRIES.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={[styles.card, { backgroundColor: cardBg }]}
              onPress={() => router.push('/journal-entry')}>
              <View style={[styles.cardDate, { backgroundColor: cardDateBg, borderRightColor: colors.border }]}>
                <ThemedText type="poppins-semibold" style={[styles.dateDay, { color: colors.text }]}>
                  {entry.day}
                </ThemedText>
                <ThemedText type="poppins-regular" style={[styles.dateMonth, { color: colors.textMuted }]}>
                  {entry.month}
                </ThemedText>
              </View>
              <View style={styles.cardContent}>
                <ThemedText
                  type="poppins-medium"
                  style={[styles.cardTitle, { color: cardTitleColor }]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {entry.title}
                </ThemedText>
                <ThemedText
                  type="poppins-regular"
                  style={[styles.cardPreview, { color: cardPreviewColor }]}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {entry.preview}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { bottom: BOTTOM_NAV_HEIGHT + insets.bottom + 18 }]}
        onPress={() => router.push('/journal-mood')}>
        <IconSymbol name="plus" size={30} color="#FFFFFF" />
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
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  dashedMoodCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.3,
    borderStyle: 'dashed',
    borderColor: '#FF5A4E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  eyeBar: {
    position: 'absolute',
    width: 4,
    height: 13,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    top: 12,
  },
  leftEye: {
    left: 14,
  },
  rightEye: {
    right: 14,
  },
  curveEye: {
    position: 'absolute',
    width: 11,
    height: 6,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.2,
    borderRightWidth: 2.2,
    borderColor: '#FFFFFF',
    borderTopLeftRadius: 99,
    borderTopRightRadius: 99,
    top: 12,
  },
  leftCurveEye: {
    left: 10,
  },
  rightCurveEye: {
    right: 10,
  },
  xEyeMark: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 13,
    fontFamily: 'Poppins_700Bold',
    top: 12,
  },
  leftXEye: {
    left: 10,
  },
  rightXEye: {
    right: 10,
  },
  flatMouth: {
    position: 'absolute',
    bottom: 12,
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  smileMouth: {
    position: 'absolute',
    bottom: 8,
    width: 22,
    height: 11,
    borderBottomWidth: 3,
    borderLeftWidth: 2.6,
    borderRightWidth: 2.6,
    borderColor: '#FFFFFF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  frownMouth: {
    position: 'absolute',
    bottom: 7,
    width: 22,
    height: 10,
    borderTopWidth: 3,
    borderLeftWidth: 2.6,
    borderRightWidth: 2.6,
    borderColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  moodDay: {
    color: '#FFFFFFB2',
    fontSize: 14,
    lineHeight: 20,
  },
  searchBar: {
    height: 68,
    borderRadius: 34,
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
    gap: 14,
  },
  card: {
    height: 108,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1F2125',
    flexDirection: 'row',
  },
  cardDate: {
    width: 94,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF1A',
    borderRightWidth: 1,
    borderRightColor: '#31394A',
  },
  dateDay: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 28,
  },
  dateMonth: {
    color: '#D0D3DB',
    fontSize: 13,
    lineHeight: 18,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 22,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 4,
  },
  cardPreview: {
    color: '#A3A8B3',
    fontSize: 13,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 24,
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#E18DFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 8,
    elevation: 5,
  },
});
