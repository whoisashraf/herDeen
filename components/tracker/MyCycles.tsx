import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function MyCycles() {
    const { colors, isDark } = useAppColors();

    return (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>My Cycles</Text>
            <View style={[styles.statsCard, { backgroundColor: isDark ? colors.surface : '#FFF' }]}>
                <StatsRow
                    label="Previous cycle length"
                    value="31 days"
                    status="Normal"
                    statusType="good"
                    textColor={colors.text}
                    mutedColor={colors.textMuted}
                />
                <View style={[styles.divider, { backgroundColor: isDark ? colors.border : '#F3F4F6' }]} />
                <StatsRow
                    label="Previous period length"
                    value="5 days"
                    status="Regular"
                    statusType="good"
                    textColor={colors.text}
                    mutedColor={colors.textMuted}
                />
                <View style={[styles.divider, { backgroundColor: isDark ? colors.border : '#F3F4F6' }]} />
                <StatsRow
                    label="Cycle length variation"
                    value="40-50 days"
                    status="Irregular"
                    statusType="bad"
                    textColor={colors.text}
                    mutedColor={colors.textMuted}
                />
            </View>
        </View>
    );
}

function StatsRow({ label, value, status, statusType, textColor, mutedColor }: { label: string; value: string; status: string; statusType: 'good' | 'bad'; textColor: string; mutedColor: string }) {
    return (
        <View style={styles.statsRow}>
            <View>
                <Text style={[styles.statsLabel, { color: mutedColor }]}>{label}</Text>
                <Text style={[styles.statsValue, { color: textColor }]}>{value}</Text>
            </View>
            <View style={styles.statusContainer}>
                <IconSymbol
                    name={statusType === 'good' ? 'checkmark.circle.fill' : 'exclamationmark.circle.fill'}
                    size={24}
                    color={statusType === 'good' ? '#22C55E' : '#EF4444'}
                />
                <Text style={[styles.statusText, { color: mutedColor }]}>{status}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // Section
    sectionContainer: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },

    // Stats Card
    statsCard: {
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
    },
    statsLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    statsValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    statusContainer: {
        alignItems: 'center',
        gap: 4,
    },
    statusText: {
        fontSize: 10,
    },
});
