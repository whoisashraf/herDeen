import StepIndicators from '@/components/auth/StepIndicators';
import SelectOptionCard from '@/components/onboarding/SelectOptionCard';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingFormScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const isDark = colorScheme === 'dark';
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    'Student',
    'Working Professional',
    'Stay-at-home',
    'Entrepreneur',
    'Other',
  ];

  const handleContinue = () => {
    if (!selectedOption) return;
    router.push('/(onboarding)/onboarding-step2');
  };

  const handleSkip = () => {
    router.push('/(drawer)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={styles.content}>

        {/* Top bar with step indicators */}
          <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <StepIndicators currentStep={1} isDark={isDark} />
        </View>

        {/* Title + subtitle */}
        <View style={styles.textSection}>
          <Text style={[styles.title, { color: colors.text }]}>Tell Us About You</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>So HerDeen fits your lifestyle and pace.</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <SelectOptionCard
              key={option}
              label={option}
              isSelected={selectedOption === option}
              onPress={() => setSelectedOption(option)}
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueButton, !selectedOption && styles.continueButtonDisabled]}
            onPress={handleContinue}
            activeOpacity={0.85}
            disabled={!selectedOption}
          >
            <ThemedText type="poppins-semibold" style={styles.continueButtonText}>Continue</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={{ marginTop: 16 }}>
            <ThemedText type="poppins-regular" style={[styles.skipButtonText, { color: colors.textMuted }]}>Skip this</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 40,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  textSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Amiri_700Bold', // Serif font as requested/shown
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFFB2',
    fontFamily: 'Poppins_400Regular',
  },
  optionsContainer: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%'
  },
  continueButton: {
    backgroundColor: '#E18DFF',
    borderRadius: 100, // Pill shape
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
  },
});
