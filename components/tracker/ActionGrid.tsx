import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemePalette, useAppColors } from '@/hooks/use-app-colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function ActionGrid() {
    const { colors, isDark } = useAppColors();

    return (
        <View style={styles.actionGrid}>
            <ActionCard title={'Log\nyour\nsymptoms'} icon="plus" colors={colors} isDark={isDark} />
            <ActionCard title={'What to Do\nDuring Period?'} icon="chevron.right" isHighlighted colors={colors} isDark={isDark} />
            <ActionCard title={'Log\nGhusl'} icon="plus" colors={colors} isDark={isDark} />
        </View>
    );
}

function ActionCard({
    title,
    icon,
    isHighlighted,
    colors,
    isDark,
}: {
    title: string;
    icon: any;
    isHighlighted?: boolean;
    colors: ThemePalette;
    isDark: boolean;
}) {
    return (
        <TouchableOpacity style={[
            styles.actionCard,
            {
                backgroundColor: isDark ? colors.surface : '#FFF',
                borderColor: isDark ? colors.border : '#E9D5FF',
            },
            isHighlighted && [styles.actionCardHighlighted, { backgroundColor: isDark ? colors.surfaceSoft : '#F3E5F5', borderColor: isDark ? colors.border : '#F3E5F5' }]
        ]}>
            <Text style={[styles.actionCardTitle, { color: isDark ? colors.text : '#2D0043' }]}>{title}</Text>
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
        textAlign: 'center',
        lineHeight: 14, 
    },
    actionIconContainer: {
        width: 32, 
        height: 32,
        borderRadius: 8,
        backgroundColor: '#E18DFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
