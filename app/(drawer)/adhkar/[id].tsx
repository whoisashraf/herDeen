import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ADHKAR_CATEGORIES, ADHKAR_CHAPTERS } from '@/constants/adhkar-data';
import { useAppColors } from '@/hooks/use-app-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function AdhkarCategoryScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { colors } = useAppColors();

    const category = ADHKAR_CATEGORIES.find((c) => c.id === id);

    if (!category) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ThemedText>Category not found</ThemedText>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Stack.Screen options={{ headerShown: false }} />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.surface }]}>
                        <IconSymbol name="arrow.left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <View style={styles.titleWithIcon}>
                            <ThemedText type="poppins-semibold" style={[styles.headerTitle, { color: colors.text }]}>{category.title}</ThemedText>
                            <IconSymbol name="chevron.down" size={16} color={colors.text} style={styles.chevronDown} />
                        </View>
                        <ThemedText type="poppins-regular" style={[styles.headerSubtitle, { color: colors.textMuted }]}>{category.count}</ThemedText>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Search Bar */}
                    <View style={[styles.searchContainer, { backgroundColor: colors.input }]}>
                        <IconSymbol name="magnifyingglass" size={20} color={colors.textFaint} style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search duas"
                            placeholderTextColor={colors.textFaint}
                            style={[styles.searchInput, { color: colors.text }]}
                        />
                    </View>

                    {/* Chapters List */}
                    <View style={styles.listContainer}>
                        {ADHKAR_CHAPTERS.map((chapter) => (
                            <TouchableOpacity
                                key={chapter.id}
                                style={[styles.chapterItem, { borderBottomColor: colors.border }]}
                                onPress={() => router.push(`/(drawer)/adhkar/content/${chapter.id}`)}
                            >
                                <ThemedText type="poppins-medium" style={[styles.chapterTitle, { color: colors.text }]}>{chapter.title}</ThemedText>
                                <IconSymbol name="chevron.right" size={20} color={colors.textFaint} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
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
    headerTitleContainer: {
        flex: 1,
        marginTop: 10,
    },
    titleWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 18,
        color: 'white',
    },
    chevronDown: {
        marginTop: 2,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#FFFFFFB2',
        marginTop: 2,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 32,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    listContainer: {
        marginTop: 8,
    },
    chapterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#1C1C1E',
    },
    chapterTitle: {
        fontSize: 16,
        color: 'white',
        flex: 1,
    },
});
