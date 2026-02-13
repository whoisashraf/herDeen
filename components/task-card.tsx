import { IconSymbol } from '@/components/ui/icon-symbol';
import { Task } from '@/contexts/planner-context';
import { useAppColors } from '@/hooks/use-app-colors';
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
  const { colors, isDark } = useAppColors();
  const cardBg = isDark ? colors.surface : '#FFFFFF';
  const inputBg = isDark ? colors.surfaceSoft : '#F9FAFB';

  return (
    <View style={[styles.container, { backgroundColor: cardBg, borderColor: isDark ? colors.border : '#F3E9F6' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Task {taskNumber}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <IconSymbol name="trash" size={18} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggle}>
            <IconSymbol
              name={isExpanded ? 'chevron.up' : 'chevron.down'}
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.content}>
          {/* Task Description */}
          <Text style={[styles.label, { color: colors.textMuted }]}>What&apos;s on your plate today?</Text>
          <TextInput
            style={[styles.input, { backgroundColor: inputBg, color: colors.text }]}
            placeholder="Online class, Grocery shopping, Client meeting"
            placeholderTextColor={colors.textFaint}
            multiline
            value={task.title}
            onChangeText={(text) => onUpdate({ title: text })}
          />

          {/* Priority */}
          <Text style={[styles.label, { color: colors.textMuted }]}>Priority</Text>
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
                  { color: colors.textMuted },
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
                  { color: colors.textMuted },
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
                  { color: colors.textMuted },
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
              <Text style={[styles.label, { color: colors.textMuted }]}>Estimated Duration</Text>
              <View style={[styles.timeInputContainer, { backgroundColor: inputBg }]}>
                <TextInput
                  style={[styles.timeInput, { color: colors.text }]}
                  placeholder="40"
                  placeholderTextColor={colors.textFaint}
                  keyboardType="numeric"
                  value={task.estimatedDuration?.toString()}
                  onChangeText={(text) =>
                    onUpdate({ estimatedDuration: parseInt(text) || 0 })
                  }
                />
                <Text style={[styles.timeUnit, { color: colors.textMuted }]}>Min</Text>
              </View>
            </View>
            <View style={styles.timeGroup}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Prefer time</Text>
              <View style={[styles.timeInputContainer, { backgroundColor: inputBg }]}>
                <TextInput
                  style={[styles.timeInput, { color: colors.text }]}
                  placeholder="01:50"
                  placeholderTextColor={colors.textFaint}
                  value={task.preferredTime}
                  onChangeText={(text) => onUpdate({ preferredTime: text })}
                />
                <Text style={[styles.timeUnit, { color: colors.textMuted }]}>AM</Text>
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
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
  },
  content: {
    marginTop: 16,
  },
  label: {
    fontSize: 13,
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
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
    backgroundColor: '#FFF6001F',
    borderColor: '#FEF08A',
  },
  priorityLowActive: {
    backgroundColor: '#FEF08A',
    borderColor: '#E18DFF',
  },
  priorityMedium: {
    backgroundColor: '#EDE9FE',
    borderColor: '#C4B5FD',
  },
  priorityMediumActive: {
    backgroundColor: '#C4B5FD',
    borderColor: '#E18DFF',
  },
  priorityHigh: {
    backgroundColor: '#FF00001F',
    borderColor: '#FECACA',
  },
  priorityHighActive: {
    backgroundColor: '#FECACA',
    borderColor: '#E18DFF',
  },
  priorityText: {
    fontSize: 13,
  },
  priorityTextActive: {
    color: '#11181C',
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
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  timeInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
  },
  timeUnit: {
    fontSize: 13,
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
