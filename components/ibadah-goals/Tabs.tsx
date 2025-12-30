import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Tabs({ activeTab, setActiveTab }: { activeTab: 'daily' | 'weekly'; setActiveTab: (t: 'daily' | 'weekly') => void }) {
    return (
        <View style={styles.tabsContainer}>
            <View style={styles.tabsWrapper}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'daily' ? styles.tabActive : styles.tabInactive]}
                    onPress={() => setActiveTab('daily')}
                >
                    <Text style={[styles.tabText, activeTab === 'daily' ? styles.tabTextActive : styles.tabTextInactive]}>Daily Plan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'weekly' ? styles.tabActive : styles.tabInactive]}
                    onPress={() => setActiveTab('weekly')}
                >
                    <Text style={[styles.tabText, activeTab === 'weekly' ? styles.tabTextActive : styles.tabTextWeekly]}>Weekly Goals</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabsContainer: { paddingHorizontal: 20, marginBottom: 24 },
    tabsWrapper: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, padding: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    tab: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
    tabActive: { backgroundColor: '#4A0C63' },
    tabInactive: { backgroundColor: 'transparent' },
    tabText: { fontWeight: '600' },
    tabTextActive: { color: 'white' },
    tabTextInactive: { color: '#6B7280' },
    tabTextWeekly: { color: '#581C87' },
});