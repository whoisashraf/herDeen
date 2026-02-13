import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ACCENT = '#A978E8';
const RECENT_LOCATIONS = ['Oko Erin', 'Ibadan', 'Oke odo'];

export default function CurrentLocationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();
  const [search, setSearch] = useState('');
  const [autoDetect, setAutoDetect] = useState(true);
  const [recent, setRecent] = useState(RECENT_LOCATIONS);

  const filteredRecent = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return recent;
    return recent.filter((item) => item.toLowerCase().includes(query));
  }, [recent, search]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 40 }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.headerBtn, { backgroundColor: colors.surface }]}>
          <IconSymbol name="arrow.left" size={20} color={colors.text} />
        </TouchableOpacity>
        <ThemedText type="poppins-semibold" style={[styles.headerTitle, { color: colors.text }]}>
          Location
        </ThemedText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.mainContent}>
          <View style={[styles.searchBar, { backgroundColor: colors.surface }]}> 
            <IconSymbol name="search" size={20} color={colors.textMuted} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search for location"
              placeholderTextColor={colors.textMuted}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>

          <View style={styles.currentRow}>
            <View style={styles.currentLeft}>
              <View style={[styles.iconCircle, { backgroundColor: colors.surface }]}> 
                <Image
                  source={require('@/assets/icons/current-location.png')}
                  style={[styles.currentIcon, { tintColor: colors.text }]}
                />
              </View>
              <View>
                <ThemedText type="poppins-semibold" style={[styles.currentTitle, { color: colors.text }]}> 
                  Current location
                </ThemedText>
                <ThemedText type="poppins-regular" style={[styles.currentSub, { color: colors.textMuted }]}> 
                  Oko Erin Kwara Nigeria
                </ThemedText>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setAutoDetect((prev) => !prev)}
              style={styles.toggleHit}
            >
              <View style={[styles.toggleTrack, autoDetect ? styles.toggleOn : styles.toggleOff]}>
                <View style={[styles.toggleKnob, autoDetect ? styles.knobOn : styles.knobOff]} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <ThemedText type="poppins-regular" style={[styles.sectionTitle, { color: colors.textMuted }]}> 
              Recent location
            </ThemedText>
            {recent.length > 0 ? (
              <TouchableOpacity onPress={() => setRecent([])}>
                <ThemedText type="poppins-regular" style={[styles.clearAll, { color: colors.textMuted }]}> 
                  Clear all
                </ThemedText>
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.recentList}>
            {filteredRecent.map((item) => (
              <View key={item} style={styles.recentRow}>
                <View style={styles.recentLeft}>
                  <IconSymbol name="arrow.counterclockwise" size={20} color={colors.textMuted} />
                  <ThemedText type="poppins-medium" style={[styles.recentText, { color: colors.text }]}> 
                    {item}
                  </ThemedText>
                </View>
                <TouchableOpacity
                  onPress={() => setRecent((prev) => prev.filter((loc) => loc !== item))}
                >
                  <IconSymbol name="xmark" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <ThemedText type="poppins-regular" style={[styles.footerText, { color: colors.textMuted }]}> 
            Manually selecting a location will
          </ThemedText>
          <ThemedText type="poppins-regular" style={[styles.footerText, { color: colors.textMuted }]}> 
            turn off auto-detect location
          </ThemedText>
          <ThemedText type="poppins-regular" style={[styles.footerPowered, { color: colors.textMuted }]}> 
            powered by Google
          </ThemedText>
        </View>
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
    fontSize: 26,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    flexGrow: 1,
  },
  mainContent: {
    gap: 22,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    paddingHorizontal: 18,
    height: 52,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  currentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  currentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  currentTitle: {
    fontSize: 18,
  },
  currentSub: {
    fontSize: 14,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
  },
  clearAll: {
    fontSize: 16,
  },
  recentList: {
    gap: 18,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  recentText: {
    fontSize: 18,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 16,
  },
  footerPowered: {
    fontSize: 16,
    marginTop: 14,
  },
  toggleHit: {
    paddingLeft: 8,
    paddingVertical: 6,
  },
  toggleTrack: {
    width: 46,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleOn: {
    backgroundColor: ACCENT,
    alignItems: 'flex-end',
  },
  toggleOff: {
    backgroundColor: '#FFFFFF4D',
    alignItems: 'flex-start',
  },
  toggleKnob: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  knobOn: {
    backgroundColor: '#0C0D10',
  },
  knobOff: {
    backgroundColor: '#DADDE3',
  },
});
