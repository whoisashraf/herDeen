
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Types for our calendar data
type DayStatus = 'period' | 'predicted' | 'fertile' | 'ovulation' | 'none';
type CalendarDay = {
    day: number;
    status?: DayStatus;
    isToday?: boolean;
};

type MonthData = {
    year: number;
    month: string;
    startDayOffset: number; // 0 = Sunday, 1 = Monday, etc.
    daysInMonth: number;
    data: Record<number, DayStatus>; // Map day number to status
    today?: number;
};

// Mock Data for July and August 2025 based on screenshot
const CALENDAR_DATA: MonthData[] = [
    {
        year: 2025,
        month: 'July',
        startDayOffset: 2, // July 1st 2025 is Tuesday
        daysInMonth: 31,
        today: 16,
        data: {
            1: 'period', 2: 'period', 3: 'period',
            10: 'fertile', 11: 'fertile', 12: 'fertile',
            13: 'ovulation',
            14: 'fertile', 15: 'fertile',
            30: 'predicted', 31: 'predicted',
        }
    },
    {
        year: 2025,
        month: 'August',
        startDayOffset: 5, // August 1st 2025 is Friday
        daysInMonth: 31,
        data: {
            1: 'predicted', 2: 'predicted', 3: 'predicted', 4: 'predicted',
        }
    },
    // Adding September just for the Grid view fullness
    {
        year: 2025,
        month: 'September',
        startDayOffset: 1, // Sept 1st 2025 is Monday
        daysInMonth: 30,
        data: {
            17: 'ovulation',
            14: 'fertile', 15: 'fertile', 16: 'fertile', 18: 'fertile', 19: 'fertile'
        }
    }
];

export default function CalendarScreen() {
    const router = useRouter();
    const { colors, isDark } = useAppColors();
    const background = isDark ? colors.background : '#F9FAFB';
    const surface = isDark ? colors.surface : '#FFF';
    const primaryText = isDark ? colors.text : '#1F2937';
    const mutedText = isDark ? colors.textMuted : '#4B5563';
    const dividerColor = isDark ? colors.border : '#E5E7EB';
    const [viewMode, setViewMode] = useState<'month' | 'year'>('month');

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: primaryText }]}>Cycle Calendar</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <IconSymbol name="xmark" size={24} color={primaryText} />
                </TouchableOpacity>
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
                <LegendItem color="#EF4444" type="solid" label="Period" labelColor={mutedText} />
                <LegendItem color="#EF4444" type="dotted" label="Predicted Period" labelColor={mutedText} />
                <LegendItem color="#3B82F6" type="solid" label="Fertile days" labelColor={mutedText} />
                <LegendItem color="#3B82F6" type="dotted" label="Ovulation day" labelColor={mutedText} />
            </View>

            {/* Toggle */}
            <View style={[styles.toggleContainer, { backgroundColor: surface }]}>
                <TouchableOpacity
                    style={[styles.toggleButton, viewMode === 'month' && styles.toggleActive]}
                    onPress={() => setViewMode('month')}
                >
                    <Text style={[styles.toggleText, { color: mutedText }, viewMode === 'month' && styles.toggleTextActive]}>Month</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleButton, viewMode === 'year' && styles.toggleActive]}
                    onPress={() => setViewMode('year')}
                >
                    <Text style={[styles.toggleText, { color: mutedText }, viewMode === 'year' && styles.toggleTextActive]}>Year</Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Calendar Content */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={[styles.calendarContainer, viewMode === 'year' && styles.yearGrid]}>
                    {CALENDAR_DATA.map((monthData, index) => (
                        <View key={`${monthData.month}-${monthData.year}`} style={[styles.monthWrapper, viewMode === 'year' && styles.monthWrapperYear]}>
                            <Text style={[styles.monthTitle, { color: primaryText }, viewMode === 'year' && styles.monthTitleYear]}>
                                {monthData.month}, {monthData.year}
                            </Text>

                            {/* Day Labels */}
                            <View style={styles.daysHeader}>
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                    <Text key={i} style={[styles.dayLabel, { color: mutedText }, viewMode === 'year' && styles.dayLabelYear]}>{day}</Text>
                                ))}
                            </View>

                            {/* Days Grid */}
                            <View style={styles.daysGrid}>
                                {Array.from({ length: monthData.startDayOffset }).map((_, i) => (
                                    <View key={`empty-${i}`} style={[styles.dayCell, viewMode === 'year' && styles.dayCellYear]} />
                                ))}

                                {Array.from({ length: monthData.daysInMonth }).map((_, i) => {
                                    const dayNum = i + 1;
                                    const status = monthData.data[dayNum];
                                    const isToday = monthData.today === dayNum;

                                    return (
                                        <View key={dayNum} style={[styles.dayCell, viewMode === 'year' && styles.dayCellYear]}>
                                            <View style={[
                                                styles.dayCircle,
                                                viewMode === 'year' && styles.dayCircleYear,
                                                status === 'period' && styles.periodCircle,
                                                status === 'predicted' && styles.predictedCircle,
                                                status === 'ovulation' && styles.ovulationCircle,
                                                // status === 'fertile' && styles.fertileCircle, // Visuals in screenshot use blue text for fertile, not circle
                                                isToday && styles.todayCircle,
                                            ]}>
                                                <Text style={[
                                                    styles.dayText,
                                                    { color: primaryText },
                                                    viewMode === 'year' && styles.dayTextYear,
                                                    status === 'period' && styles.whiteText,
                                                    status === 'predicted' && styles.redText,
                                                    status === 'ovulation' && styles.blueText,
                                                    status === 'fertile' && styles.blueText, // Blue text for fertile days
                                                    isToday && styles.purpleText,
                                                ]}>
                                                    {dayNum}
                                                </Text>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                            {viewMode === 'month' && <View style={[styles.monthDivider, { backgroundColor: dividerColor }]} />}
                        </View>
                    ))}
                </View>
            </ScrollView>

        </View>
    );
}

