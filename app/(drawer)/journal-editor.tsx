import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SAMPLE_TITLE = 'It takes courage to be kind';
const SAMPLE_BODY =
  "Today, I found myself reflecting on the power of kindness. It's something that seems so simple and yet, can be incredibly difficult to practice, especially in a world that can often feel harsh and unkind. It's easy to get caught up in our own problems and concerns, and forget that everyone else is dealing with their own struggles as well.";

export default function JournalEditorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ preset?: string }>();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();
  const prefilled = params.preset === 'sample';
  const [title, setTitle] = useState(prefilled ? SAMPLE_TITLE : '');
  const [content, setContent] = useState(prefilled ? SAMPLE_BODY : '');
  const placeholderColor = isDark ? '#555B66' : '#8F97A4';
  const pageBg = isDark ? '#10131A' : colors.background;
  const titleColor = isDark ? '#F1F4F8' : colors.text;
  const bodyColor = isDark ? '#D7DBE2' : colors.textMuted;
  const bottomBarBg = isDark ? '#1B1F2A' : colors.surfaceSoft;
  const submitBg = isDark ? '#0E121A' : colors.surface;
  const iconColor = isDark ? '#F2F4F7' : colors.text;

  return (
    <View style={[styles.container, { backgroundColor: pageBg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.bottom + 10}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: insets.top + 52,
              paddingBottom: insets.bottom + 140,
            },
          ]}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={placeholderColor}
            selectionColor="#E18DFF"
            style={[styles.titleInput, { color: titleColor }]}
            multiline
          />

          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Start writing..."
            placeholderTextColor={placeholderColor}
            selectionColor="#E18DFF"
            style={[styles.bodyInput, { color: bodyColor }]}
            multiline
            textAlignVertical="top"
          />
        </ScrollView>

        <View style={[styles.bottomBar, { backgroundColor: bottomBarBg, bottom: insets.bottom + 18 }]}>
          <TouchableOpacity
            style={styles.bottomAction}
            onPress={() => {
              setTitle('');
              setContent('');
            }}>
            <IconSymbol name="trash" size={30} color="#FF3B30" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomAction}>
            <IconSymbol name="image" size={30} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomAction}>
            <IconSymbol name="mic" size={30} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.submitButton, { backgroundColor: submitBg }]} onPress={() => router.back()}>
            <IconSymbol name="checkmark" size={36} color={iconColor} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13181C',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    minHeight: '100%',
  },
  titleInput: {
    color: '#F1F4F8',
    fontSize: 56,
    lineHeight: 64,
    marginBottom: 26,
    letterSpacing: -0.8,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins_400Regular',
  },
  bodyInput: {
    color: '#D7DBE2',
    fontSize: 22,
    lineHeight: 34,
    minHeight: 420,
    letterSpacing: -0.3,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins_400Regular',
  },
  bottomBar: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#1A1F2A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 10,
  },
  bottomAction: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#0E121C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
