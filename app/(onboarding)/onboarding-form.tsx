import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import SelectOptionCard from '@/components/onboarding/SelectOptionCard'; // Import the new component

export default function OnboardingFormScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    'Student',
    'Working Professional',
    'Stay-at-home',
    'Entrepreneur',
    'Other',
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {/* Top bar with time and progress indicators */}
        <View style={styles.header}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.progressIndicators}>
            <View style={[styles.progressCircle, styles.progressActive]} />
            <View style={styles.progressCircle} />
            <View style={styles.progressCircle} />
          </View>
        </View>

        {/* Title and Subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Tell Us About You</Text>
          <Text style={styles.subtitle}>So HerDeen fits your lifestyle and pace.</Text>
        </View>

        {/* Options go here */}
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

        {/* Footer with buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => console.log('Continue with:', selectedOption)}
            activeOpacity={0.8}
            disabled={!selectedOption} // Disable if no option is selected
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Skip pressed')} // Implement skip logic
            activeOpacity={0.7}
          >
            <Text style={styles.skipButtonText}>Skip this</Text>
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
    paddingHorizontal: 20,
    paddingTop: 10, // Adjust as needed
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30, // Adjust as needed
  },
  timeText: {
    color: '#FFFFFF', // Assuming white for time
    fontSize: 15,
    fontWeight: '600',
  },
  progressIndicators: {
    flexDirection: 'row',
    gap: 8,
  },
  progressCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#374151', // Inactive color
  },
  progressActive: {
    backgroundColor: '#AA74E0', // Active color for '1'
  },
  textContainer: {
    marginBottom: 40, // Adjust as needed
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFFB2',
  },
  optionsContainer: {
    // flex: 1, // Removed to allow content to naturally size options
    gap: 12,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20, // Adjust as needed
  },
  continueButton: {
    backgroundColor: '#AA74E0', // Purple color from image
    borderRadius: 30, // Highly rounded
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12, // Space between continue and skip buttons
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600', // Poppins-semibold equivalent
  },
  skipButtonText: {
    color: '#FFFFFF', // Assuming white for skip button text
    fontSize: 16,
    fontWeight: '500', // Assuming medium boldness
  },
});