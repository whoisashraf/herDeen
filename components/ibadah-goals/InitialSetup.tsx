import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import OverviewCard from './OverviewCard';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Goal {
    id: string;
    title: string;
    description: string;
    type: 'checkboxes' | 'yesno';
    selected: boolean | null; // null = not selected, true = yes, false = no
    value?: number; // for checkboxes type
}

const INITIAL_GOALS: Goal[] = [
    { id: '1', title: 'Salah', description: 'Complete daily solat to earn reward from Allah', type: 'checkboxes', selected: null, value: 0 },
    { id: '2', title: 'Tilawah', description: 'To recite 3 pages daily from the Qur\'an and memorize Suratul-Mulk', type: 'yesno', selected: null },
    { id: '3', title: 'Sadaqah', description: 'Do a random act of kindness or give out sadaqah', type: 'yesno', selected: null },
    { id: '4', title: "Dua'a & Dhikr", description: 'To make morning and evening adhkar daily, and set daily intentional Dua\'a', type: 'yesno', selected: null },
    { id: '5', title: 'Modest Practice', description: 'Have you recite your daily Qur\'an yet? Earn when you complete your daily tilawah', type: 'yesno', selected: null },
];

export default function InitialSetup({ onSaveGoals }: { onSaveGoals: () => void }) {
    const { colors, isDark } = useAppColors();
    const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

    const handleGoalSelection = (goalId: string, selected: boolean) => {
        setGoals(prev => prev.map(goal => 
            goal.id === goalId ? { ...goal, selected } : goal
        ));
    };

    const handleDeleteGoal = (goalId: string) => {
        setGoals(prev => prev.filter(goal => goal.id !== goalId));
    };

    const hasSelectedGoals = goals.some(goal => goal.selected === true || (goal.value && goal.value > 0));

    return (
        <>
            <OverviewCard />

            <View style={styles.tabsContainer}>
                <View style={[styles.tabsWrapper, { backgroundColor: isDark ? colors.surface : 'white' }]}>
                    <TouchableOpacity style={[styles.tab, styles.tabActive]}>
                        <Text style={[styles.tabText, styles.tabTextActive]}>Daily Plan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, styles.tabInactive]}>
                        <Text style={[styles.tabText, styles.tabTextWeekly]}>Weekly Goals</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.goalsContainer}>
                {goals.map((goal) => (
                    <View key={goal.id} style={[styles.goalCard, { backgroundColor: isDark ? colors.surface : 'white', borderColor: isDark ? colors.border : '#F3F4F6' }]}>
                        <View style={styles.goalHeader}>
                            <View style={styles.goalTitleRow}>
                                <View style={styles.goalIcon}>
                                    <IconSymbol name="person" size={20} color={colors.textMuted} />
                                </View>
                                <Text style={[styles.goalTitle, { color: colors.text }]}>{goal.title}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.deleteButton}
                                onPress={() => handleDeleteGoal(goal.id)}
                            >
                                <IconSymbol name="trash" size={12} color="white" />
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.goalDescription, { color: colors.textMuted }]}>{goal.description}</Text>
                        {goal.type === 'checkboxes' ? (
                            <View style={styles.checkboxRow}>
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.checkbox,
                                            (goal.value || 0) >= index ? styles.checkboxActive : styles.checkboxInactive
                                        ]}
                                        onPress={() => {
                                            const newValue = (goal.value || 0) >= index ? index - 1 : index;
                                            setGoals(prev => prev.map(g => 
                                                g.id === goal.id ? { ...g, value: newValue, selected: newValue > 0 } : g
                                            ));
                                        }}
                                    />
                                ))}
                            </View>
                        ) : (
                            <View style={styles.yesNoRow}>
                                <TouchableOpacity
                                    style={styles.yesButton}
                                    onPress={() => handleGoalSelection(goal.id, true)}
                                >
                                    <Text style={styles.yesNoButtonText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.noButton}
                                    onPress={() => handleGoalSelection(goal.id, false)}
                                >
                                    <Text style={styles.yesNoButtonText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
            </View>

            <View style={styles.bottomActions}>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: isDark ? colors.surface : 'white', borderColor: isDark ? colors.border : '#E5E7EB' }]}>
                    <Text style={[styles.addButtonText, { color: colors.text }]}>Add more Goals</Text>
                    <IconSymbol name="plus" size={18} color={colors.icon} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.saveButton, !hasSelectedGoals && styles.saveButtonDisabled]}
                    onPress={hasSelectedGoals ? onSaveGoals : undefined}
                    disabled={!hasSelectedGoals}
                >
                    <Text style={styles.saveButtonText}>Save My Goals</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    overviewContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    overviewCard: {
        backgroundColor: '#E18DFF',
        borderRadius: 16,
        padding: 20,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 120,
        justifyContent: 'center',
    },
    overviewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    overviewLeft: {
        flex: 1,
        paddingRight: 16,
    },
    overviewTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    overviewSubtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 16,
    },
    progressBadge: {
        backgroundColor: 'white',
        borderRadius: 8,
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    progressBadgeText: {
        color: '#E18DFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    progressCircleContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    progressPercentage: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    tabsContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    tabsWrapper: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: '#E18DFF',
    },
    tabInactive: {
        backgroundColor: 'transparent',
    },
    tabText: {
        fontWeight: '600',
    },
    tabTextActive: {
        color: 'white',
    },
    tabTextWeekly: {
        color: '#E18DFF',
    },
    goalsContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
        gap: 16,
    },
    goalCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    goalTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    goalIcon: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    deleteButton: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    goalDescription: {
        color: '#6B7280',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        gap: 12,
    },
    checkbox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
    },
    checkboxActive: {
        backgroundColor: '#E9D5FF',
        borderColor: '#E9D5FF',
    },
    checkboxInactive: {
        backgroundColor: '#EBDFED',
        borderColor: '#E5E7EB',
    },
    yesNoRow: {
        flexDirection: 'row',
        gap: 12,
    },
    yesButton: {
        paddingHorizontal: 32,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFF6001F',
    },
    noButton: {
        paddingHorizontal: 32,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#1E00FF1F',
    },
    yesNoButtonText: {
        fontWeight: '600',
        color: '#2B0E30',
    },
    bottomActions: {
        paddingHorizontal: 20,
        paddingBottom: 32,
        gap: 16,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        gap: 8,
    },
    addButtonText: {
        color: '#1F2937',
        fontWeight: 'bold',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        backgroundColor: '#E18DFF',
        borderRadius: 12,
    },
    saveButtonDisabled: {
        backgroundColor: '#9CA3AF',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
