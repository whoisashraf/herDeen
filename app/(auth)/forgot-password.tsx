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
    const inputBg = INPUT_BACKGROUND;
    const textColor = isDark ? '#FFFFFF' : '#11181C';
    const placeholderColor = isDark ? '#9CA3AF' : '#6B7280';

    const handleSendCode = () => {
        setLoading(true);
        // TODO: Implement password reset logic
        router.push('/(auth)/reset-password');
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
                            <View style={[styles.progressCircle, styles.progressActive]}>
                                <Text style={styles.progressTextActive}>1</Text>
                            </View>
                            <View style={styles.progressCircle}>
                                <Text style={styles.progressText}>2</Text>
                            </View>
                            <View style={styles.progressCircle}>
                                <Text style={styles.progressText}>3</Text>
                            </View>
                        </View>
                    </View>

                    {/* Title and subtitle */}
                    <View style={styles.textSection}>
                        <Text style={styles.title}>Forgot Your Password?</Text>
                        <Text style={styles.subtitle}>No worries — we'll help you reset it.</Text>
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
                        style={[styles.sendButton, !email && styles.sendButtonDisabled]}
                        onPress={handleSendCode}
                        activeOpacity={0.85}
                        disabled={!email || loading}
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
        backgroundColor: '#AA74E0',
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
