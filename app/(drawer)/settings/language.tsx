import { IconSymbol } from '@/components/ui/icon-symbol';
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

const PURPLE = '#5C1E68';
const TEXT_GRAY = '#1A1A1A';
const BG_COLOR = '#F9F9F9';

interface LanguageOptionProps {
    id: string;
    label: string;
    flag: string;
    isSelected: boolean;
    onSelect: () => void;
    showBorder?: boolean;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({
    label,
    flag,
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
            <Text style={styles.flagText}>{flag}</Text>
            <Text style={[styles.optionLabel, isSelected && styles.selectedLabel]}>{label}</Text>
        </View>
        {isSelected && (
            <IconSymbol name="checkmark" size={20} color={PURPLE} />
        )}
    </TouchableOpacity>
);

export default function LanguagePreferenceScreen() {
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const languages = [
        { id: 'en', label: 'English', flag: '🇬🇧' },
        { id: 'ar', label: 'Arabic', flag: '🇸🇦' },
        { id: 'fr', label: 'French', flag: '🇫🇷' },
        { id: 'yo', label: 'Yoruba', flag: '🇳🇬' },
        { id: 'ha', label: 'Hausa', flag: '🇳🇬' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={TEXT_GRAY} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Language Preference</Text>
                </View>
            </SafeAreaView>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.optionsCard}>
                    {languages.map((lang, index) => (
                        <LanguageOption
                            key={lang.id}
                            id={lang.id}
                            label={lang.label}
                            flag={lang.flag}
                            isSelected={selectedLanguage === lang.id}
                            onSelect={() => setSelectedLanguage(lang.id)}
                            showBorder={index < languages.length - 1}
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
        borderBottomColor: '#F2F2F7',
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
        color: TEXT_GRAY,
        fontWeight: '500',
    },
    selectedLabel: {
        color: PURPLE,
        fontWeight: '500',
    },
});
