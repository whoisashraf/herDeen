// components/onboarding/SelectOptionCard.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming Ionicons for checkbox

interface SelectOptionCardProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function SelectOptionCard({ label, isSelected, onPress }: SelectOptionCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.cardText, isSelected && styles.cardTextSelected]}>{label}</Text>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <Ionicons name="checkmark" size={18} color="#FFFFFF" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#374151', // Inactive background
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    minHeight: 60,
  },
  cardSelected: {
    backgroundColor: '#AA74E0', // Active background
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  cardTextSelected: {
    color: '#FFFFFF',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6B7280', // Inactive border
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#9333EA', // Checkmark background
    borderColor: '#9333EA', // Active border
  },
});
