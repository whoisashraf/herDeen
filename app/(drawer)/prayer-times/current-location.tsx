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
  const isLight = !isDark;
  const [search, setSearch] = useState('');
  const [autoDetect, setAutoDetect] = useState(true);
  const [recent, setRecent] = useState(RECENT_LOCATIONS);

  const filteredRecent = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return recent;
    return recent.filter((item) => item.toLowerCase().includes(query));
  }, [recent, search]);

  const pageBg = isLight ? '#F1F1F1' : colors.background;
  const headerBtnBg = isLight ? '#E9E9E9' : colors.surface;
  const titleColor = isLight ? '#161D26' : colors.text;
  const searchBg = isLight ? '#E8E8E8' : colors.surface;
  const subtleText = isLight ? '#AAAAAF' : colors.textMuted;
  const rowTitleColor = isLight ? '#171D26' : colors.text;
  const rowSubColor = isLight ? '#5E6570' : colors.textMuted;
  const footerColor = isLight ? '#5F6670' : colors.textMuted;
  const toggleOffBg = isLight ? '#D6D6DA' : '#FFFFFF4D';
  const iconTileBg = isLight ? '#E9E9E9' : colors.surface;

  return (
    <View style={[styles.container, { backgroundColor: pageBg, paddingTop: insets.top + 8 }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.headerBtn, { backgroundColor: headerBtnBg }]}>
          <IconSymbol name="arrow.left" size={20} color={titleColor} />
        </TouchableOpacity>
        <ThemedText type="poppins-semibold" style={[styles.headerTitle, { color: titleColor }]}>
          Location
        </ThemedText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.mainContent}>
          <View style={[styles.searchBar, { backgroundColor: searchBg }]}>
            <IconSymbol name="search" size={18} color={subtleText} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search for location"
              placeholderTextColor={subtleText}
              style={[styles.searchInput, { color: rowTitleColor }]}
            />
          </View>

          <View style={styles.currentRow}>
            <View style={styles.currentLeft}>
              <View style={[styles.iconCircle, { backgroundColor: iconTileBg }]}>
                <Image
                  source={require('@/assets/icons/current-location.png')}
                  style={[styles.currentIcon, { tintColor: rowTitleColor }]}
                />
              </View>
              <View>
                <ThemedText type="poppins-medium" style={[styles.currentTitle, { color: rowTitleColor }]}>
                  Current location
                </ThemedText>
                <ThemedText type="poppins-regular" style={[styles.currentSub, { color: rowSubColor }]}>
                  Oko Erin Kwara Nigeria
                </ThemedText>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setAutoDetect((prev) => !prev)}
              style={styles.toggleHit}
            >
              <View style={[styles.toggleTrack, autoDetect ? styles.toggleOn : [styles.toggleOff, { backgroundColor: toggleOffBg }]]}>
                <View style={[styles.toggleKnob, autoDetect ? styles.knobOn : styles.knobOff]} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <ThemedText type="poppins-regular" style={[styles.sectionTitle, { color: subtleText }]}>
              Recent location
            </ThemedText>
            {recent.length > 0 ? (
              <TouchableOpacity onPress={() => setRecent([])}>
                <ThemedText type="poppins-regular" style={[styles.clearAll, { color: rowSubColor }]}>
                  Clear all
                </ThemedText>
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.recentList}>
            {filteredRecent.map((item) => (
              <View key={item} style={styles.recentRow}>
                <View style={styles.recentLeft}>
                  <IconSymbol name="arrow.counterclockwise" size={22} color={rowSubColor} />
                  <ThemedText type="poppins-medium" style={[styles.recentText, { color: rowTitleColor }]}>
                    {item}
                  </ThemedText>
                </View>
                <TouchableOpacity
                  onPress={() => setRecent((prev) => prev.filter((loc) => loc !== item))}
                >
                  <IconSymbol name="xmark" size={20} color={rowSubColor} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <ThemedText type="poppins-regular" style={[styles.footerText, { color: footerColor }]}>
            Manually selecting a location will
          </ThemedText>
          <ThemedText type="poppins-regular" style={[styles.footerText, { color: footerColor }]}>
            turn off auto-detect location
          </ThemedText>
          <ThemedText type="poppins-regular" style={[styles.footerPowered, { color: footerColor }]}>
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
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 24,
    lineHeight: 30,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  mainContent: {
    gap: 22,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 26,
    paddingHorizontal: 16,
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
    paddingVertical: 4,
  },
  currentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },
  currentTitle: {
    fontSize: 17,
    lineHeight: 24,
  },
  currentSub: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 26,
  },
  clearAll: {
    fontSize: 18,
    lineHeight: 26,
  },
  recentList: {
    gap: 24,
    marginTop: 2,
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
    fontSize: 17,
    lineHeight: 24,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 15,
    lineHeight: 22,
  },
  footerPowered: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 18,
  },
  toggleHit: {
    paddingLeft: 8,
    paddingVertical: 4,
  },
  toggleTrack: {
    width: 46,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleOn: {
    backgroundColor: ACCENT,
    alignItems: 'flex-end',
  },
  toggleOff: {
    backgroundColor: '#D6D6DA',
    alignItems: 'flex-start',
  },
  toggleKnob: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  knobOn: {
    backgroundColor: '#FFFFFF',
  },
  knobOff: {
    backgroundColor: '#DADDE3',
  },
});