function LegendItem({ color, type, label, labelColor }: { color: string, type: 'solid' | 'dotted', label: string; labelColor: string }) {
    return (
        <View style={styles.legendItem}>
            <View style={[
                styles.legendDot,
                {
                    backgroundColor: type === 'solid' ? color : 'transparent',
                    borderColor: color,
                    borderWidth: type === 'dotted' ? 1 : 0,
                    borderStyle: type === 'dotted' ? 'dashed' : 'solid',
                }
            ]} />
            <Text style={[styles.legendLabel, { color: labelColor }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
    },

    // Legend
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        gap: 16,
        marginBottom: 24,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        width: '45%' // approximate for 2 cols
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    legendLabel: {
        fontSize: 12,
    },

    // Toggle
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        padding: 4,
        borderRadius: 12,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        width: 150, // limit width as per design
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleActive: {
        backgroundColor: '#E18DFF',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '500',
    },
    toggleTextActive: {
        color: '#FFF',
    },

    // Calendar
    scrollView: {
        flex: 1,
    },
    calendarContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    yearGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    monthWrapper: {
        marginBottom: 32,
        width: '100%',
    },
    monthWrapperYear: {
        width: '48%', // 2 columns
        marginBottom: 20,
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
    },
    monthTitleYear: {
        fontSize: 14,
        marginBottom: 12,
    },
    daysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dayLabel: {
        width: 40,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '500',
    },
    dayLabelYear: {
        width: 20, // smaller width for year view
        fontSize: 10,
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-between', // This can cause issues with left alignment of last row
    },
    dayCell: {
        width: '14.28%', // 100% / 7
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    dayCellYear: {
        marginBottom: 4,
    },
    dayCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCircleYear: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    dayText: {
        fontSize: 15,
        color: '#1F2937',
    },
    dayTextYear: {
        fontSize: 10,
    },

    // Status Styles
    periodCircle: {
        backgroundColor: '#EF4444',
    },
    predictedCircle: {
        borderWidth: 1,
        borderColor: '#EF4444',
        borderStyle: 'dashed',
    },
    fertileCircle: {
        backgroundColor: '#3B82F6',
    },
    ovulationCircle: {
        borderWidth: 1,
        borderColor: '#3B82F6',
        borderStyle: 'dashed',
    },
    todayCircle: {
        backgroundColor: '#F3E5F5',
    },

    // Text Colors
    whiteText: {
        color: '#FFF',
    },
    redText: {
        color: '#EF4444',
    },
    blueText: {
        color: '#3B82F6',
    },
    purpleText: {
        color: '#E18DFF',
        fontWeight: '700',
    },

    monthDivider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginTop: 24,
    }
});
