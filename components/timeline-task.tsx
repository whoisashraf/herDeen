import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
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
  const { colors, isDark } = useAppColors();
  const cardBg = isDark ? colors.surface : '#FFFFFF';
  const chipBg = isDark ? 'rgba(255, 0, 0, 0.22)' : '#FF00001F';

  // Fixed dashed column settings (matches design): 97px total length, dash 3px, gap 3px
  const DASH_CONTAINER_HEIGHT = 97;
  const DASH_HEIGHT = 3;
  const DASH_GAP = 3;
  const DASH_COUNT = Math.max(4, Math.floor(DASH_CONTAINER_HEIGHT / (DASH_HEIGHT + DASH_GAP)));

  return (
    <View style={styles.container}>
      {/* Timeline Dot */}
      <View style={styles.timelineContainer}>
        <View style={[styles.dot, { borderColor: cardBg }, isCompleted && styles.dotCompleted]}>
          <View style={[styles.dotInner, { backgroundColor: cardBg }, isCompleted && styles.dotInnerCompleted]} />
        </View>
        <View style={[styles.dashColumn, { height: DASH_CONTAINER_HEIGHT }]} pointerEvents="none">
          {Array.from({ length: DASH_COUNT }).map((_, i) => (
            <View key={i} style={styles.dash} />
          ))}
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.taskLabel, { color: colors.text }]}>Task {taskNumber}</Text>
        <View style={[styles.card, { backgroundColor: cardBg, borderColor: isDark ? colors.border : '#F3E9F6' }]}>
          <View style={styles.cardTopRow}>
            <Text style={[styles.title, { color: isDark ? colors.text : '#2F0633' }]}>{title}</Text>
            <View style={[styles.timeContainer, { backgroundColor: chipBg }]}>
              <Text style={[styles.time, { color: isDark ? colors.text : '#2B0E30' }]}>{startTime} - {endTime}</Text>
            </View>
          </View>

          {description && <Text style={[styles.description, { color: colors.textMuted }]}>{description}</Text>}

          <View style={styles.cardFooter}>
            {onEdit ? (
              <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                <IconSymbol name="pencil" size={14} color="#E18DFF" />
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
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E18DFF',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#E18DFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    backgroundColor: '#E18DFF',
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
    backgroundColor: '#E18DFF',
    marginVertical: 3,
    opacity: 1,
  },
  content: {
    flex: 1,
  },
  taskLabel: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '600',
  },
  card: {
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
    marginBottom: 4,
    flex: 1,
  },
  description: {
    fontSize: 13,
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
    fontSize: 13,
    color: '#E18DFF',
    fontWeight: '500',
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
