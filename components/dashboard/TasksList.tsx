import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const tasks = [
  { id: 1, title: 'Pray 5 Times', completed: true },
  { id: 2, title: 'Read Surah Yaseen', completed: true },
  { id: 3, title: 'Take A 5-Min Dhikr Break', completed: false },
  { id: 4, title: 'Write A Reflection', completed: false },
  { id: 5, title: 'Complete Your Daily Plan', completed: false },
];

export const TasksList = () => {
  return (
    <View style={styles.card}>
      <ThemedText type="poppins-bold" style={styles.cardTitle}>
        Today&apos;s Tasks
      </ThemedText>

      <View style={styles.tasksContainer}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <View style={styles.taskLeftContent}>
              <View
                style={[
                  styles.taskBullet,
                  task.completed ? styles.taskBulletCompleted : styles.taskBulletPending,
                ]}
              />
              <ThemedText
                type="poppins-medium"
                style={[
                  styles.taskTitle,
                  task.completed ? styles.taskTitleCompleted : styles.taskTitlePending,
                ]}>
                {task.title}
              </ThemedText>
            </View>
            {task.completed && <IconSymbol name="checkmark" size={16} color="#9CA3AF" />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 0,
    margin: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  tasksContainer: {
    gap: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
  },
  taskLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  taskBulletPending: {
    backgroundColor: '#6B7280',
  },
  taskBulletCompleted: {
    backgroundColor: '#9CA3AF',
  },
  taskTitle: {
    fontSize: 14,
  },
  taskTitlePending: {
    color: '#374151',
  },
  taskTitleCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
});

