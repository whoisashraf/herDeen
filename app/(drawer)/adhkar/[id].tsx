import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ADHKAR_CATEGORIES, ADHKAR_CHAPTERS } from '@/constants/adhkar-data';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import cardBg from '@/assets/images/card-bg.png';


export default function AdhkarCategoryScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const category = ADHKAR_CATEGORIES.find((c) => c.id === id);

    if (!category) {
        return (
            <View style={styles.container}>
                <ThemedText>Category not found</ThemedText>
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
                <ThemedText type="poppins-semibold" style={styles.headerTitle}>Adhkar</ThemedText>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#9CA3AF"
                        style={styles.searchInput}
                    />
                    <IconSymbol name="magnifyingglass" size={20} color="#9CA3AF" style={styles.searchIcon} />
                </View>

                {/* Banner */}
                <ImageBackground
                    source={cardBg}
                    style={[styles.banner, { backgroundColor: '#8B2C9A' }]}
                    imageStyle={{ borderRadius: 20 }}
                    resizeMode="cover"
                >
                    <View style={styles.bannerContent}>
                        <View>
                            <ThemedText type="poppins-bold" style={styles.bannerTitle}>{category.title}</ThemedText>
                            <ThemedText type="poppins-regular" style={styles.bannerSubtitle}>{category.count}</ThemedText>
                        </View>
                        <View style={styles.bannerIconContainer}>
                            <Image source={category.icon} style={styles.bannerIcon} resizeMode="contain" />
                        </View>
                    </View>
                </ImageBackground>

                {/* Chapters List */}
                <View style={styles.listContainer}>
                    {ADHKAR_CHAPTERS.map((chapter, index) => (
                        <TouchableOpacity
                            key={chapter.id}
                            style={[
                                styles.chapterItem,
                                index !== ADHKAR_CHAPTERS.length - 1 && styles.chapterItemBorder
                            ]}
                            onPress={() => router.push(`/(drawer)/adhkar/content/${chapter.id}`)}
                        >
                            <ThemedText type="poppins-medium" style={styles.chapterTitle}>{chapter.title}</ThemedText>
                            <IconSymbol name="chevron.right" size={20} color="#1F2937" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
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
        paddingBottom: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 52,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    searchIcon: {
        marginLeft: 'auto',
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#1F2937',
        height: '100%',
    },
    banner: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        height: 100,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bannerTitle: {
        color: 'white',
        fontSize: 24,
        marginBottom: 4,
    },
    bannerSubtitle: {
        color: 'white',
        fontSize: 14,
        opacity: 0.9,
    },
    bannerIconContainer: {
        width: 60,
        height: 60,
    },
    bannerIcon: {
        width: '100%',
        height: '100%',
    },
    listContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    chapterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    chapterItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    chapterTitle: {
        fontSize: 14,
        color: '#1F2937',
    },
});
