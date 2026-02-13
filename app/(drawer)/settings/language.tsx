import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemePalette, useAppColors } from '@/hooks/use-app-colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const PURPLE = '#E18DFF';
interface LanguageOptionProps {
    id: string;
    label: string;
    flag: string;
    isSelected: boolean;
    onSelect: () => void;
    showBorder?: boolean;
    colors: ThemePalette;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({
    label,
    flag,
    isSelected,
    onSelect,
    showBorder = true,
    colors,
}) => (
    <TouchableOpacity
        style={[styles.optionContainer, showBorder && styles.optionBorder, showBorder && { borderBottomColor: colors.border }]}
        onPress={onSelect}
        activeOpacity={0.7}
    >
        <View style={styles.optionLeft}>
            <Text style={styles.flagText}>{flag}</Text>
            <Text style={[styles.optionLabel, { color: colors.text }, isSelected && styles.selectedLabel]}>{label}</Text>
        </View>
        {isSelected && (
            <IconSymbol name="checkmark" size={20} color={PURPLE} />
        )}
    </TouchableOpacity>
);

export default function LanguagePreferenceScreen() {
    const router = useRouter();
    const { colors, isDark } = useAppColors();
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const languages = [
        { id: 'en', label: 'English', flag: '🇬🇧' },
        { id: 'ar', label: 'Arabic', flag: '🇸🇦' },
        { id: 'fr', label: 'French', flag: '🇫🇷' },
        { id: 'yo', label: 'Yoruba', flag: '🇳🇬' },
        { id: 'ha', label: 'Hausa', flag: '🇳🇬' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Language Preference</Text>
                </View>
            </SafeAreaView>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={[styles.optionsCard, { backgroundColor: colors.surface }]}>
                    {languages.map((lang, index) => (
                        <LanguageOption
                            key={lang.id}
                            id={lang.id}
                            label={lang.label}
                            flag={lang.flag}
                            isSelected={selectedLanguage === lang.id}
                            onSelect={() => setSelectedLanguage(lang.id)}
                            showBorder={index < languages.length - 1}
                            colors={colors}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#13181C',
    },
    safeArea: {
        backgroundColor: '#13181C',
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
        color: '#FFFFFF',
        marginLeft: 12,
    },
    content: {
        flex: 1,
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
        paddingVertical: 18,
    },
    optionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#5B6268',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagText: {
        fontSize: 24,
        marginRight: 16,
    },
    optionLabel: {
        fontSize: 17,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    selectedLabel: {
        color: PURPLE,
        fontWeight: '500',
    },
});
