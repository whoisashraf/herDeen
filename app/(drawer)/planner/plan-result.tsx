import { TimelineTask } from '@/components/timeline-task';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { usePlanner } from '@/contexts/planner-context';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PlanResultScreen() {
  const { generatedPlan, savePlan } = usePlanner();
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
    router.push('/(drawer)/planner/my-plan');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <IconSymbol name="moon.stars" size={20} color="#fff" />
          </View>
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
        <Text style={styles.pageTitle}>Ouuu! Here's your Plan for the day.</Text>

        {/* Timeline */}
        <View style={styles.timeline}>
          {generatedPlan.map((task, index) => (
            <TimelineTask
              key={task.id}
              taskNumber={index + 1}
              title={task.title}
              description={task.description}
              startTime={task.startTime || '9:00 AM'}
              endTime={task.endTime || '9:45 AM'}
              onEdit={() => console.log(`Edit task ${task.id}`)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.regenerateButton} onPress={handleRegenerate}>
          <IconSymbol name="arrow.clockwise" size={20} color="#6B46C1" />
          <Text style={styles.regenerateText}>Regenerate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePlan}>
          <IconSymbol name="checkmark" size={20} color="#fff" />
          <Text style={styles.saveText}>Yes, Save Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#6B46C1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  timeline: {
    paddingHorizontal: 20,
  },
  bottomSpacer: {
    height: 100,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  regenerateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6B46C1',
    backgroundColor: '#fff',
    gap: 8,
  },
  regenerateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B46C1',
  },
  saveButton: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#6B46C1',
    gap: 8,
  },
  saveText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
