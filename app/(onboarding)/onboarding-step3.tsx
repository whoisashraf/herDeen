import StepIndicators from '@/components/auth/StepIndicators';
import OnboardingSuccessModal from '@/components/onboarding/OnboardingSuccessModal';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingStep3Screen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'dark';
    const colors = Colors[colorScheme];
    const isDark = colorScheme === 'dark';
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleJoinCommunity = () => {
        // TODO: Navigate to community signup or main app with community enabled
        router.push('/(drawer)');
    };

    const handleFinishSetup = () => {
        setShowSuccessModal(true);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        router.push('/(drawer)');
    };

    const handleRevealGift = () => {
        // TODO: Navigate to gift reveal or special feature
        setShowSuccessModal(false);
        router.push('/(drawer)');
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <View style={styles.content}>

                {/* Top bar with back button and step indicators */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <StepIndicators currentStep={3} isDark={isDark} />
                </View>

                {/* Main content */}
                <View style={styles.mainContent}>
                    {/* Title */}
                    <View style={styles.titleSection}>
                        <Text style={[styles.title, { color: colors.text }]}>Join Our</Text>
                        <View style={styles.titleRow}>
                            <Text style={[styles.title, { color: colors.text }]}>C</Text>
                            <View style={styles.iconWrapper}>
                                <Ionicons name="leaf" size={20} color="#7ED321" />
                            </View>
                            <Text style={[styles.title, { color: colors.text }]}>mmunity</Text>
                        </View>
                    </View>

                    {/* Subtitle */}
                    <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                        Join a circle of Muslimah sisters learning, planning, and growing — together.
                    </Text>

                    {/* Illustration */}
                    <View style={styles.illustrationContainer}>
                        <Image
                            source={require('@/assets/images/community_plant_illustration.png')}
                            style={styles.illustration}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Footer buttons */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.joinButton}
                        onPress={handleJoinCommunity}
                        activeOpacity={0.85}
                    >
                        <ThemedText type="poppins-semibold" style={styles.joinButtonText}>
                            Join Community
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.finishButton}
                        onPress={handleFinishSetup}
                        activeOpacity={0.85}
                    >
                        <ThemedText type="poppins-semibold" style={styles.finishButtonText}>
                            Finish Setup
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Success Modal */}
            <OnboardingSuccessModal
                visible={showSuccessModal}
                onClose={handleCloseModal}
                onRevealGift={handleRevealGift}
            />
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
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -100,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 0,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -40,
    },
    title: {
        fontSize: 48,
        color: '#FFFFFF',
        fontFamily: 'Amiri_700Bold',
        textAlign: 'center',
    },
    iconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#7ED32120',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    subtitle: {
        fontSize: 13,
        color: '#FFFFFFB2',
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 30,
        marginBottom: 40,
    },
    illustrationContainer: {
        width: 220,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustration: {
        width: '120%',
        height: '100%',
    },
    footer: {
        marginBottom: 32,
        width: '100%',
        gap: 16,
    },
    joinButton: {
        backgroundColor: '#E18DFF',
        borderRadius: 100,
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
    },
    joinButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    finishButton: {
        backgroundColor: '#2C2C2E',
        borderRadius: 100,
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
    },
    finishButtonText: {
        color: '#E18DFF',
        fontSize: 18,
    },
});
