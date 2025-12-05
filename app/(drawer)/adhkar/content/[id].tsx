import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ADHKAR_CHAPTERS, ADHKAR_CONTENT } from '@/constants/adhkar-data';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AdhkarDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const chapter = ADHKAR_CHAPTERS.find((c) => c.id === id);
    // Fallback to sample content if specific ID not found, for layout demonstration
    const content = ADHKAR_CONTENT[id as keyof typeof ADHKAR_CONTENT] || ADHKAR_CONTENT['1'];

    if (!chapter) {
        return (
            <View style={styles.container}>
                <ThemedText>Chapter not found</ThemedText>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                    <IconSymbol name="arrow.left" size={24} color="#000" />
                </TouchableOpacity>
                <ThemedText type="poppins-semibold" style={styles.headerTitle}>{chapter.title}</ThemedText>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {content.map((item, index) => (
                    <View key={item.id} style={styles.card}>
                        <ThemedText style={styles.arabicText}>{item.arabic}</ThemedText>
                        <ThemedText type="poppins-italic" style={styles.transliterationText}>
                            {item.transliteration}
                        </ThemedText>
                        <ThemedText type="poppins-regular" style={styles.translationText}>
                            {item.translation}
                        </ThemedText>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footerContainer}>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerButton}>
                        <IconSymbol name="chevron.left" size={20} color="#1F2937" />
                    </TouchableOpacity>
                    <ThemedText type="poppins-medium" style={styles.footerTitle}>{chapter.title}</ThemedText>
                    <TouchableOpacity style={styles.footerButton}>
                        <IconSymbol name="chevron.right" size={20} color="#1F2937" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 20,
        gap: 16,
    },
    headerTitle: {
        fontSize: 20,
        color: '#1F2937',
    },
    iconButton: {
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 100, // Space for footer
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    arabicText: {
        fontSize: 20,
        lineHeight: 48,
        color: '#62206E',
        textAlign: 'right',
        marginBottom: 24,
    },
    transliterationText: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 16,
        lineHeight: 24,
    },
    translationText: {
        fontSize: 16,
        color: '#1F2937',
        lineHeight: 24,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: 'transparent', // Let it float over background? Or solid?
        // Design usually has it pinned.
    },
    footer: {
        backgroundColor: 'white',
        borderRadius: 16,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },
    footerButton: {
        padding: 8,
    },
    footerTitle: {
        fontSize: 14,
        color: '#1F2937',
    },
});
