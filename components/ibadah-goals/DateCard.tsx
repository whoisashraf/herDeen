import goalsIcon from '../../assets/icons/goals.png';
import { useAppColors } from '@/hooks/use-app-colors';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DAYS } from './types';

export default function DateCard() {
    const { colors, isDark } = useAppColors();

    return (
        <View style={styles.dateSelectorSection}>
            <View style={[styles.dateCard, { backgroundColor: isDark ? colors.surface : 'white', borderColor: isDark ? colors.border : '#F3E8F6' }]}>
                <View style={styles.dateSelectorHeader}>
                    <View style={styles.flex1}>
                        <Text style={[styles.titleText, { color: colors.text }]}>My Ibadah Goals</Text>
                        <Text style={[styles.subtitleText, { color: colors.textMuted }]}>
                            Set your spiritual intentions. Track your consistency. Grow closer to Allah - One goal at a time.
                        </Text>
                    </View>
                    <View style={styles.targetIconContainer}>
                        <View style={styles.targetIcon}>
                            <Image source={goalsIcon} style={styles.targetImage} />
                        </View>
                    </View>
                </View>

                <View style={[styles.separator, { backgroundColor: isDark ? colors.border : '#F3E8F6' }]} />

                <View style={styles.calendarStrip}>
                    {DAYS.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dayButton, item.active ? styles.dayButtonActive : styles.dayButtonInactive]}
                        >
                            <Text style={[styles.dayText, !item.active && { color: colors.textMuted }, item.active ? styles.dayTextActive : styles.dayTextInactive]}>{item.day}</Text>
                            <Text style={[styles.dowText, !item.active && { color: colors.textFaint }, item.active ? styles.dowTextActive : styles.dowTextInactive]}>{item.dow}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dateSelectorSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    dateCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F3E8F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    dateSelectorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    flex1: { flex: 1, paddingRight: 12 },
    titleText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    subtitleText: {
        fontSize: 11,
        lineHeight: 16,
    },
    targetIconContainer: { alignItems: 'center', justifyContent: 'center' },
    targetIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetImage: {
        width: 48,
        height: 48,
    },
    separator: { height: 1, backgroundColor: '#F3E8F6', marginVertical: 12 },
    calendarStrip: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
    dayButton: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, paddingVertical: 8, borderRadius: 8, minWidth: 40, minHeight: 48 },
    dayButtonActive: { backgroundColor: '#E18DFF', borderRadius: 8 },
    dayButtonInactive: { backgroundColor: 'transparent' },
    dayText: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
    dayTextActive: { color: 'white', fontSize: 16, fontWeight: '600' },
    dayTextInactive: { color: '#374151' },
    dowText: { fontSize: 10, fontWeight: '500' },
    dowTextActive: { color: 'white', fontSize: 10 },
    dowTextInactive: { color: '#9CA3AF' },
});
