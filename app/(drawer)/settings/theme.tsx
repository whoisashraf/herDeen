import { ThemeMode, useThemeMode } from '@/contexts/theme-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const LIGHT_BG = '#F9F9F9';
const LIGHT_CARD = '#FFFFFF';
const LIGHT_TEXT = '#444444';
const LIGHT_MUTED = '#5B6268';
const LIGHT_BORDER = '#EBDFED';

const DARK_BG = '#13181C';
const DARK_CARD = '#1F2125';
const DARK_TEXT = '#FFFFFF';
const DARK_MUTED = '#FFFFFFB2';
const DARK_BORDER = '#5B6268';

const ACCENT = '#E18DFF';

interface ThemeOptionProps {
  label: string;
  icon: string | React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
  showBorder?: boolean;
  accentColor: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
  label,
  icon,
  isSelected,
  onSelect,
  showBorder = true,
  accentColor,
  textColor,
  mutedColor,
  borderColor,
}) => (
  <TouchableOpacity
    style={[styles.optionContainer, showBorder && styles.optionBorder, showBorder && { borderBottomColor: borderColor }]}
    onPress={onSelect}
    activeOpacity={0.7}>
    <View style={styles.optionLeft}>
      <View style={styles.iconContainer}>
        {typeof icon === 'string' ? (
          <IconSymbol name={icon as any} size={24} color={isSelected ? accentColor : mutedColor} />
        ) : (
          icon
        )}
      </View>
      <Text style={[styles.optionLabel, { color: textColor }, isSelected && { color: accentColor }]}>
        {label}
      </Text>
    </View>
    {isSelected && <IconSymbol name="checkmark" size={20} color={accentColor} />}
  </TouchableOpacity>
);

export default function ThemeScreen() {
  const router = useRouter();
  const { themeMode, setThemeMode, colorScheme } = useThemeMode();

  const isDark = colorScheme === 'dark';
  const bg = isDark ? DARK_BG : LIGHT_BG;
  const card = isDark ? DARK_CARD : LIGHT_CARD;
  const text = isDark ? DARK_TEXT : LIGHT_TEXT;
  const muted = isDark ? DARK_MUTED : LIGHT_MUTED;
  const border = isDark ? DARK_BORDER : LIGHT_BORDER;

  const themes: Array<{ id: ThemeMode; label: string; icon: string | React.ReactNode }> = [
    { id: 'system', label: 'System', icon: 'hexagon' },
    { id: 'dark', label: 'Dark', icon: 'moon' },
    {
      id: 'light',
      label: 'Light',
      icon: <Entypo name="light-up" size={24} color={themeMode === 'light' ? ACCENT : muted} />,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={[styles.safeArea, { backgroundColor: bg }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="arrow.left" size={24} color={text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: text }]}>Theme</Text>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <View style={[styles.optionsCard, { backgroundColor: card, borderColor: border }]}>
          {themes.map((theme, index) => (
            <ThemeOption
              key={theme.id}
              label={theme.label}
              icon={theme.icon}
              isSelected={themeMode === theme.id}
              onSelect={() => setThemeMode(theme.id)}
              showBorder={index < themes.length - 1}
              accentColor={ACCENT}
              textColor={text}
              mutedColor={muted}
              borderColor={border}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 12,
  },
  content: {
    padding: 16,
  },
  optionsCard: {
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  optionBorder: {
    borderBottomWidth: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 17,
    marginLeft: 12,
    fontWeight: '500',
  },
});
