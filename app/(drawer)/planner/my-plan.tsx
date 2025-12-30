import { TimelineTask } from '@/components/timeline-task';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { usePlanner } from '@/contexts/planner-context';
import { DrawerActions } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MyPlanScreen() {
  const { savedPlan, toggleTaskComplete, generatePlan, savePlan, isPlanSaved } = usePlanner();
  const navigation = useNavigation();
  const router = useRouter();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleRegenerate = () => {
    router.back();
  };

  const handleSavePlan = () => {
    savePlan();
    // Stay on this page to show the saved plan
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('@/assets/icons/plan-logo.png')} style={styles.logoImage} />
          <Text style={styles.headerTitle}>AI Day Planner</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <IconSymbol name="bell" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={openDrawer}>
            <IconSymbol name="line.3.horizontal" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.pageTitle}>
          {isPlanSaved ? 'Yes! My Plan' : 'Ouuu! Here\'s your Plan for the day.'}
        </Text>

        {/* Timeline */}
        <View style={styles.timeline}>
          {savedPlan.map((task, index) => (
            <TimelineTask
              key={task.id}
              taskNumber={index + 1}
              title={task.title}
              description={task.description}
              startTime={task.startTime || '9:00 AM'}
              endTime={task.endTime || '9:45 AM'}
              isCompleted={task.isCompleted}
              onEdit={isPlanSaved ? undefined : () => { }}
              onToggleComplete={() => toggleTaskComplete(task.id)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Action Buttons - only show if plan is not saved */}
      {!isPlanSaved && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.regenerateButton} onPress={handleRegenerate}>
            <Image source={require('@/assets/icons/reset_icon.png')} style={styles.regenerateButtonIcon} />
            <Text style={styles.regenerateText}>Regenerate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePlan}>
            <IconSymbol name="checkmark" size={18} color="#fff" />
            <Text style={styles.saveText}>Yes, Save Plan</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  timeline: {
    paddingHorizontal: 20,
  },
  bottomSpacer: {
    height: 40,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  regenerateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A0C63',
    backgroundColor: '#fff',
    gap: 8,
  },
  regenerateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A0C63',
  },
  regenerateButtonIcon: {
    width: 18, // Match the size of the original IconSymbol
    height: 18,
    tintColor: '#4A0C63', // Match the color of the regenerateText
    resizeMode: 'contain',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#4A0C63',
    gap: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
