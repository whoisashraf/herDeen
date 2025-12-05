import { AdhkarBanner } from '@/components/dashboard/AdhkarBanner';
import { DuaOfTheDay } from '@/components/dashboard/DuaOfTheDay';
import { Header } from '@/components/dashboard/Header';
import { PrayerTimesCard } from '@/components/dashboard/PrayerTimesCard';
import { QuickActionsGrid } from '@/components/dashboard/QuickActionsGrid';
import { QuranProgressCard } from '@/components/dashboard/QuranProgressCard';
import { TasksList } from '@/components/dashboard/TasksList';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContent}>
          <PrayerTimesCard />
          <QuranProgressCard />
          <QuickActionsGrid />
          <TasksList />
          <AdhkarBanner />
          <DuaOfTheDay />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },


  scrollContent: {
    paddingBottom: 40,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
});