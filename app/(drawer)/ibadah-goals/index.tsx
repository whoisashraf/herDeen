import { BottomNav } from '@/components/dashboard/BottomNav';
import BottomActions from '@/components/ibadah-goals/BottomActions';
import DateCard from '@/components/ibadah-goals/DateCard';
import GoalCard from '@/components/ibadah-goals/GoalCard';
import Header from '@/components/ibadah-goals/Header';
import InitialSetup from '@/components/ibadah-goals/InitialSetup';
import OverviewCard from '@/components/ibadah-goals/OverviewCard';
import Tabs from '@/components/ibadah-goals/Tabs';
import type { Goal } from '@/components/ibadah-goals/types';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_GOALS: Goal[] = [
  {
    id: '1',
    type: 'checkboxes',
    title: 'Salah',
    description: 'Complete daily solat to earn reward from Allah',
    value: 0,
  },
  {
    id: '2',
    type: 'yesno',
    title: 'Tilawah',
    description: 'To recite 3 pages daily from the Qur\'an and memorize Suratul-Mulk',
    completed: true,
  },
  {
    id: '3',
    type: 'yesno',
    title: 'Sadaqah',
    description: 'Do a random act of kindness or give out sadaqah',
    completed: true,
  },
  {
    id: '4',
    type: 'yesno',
    title: 'Dua\'a & Dhikr',
    description: 'To make morning and evening adhkar daily, and set daily intentional Dua\'a',
    completed: true,
  },
  {
    id: '5',
    type: 'yesno',
    title: 'Modest Practice',
    description: 'Have you recite your daily Qur\'an yet? Earn when you complete your daily tilawah',
    completed: false,
  },
];

