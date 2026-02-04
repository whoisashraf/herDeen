import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const tasks = [
  { id: 1, title: 'pray 5 times', completed: true },
  { id: 2, title: 'Read Surah Yaseen', completed: true },
  { id: 3, title: 'Take a 5-min dhikr break', completed: false },
  { id: 4, title: 'Write a reflection', completed: false },
  { id: 5, title: 'Complete your daily plan', completed: false },
];

export const TasksList = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <ThemedText type="poppins-medium" style={[styles.sectionTitle, { color: colors.text }]}>
        Today&apos;s Tasks
      </ThemedText>

      <View style={styles.tasksContainer}>
        {tasks.map((task) => (
          <View
            key={task.id}
            style={[styles.taskItem, { backgroundColor: colors.surface }]}>
            <View style={styles.taskLeftContent}>
              <View
                style={[
                  styles.taskBullet,
                  { backgroundColor: task.completed ? colors.textMuted : colors.text }
                ]}
              />
              <ThemedText
                type="poppins-medium"
                style={[
                  styles.taskTitle,
                  task.completed
                    ? [styles.taskTitleCompleted, { color: colors.textMuted }]
                    : { color: colors.text },
                ]}>
                {task.title}
              </ThemedText>
            </View>
            {task.completed && (
              <IconSymbol name="checkmark" size={24} color={colors.textMuted} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  tasksContainer: {
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  taskLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  taskBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  taskTitle: {
    fontSize: 16,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
  },
});

