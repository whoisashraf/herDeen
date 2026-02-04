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
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY = '#AA74E0';
const LEAF_GREEN = '#34C759';

export default function SignUpScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDark = colorScheme === 'dark';
  const inputBg = INPUT_BACKGROUND;
  const textColor = isDark ? '#FFFFFF' : '#11181C';
  const placeholderColor = isDark ? '#9CA3AF' : '#6B7280';
  const dividerColor = isDark ? '#374151' : '#E5E7EB';

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/confirm-email');
    }, 800);
  };

  const openTerms = () => Linking.openURL('https://example.com/terms');
  const openPrivacy = () => Linking.openURL('https://example.com/privacy');

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
            <View style={styles.titleRow}>
              <ThemedText type="poppins-bold" style={[styles.title, { color: textColor }]}>
                Let&apos;s Begin
              </ThemedText>
              <IconSymbol name="leaf" size={24} color={LEAF_GREEN} style={styles.leafIcon} />
            </View>
            <ThemedText type="poppins-regular" style={[styles.subtitle, { color: colors.textMuted }]}>
              A few details to shape your HerDeen experience.
            </ThemedText>
          </View>

          <View style={styles.nameRow}>
            <TextInput
              style={[styles.input, styles.halfInput, { backgroundColor: inputBg, color: textColor }]}
              placeholder="First Name"
              placeholderTextColor={placeholderColor}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            <TextInput
              style={[styles.input, styles.halfInput, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Last Name"
              placeholderTextColor={placeholderColor}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
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
              placeholder="Create Password"
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

          <TouchableOpacity style={styles.termsRow} onPress={() => setAgreeTerms(!agreeTerms)} activeOpacity={0.7}>
            <View style={[styles.checkbox, agreeTerms && { backgroundColor: PRIMARY }]}>
              {agreeTerms && <IconSymbol name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text style={[styles.termsText, styles.textWhiteOpacity70]}>
              By continuing, you agree to our{' '}
              <Text style={styles.textPinkish} onPress={openTerms}>Terms of services</Text>
              <Text style={styles.textWhiteOpacity70}>{' &'}</Text>
              <Text style={styles.textPinkish} onPress={openPrivacy}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <ThemedText type="poppins-bold" style={styles.primaryButtonText}>Sign Up</ThemedText>
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
          Have an account?{' '}
        </ThemedText>
        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
          <ThemedText type="poppins-semibold" style={[styles.loginLinkText, { color: '#FEA1CD' }]}>Log in</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboard: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 16 },
  header: { marginBottom: 28 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  title: { fontSize: 28 },
  leafIcon: { marginLeft: 4 },
  subtitle: { fontSize: 15, lineHeight: 22 },
  nameRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  halfInput: { flex: 1 },
  input: { height: 52, borderRadius: 12, paddingHorizontal: 16, fontSize: 16, marginBottom: 16 },
  passwordWrapper: { position: 'relative', marginBottom: 20 },
  passwordInput: { marginBottom: 0, paddingRight: 48 },
  eyeButton: { position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 24 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 0, borderColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  termsText: { flex: 1, fontSize: 14, lineHeight: 20 },
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
  textWhiteOpacity70: { color: '#FFFFFFB2' },
  textPinkish: { color: '#FEA1CD', fontWeight: '600' },
  socialIcon: { width: 24, height: 24 },
});

