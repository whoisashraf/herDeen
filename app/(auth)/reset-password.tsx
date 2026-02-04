import { ThemedText } from '@/components/themed-text';
import { Colors, INPUT_BACKGROUND } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'dark';
    const colors = Colors[colorScheme];
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const isDark = colorScheme === 'dark';
    const inputBg = INPUT_BACKGROUND;
    const textColor = isDark ? '#FFFFFF' : '#11181C';
    const placeholderColor = isDark ? '#9CA3AF' : '#6B7280';

    const handleVerifyCode = () => {
        setLoading(true);
        // TODO: Implement actual code verification logic
        setTimeout(() => {
            setLoading(false);
            // On success, navigate to the screen to set a new password
            router.push('/(auth)/set-new-password');
        }, 1000);
    };

    const handleClose = () => {
        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboard}
            >
                <View style={styles.content}>
                    {/* Header with close button and step indicators */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={28} color="#FFFFFF" />
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

                    {/* Title and subtitle */}
                    <View style={styles.textSection}>
                        <Text style={styles.title}>Check Your Inbox</Text>
                        <Text style={styles.subtitle}>Enter the code we just sent to you.</Text>
                    </View>

                    {/* Code input */}
                    <TextInput
                        style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                        placeholder="Enter code here"
                        placeholderTextColor={placeholderColor}
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                    />



                    {/* Verify button */}
                    <TouchableOpacity
                        style={[styles.verifyButton, (!code) && styles.verifyButtonDisabled]}
                        onPress={handleVerifyCode}
                        activeOpacity={0.85}
                        disabled={!code || loading}
                    >
                        <ThemedText type="poppins-semibold" style={styles.verifyButtonText}>
                            Verify
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.replace('/(auth)/forgot-password')} activeOpacity={0.7} style={styles.resendContainer}>
                        <ThemedText type="poppins-regular" style={styles.didntGetItText}>Didn’t get it? </ThemedText>
                        <ThemedText type="poppins-regular" style={styles.resendText}>Resend</ThemedText>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboard: {
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
        marginBottom: 60,
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    progressIndicators: {
        flexDirection: 'row',
        gap: -10,
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
        backgroundColor: '#AA74E01A',
        borderWidth: 0,
    },
    progressText: {
        color: '#9CA3AF',
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
    },
    progressTextActive: {
        color: '#AA74E0',
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    textSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        color: '#FFFFFF',
        marginBottom: 4,
        fontFamily: 'Amiri_700Bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFFB2',
        fontFamily: 'Poppins_400Regular',
        marginBottom: 16,
    },
    input: {
        height: 60,
        borderRadius: 12,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 16,
        fontFamily: 'Poppins_400Regular',
    },
    verifyButton: {
        backgroundColor: '#AA74E0',
        borderRadius: 100,
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
    },
    verifyButtonDisabled: {
        opacity: 0.5,
    },
    verifyButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    didntGetItText: {
        color: '#FFFFFFB2',
        fontSize: 16,
        opacity: 0.8,
    },
    resendText: {
        color: '#AA74E0',
        fontSize: 16,
        opacity: 0.8,
    },

    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    didntGetItText: {
        color: '#FFFFFFB2',
        fontSize: 16,
        opacity: 0.8,
    },
    resendText: {
        color: '#AA74E0',
        fontSize: 16,
        opacity: 0.8,
    },
});
