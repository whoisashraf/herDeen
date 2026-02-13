import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type StepIndicatorsProps = {
  currentStep: 1 | 2 | 3;
  isDark: boolean;
};

const STEPS: Array<1 | 2 | 3> = [1, 2, 3];

export default function StepIndicators({ currentStep, isDark }: StepIndicatorsProps) {
  const inactiveCircleStyle = {
    backgroundColor: isDark ? '#1C1C1E' : '#E4E4E6',
    borderColor: isDark ? '#333336' : '#D0D3DA',
  };
  const inactiveTextStyle = {
    color: isDark ? '#9CA3AF' : '#7D818A',
  };

  return (
    <View style={styles.progressIndicators}>
      {STEPS.map((step) => {
        const isActive = step === currentStep;

        return (
          <View
            key={step}
            style={[styles.progressCircle, isActive ? styles.progressActive : inactiveCircleStyle]}
          >
            <Text style={isActive ? styles.progressTextActive : [styles.progressText, inactiveTextStyle]}>
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
