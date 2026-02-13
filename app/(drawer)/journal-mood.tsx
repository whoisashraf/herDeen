import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type MoodKey = 'neutral' | 'sad' | 'happy' | 'great' | 'tired';

type MoodOption = {
  key: MoodKey;
  label: string;
  color: string;
};

const MOOD_OPTIONS: MoodOption[] = [
  { key: 'neutral', label: 'I feel Neutral', color: '#D3C6BF' },
  { key: 'sad', label: 'I feel Sad', color: '#FF8A52' },
  { key: 'happy', label: 'I feel Happy', color: '#F7D35A' },
  { key: 'great', label: 'I feel Great', color: '#B4C986' },
  { key: 'tired', label: 'I feel Tired', color: '#AA93F4' },
];

function MoodFace({
  mood,
  color,
  size,
  lineColor,
}: {
  mood: MoodKey;
  color: string;
  size: number;
  lineColor: string;
}) {
  const faceWidth = Math.round(size * 0.72);
  const line = Math.max(3, Math.round(size * 0.08));
  const eyeW = Math.max(5, Math.round(size * 0.08));
  const eyeH = Math.max(14, Math.round(size * 0.2));

  return (
    <View style={[styles.faceBase, { width: faceWidth, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      {mood !== 'great' && mood !== 'tired' ? (
        <>
          <View
            style={[
              styles.eyeBar,
              { left: Math.round(faceWidth * 0.22), top: Math.round(size * 0.28), width: eyeW, height: eyeH, borderRadius: eyeW / 2, backgroundColor: lineColor },
            ]}
          />
          <View
            style={[
              styles.eyeBar,
              { right: Math.round(faceWidth * 0.22), top: Math.round(size * 0.28), width: eyeW, height: eyeH, borderRadius: eyeW / 2, backgroundColor: lineColor },
            ]}
          />
        </>
      ) : null}

      {mood === 'great' ? (
        <>
          <View
            style={[
              styles.curveEye,
              {
                left: Math.round(faceWidth * 0.18),
                top: Math.round(size * 0.3),
                width: Math.round(faceWidth * 0.2),
                height: Math.round(size * 0.12),
                borderTopWidth: line,
                borderLeftWidth: line,
                borderRightWidth: line,
                borderColor: lineColor,
              },
            ]}
          />
          <View
            style={[
              styles.curveEye,
              {
                right: Math.round(faceWidth * 0.18),
                top: Math.round(size * 0.3),
                width: Math.round(faceWidth * 0.2),
                height: Math.round(size * 0.12),
                borderTopWidth: line,
                borderLeftWidth: line,
                borderRightWidth: line,
                borderColor: lineColor,
              },
            ]}
          />
        </>
      ) : null}

      {mood === 'tired' ? (
        <>
          <View style={[styles.xEye, { left: Math.round(faceWidth * 0.2), top: Math.round(size * 0.29), width: Math.round(faceWidth * 0.14), height: Math.round(faceWidth * 0.14) }]}>
            <View style={[styles.xStroke, { height: line, backgroundColor: lineColor, transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.xStroke, { height: line, backgroundColor: lineColor, transform: [{ rotate: '-45deg' }] }]} />
          </View>
          <View style={[styles.xEye, { right: Math.round(faceWidth * 0.2), top: Math.round(size * 0.29), width: Math.round(faceWidth * 0.14), height: Math.round(faceWidth * 0.14) }]}>
            <View style={[styles.xStroke, { height: line, backgroundColor: lineColor, transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.xStroke, { height: line, backgroundColor: lineColor, transform: [{ rotate: '-45deg' }] }]} />
          </View>
        </>
      ) : null}

      {mood === 'neutral' ? (
        <View
          style={[
            styles.mouthBar,
            {
              bottom: Math.round(size * 0.22),
              width: Math.round(faceWidth * 0.48),
              height: line,
              borderRadius: line / 2,
              backgroundColor: lineColor,
            },
          ]}
        />
      ) : null}

      {mood === 'happy' || mood === 'great' ? (
        <View
          style={[
            styles.arcMouth,
            {
              bottom: Math.round(size * 0.2),
              width: Math.round(faceWidth * 0.5),
              height: Math.round(size * 0.25),
              borderBottomWidth: line,
              borderLeftWidth: line,
              borderRightWidth: line,
              borderColor: lineColor,
            },
          ]}
        />
      ) : null}

      {mood === 'sad' || mood === 'tired' ? (
        <View
          style={[
            styles.arcMouthSad,
            {
              bottom: Math.round(size * 0.18),
              width: Math.round(faceWidth * 0.5),
              height: Math.round(size * 0.24),
              borderTopWidth: line,
              borderLeftWidth: line,
              borderRightWidth: line,
              borderColor: lineColor,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

export default function JournalMoodScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();
  const [selectedMood, setSelectedMood] = useState<MoodKey>('happy');

  const activeMood = useMemo(
    () => MOOD_OPTIONS.find((mood) => mood.key === selectedMood) ?? MOOD_OPTIONS[2],
    [selectedMood]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View />
        <TouchableOpacity style={[styles.doneButton, { backgroundColor: colors.surfaceSoft }]} onPress={() => router.push(`/journal-editor?mood=${selectedMood}`)}>
          <IconSymbol name="checkmark" size={28} color="#E18DFF" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.questionText, { color: colors.textMuted }]}>How was{'\n'}your day, sis?</Text>

      <View style={styles.selectedWrap}>
        <MoodFace mood={activeMood.key} color={activeMood.color} size={124} lineColor="#FFFFFF" />
        <Text style={[styles.selectedLabel, { color: colors.text }]}>{activeMood.label}</Text>
      </View>

      <View style={styles.wheelWrap}>
        <View style={styles.wheelOuter}>
          {MOOD_OPTIONS.map((mood) => (
            <TouchableOpacity
              key={mood.key}
              style={[styles.segment, { backgroundColor: mood.color }]}
              onPress={() => setSelectedMood(mood.key)}>
              <MoodFace mood={mood.key} color={mood.color} size={64} lineColor="rgba(0,0,0,0.36)" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.wheelCutout, { backgroundColor: colors.background }]} />

        <View style={styles.pointerWrap}>
          <IconSymbol name="place" size={56} color="#E7EAEE" />
          <View style={[styles.pointerDot, { backgroundColor: colors.background }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13181C',
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  doneButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#191E2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: '#FFFFFFB2',
    fontSize: 42,
    lineHeight: 54,
    letterSpacing: -1,
    paddingHorizontal: 24,
    marginBottom: 72,
    fontFamily: 'Poppins_400Regular',
  },
  selectedWrap: {
    alignItems: 'center',
    marginBottom: 34,
  },
  selectedLabel: {
    color: '#E6E8ED',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.3,
    fontFamily: 'Poppins_400Regular',
    marginTop: 18,
  },
  wheelWrap: {
    position: 'absolute',
    bottom: -16,
    left: -(width * 0.08),
    width: width * 1.16,
    height: 320,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wheelOuter: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 220,
    borderTopRightRadius: 220,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  wheelCutout: {
    position: 'absolute',
    bottom: 0,
    width: width * 0.9,
    height: 116,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    backgroundColor: '#13181C',
  },
  pointerWrap: {
    position: 'absolute',
    bottom: 66,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointerDot: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#13181C',
    marginTop: -4,
  },
  faceBase: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  eyeBar: {
    position: 'absolute',
  },
  mouthBar: {
    position: 'absolute',
  },
  arcMouth: {
    position: 'absolute',
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
  },
  arcMouthSad: {
    position: 'absolute',
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
  },
  curveEye: {
    position: 'absolute',
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
  },
  xEye: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xStroke: {
    position: 'absolute',
    width: '100%',
    borderRadius: 99,
  },
});
