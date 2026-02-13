import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CALENDAR_DAYS = [
    { day: 'S', date: 13, status: 'past' },
    { day: 'M', date: 14, status: 'past' },
    { day: 'T', date: 15, status: 'today' },
    { day: 'T', date: 16, status: 'future' },
    { day: 'F', date: 17, status: 'future' },
    { day: 'S', date: 18, status: 'future' },
];

export function CycleStatusCard() {
    const router = useRouter();
    const { colors, isDark } = useAppColors();
    const cardBackground = isDark ? colors.surface : '#FFF';
    const mutedText = isDark ? colors.textMuted : '#4B5563';
    const primaryText = isDark ? colors.text : '#1F2937';
    const futureDateColor = isDark ? colors.text : '#374151';
    const bannerGradient = isDark ? ['#2B1F31', '#2E2437'] : ['#F3E5F5', '#EDE7F6'];

    return (
        <TouchableOpacity style={[styles.mainCard, { backgroundColor: cardBackground, borderColor: isDark ? colors.border : 'transparent' }]} onPress={() => router.push('/(drawer)/tracker/calendar')}>
            <View style={styles.calendarSection}>
                <View style={styles.calendarHeader}>
                    <View style={styles.dateRow}>
                        <IconSymbol name="calendar" size={20} color="#E18DFF" />
                        <Text style={styles.dateText}>July 15</Text>
                    </View>
                    <Text style={[styles.cycleStatusText, { color: mutedText }]}>You are out of your cycle</Text>
                </View>

                {/* Days Strip */}
                <View style={styles.weekStrip}>
                    <View style={styles.dayColumn}>
                        <Text style={[styles.dayText, { color: mutedText }]}>S</Text>
                        <View style={[styles.dateCircle, styles.selectedCircle]}>
                            <Text style={[styles.dateNumber, styles.selectedDateText]}>13</Text>
                        </View>
                    </View>
                    <View style={styles.dayColumn}>
                        <Text style={[styles.dayText, { color: mutedText }]}>M</Text>
                        <View style={styles.dateCircle}>
                            <Text style={[styles.dateNumber, styles.futureDateText, { color: futureDateColor }]}>14</Text>
                        </View>
                    </View>
                    <View style={styles.dayColumn}>
                        <Text style={[styles.dayText, { color: mutedText }]}>T</Text>
                        <View style={styles.dateCircle}>
                            <Text style={[styles.dateNumber, styles.futureDateText, { color: futureDateColor }]}>15</Text>
                        </View>
                    </View>
                    <View style={styles.dayColumn}>
                        <Text style={[styles.dayText, { color: mutedText }]}>Today</Text>
                        <View style={[styles.dateCircle, styles.todayCircle]}>
                            <Text style={[styles.dateNumber, styles.todayDateText]}>16</Text>
                        </View>
                    </View>
                    <View style={styles.dayColumn}>
                        <Text style={[styles.dayText, { color: mutedText }]}>T</Text>
                        <View style={styles.dateCircle}>
                            <Text style={[styles.dateNumber, styles.futureDateText, { color: futureDateColor }]}>17</Text>
                        </View>
                    </View>
                    <View style={styles.dayColumn}>
                        <Text style={[styles.dayText, { color: mutedText }]}>F</Text>
                        <View style={styles.dateCircle}>
                            <Text style={[styles.dateNumber, styles.futureDateText, { color: futureDateColor }]}>18</Text>
                        </View>
                    </View>
                    <View style={styles.dayColumn}>
                        <Text style={[styles.dayText, { color: mutedText }]}>S</Text>
                        <View style={styles.dateCircle}>
                            <Text style={[styles.dateNumber, styles.futureDateText, { color: futureDateColor }]}>19</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Expect Period Banner */}
            <LinearGradient
                colors={bannerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.periodBanner}
            >
                <View style={styles.bannerContent}>
                    <View style={styles.bannerLeft}>
                        <Image
                            source={require('@/assets/images/blood_drop_icon.png')}
                            style={styles.dropIcon}
                            contentFit="contain"
                        />
                        <View style={styles.predictionTextContainer}>
                            <Text style={[styles.expectLabel, { color: mutedText }]}>Expect period in</Text>
                            <Text style={[styles.daysCount, { color: primaryText }]}>14 days</Text>
                        </View>
                    </View>

                    <View style={styles.bannerRight}>
                        <Text style={[styles.predictionDate, { color: mutedText }]}>July 30</Text>
                        <TouchableOpacity style={styles.logPeriodButton}>
                            <Text style={styles.logPeriodText}>Log period</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // Main Card
    mainCard: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        marginBottom: 24,
    },
    calendarSection: {
        padding: 20,
        paddingBottom: 24,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dateText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#E18DFF',
        fontStyle: 'italic',
    },
    cycleStatusText: {
        fontSize: 12,
        fontWeight: '500',
    },

    // Week Strip
    weekStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    dayColumn: {
        alignItems: 'center',
        gap: 10,
        width: 40,
    },
    dayText: {
        fontSize: 11,
        fontWeight: '500',
    },
    dateCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCircle: {
        borderWidth: 1.5,
        borderColor: '#3B82F6', // Blue dotted
        borderStyle: 'dashed',
    },
    todayCircle: {
        backgroundColor: '#F3E5F5', // Light purple bg
    },
    dateNumber: {
        fontSize: 13,
        fontWeight: '500',
    },
    selectedDateText: {
        color: '#3B82F6',
        fontWeight: '500',
    },
    todayDateText: {
        color: '#E18DFF',
        fontWeight: '600',
    },
    futureDateText: {
        color: '#374151',
    },

    // Banner
    periodBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    bannerContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bannerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dropIcon: {
        width: 60,
        height: 60,
    },
    predictionTextContainer: {
        gap: 2,
    },
    expectLabel: {
        fontSize: 10,
        fontWeight: '400',
    },
    daysCount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
    },
    bannerRight: {
        alignItems: 'flex-end',
        gap: 6,
    },
    predictionDate: {
        fontSize: 10,
        fontWeight: '500',
        fontStyle: 'italic',
    },
    logPeriodButton: {
        backgroundColor: '#E18DFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    logPeriodText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '500',
    },
});
