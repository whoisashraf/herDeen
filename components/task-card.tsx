import { IconSymbol } from '@/components/ui/icon-symbol';
import { Task } from '@/contexts/planner-context';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TaskCardProps {
  task: Task;
  taskNumber: number;
  isExpanded?: boolean;
  onToggle?: () => void;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
}

export function TaskCard({
  task,
  taskNumber,
  isExpanded = true,
  onToggle,
  onUpdate,
  onDelete,
}: TaskCardProps) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Task {taskNumber}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <IconSymbol name="trash" size={18} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggle}>
            <IconSymbol
              name={isExpanded ? 'chevron.up' : 'chevron.down'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.content}>
          {/* Task Description */}
          <Text style={styles.label}>What's on your plate today?</Text>
          <TextInput
            style={styles.input}
            placeholder="Online class, Grocery shopping, Client meeting"
            placeholderTextColor="#999"
            multiline
            value={task.title}
            onChangeText={(text) => onUpdate({ title: text })}
          />

          {/* Priority */}
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                styles.priorityLow,
                task.priority === 'low' && styles.priorityLowActive,
              ]}
              onPress={() => onUpdate({ priority: 'low' })}
            >
              <Text
                style={[
                  styles.priorityText,
                  task.priority === 'low' && styles.priorityTextActive,
                ]}
              >
                Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                styles.priorityMedium,
                task.priority === 'medium' && styles.priorityMediumActive,
              ]}
              onPress={() => onUpdate({ priority: 'medium' })}
            >
              <Text
                style={[
                  styles.priorityText,
                  task.priority === 'medium' && styles.priorityTextActive,
                ]}
              >
                Medium
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                styles.priorityHigh,
                task.priority === 'high' && styles.priorityHighActive,
              ]}
              onPress={() => onUpdate({ priority: 'high' })}
            >
              <Text
                style={[
                  styles.priorityText,
                  task.priority === 'high' && styles.priorityTextActive,
                ]}
              >
                High
              </Text>
            </TouchableOpacity>
          </View>

          {/* Time Inputs */}
          <View style={styles.timeRow}>
            <View style={styles.timeGroup}>
              <Text style={styles.label}>Estimated Duration</Text>
              <View style={styles.timeInputContainer}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="40"
                  keyboardType="numeric"
                  value={task.estimatedDuration?.toString()}
                  onChangeText={(text) =>
                    onUpdate({ estimatedDuration: parseInt(text) || 0 })
                  }
                />
                <Text style={styles.timeUnit}>Min</Text>
              </View>
            </View>
            <View style={styles.timeGroup}>
              <Text style={styles.label}>Prefer time</Text>
              <View style={styles.timeInputContainer}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="01:50"
                  value={task.preferredTime}
                  onChangeText={(text) => onUpdate({ preferredTime: text })}
                />
                <Text style={styles.timeUnit}>AM</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    marginTop: 16,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    minHeight: 44,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  priorityLow: {
    backgroundColor: '#FEFCE8',
    borderColor: '#FEF08A',
  },
  priorityLowActive: {
    backgroundColor: '#FEF08A',
  },
  priorityMedium: {
    backgroundColor: '#EDE9FE',
    borderColor: '#C4B5FD',
  },
  priorityMediumActive: {
    backgroundColor: '#C4B5FD',
  },
  priorityHigh: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  priorityHighActive: {
    backgroundColor: '#FECACA',
  },
  priorityText: {
    fontSize: 13,
    color: '#666',
  },
  priorityTextActive: {
    color: '#333',
    fontWeight: '500',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeGroup: {
    flex: 1,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  timeInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  timeUnit: {
    fontSize: 13,
    color: '#999',
    marginLeft: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    padding: 4,
  },
});
