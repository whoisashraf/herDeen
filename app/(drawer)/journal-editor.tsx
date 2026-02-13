import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
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

const WAVE_BARS = [58, 96, 34, 62, 74, 74, 128, 108, 68, 34, 74, 58, 90, 34, 62, 96, 74, 34, 68];

export default function JournalEditorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ preset?: string }>();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();
  const prefilled = params.preset === 'sample';
  const [title, setTitle] = useState(prefilled ? SAMPLE_TITLE : '');
  const [content, setContent] = useState(prefilled ? SAMPLE_BODY : '');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(true);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const bodyInputStyle = useMemo(
    () => [
      styles.bodyInput,
      isBold && styles.boldText,
      isItalic && styles.italicText,
      isUnderline && styles.underlineText,
    ],
    [isBold, isItalic, isUnderline]
  );

  const hasContent = title.trim().length > 0 || content.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.bottom + 12}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: insets.top + 18,
              paddingBottom: insets.bottom + 260,
            },
          ]}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={colors.textFaint}
            selectionColor="#E18DFF"
            style={[styles.titleInput, { color: colors.text }]}
            multiline
          />

          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Start writing..."
            placeholderTextColor={colors.textFaint}
            selectionColor="#E18DFF"
            style={[bodyInputStyle, { color: colors.textMuted }]}
            multiline
            textAlignVertical="top"
          />

          {hasContent && !isRecording ? (
            <ThemedText type="poppins-regular" style={[styles.helperText, { color: colors.textFaint }]}>
              Keep your story unfolding.{'\n'}Just tap to continue!
            </ThemedText>
          ) : null}
        </ScrollView>

        {hasContent && !isRecording ? (
          <View style={[styles.formatBar, { backgroundColor: colors.surfaceSoft, bottom: insets.bottom + 108 }]}>
            <TouchableOpacity style={styles.formatButton}>
              <IconSymbol name="textformat.size" size={30} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formatButton, isBold && styles.formatButtonActive]}
              onPress={() => setIsBold((prev) => !prev)}>
              <IconSymbol name="bold" size={30} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formatButton, isItalic && styles.formatButtonActive]}
              onPress={() => setIsItalic((prev) => !prev)}>
              <IconSymbol name="italic" size={30} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formatButton, isUnderline && styles.formatButtonActive]}
              onPress={() => setIsUnderline((prev) => !prev)}>
              <IconSymbol name="underline" size={30} color={colors.text} />
            </TouchableOpacity>
          </View>
        ) : null}

        {hasContent && isRecording ? (
          <View style={[styles.waveWrap, { bottom: insets.bottom + 150 }]}>
            {WAVE_BARS.map((height, index) => (
              <View
                key={`${height}-${index}`}
                style={[
                  styles.waveBar,
                  {
                    height,
                    backgroundColor: index >= 9 && index <= 13 ? '#8F63CF' : '#303542',
                  },
                ]}
              />
            ))}
          </View>
        ) : null}

        <View style={[styles.bottomBar, { backgroundColor: colors.surfaceSoft, bottom: insets.bottom + 22 }]}>
          <TouchableOpacity
            style={styles.bottomAction}
            onPress={() => {
              setTitle('');
              setContent('');
              setIsRecording(false);
            }}>
            <IconSymbol name="trash" size={30} color="#FF3B30" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomAction}>
            <IconSymbol name="image" size={30} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomAction, isRecording && styles.micActionActive]}
            onPress={() => setIsRecording((prev) => !prev)}>
            <IconSymbol name="mic" size={30} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.surface }]} onPress={() => router.back()}>
            <IconSymbol name="checkmark" size={36} color={colors.text} />
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
    color: '#FFFFFF',
    fontSize: 74,
    lineHeight: 84,
    marginBottom: 24,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins_400Regular',
  },
  bodyInput: {
    color: '#E7E9EE',
    fontSize: 22,
    lineHeight: 44,
    minHeight: 520,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins_400Regular',
  },
  boldText: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins-Bold' : 'Poppins_700Bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  helperText: {
    marginTop: 20,
    color: '#444A57',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 36,
  },
  waveWrap: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  waveBar: {
    width: 18,
    borderRadius: 12,
  },
  formatBar: {
    position: 'absolute',
    left: 24,
    right: 24,
    borderRadius: 46,
    height: 100,
    backgroundColor: '#1A1F2A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  formatButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatButtonActive: {
    backgroundColor: '#0E121C',
  },
  bottomBar: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#1A1F2A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 8,
  },
  bottomAction: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micActionActive: {
    backgroundColor: '#332646',
  },
  submitButton: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#0E121C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
