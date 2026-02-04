
import { AIChatModal } from '@/components/ai-chat-modal';
import { BottomNav } from '@/components/dashboard/BottomNav';
import { TaskCard } from '@/components/task-card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { usePlanner } from '@/contexts/planner-context';
import { DrawerActions } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PlannerScreen() {
  const { tasks, addTask, updateTask, deleteTask, setTasksFromAI, generatePlan } = usePlanner();
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  const toggleTask = (taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleAITasksReceived = (aiTasks: any[]) => {
    setTasksFromAI(aiTasks);
    // Expand all tasks so user can review them
    setExpandedTasks(aiTasks.map((t) => t.id));
  };

  const handleGeneratePlan = () => {
    generatePlan();
    router.push('/(drawer)/planner/my-plan');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('@/assets/icons/ai_logo.svg')}
            style={styles.logo}
            contentFit="contain"
          />
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


        {/* Hero Card */}
        <ImageBackground
          source={require('@/assets/images/card-bg.png')}
          style={styles.heroCard}
          imageStyle={styles.heroCardImage}
        >
          <View style={styles.heroContent}>
            <View style={styles.heroTitleContainer}>
              <Text style={styles.heroTitle}>
                Let&apos;s AI plan your day with{"\n"}peace and purpose.
              </Text>
              <Image source={require('@/assets/images/subtract.svg')} style={styles.subtractImage} />
            </View>
            <TouchableOpacity style={styles.planButton} onPress={() => setShowAIChat(true)}>
              <Text style={styles.planButtonText}>Plan my day for me</Text>
              <IconSymbol name="sparkles" size={16} color="#AA74E0" />
            </TouchableOpacity>
          </View>
          <Image
            source={require('@/assets/icons/ai_icon.svg')}
            style={styles.heroIcon}
            contentFit="contain"
          />
        </ImageBackground>

        {/* Tasks */}
        <View style={styles.tasksContainer}>
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              taskNumber={index + 1}
              isExpanded={expandedTasks.includes(task.id)}
              onToggle={() => toggleTask(task.id)}
              onUpdate={(updates) => updateTask(task.id, updates)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}

          {/* Add More Button */}
          <TouchableOpacity style={styles.addMoreButton} onPress={addTask}>
            <Text style={styles.addMoreText}>One More</Text>
            <IconSymbol name="plus" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Generate Button */}
        <TouchableOpacity style={styles.generateButton} onPress={handleGeneratePlan}>
          <IconSymbol name="sparkles" size={20} color="#fff" />
          <Text style={styles.generateButtonText}>Generate My Day Plan</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* AI Chat Modal */}
      <AIChatModal
        visible={showAIChat}
        onClose={() => setShowAIChat(false)}
        onTasksReceived={handleAITasksReceived}
      />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#F5F5F5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
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
  heroCard: {
    backgroundColor: '#AA74E0',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
  },
  heroCardImage: {
    borderRadius: 20,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    lineHeight: 24,
  },
  heroTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtractImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  planButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  planButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#AA74E0',
  },
  heroIcon: {
    width: 120,
    height: 80,
    top: 20,
  },
  tasksContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 8,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 8,
    gap: 8,
  },
  addMoreText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  generateButton: {
    backgroundColor: '#AA74E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bottomSpacer: {
    height: 40,
  },
});
