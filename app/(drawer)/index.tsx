import { AdhkarBanner } from '@/components/dashboard/AdhkarBanner';
import { BottomNav, BOTTOM_NAV_HEIGHT } from '@/components/dashboard/BottomNav';
import { Header } from '@/components/dashboard/Header';
import { PrayerTimesCard } from '@/components/dashboard/PrayerTimesCard';
import { QuickActionsGrid } from '@/components/dashboard/QuickActionsGrid';
import { TasksList } from '@/components/dashboard/TasksList';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageBackground, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <ImageBackground
        source={require('@/assets/images/card-bg.png')}
        style={styles.backgroundImage}
        imageStyle={[
          styles.waveImage,
          {
            tintColor: colorScheme === 'dark' ? '#FFFFFF' : '#AA74E0',
            opacity: colorScheme === 'dark' ? 0.05 : 0.03
          }
        ]}
        resizeMode="repeat">
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 20 + BOTTOM_NAV_HEIGHT + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}>
          <PrayerTimesCard />
          <QuickActionsGrid />
          <AdhkarBanner />
          <TasksList />
        </ScrollView>
      </ImageBackground>
      <BottomNav />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  waveImage: {
    // Opacity and tint are now dynamic
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
});
