import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PasswordResetSuccessScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'dark';
    const colors = Colors[colorScheme];
    const insets = useSafeAreaInsets();

    const handleGoToLogin = () => {
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            <View style={[styles.content, { paddingTop: insets.top + 12, paddingBottom: Math.max(insets.bottom, 24) }]}>
                <View style={styles.illustrationWrap}>
                    <Image
                        source={require('@/assets/images/set.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textWrap}>
                    <ThemedText type="poppins-semibold" style={styles.title}>All Set! 🎉</ThemedText>
                    <ThemedText type="poppins-regular" style={[styles.subtitle, { color: '#FFFFFFB2' }]}>Your password has been updated successfully.</ThemedText>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity activeOpacity={0.85} onPress={handleGoToLogin} style={[styles.primaryButton, { backgroundColor: '#AA74E0' }]}>
                        <ThemedText type="poppins-semibold" style={styles.primaryButtonText}>Go to login</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, paddingHorizontal: 20, justifyContent: 'space-between' },
    illustrationWrap: { alignItems: 'center', height: 250, marginBottom: 0 },
    illustration: { width: '80%', height: 200 }, // Adjusted size
    textWrap: { alignItems: 'center', paddingHorizontal: 12, marginBottom: 20, marginTop: -270 },
    title: { fontSize: 32, textAlign: 'center', marginTop: 10 },
    subtitle: { fontSize: 16, textAlign: 'center', lineHeight: 22, marginTop: 12, opacity: 0.95, color: '#FFFFFFB2' },
    footer: { paddingHorizontal: 6, paddingTop: 12 },
    primaryButton: { height: 64, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
    primaryButtonText: { color: '#FFFFFF', fontSize: 18 }
});
