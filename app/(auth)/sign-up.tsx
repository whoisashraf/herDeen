import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
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

const PRIMARY = '#E18DFF';

export default function SignUpScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDark = colorScheme === 'dark';
  const screenBg = isDark ? colors.background : '#ECECEE';
  const inputBg = isDark ? '#24272C' : '#E4E4E6';
  const inputText = isDark ? '#FFFFFF' : '#75777C';
  const placeholderColor = isDark ? '#8A8F99' : '#A7A9AE';
  const titleColor = isDark ? '#FFFFFF' : '#1E2330';
  const subtitleColor = isDark ? '#C1C4CB' : '#656971';
  const dividerColor = isDark ? '#3C424B' : '#D8D9DD';
  const socialBorderColor = isDark ? '#3C424B' : '#CFCFD4';
  const gradientColors = isDark ? ['#E18DFF', '#D277F6'] : ['#C874EB', '#E18DFF'];

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Endpoint is not ready yet; continue to next auth screen without validation.
      router.push('/(auth)/confirm-email');
    }, 800);
  };

  const openTerms = () => Linking.openURL('https://example.com/terms');
  const openPrivacy = () => Linking.openURL('https://example.com/privacy');

  return (
    <View style={[styles.container, { backgroundColor: screenBg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
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
              <ThemedText type={isDark ? 'poppins-bold' : 'amiri-bold'} style={[styles.title, { color: titleColor }]}>
                Let&apos;s Begin
              </ThemedText>
              <ThemedText type="poppins-regular" style={styles.leafEmoji}>🌱</ThemedText>
            </View>
            <ThemedText type="poppins-regular" style={[styles.subtitle, { color: subtitleColor }]}>
              A few details to shape your HerDeen experience.
            </ThemedText>
          </View>

          <View style={styles.nameRow}>
            <TextInput
              style={[styles.input, styles.halfInput, { backgroundColor: inputBg, color: inputText }]}
              placeholder="First Name"
              placeholderTextColor={placeholderColor}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            <TextInput
              style={[styles.input, styles.halfInput, { backgroundColor: inputBg, color: inputText }]}
              placeholder="Last Name"
              placeholderTextColor={placeholderColor}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>

          <TextInput
            style={[styles.input, { backgroundColor: inputBg, color: inputText }]}
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
              style={[styles.passwordInput, { backgroundColor: inputBg, color: inputText }]}
              placeholder="Create Password"
              placeholderTextColor={placeholderColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={[styles.eyeButton, { backgroundColor: inputBg, borderLeftColor: dividerColor }]}
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
            <Text style={[styles.termsText, { color: subtitleColor }]}>
              By continuing, you agree to our{' '}
              <Text style={styles.textPinkish} onPress={openTerms}>Terms of services</Text>
              <Text style={{ color: subtitleColor }}>{' &'}</Text>
              <Text style={styles.textPinkish} onPress={openPrivacy}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.primaryButtonGradient}>
              <ThemedText type="poppins-semibold" style={styles.primaryButtonText}>Sign Up</ThemedText>
            </LinearGradient>
          </TouchableOpacity>

          <View style={[styles.dividerRow, { marginVertical: 26 }]}>
            <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
            <ThemedText type="poppins-regular" style={[styles.dividerText, { color: subtitleColor }]}>
              Or continue with
            </ThemedText>
            <View style={[styles.dividerLine, { backgroundColor: dividerColor }]} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialButton, { borderColor: socialBorderColor }]}>
              <Image
                source={require('@/assets/icons/google_icon.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { borderColor: socialBorderColor }]}>
              <Ionicons name="logo-apple" size={28} color={isDark ? '#FFFFFF' : '#11181C'} />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      <View style={[styles.loginRow, { paddingBottom: insets.bottom > 0 ? insets.bottom : 24, paddingTop: 12 }]}>
        <ThemedText type="poppins-regular" style={[styles.loginPrompt, { color: subtitleColor }]}>
          Have an account?{' '}
        </ThemedText>
        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
          <ThemedText type="poppins-semibold" style={[styles.loginLinkText, { color: PRIMARY }]}>Log in</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboard: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 18 },
  header: { marginBottom: 24 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  title: { fontSize: 32, lineHeight: 36 },
  leafEmoji: { fontSize: 15, marginTop: 1 },
  subtitle: { fontSize: 15, lineHeight: 22, maxWidth: 300 },
  nameRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  halfInput: { flex: 1 },
  input: { height: 62, borderRadius: 12, paddingHorizontal: 18, fontSize: 16, marginBottom: 12 },
  passwordWrapper: { flexDirection: 'row', height: 62, borderRadius: 12, overflow: 'hidden', marginBottom: 14 },
  passwordInput: { flex: 1, height: 62, paddingHorizontal: 18, fontSize: 16 },
  eyeButton: {
    width: 58,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
  },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 24 },
  checkbox: { width: 20, height: 20, borderRadius: 5, borderWidth: 0, borderColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  termsText: { flex: 1, fontSize: 13, lineHeight: 20 },
  primaryButton: { height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  primaryButtonGradient: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  primaryButtonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 20 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 15 },
  socialRow: { flexDirection: 'row', gap: 12, marginBottom: 34 },
  socialButton: { flex: 1, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginPrompt: { fontSize: 15 },
  loginLinkText: { fontSize: 15 },
  textPinkish: { color: '#FEA1CD', fontWeight: '600' },
  socialIcon: { width: 26, height: 26 },
});
