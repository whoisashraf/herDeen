import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const DuaOfTheDay = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <ThemedText type="poppins-medium" style={styles.title}>
          Dua of the Day
        </ThemedText>
        <TouchableOpacity style={styles.linkButton}>
          <ThemedText type="poppins-regular" style={styles.linkText}>
            Duas
          </ThemedText>
          <IconSymbol name="chevron.right" size={16} color="#E18DFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.duaContent}>
        <ThemedText type="amiri-regular" style={styles.duaArabic}>
          اللهم إنك عفو تحب العفو فاعف عني
        </ThemedText>
        <ThemedText type="poppins-regular" style={styles.duaTransliteration}>
          Allahuma innaka afuwun tuhibul afuwa, fahfu ani.
        </ThemedText>
        <ThemedText type="poppins-regular" style={styles.duaTranslation}>
          O Allah, You are Forgiving and love forgiveness, so forgive me
        </ThemedText>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <ThemedText type="poppins-semibold" style={styles.progressText}>
            13/100
          </ThemedText>
        </View>

        <TouchableOpacity style={styles.linkButton}>
          <ThemedText type="poppins-regular" style={styles.linkText}>
            Open Tasbih
          </ThemedText>
          <IconSymbol name="chevron.right" size={16} color="#E18DFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 0,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#111827',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#E18DFF',
  },
  duaContent: {
    marginBottom: 24,
  },
  duaArabic: {
    fontSize: 22,
    color: '#111827',
    marginBottom: 12,
    textAlign: 'right',
    lineHeight: 32,
  },
  duaTransliteration: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'left',
    marginBottom: 8,
  },
  duaTranslation: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'left',
    lineHeight: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    width: 120,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E18DFF',
    borderRadius: 3,
    width: '13%',
  },
  progressText: {
    fontSize: 14,
    color: '#374151',
  },
});



