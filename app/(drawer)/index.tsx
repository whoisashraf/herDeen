import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Header } from '@/components/dashboard/Header';
import { DuaOfTheDay } from '@/components/dashboard/DuaOfTheDay';
import { PrayerTimesCard } from '@/components/dashboard/PrayerTimesCard';
import { QuickActionsGrid } from '@/components/dashboard/QuickActionsGrid';
import { AdhkarBanner } from '@/components/dashboard/AdhkarBanner';
import { QuranProgressCard } from '@/components/dashboard/QuranProgressCard';
import { TasksList } from '@/components/dashboard/TasksList';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PrayerTimesCard />
        <QuranProgressCard />
        <QuickActionsGrid />
        <TasksList />
        <AdhkarBanner />
        <DuaOfTheDay />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16, // Adds space between components
  },
});
