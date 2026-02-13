import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function JournalEntryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppColors();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.backLayer, { backgroundColor: colors.surfaceSoft }]} />

      <View style={[styles.entrySheet, { backgroundColor: colors.surface, paddingTop: insets.top + 24 }]}>
        <View style={[styles.handle, { backgroundColor: colors.textMuted }]} />

        <View style={styles.entryHeader}>
          <TouchableOpacity style={[styles.circleButton, { backgroundColor: colors.background }]} onPress={() => router.back()}>
            <IconSymbol name="xmark" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={[styles.actionsPill, { backgroundColor: colors.background }]}>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowDeleteConfirm(true)}>
              <IconSymbol name="trash" size={22} color={colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/journal-editor?preset=sample')}>
              <IconSymbol name="pencil" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.entryBody, { paddingBottom: insets.bottom + 32 }]}>
          <Text style={[styles.title, { color: colors.text }]}>It takes courage{'\n'}to be kind</Text>
          <Text style={[styles.content, { color: colors.textMuted }]}>
            {"Today, I found myself reflecting on the power of kindness. It's something that seems so simple and yet, can be incredibly difficult to practice, especially in a world that can often feel harsh and unkind. It's easy to get caught up in our own problems and concerns, and forget that everyone else is dealing with their own struggles as well."}
          </Text>
        </ScrollView>
      </View>

      {showDeleteConfirm ? (
        <>
          <View style={[styles.modalBackdrop, { backgroundColor: colors.overlay }]} />
          <View style={[styles.confirmSheet, { backgroundColor: colors.surface, paddingBottom: insets.bottom + 26 }]}>
            <View style={[styles.handle, { backgroundColor: colors.textMuted }]} />

            <TouchableOpacity style={[styles.confirmClose, { backgroundColor: colors.background }]} onPress={() => setShowDeleteConfirm(false)}>
              <IconSymbol name="xmark" size={24} color={colors.text} />
            </TouchableOpacity>

            <View style={styles.angryFaceWrap}>
              <Text style={styles.angryFace}>:(</Text>
            </View>

            <Text style={[styles.confirmTitle, { color: colors.text }]}>Let go of this{'\n'}memory?</Text>
            <Text style={[styles.confirmDescription, { color: colors.textMuted }]}>
              Are you sure you want to delete this{'\n'}entry? This cannot be undone.
            </Text>

            <View style={styles.confirmActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowDeleteConfirm(false)}>
                <Text style={[styles.cancelText, { color: colors.textMuted }]}>No, Keep it</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => router.back()}>
                <Text style={styles.deleteText}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13181C',
  },
  backLayer: {
    position: 'absolute',
    top: 76,
    left: 24,
    right: 24,
    height: 56,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#2C313D',
    opacity: 0.45,
  },
  entrySheet: {
    flex: 1,
    marginTop: 92,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: '#1A1F2A',
    paddingHorizontal: 24,
  },
  handle: {
    alignSelf: 'center',
    width: 116,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8D929D',
    opacity: 0.65,
    marginBottom: 20,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  circleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0E121C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsPill: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0E121C',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryBody: {
    paddingBottom: 36,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 52,
    lineHeight: 62,
    letterSpacing: -0.8,
    marginBottom: 22,
    fontFamily: 'Poppins_400Regular',
  },
  content: {
    color: '#FFFFFFB2',
    fontSize: 22,
    lineHeight: 40,
    fontFamily: 'Poppins_400Regular',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 12, 18, 0.56)',
  },
  confirmSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: '#1A1F2A',
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  confirmClose: {
    position: 'absolute',
    top: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0E121C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  angryFaceWrap: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: '#4A2C32',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 34,
  },
  angryFace: {
    color: '#EE4E4E',
    fontSize: 74,
    lineHeight: 74,
    fontFamily: 'Poppins_400Regular',
  },
  confirmTitle: {
    color: '#FFFFFF',
    fontSize: 54,
    lineHeight: 66,
    letterSpacing: -0.8,
    marginBottom: 14,
    fontFamily: 'Poppins_400Regular',
  },
  confirmDescription: {
    color: '#FFFFFFB2',
    fontSize: 22,
    lineHeight: 34,
    marginBottom: 30,
    fontFamily: 'Poppins_400Regular',
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    flex: 1.3,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#4A2A33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#AEB2BC',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  deleteText: {
    color: '#FF3B30',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
});
