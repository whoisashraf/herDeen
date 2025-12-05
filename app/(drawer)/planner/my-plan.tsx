import { TimelineTask } from '@/components/timeline-task';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { usePlanner } from '@/contexts/planner-context';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MyPlanScreen() {
  const { savedPlan, toggleTaskComplete } = usePlanner();
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
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
        <Text style={styles.pageTitle}>Yes! My Plan</Text>

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
              onToggleComplete={() => toggleTaskComplete(task.id)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    backgroundColor: '#62206E',
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
    height: 40,
  },
});
