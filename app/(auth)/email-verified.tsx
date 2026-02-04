import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EmailVerifiedScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const handlePersonalize = () => {
    // Send user to onboarding to personalize their journey
    router.replace('/');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <StatusBar style="light" />

      <View style={[styles.content, { paddingTop: insets.top + 12, paddingBottom: Math.max(insets.bottom, 24) }]}> 
        <View style={styles.illustrationWrap}>
          <Image
            source={require('@/assets/images/verify-image.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textWrap}>
          <ThemedText type="poppins-semibold" style={styles.title}>Email Verified!</ThemedText>
          <ThemedText type="poppins-regular" style={[styles.subtitle, { color: '#FFFFFFB2' }]}>Take a moment to shape your HerDeen experience around what matters most to you.</ThemedText>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.85} onPress={handlePersonalize} style={[styles.primaryButton, { backgroundColor: '#AA74E0' }]}>
            <ThemedText type="poppins-semibold" style={styles.primaryButtonText}>Personalize my Journey</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 20, justifyContent: 'space-between' },
  illustrationWrap: { alignItems: 'center', marginTop: 0, marginBottom: -80 },
  illustration: { width: '86%', height: 260 },
  textWrap: { alignItems: 'center', paddingHorizontal: 12, marginTop: -100 },
  title: { fontSize: 36, textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', lineHeight: 22, marginTop: 12, opacity: 0.95 },
  footer: { paddingHorizontal: 6, paddingTop: 12 },
  primaryButton: { height: 64, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 18 }
});
