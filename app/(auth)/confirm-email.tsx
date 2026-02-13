import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, INPUT_BACKGROUND } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY = '#E18DFF';
const CODE_LENGTH = 6;

export default function ConfirmEmailScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const isDark = colorScheme === 'dark';
  const screenBg = isDark ? colors.background : '#ECECEE';
  const inputBg = isDark ? INPUT_BACKGROUND : '#E4E4E6';
  const textColor = isDark ? '#FFFFFF' : '#1E2330';
  const subtitleColor = isDark ? colors.textMuted : '#656971';
  const placeholderColor = isDark ? '#9CA3AF' : '#A7A9AE';
  const codeString = code.join('');

  const handleCodeChange = (value: string, index: number) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, CODE_LENGTH).split('');
      const next = [...code];
      digits.forEach((d, i) => { if (index + i < CODE_LENGTH) next[index + i] = d; });
      setCode(next);
      inputRefs.current[Math.min(index + digits.length, CODE_LENGTH - 1)]?.focus();
      return;
    }
    const next = [...code];
    next[index] = value.replace(/\D/g, '').slice(-1);
    setCode(next);
    if (value && index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleVerify = () => {
    setLoading(true);
    // Endpoint is not ready; allow continue without validating code.
    setTimeout(() => { setLoading(false); router.replace('/(auth)/email-verified'); }, 500);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => { if (prev <= 1) { clearInterval(interval); return 0; } return prev - 1; });
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: screenBg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.keyboard, { paddingTop: insets.top }]}>
        <View style={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <IconSymbol name="chevron.left" size={28} color={PRIMARY} />
          </TouchableOpacity>

          <ThemedText type="poppins-bold" style={[styles.title, { color: textColor }]}>Confirm Your Email</ThemedText>
          <ThemedText type="poppins-regular" style={[styles.subtitle, { color: subtitleColor }]}>
            Enter the code we just sent to you.
          </ThemedText>

          <View style={styles.codeRow}>
            {Array.from({ length: CODE_LENGTH }).map((_, i) => (
              <TextInput
                key={i}
                ref={(r) => { inputRefs.current[i] = r; }}
                style={[styles.codeInput, { backgroundColor: inputBg, color: textColor, borderColor: code[i] ? PRIMARY : (isDark ? '#374151' : '#D8D9DD') }]}
                value={code[i]}
                onChangeText={(v) => handleCodeChange(v, i)}
                onKeyPress={(e) => handleKeyPress(e, i)}
                keyboardType="number-pad"
                maxLength={CODE_LENGTH}
                placeholder="*"
                placeholderTextColor={placeholderColor}
                selectTextOnFocus
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleVerify}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <ThemedText type="poppins-bold" style={styles.primaryButtonText}>Verify</ThemedText>}
          </TouchableOpacity>

          <View style={styles.resendRow}>
            <ThemedText type="poppins-regular" style={[styles.resendPrompt, { color: subtitleColor }]}>Didn&apos;t get it? </ThemedText>
            <TouchableOpacity onPress={handleResend} disabled={resendCooldown > 0}>
              <ThemedText type="poppins-semibold" style={[styles.resendLink, { color: resendCooldown > 0 ? subtitleColor : '#E18DFF' }]}>
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
              </ThemedText>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
      <View style={[styles.editRow, { paddingBottom: insets.bottom > 0 ? insets.bottom : 24, paddingTop: 12 }]}>
        <ThemedText type="poppins-regular" style={[styles.editPrompt, { color: subtitleColor }]}>Wrong email? </ThemedText>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText type="poppins-semibold" style={[styles.editLink, { color: PRIMARY }]}>Edit address</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboard: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },
  backButton: { alignSelf: 'flex-start', marginBottom: 24, padding: 4 },
  title: { fontSize: 26, marginBottom: 8 },
  subtitle: { fontSize: 15, lineHeight: 22, marginBottom: 28 },
  codeRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  codeInput: { flex: 1, height: 52, borderRadius: 12, borderWidth: 2, fontSize: 20, fontWeight: '600', textAlign: 'center' },
  primaryButton: { backgroundColor: PRIMARY, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  primaryButtonDisabled: { opacity: 0.5 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18 },
  resendRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  resendPrompt: { fontSize: 15 },
  resendLink: { fontSize: 15 },
  editRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  editPrompt: { fontSize: 15 },
  editLink: { fontSize: 15 },
});