export default function IbadahGoalsScreen() {
  const { colors, isDark } = useAppColors();
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [showCompletedView, setShowCompletedView] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [showOverview, setShowOverview] = useState(false);

  const handleSaveGoals = () => {
    setIsSetupComplete(true);
  };

  const handleCompleted = () => {
    setShowCompletedView(true);
  };

  const handleViewDetail = (goalId: string) => {
    setSelectedGoalId(goalId);
  };

  const handleBackToList = () => {
    setSelectedGoalId(null);
  };

  const handleShowOverview = () => {
    setShowOverview(true);
  };

  const handleBackToDetail = () => {
    setShowOverview(false);
  };

  const handleUpdateGoal = (id: string, update: Partial<Goal>) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...update } : g));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // Show goal detail view
  if (selectedGoalId) {
    const selectedGoal = goals.find(g => g.id === selectedGoalId);
    if (selectedGoal) {
      // Show detailed overview page
      if (showOverview) {
        return (
          <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView style={[styles.detailContainer, { backgroundColor: colors.background }]}>
              <View style={styles.detailHeader}>
                <TouchableOpacity onPress={handleBackToDetail} style={styles.backButton}>
                  <IconSymbol name="chevron.left" size={20} color={colors.text} />
                  <Text style={[styles.backText, { color: colors.text }]}>{selectedGoal.title} Overview</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.progressCard, { backgroundColor: isDark ? colors.surface : 'white' }]}>
                <View style={styles.detailProgressCircleContainer}>
                  <View style={styles.detailProgressCircleBackground} />
                  <View style={styles.detailProgressCircleForeground} />
                  <Text style={[styles.detailProgressPercentage, { color: colors.text }]}>90%</Text>
                </View>
                <View style={styles.progressInfo}>
                  <Text style={[styles.progressTitle, { color: colors.text }]}>Your Weekly {selectedGoal.title} wasn't completed</Text>
                  <Text style={[styles.progressSubtitle, { color: colors.textMuted }]}>You can do better next week</Text>
                </View>
              </View>

              <View style={styles.dailyProgressContainer}>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <View key={day} style={[styles.dailyProgressCard, { backgroundColor: isDark ? colors.surface : 'white' }]}>
                    <View style={styles.dayInfo}>
                      <Text style={[styles.dayNumber, { color: colors.text }]}>Day {day}</Text>
                      <Text style={[styles.goalLabel, { color: colors.textMuted }]}>goal</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                      <Text style={[styles.progressPercent, { color: colors.text }]}>100%</Text>
                      <View style={[styles.progressBar, { backgroundColor: isDark ? colors.border : '#E5E7EB' }]}>
                        <View style={styles.progressBarFill} />
                      </View>
                      <Text style={[styles.progressMessage, { color: colors.text }]}>You Observed your complete {selectedGoal.title}</Text>
                      <Text style={[styles.progressSubMessage, { color: colors.textMuted }]}>Alhamdulillah</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
            <BottomNav />
          </SafeAreaView>
        );
      }

      // Show regular detail page
      return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
          <Stack.Screen options={{ headerShown: false }} />
          <View style={[styles.detailContainer, { flex: 1, backgroundColor: colors.background }]}>
            <View style={styles.detailHeader}>
              <TouchableOpacity onPress={handleBackToList} style={styles.backButton}>
                <IconSymbol name="chevron.left" size={20} color={colors.text} />
                <Text style={[styles.backText, { color: colors.text }]}>{selectedGoal.title}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.progressCard, { backgroundColor: isDark ? colors.surface : 'white' }]}>
              <TouchableOpacity onPress={handleShowOverview} style={styles.detailProgressCircleContainer}>
                <View style={styles.detailProgressCircleBackground} />
                <View style={styles.detailProgressCircleForeground} />
                <Text style={[styles.detailProgressPercentage, { color: colors.text }]}>90%</Text>
              </TouchableOpacity>
              <View style={styles.progressInfo}>
                <Text style={[styles.progressTitle, { color: colors.text }]}>Your Weekly {selectedGoal.title} wasn't completed</Text>
                <Text style={[styles.progressSubtitle, { color: colors.textMuted }]}>You can do better next week</Text>
              </View>
            </View>

            <View style={styles.weeklyGrid}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <View key={day} style={[styles.dayCard, { backgroundColor: isDark ? colors.surface : 'white' }]}>
                  <Text style={[styles.dayTitle, { color: colors.text }]}>Day {day}</Text>
                  <Text style={[styles.dayStatus, { color: colors.textMuted }]}>{day === 5 ? 'Missed One Salah' : 'Completed'}</Text>
                </View>
              ))}
            </View>
          </View>
          <BottomNav />
        </SafeAreaView>
      );
    }
  }

  // Show initial setup screen if setup is not complete
  if (!isSetupComplete) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContentContainer}>
          <Header />
          <DateCard />
          <InitialSetup onSaveGoals={handleSaveGoals} />
        </ScrollView>
        <BottomNav />
      </SafeAreaView>
    );
  }

  // Show completed view (goal cards with View detail buttons)
  if (showCompletedView) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContentContainer}>
          <Header />
          <DateCard />
          <OverviewCard />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Goals List with View detail buttons */}
          <View style={styles.goalsContainer}>
            {goals.map((goal) => (
              <View key={goal.id} style={[styles.goalCard, { backgroundColor: isDark ? colors.surface : 'white', borderColor: isDark ? colors.border : '#F3F4F6' }]}>
                <View style={styles.goalHeader}>
                  <View style={styles.goalTitleRow}>
                    <View style={styles.goalIcon}>
                      <IconSymbol name="person" size={20} color={colors.textMuted} />
                    </View>
                    <Text style={[styles.goalTitle, { color: colors.text }]}>{goal.title}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewDetailButton} onPress={() => handleViewDetail(goal.id)}>
                    <Text style={styles.viewDetailText}>View detail</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.goalProgress, { color: colors.textMuted }]}>Progress: {goal.type === 'checkboxes' ? `${goal.value || 0}/5` : (goal.completed ? 'Complete' : 'Incomplete')}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <BottomNav />
      </SafeAreaView>
    );
  }

  // Show tracking screen after setup is complete
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContentContainer}>

        <Header />

        <DateCard />

        <OverviewCard />

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Goals List */}
        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={handleUpdateGoal}
              onDelete={handleDeleteGoal}
            />
          ))}
        </View>

        <BottomActions onCompleted={handleCompleted} />

      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollViewContent: {
    flex: 1,
  },
  scrollViewContentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  greetingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2F0633',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dateSelectorSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  dateSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  flex1: {
    flex: 1,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2F0633',
  },
  subtitleText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  targetIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F3E8F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3E8F6',
    marginVertical: 14,
  },
  targetIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F3E8FF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  dayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 56,
    minHeight: 56,
  },
  dayButtonActive: {
    backgroundColor: '#E18DFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },
  dayButtonInactive: {
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#6B7280',
  },
  dayTextActive: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  dayTextInactive: {
    color: '#6B7280',
  },
  dowText: {
    fontSize: 12,
  },
  dowTextActive: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 12,
  },
  dowTextInactive: {
    color: '#9CA3AF',
  },
  overviewContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  overviewCard: {
    backgroundColor: '#E18DFF',
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 140,
    justifyContent: 'center',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  overviewGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    borderRadius: 16,
  },
  overviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  overviewLeft: {
    flex: 1,
    paddingRight: 16,
  },
  overviewTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  overviewSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  progressBadge: {
    backgroundColor: 'white',
    borderRadius: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  progressBadgeText: {
    color: '#E18DFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressCircleContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  progressCircleBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  progressCircleForeground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
  },
  progressPercentage: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tabsWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#E18DFF',
  },
  tabInactive: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontWeight: '600',
  },
  tabTextActive: {
    color: 'white',
  },
  tabTextInactive: {
    color: '#6B7280',
  },
  tabTextWeekly: {
    color: '#E18DFF',
  },
  goalsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 16,
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: '#1F2937',
    fontWeight: 'bold',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#E18DFF',
    borderRadius: 12,
    shadowColor: '#E18DFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewDetailButton: {
    backgroundColor: '#FF00001F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewDetailText: {
    color: '#E18DFF',
    fontSize: 12,
    fontWeight: '600',
  },
  goalProgress: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  detailHeader: {
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  weeklyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dayCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  dayStatus: {
    fontSize: 12,
    color: '#6B7280',
  },
  detailProgressCircleContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  detailProgressCircleBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10.47,
    borderColor: '#F2EAF3',
    position: 'absolute',
  },
  detailProgressCircleForeground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10.47,
    borderColor: '#E18DFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '0deg' }],
    position: 'absolute',
  },
  detailProgressPercentage: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dailyProgressContainer: {
    gap: 16,
  },
  dailyProgressCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dayInfo: {
    alignItems: 'center',
    minWidth: 60,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  goalLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressBarContainer: {
    flex: 1,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E18DFF',
    borderRadius: 4,
    width: '100%',
  },
  progressMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  progressSubMessage: {
    fontSize: 12,
    color: '#6B7280',
  },
  goalCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  goalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  goalDescription: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    gap: 12,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
  },
  checkboxActive: {
    backgroundColor: '#E9D5FF',
    borderColor: '#E9D5FF',
  },
  checkboxInactive: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  yesNoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  yesNoButton: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 20,
  },
  yesNoButtonInactive: {
    backgroundColor: '#F3F4F6',
  },
  yesButtonActive: {
    backgroundColor: '#FEF9C3',
  },
  noButtonActive: {
    backgroundColor: '#E9D5FF',
  },
  yesNoButtonText: {
    fontWeight: '600',
  },
  yesNoButtonTextInactive: {
    color: '#9CA3AF',
  },
  yesButtonTextActive: {
    color: '#92400E',
  },
  noButtonTextActive: {
    color: '#E18DFF',
  },
});
