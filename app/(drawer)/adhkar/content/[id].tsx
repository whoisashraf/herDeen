import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ADHKAR_CHAPTERS, ADHKAR_CONTENT } from '@/constants/adhkar-data';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
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
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Stack.Screen options={{ headerShown: false }} />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color="white" />
                    </TouchableOpacity>
                    <ThemedText type="poppins-bold" style={styles.headerTitle}>{chapter.title}</ThemedText>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {content.map((item, index) => (
                        <View key={item.id} style={[
                            styles.contentItem,
                            index !== content.length - 1 && styles.separator
                        ]}>
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
                            <IconSymbol name="arrow.left" size={20} color="white" />
                        </TouchableOpacity>
                        <ThemedText type="poppins-medium" style={styles.footerTitle}>{chapter.title}</ThemedText>
                        <TouchableOpacity style={styles.footerButton}>
                            <IconSymbol name="arrow.right" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0F1011',
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 22,
        color: 'white',
        flex: 1,
        fontFamily: 'Poppins-Regular',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    contentItem: {
        paddingVertical: 32,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#1C1C1E',
    },
    arabicText: {
        fontSize: 24,
        lineHeight: 48,
        color: 'white',
        textAlign: 'right',
        marginBottom: 24,
        fontFamily: 'Amiri-Bold',
    },
    transliterationText: {
        fontSize: 15,
        color: '#8E8E93',
        marginBottom: 16,
        lineHeight: 24,
    },
    translationText: {
        fontSize: 16,
        color: '#FFFFFFB2',
        lineHeight: 24,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 40,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    footerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerTitle: {
        fontSize: 18,
        color: 'white',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
        fontFamily: 'Poppins-Regular',
    },
});
