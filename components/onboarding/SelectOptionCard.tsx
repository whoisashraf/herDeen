// components/onboarding/SelectOptionCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SelectOptionCardProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function SelectOptionCard({ label, isSelected, onPress }: SelectOptionCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.textPart}>
        <Text style={[styles.cardText, isSelected && styles.cardTextActive]} numberOfLines={1}>
          {label}
        </Text>
      </View>

      <View style={styles.checkPart}>
        <View style={[styles.checkboxContainer, isSelected && styles.checkboxActive]}>
          {isSelected ? (
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          ) : (
            <View style={styles.checkboxEmpty} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 60,
    width: 365,
    maxWidth: '100%',
    alignSelf: 'center',
  },
  textPart: {
    flex: 1,
    backgroundColor: '#1E1E20',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginRight: 6, // Gap: 6px
  },
  checkPart: {
    width: 50, // Square-ish
    backgroundColor: '#1E1E20',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  cardTextActive: {
    fontFamily: 'Poppins_600SemiBold',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#FFFFFFB2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#AA74E0',
    borderColor: '#AA74E0',
  },
  checkboxEmpty: {
    // Empty state border
  },
});


