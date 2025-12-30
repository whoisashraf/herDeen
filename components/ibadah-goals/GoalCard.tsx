import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Goal } from './types';

export default function GoalCard({ goal, onUpdate, onDelete }: { goal: Goal; onUpdate: (id: string, data: Partial<Goal>) => void; onDelete: (id: string) => void }) {
    return (
        <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
                <View style={styles.goalTitleRow}>
                    <View style={styles.goalIcon}>
                        <IconSymbol
                            name={
                                goal.title.includes('Salah') ? 'figure.stand' :
                                    goal.title.includes('Tilawah') ? 'book' :
                                        goal.title.includes('Sadaqah') ? 'heart' :
                                            goal.title.includes('Dua') ? 'hands.sparkles' : 'moon.stars'
                            }
                            size={20}
                            color="#4A0C63"
                        />
                    </View>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => onDelete(goal.id)}
                    style={styles.deleteButton}
                >
                    <IconSymbol name="trash" size={12} color="white" />
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.goalDescription}>{goal.description}</Text>

            {goal.type === 'checkboxes' ? (
                <View style={styles.prayerRow}>
                    {['Fajr', 'Zuhr', 'Asr', 'Magr', 'Ishai'].map((name, idx) => {
                        const i = idx + 1;
                        const active = (goal.value || 0) >= i;
                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() => onUpdate(goal.id, { value: i })}
                                style={styles.prayerItem}
                            >
                                <View style={[styles.prayerDot, active ? styles.prayerDotActive : styles.prayerDotInactive]}>
                                    {active ? <IconSymbol name="checkmark" size={12} color="white" /> : null}
                                </View>
                                <Text style={[styles.prayerLabel, active ? styles.prayerLabelActive : styles.prayerLabelInactive]}>{name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            ) : (
                <View style={styles.yesNoRow}>
                    <TouchableOpacity
                        onPress={() => onUpdate(goal.id, { completed: true })}
                        style={[
                            styles.yesNoButton,
                            goal.completed ? styles.yesNoButtonActive : styles.yesNoButtonInactive
                        ]}
                    >
                        <Text style={[
                            styles.yesNoButtonText,
                            goal.completed ? styles.yesNoButtonTextActive : styles.yesNoButtonTextInactive
                        ]}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onUpdate(goal.id, { completed: false })}
                        style={[
                            styles.yesNoButton,
                            !goal.completed ? styles.yesNoButtonActive : styles.yesNoButtonInactive
                        ]}
                    >
                        <Text style={[
                            styles.yesNoButtonText,
                            !goal.completed ? styles.yesNoButtonTextActive : styles.yesNoButtonTextInactive
                        ]}>No</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    goalCard: { backgroundColor: 'white', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, borderWidth: 1, borderColor: '#F3F4F6' },
    goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    goalTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    goalIcon: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
    goalTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    deleteButton: { backgroundColor: '#EF4444', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 4 },
    deleteButtonText: { color: 'white', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
    goalDescription: { color: '#6B7280', fontSize: 14, lineHeight: 20, marginBottom: 20 },
    // Prayer/checklist row (inactive vs active – matches design)
    prayerRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
    prayerItem: { alignItems: 'center' },
    prayerDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
    prayerDotActive: { backgroundColor: '#4A0C63' },
    prayerDotInactive: { backgroundColor: '#F3E8F6' },
    prayerLabel: { fontSize: 11, marginTop: 4 },
    prayerLabelActive: { color: '#4A0C63', fontWeight: '600' },
    prayerLabelInactive: { color: '#9CA3AF' },
    yesNoRow: { flexDirection: 'row', gap: 12 },
    yesNoButton: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    yesNoButtonInactive: { backgroundColor: '#F3E8FF' },
    yesNoButtonActive: { backgroundColor: '#4A0C63' },
    yesNoButtonText: { fontWeight: '600' },
    yesNoButtonTextInactive: { color: '#4A0C63' },
    yesNoButtonTextActive: { color: 'white' }
});