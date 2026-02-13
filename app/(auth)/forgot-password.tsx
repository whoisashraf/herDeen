import StepIndicators from '@/components/auth/StepIndicators';
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

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'dark';
    const colors = Colors[colorScheme];
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const isDark = colorScheme === 'dark';
    const screenBg = isDark ? colors.background : '#ECECEE';
    const inputBg = isDark ? INPUT_BACKGROUND : '#E4E4E6';
    const textColor = isDark ? '#FFFFFF' : '#1E2330';
    const subtitleColor = isDark ? '#FFFFFFB2' : '#656971';
    const placeholderColor = isDark ? '#9CA3AF' : '#A7A9AE';

    const handleSendCode = () => {
        setLoading(true);
        // Endpoint is not ready; allow moving through auth screens without validation.
        setTimeout(() => {
            setLoading(false);
            router.push('/(auth)/reset-password');
        }, 300);
    };

    const handleClose = () => {
        router.back();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: screenBg }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboard}
            >
                <View style={styles.content}>
                    {/* Header with close button and step indicators */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={28} color={textColor} />
                        </TouchableOpacity>
                        <StepIndicators currentStep={1} isDark={isDark} />
                    </View>

                    {/* Title and subtitle */}
                    <View style={styles.textSection}>
                        <Text style={[styles.title, { color: textColor }]}>Forgot Your Password?</Text>
                        <Text style={[styles.subtitle, { color: subtitleColor }]}>No worries — we'll help you reset it.</Text>
                    </View>

                    {/* Email input */}
                    <TextInput
                        style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                        placeholder="Email"
                        placeholderTextColor={placeholderColor}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    {/* Send code button */}
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSendCode}
                        activeOpacity={0.85}
                        disabled={loading}
                    >
                        <ThemedText type="poppins-semibold" style={styles.sendButtonText}>
                            Send code
                        </ThemedText>
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
    textSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        color: '#FFFFFF',
        marginBottom: 8,
        fontFamily: 'Amiri_700Bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFFB2',
        fontFamily: 'Poppins_400Regular',
    },
    input: {
        height: 60,
        borderRadius: 12,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 24,
        fontFamily: 'Poppins_400Regular',
    },
    sendButton: {
        backgroundColor: '#E18DFF',
        borderRadius: 100,
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
