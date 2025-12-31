import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function ActionGrid() {
    return (
        <View style={styles.actionGrid}>
            <ActionCard title={'Log\nyour\nsymptoms'} icon="plus" />
            <ActionCard title={'What to Do\nDuring Period?'} icon="chevron.right" isHighlighted />
            <ActionCard title={'Log\nGhusl'} icon="plus" />
        </View>
    );
}

function ActionCard({ title, icon, isHighlighted }: { title: string; icon: any; isHighlighted?: boolean }) {
    return (
        <TouchableOpacity style={[
            styles.actionCard,
            isHighlighted && styles.actionCardHighlighted
        ]}>
            <Text style={styles.actionCardTitle}>{title}</Text>
            <View style={styles.actionIconContainer}>
                <IconSymbol name={icon} size={20} color="#FFF" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // Action Grid
    actionGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    actionCard: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 4, 
        height: 124,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E9D5FF', 
    },
    actionCardHighlighted: {
        backgroundColor: '#F3E5F5', 
        borderColor: '#F3E5F5',
    },
    actionCardTitle: {
        fontSize: 10, 
        fontWeight: '600',
        color: '#2D0043',
        textAlign: 'center',
        lineHeight: 14, 
    },
    actionIconContainer: {
        width: 32, 
        height: 32,
        borderRadius: 8,
        backgroundColor: '#62206E',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
