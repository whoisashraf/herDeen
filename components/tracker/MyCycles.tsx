import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function MyCycles() {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>My Cycles</Text>
            <View style={styles.statsCard}>
                <StatsRow
                    label="Previous cycle length"
                    value="31 days"
                    status="Normal"
                    statusType="good"
                />
                <View style={styles.divider} />
                <StatsRow
                    label="Previous period length"
                    value="5 days"
                    status="Regular"
                    statusType="good"
                />
                <View style={styles.divider} />
                <StatsRow
                    label="Cycle length variation"
                    value="40-50 days"
                    status="Irregular"
                    statusType="bad"
                />
            </View>
        </View>
    );
}

function StatsRow({ label, value, status, statusType }: { label: string; value: string; status: string; statusType: 'good' | 'bad' }) {
    return (
        <View style={styles.statsRow}>
            <View>
                <Text style={styles.statsLabel}>{label}</Text>
                <Text style={styles.statsValue}>{value}</Text>
            </View>
            <View style={styles.statusContainer}>
                <IconSymbol
                    name={statusType === 'good' ? 'checkmark.circle.fill' : 'exclamationmark.circle.fill'}
                    size={24}
                    color={statusType === 'good' ? '#22C55E' : '#EF4444'}
                />
                <Text style={styles.statusText}>{status}</Text>
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
        color: '#374151',
        marginBottom: 12,
    },

    // Stats Card
    statsCard: {
        backgroundColor: '#FFF',
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
        color: '#6B7280',
        marginBottom: 4,
    },
    statsValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    statusContainer: {
        alignItems: 'center',
        gap: 4,
    },
    statusText: {
        fontSize: 10,
        color: '#4B5563',
    },
});
