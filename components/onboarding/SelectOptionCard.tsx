// components/onboarding/SelectOptionCard.tsx
import { useAppColors } from '@/hooks/use-app-colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SelectOptionCardProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function SelectOptionCard({ label, isSelected, onPress }: SelectOptionCardProps) {
  const { colors, isDark } = useAppColors();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.textPart, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardText, { color: colors.text }, isSelected && styles.cardTextActive]} numberOfLines={1}>
          {label}
        </Text>
      </View>

      <View style={[styles.checkPart, { backgroundColor: colors.surface }]}>
        <View
          style={[
            styles.checkboxContainer,
            { borderColor: isDark ? '#FFFFFFB2' : colors.border },
            isSelected && styles.checkboxActive,
          ]}>
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
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginRight: 6, // Gap: 6px
  },
  checkPart: {
    width: 50, // Square-ish
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#E18DFF',
    borderColor: '#E18DFF',
  },
  checkboxEmpty: {
    // Empty state border
  },
});

