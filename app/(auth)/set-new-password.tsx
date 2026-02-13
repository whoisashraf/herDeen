import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol'; // Added import
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

export default function SetNewPasswordScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'dark';
    const colors = Colors[colorScheme];
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isDark = colorScheme === 'dark';
    const screenBg = isDark ? colors.background : '#ECECEE';
    const inputBg = isDark ? INPUT_BACKGROUND : '#E4E4E6';
    const textColor = isDark ? '#FFFFFF' : '#1E2330';
    const subtitleColor = isDark ? '#FFFFFFB2' : '#656971';
    const placeholderColor = isDark ? '#9CA3AF' : '#A7A9AE';

    const handleSetNewPassword = () => {
        setLoading(true);
        // TODO: Implement actual set new password logic
        setTimeout(() => {
            setLoading(false);
            // On success, navigate to login
            router.replace('/(auth)/password-reset-success');
        }, 1000);
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
                    </View>

                    {/* Title and subtitle */}
                    <View style={styles.textSection}>
                        <Text style={[styles.title, { color: textColor }]}>Create a New Password</Text>
                        <Text style={[styles.subtitle, { color: subtitleColor }]}>Choose something secure you’ll remember.</Text>
                    </View>

                    {/* New Password input */}
                    <View style={styles.passwordWrapper}>
                        <TextInput
                            style={[styles.input, styles.passwordInput, { backgroundColor: inputBg, color: textColor }]}
                            placeholder="New Password"
                            placeholderTextColor={placeholderColor}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowPassword(!showPassword)}
                            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                        >
                            <IconSymbol name={showPassword ? 'eye.slash' : 'eye'} size={22} color={placeholderColor} />
                        </TouchableOpacity>
                    </View>

                    {/* Confirm New Password input */}
                    <View style={styles.passwordWrapper}>
                        <TextInput
                            style={[styles.input, styles.passwordInput, { backgroundColor: inputBg, color: textColor }]}
                            placeholder="Confirm Password"
                            placeholderTextColor={placeholderColor}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                        >
                            <IconSymbol name={showConfirmPassword ? 'eye.slash' : 'eye'} size={22} color={placeholderColor} />
                        </TouchableOpacity>
                    </View>

                    {/* Set Password button */}
                    <TouchableOpacity
                        style={styles.setPasswordButton}
                        onPress={handleSetNewPassword}
                        activeOpacity={0.85}
                        disabled={loading}
                    >
                        <ThemedText type="poppins-semibold" style={styles.setPasswordButtonText}>
                            Reset Password
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
        backgroundColor: '#E18DFF1A',
        borderWidth: 0,
    },
    progressText: {
        color: '#9CA3AF',
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
    },
    progressTextActive: {
        color: '#E18DFF',
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
    },
    textSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        color: '#FFFFFF',
        marginBottom: 8,
        fontFamily: 'Amiri_700Bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#FFFFFFB2',
        fontFamily: 'Poppins_400Regular',
    },
    input: {
        height: 60,
        borderRadius: 12,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 16,
        fontFamily: 'Poppins_400Regular',
    },
    passwordWrapper: {
        position: 'relative',
        marginBottom: 16, // Keep consistent with other inputs
    },
    passwordInput: {
        marginBottom: 0, // Reset default marginBottom
        paddingRight: 48, // Make space for the eye icon
    },
    eyeButton: {
        position: 'absolute',
        right: 14,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    setPasswordButton: {
        backgroundColor: '#E18DFF',
        borderRadius: 100,
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
    },
    setPasswordButtonDisabled: {
        opacity: 0.5,
    },
    setPasswordButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
