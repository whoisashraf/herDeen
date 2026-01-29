import { IconSymbol } from '@/components/ui/icon-symbol';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const PURPLE = '#5C1E68';
const TEXT_GRAY = '#1A1A1A';
const BG_COLOR = '#F9F9F9';

interface ThemeOptionProps {
    id: string;
    label: string;
    icon: string | React.ReactNode;
    isSelected: boolean;
    onSelect: () => void;
    showBorder?: boolean;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
    label,
    icon,
    isSelected,
    onSelect,
    showBorder = true,
}) => (
    <TouchableOpacity
        style={[styles.optionContainer, showBorder && styles.optionBorder]}
        onPress={onSelect}
        activeOpacity={0.7}
    >
        <View style={styles.optionLeft}>
            <View style={styles.iconContainer}>
                {typeof icon === 'string' ? (
                    <IconSymbol name={icon as any} size={24} color={isSelected ? PURPLE : '#8E8E93'} />
                ) : (
                    icon
                )}
            </View>
            <Text style={[styles.optionLabel, isSelected && styles.selectedLabel]}>{label}</Text>
        </View>
        {isSelected && (
            <IconSymbol name="checkmark" size={20} color={PURPLE} />
        )}
    </TouchableOpacity>
);

export default function ThemeScreen() {
    const router = useRouter();
    const [selectedTheme, setSelectedTheme] = useState('system');

    const themes = [
        { id: 'system', label: 'System', icon: 'hexagon' },
        { id: 'dark', label: 'Dark', icon: 'moon' },
        {
            id: 'light',
            label: 'Light',
            icon: <Entypo name="light-up" size={24} color={selectedTheme === 'light' ? PURPLE : '#8E8E93'} />
        },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={TEXT_GRAY} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Theme</Text>
                </View>
            </SafeAreaView>

            <View style={styles.content}>
                <View style={styles.optionsCard}>
                    {themes.map((theme, index) => (
                        <ThemeOption
                            key={theme.id}
                            id={theme.id}
                            label={theme.label}
                            icon={theme.icon}
                            isSelected={selectedTheme === theme.id}
                            onSelect={() => setSelectedTheme(theme.id)}
                            showBorder={index < themes.length - 1}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    safeArea: {
        backgroundColor: BG_COLOR,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: TEXT_GRAY,
        marginLeft: 12,
    },
    content: {
        padding: 16,
    },
    optionsCard: {
        borderRadius: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    optionBorder: {
        borderBottomWidth: 4,
        borderBottomColor: '#F2F2F7',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 32,
        alignItems: 'center',
    },
    optionLabel: {
        fontSize: 17,
        color: TEXT_GRAY,
        marginLeft: 12,
        fontWeight: '500',
    },
    selectedLabel: {
        color: PURPLE,
        fontWeight: '600',
    },
});
