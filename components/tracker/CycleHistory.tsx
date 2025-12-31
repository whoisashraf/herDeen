import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function CycleHistory() {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Cycle History</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.historyCard}>
                <HistoryItem
                    dateRange="Apr 25 - May 28"
                    periodLength="4days"
                    cycleLength="24 days"
                />
                <View style={styles.divider} />
                <HistoryItem
                    dateRange="Apr 25 - May 28"
                    periodLength="4days"
                    cycleLength="24 days"
                    isComplete
                />
                <View style={styles.divider} />
                <HistoryItem
                    dateRange="Apr 25 - May 28"
                    periodLength="4days"
                    cycleLength="24 days"
                    isComplete
                />
            </View>
        </View>
    );
}

function HistoryItem({ dateRange, periodLength, cycleLength, isComplete }: { dateRange: string, periodLength: string, cycleLength: string, isComplete?: boolean }) {
    return (
        <View style={styles.historyItem}>
            <View>
                <Text style={styles.historyDate}>{dateRange}</Text>
                <View style={styles.historyStatsRow}>
                    <View style={styles.historyStatTag}>
                        <IconSymbol name="drop.fill" size={12} color="#EF4444" />
                        <Text style={styles.historyStatText}>{periodLength}</Text>
                    </View>
                    <View style={styles.historyStatTag}>
                        <IconSymbol name="arrow.triangle.2.circlepath" size={14} color="#3B82F6" />
                        <Text style={styles.historyStatText}>{cycleLength}</Text>
                    </View>
                </View>
            </View>
            {isComplete && (
                <IconSymbol name="checkmark" size={18} color="#5E2C7E" />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    // Section
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    seeAllText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#5E2C7E',
    },

    // History Card
    historyCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
    },
    historyDate: {
        fontSize: 12,
        color: '#374151',
        marginBottom: 6,
        fontWeight: '400',
    },
    historyStatsRow: {
        flexDirection: 'row',
        gap: 16,
    },
    historyStatTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    historyStatText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
    },
});
