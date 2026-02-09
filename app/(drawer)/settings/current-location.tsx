import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BG = '#121316';
const SURFACE = '#1E2026';
const SURFACE_SOFT = '#1A1C20';
const TITLE = '#F5F6F8';
const TEXT = '#C5C8CE';
const MUTED = '#8F939A';
const ACCENT = '#A978E8';

const RECENT_LOCATIONS = ['Oko Erin', 'Ibadan', 'Oke odo'];

export default function CurrentLocationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [autoDetect, setAutoDetect] = useState(true);
  const [recent, setRecent] = useState(RECENT_LOCATIONS);

  const filteredRecent = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return recent;
    return recent.filter((item) => item.toLowerCase().includes(query));
  }, [recent, search]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 40 }]}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <IconSymbol name="arrow.left" size={20} color={TITLE} />
        </TouchableOpacity>
        <ThemedText type="poppins-semibold" style={styles.headerTitle}>
          Location
        </ThemedText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.mainContent}>
          <View style={styles.searchBar}>
          <IconSymbol name="search" size={20} color={MUTED} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search for location"
            placeholderTextColor={MUTED}
            style={styles.searchInput}
          />
          </View>

          <View style={styles.currentRow}>
          <View style={styles.currentLeft}>
            <View style={styles.iconCircle}>
              <Image
                source={require('@/assets/icons/current-location.png')}
                style={styles.currentIcon}
              />
            </View>
            <View>
              <ThemedText type="poppins-semibold" style={styles.currentTitle}>
                Current location
              </ThemedText>
              <ThemedText type="poppins-regular" style={styles.currentSub}>
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
          <ThemedText type="poppins-regular" style={styles.sectionTitle}>
            Recent location
          </ThemedText>
          {recent.length > 0 ? (
            <TouchableOpacity onPress={() => setRecent([])}>
              <ThemedText type="poppins-regular" style={styles.clearAll}>
                Clear all
              </ThemedText>
            </TouchableOpacity>
          ) : null}
          </View>

          <View style={styles.recentList}>
          {filteredRecent.map((item) => (
            <View key={item} style={styles.recentRow}>
              <View style={styles.recentLeft}>
                <IconSymbol name="arrow.counterclockwise" size={20} color={MUTED} />
                <ThemedText type="poppins-medium" style={styles.recentText}>
                  {item}
                </ThemedText>
              </View>
              <TouchableOpacity
                onPress={() => setRecent((prev) => prev.filter((loc) => loc !== item))}
              >
                <IconSymbol name="xmark" size={20} color={MUTED} />
              </TouchableOpacity>
            </View>
          ))}
          </View>
        </View>

        <View style={styles.footer}>
          <ThemedText type="poppins-regular" style={styles.footerText}>
            Manually selecting a location will
          </ThemedText>
          <ThemedText type="poppins-regular" style={styles.footerText}>
            turn off auto-detect location
          </ThemedText>
          <ThemedText type="poppins-regular" style={styles.footerPowered}>
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
    backgroundColor: BG,
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
    backgroundColor: SURFACE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 26,
    color: TITLE,
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
    backgroundColor: SURFACE,
    borderRadius: 28,
    paddingHorizontal: 18,
    height: 52,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: TITLE,
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
    backgroundColor: SURFACE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: TITLE,
  },
  currentTitle: {
    color: TITLE,
    fontSize: 18,
  },
  currentSub: {
    color: MUTED,
    fontSize: 14,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: MUTED,
    fontSize: 16,
  },
  clearAll: {
    color: MUTED,
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
    color: TITLE,
    fontSize: 18,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    color: MUTED,
    fontSize: 16,
  },
  footerPowered: {
    color: MUTED,
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
