import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
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
  // Fixed dashed column settings (matches design): 97px total length, dash 3px, gap 3px
  const DASH_CONTAINER_HEIGHT = 97;
  const DASH_HEIGHT = 3;
  const DASH_GAP = 3;
  const DASH_COUNT = Math.max(4, Math.floor(DASH_CONTAINER_HEIGHT / (DASH_HEIGHT + DASH_GAP)));

  return (
    <View style={styles.container}>
      {/* Timeline Dot */}
      <View style={styles.timelineContainer}>
        <View style={[styles.dot, isCompleted && styles.dotCompleted]}>
          <View style={[styles.dotInner, isCompleted && styles.dotInnerCompleted]} />
        </View>
        <View style={[styles.dashColumn, { height: DASH_CONTAINER_HEIGHT }]} pointerEvents="none">
          {Array.from({ length: DASH_COUNT }).map((_, i) => (
            <View key={i} style={styles.dash} />
          ))}
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.taskLabel}>Task {taskNumber}</Text>
        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{startTime} - {endTime}</Text>
            </View>
          </View>

          {description && <Text style={styles.description}>{description}</Text>}

          <View style={styles.cardFooter}>
            {onEdit ? (
              <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                <IconSymbol name="pencil" size={16} color="#4A0C63" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            ) : onToggleComplete && (
              <TouchableOpacity style={styles.completeButton} onPress={onToggleComplete}>
                <IconSymbol name="checkmark" size={14} color="#10B981" />
                <Text style={styles.completeText}>Mark Complete</Text>
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
    marginBottom: 24,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    position: 'relative',
    alignSelf: 'stretch',
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4A0C63',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    elevation: 2,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  dotInnerCompleted: {
    backgroundColor: '#fff',
  },
  dotCompleted: {
    backgroundColor: '#4A0C63',
  },
  dashColumn: {
    position: 'absolute',
    left: 6,
    top: 12,
    width: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  dash: {
    width: 1.5,
    height: 3,
    borderRadius: 1,
    backgroundColor: '#62206E',
    marginVertical: 3,
    opacity: 1,
  },
  content: {
    flex: 1,
  },
  taskLabel: {
    fontSize: 13,
    color: '#1F2937',
    marginBottom: 8,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#F3E9F6',
    shadowColor: '#ECDFF2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2F0633',
    marginBottom: 4,
    flex: 1,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timeContainer: {
    backgroundColor: '#FF00001F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  time: {
    fontSize: 12,
    color: '#2B0E30',
    fontWeight: '600',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editText: {
    fontSize: 14,
    color: '#4A0C63',
    fontWeight: '600',
  },
  checkButton: {
    padding: 4,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  completeText: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
  },
});
