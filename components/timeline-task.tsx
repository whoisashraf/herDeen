import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TimelineTaskProps {
  taskNumber: number;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  isCompleted?: boolean;
  onEdit?: () => void;
  onToggleComplete?: () => void;
}

export function TimelineTask({
  taskNumber,
  title,
  description,
  startTime,
  endTime,
  isCompleted = false,
  onEdit,
  onToggleComplete,
}: TimelineTaskProps) {
  return (
    <View style={styles.container}>
      {/* Timeline Dot */}
      <View style={styles.timelineContainer}>
        <View style={[styles.dot, isCompleted && styles.dotCompleted]} />
        <View style={styles.line} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.taskLabel}>Task {taskNumber}</Text>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>
                {startTime} - {endTime}
              </Text>
            </View>
            {onEdit && (
              <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                <IconSymbol name="pencil" size={14} color="#6B46C1" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            )}
            {onToggleComplete && (
              <TouchableOpacity style={styles.checkButton} onPress={onToggleComplete}>
                <IconSymbol
                  name={isCompleted ? 'checkmark.circle.fill' : 'checkmark.circle'}
                  size={20}
                  color={isCompleted ? '#10B981' : '#D1D5DB'}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 12,
    paddingTop: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6B46C1',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#6B46C1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  dotCompleted: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  taskLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardContent: {
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  time: {
    fontSize: 12,
    color: '#991B1B',
    fontWeight: '500',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editText: {
    fontSize: 13,
    color: '#6B46C1',
    fontWeight: '500',
  },
  checkButton: {
    padding: 4,
  },
});
