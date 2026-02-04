import SelectOptionCard from '@/components/onboarding/SelectOptionCard';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingStep2Screen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'dark';
    const colors = Colors[colorScheme];
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options = [
        'Prayer consistency',
        'Qur\'an memorization & revision',
        'Journaling & reflection',
        'Daily planning',
        'Menstrual tracking',
    ];

    const toggleOption = (option: string) => {
        setSelectedOptions(prev =>
            prev.includes(option)
                ? prev.filter(o => o !== option)
                : [...prev, option]
        );
    };

    const handleContinue = () => {
        if (selectedOptions.length === 0) return;
        router.push('/(onboarding)/onboarding-step3');
    };

    const handleSkip = () => {
        router.push('/(drawer)');
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#111111' }]}>
            <StatusBar style="light" />
            <View style={styles.content}>

                {/* Top bar with back button and step indicators */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.progressIndicators}>
                        <View style={styles.progressCircle}>
                            <Text style={styles.progressText}>1</Text>
                        </View>
                        <View style={[styles.progressCircle, styles.progressActive]}>
                            <Text style={styles.progressTextActive}>2</Text>
                        </View>
                        <View style={styles.progressCircle}>
                            <Text style={styles.progressText}>3</Text>
                        </View>
                    </View>
                </View>

                {/* Title + subtitle */}
                <View style={styles.textSection}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">What Do You Want to Grow?</Text>
                    <Text style={styles.subtitle}>Choose what you'd like support with — you're in control.</Text>
                </View>

                {/* Options - Multi-select */}
                <View style={styles.optionsContainer}>
                    {options.map((option) => (
                        <SelectOptionCard
                            key={option}
                            label={option}
                            isSelected={selectedOptions.includes(option)}
                            onPress={() => toggleOption(option)}
                        />
                    ))}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.continueButton, selectedOptions.length === 0 && styles.continueButtonDisabled]}
                        onPress={handleContinue}
                        activeOpacity={0.85}
                        disabled={selectedOptions.length === 0}
                    >
                        <ThemedText type="poppins-semibold" style={styles.continueButtonText}>Continue</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={{ marginTop: 16 }}>
                        <ThemedText type="poppins-regular" style={styles.skipButtonText}>Skip this</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    progressIndicators: {
        flexDirection: 'row',
        gap: -10, // Overlap indicators
    },
    progressCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333336',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
    },
    progressActive: {
        backgroundColor: '#AA74E01A', // Semi-transparent purple for active
        borderWidth: 0, // No border for active
    },
    progressText: {
        color: '#9CA3AF',
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
    },
    progressTextActive: {
        color: '#AA74E0', // Purple text on semi-transparent background
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    textSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 4,
        fontFamily: 'Amiri_700Bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFFB2',
        fontFamily: 'Poppins_400Regular',
    },
    optionsContainer: {
        flex: 1,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 32,
        width: '100%'
    },
    continueButton: {
        backgroundColor: '#AA74E0',
        borderRadius: 100,
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
    },
    continueButtonDisabled: {
        opacity: 0.5,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    skipButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        opacity: 0.8,
    },
});
