import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, INPUT_BACKGROUND } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth-context';
import { authService } from '@/services/auth-service';
// const PRIMARY = '#AA74E0';
// const LEAF_GREEN = '#34C759';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Add error state

  const { signIn } = useAuth(); // Call useAuth

  const isDark = colorScheme === 'dark';
  const inputBg = INPUT_BACKGROUND;
  const textColor = isDark ? '#FFFFFF' : '#11181C';
  const placeholderColor = isDark ? '#9CA3AF' : '#6B7280';
  const dividerColor = isDark ? '#374151' : '#E5E7EB';

  const handleLogin = async () => { // Make function async
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await authService.login(email, password);
      signIn(response.token);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.keyboard, { paddingTop: insets.top }]}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <ThemedText type="poppins-semibold" style={[styles.title, { color: textColor }]}>
              Welcome Back
            </ThemedText>
            <ThemedText type="poppins-regular" style={[styles.subtitle, { color: colors.textMuted }]}>
              Pick up right where you left off.
            </ThemedText>
          </View>

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

          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, styles.passwordInput, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Password"
              placeholderTextColor={placeholderColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <IconSymbol name={showPassword ? 'eye.slash' : 'eye'} size={22} color={placeholderColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPasswordRow}>
            <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
              <ThemedText type="poppins-medium" style={[styles.forgotPasswordText, { color: '#FEA1CD' }]}>Forgot password?</ThemedText>
            </TouchableOpacity>
          </View>

          {error && (
            <ThemedText type="poppins-regular" style={[styles.errorText, { color: 'red', marginBottom: 12 }]}>
              {error}
            </ThemedText>
          )}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <ThemedText type="poppins-bold" style={styles.primaryButtonText}>Log in</ThemedText>
          </TouchableOpacity>

          <View style={[styles.dividerRow, { marginVertical: 24 }]}>
            <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
            <ThemedText type="poppins-regular" style={[styles.dividerText, { color: colors.textMuted }]}>
              Or continue with
            </ThemedText>
            <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialButton, { borderColor: dividerColor }]}>
              <Image
                source={require('@/assets/icons/google_icon.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { borderColor: dividerColor }]}>
              <Ionicons name="logo-apple" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      <View style={[styles.loginRow, { paddingBottom: insets.bottom > 0 ? insets.bottom : 24, paddingTop: 12 }]}>
        <ThemedText type="poppins-regular" style={[styles.loginPrompt, { color: colors.textMuted }]}>
          Don&lsquo;t have an account?{' '}
        </ThemedText>
        <TouchableOpacity onPress={() => router.replace('/(auth)/sign-up')}>
          <ThemedText type="poppins-semibold" style={[styles.loginLinkText, { color: '#FEA1CD' }]}>Sign up</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboard: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 80 },
  header: { marginBottom: 28 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  title: { fontSize: 28 },
  subtitle: { fontSize: 15, lineHeight: 22 },
  input: { height: 52, borderRadius: 12, paddingHorizontal: 16, fontSize: 16, marginBottom: 16 },
  passwordWrapper: { position: 'relative', marginBottom: 20 },
  passwordInput: { marginBottom: 0, paddingRight: 48 },
  eyeButton: { position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' },
  primaryButton: { backgroundColor: '#AA74E0', height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  primaryButtonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 14 },
  socialRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  socialButton: { flex: 1, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginPrompt: { fontSize: 15 },
  loginLinkText: { fontSize: 15 },
  forgotPasswordRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 },
  forgotPasswordText: { fontSize: 14 },
  errorText: { fontSize: 14 },
  socialIcon: { width: 24, height: 24 },
});

