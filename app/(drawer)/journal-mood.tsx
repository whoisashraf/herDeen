import { IconSymbol } from '@/components/ui/icon-symbol';
import { JOURNAL_MOOD_WHEEL_SVG } from '@/constants/journal-mood-wheel-svg';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

const { width } = Dimensions.get('window');

type MoodKey = 'neutral' | 'sad' | 'happy' | 'great' | 'tired';

type MoodOption = {
  key: MoodKey;
  label: string;
  color: string;
};

const MOOD_WHEEL_VIEWBOX_WIDTH = 607;
const MOOD_WHEEL_VIEWBOX_HEIGHT = 604;
const MOOD_WHEEL_WIDTH = Math.min(width * 1.62, MOOD_WHEEL_VIEWBOX_WIDTH);
const MOOD_WHEEL_HEIGHT = MOOD_WHEEL_WIDTH * (MOOD_WHEEL_VIEWBOX_HEIGHT / MOOD_WHEEL_VIEWBOX_WIDTH);
const MOOD_WHEEL_VIEWPORT_HEIGHT = 360;
const MOOD_HIT_SIZE = 92;
const MOOD_HOTSPOTS: Record<MoodKey, { x: number; y: number }> = {
  neutral: { x: 92.749, y: 286.57 },
  sad: { x: 159.808, y: 147.496 },
  happy: { x: 306.983, y: 91.674 },
  great: { x: 458.203, y: 164.38 },
  tired: { x: 506.945, y: 320.726 },
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

      <Text style={[styles.questionText, { color: colors.textMuted }]}>How's{'\n'}your day, sis?</Text>

      <View style={styles.selectedWrap}>
        <MoodFace mood={activeMood.key} color={activeMood.color} size={124} lineColor="#FFFFFF" />
        <Text style={[styles.selectedLabel, { color: colors.text }]}>{activeMood.label}</Text>
      </View>

      <View style={styles.wheelWrap}>
        <View style={[styles.wheelViewport, { width: MOOD_WHEEL_WIDTH, height: MOOD_WHEEL_VIEWPORT_HEIGHT }]}>
          <SvgXml xml={JOURNAL_MOOD_WHEEL_SVG} width={MOOD_WHEEL_WIDTH} height={MOOD_WHEEL_HEIGHT} />
          {MOOD_OPTIONS.map((mood) => (
            <TouchableOpacity
              key={mood.key}
              activeOpacity={0.8}
              style={[
                styles.moodHitArea,
                {
                  left: (MOOD_HOTSPOTS[mood.key].x / MOOD_WHEEL_VIEWBOX_WIDTH) * MOOD_WHEEL_WIDTH - MOOD_HIT_SIZE / 2,
                  top: (MOOD_HOTSPOTS[mood.key].y / MOOD_WHEEL_VIEWBOX_HEIGHT) * MOOD_WHEEL_HEIGHT - MOOD_HIT_SIZE / 2,
                },
              ]}
              onPress={() => setSelectedMood(mood.key)}>
              {selectedMood === mood.key ? (
                <View
                  pointerEvents="none"
                  style={[
                    styles.moodSelectionRing,
                    {
                      borderColor: isDark ? 'rgba(255,255,255,0.95)' : 'rgba(19,24,28,0.82)',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.58)',
                    },
                  ]}
                />
              ) : null}
            </TouchableOpacity>
          ))}
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
    bottom: -18,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wheelViewport: {
    overflow: 'hidden',
  },
  moodHitArea: {
    position: 'absolute',
    width: MOOD_HIT_SIZE,
    height: MOOD_HIT_SIZE,
    borderRadius: MOOD_HIT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodSelectionRing: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
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
