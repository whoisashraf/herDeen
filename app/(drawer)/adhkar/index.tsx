import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import cardBg from '@/assets/images/card-bg.png';

import { ADHKAR_CATEGORIES } from '@/constants/adhkar-data';

// Import all required assets


export default function AdhkarScreen() {
    const router = useRouter();

    const renderCategoryItem = ({ item }: { item: typeof ADHKAR_CATEGORIES[0] }) => {
        const hasSpecialBg = ['1', '4', '5', '8', '9', '12'].includes(item.id);
        return (
            <TouchableOpacity
                style={[styles.card, hasSpecialBg && { backgroundColor: '#F2EAF3' }]}
                onPress={() => router.push(`/(drawer)/adhkar/${item.id}`)}
            >
                <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <ThemedText type="poppins-semibold" style={styles.cardTitle}>
                            {item.title}
                        </ThemedText>
                        <ThemedText type="poppins-regular" style={styles.cardCount}>
                            {item.count}
                        </ThemedText>
                    </View>

                    <View style={styles.iconContainer}>
                        <Image source={item.icon} style={styles.categoryIcon} resizeMode="contain" />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                    <IconSymbol name="arrow.left" size={24} color="#000" />
                </TouchableOpacity>
                <ThemedText type="poppins-semibold" style={styles.headerTitle}>Adhkar</ThemedText>
                <TouchableOpacity style={styles.iconButton}>
                    <IconSymbol name="line.3.horizontal.decrease" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Search Bar */}
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
                    style={styles.banner}
                    imageStyle={{ borderRadius: 20 }}
                    resizeMode="cover"
                >
                    <View style={styles.bannerContent}>
                        <View style={styles.bannerTextContainer}>
                            <ThemedText type="poppins-medium" style={styles.bannerSubtitle}>Remember Allah</ThemedText>
                            <ThemedText type="poppins-bold" style={styles.bannerTitle}>Start Tasbih Counter</ThemedText>
                        </View>
                        <TouchableOpacity style={styles.startBtn}>
                            <ThemedText type="poppins-medium" style={styles.startBtnText}>Start Now</ThemedText>
                            <IconSymbol name="arrow.right" size={16} color="#62206E" />
                        </TouchableOpacity>
                    </View>
                    {/* Hands image for banner */}
                    <View style={styles.bannerImageContainer}>
                        <Image
                            source={require('@/assets/images/adhkar.png')}
                            style={styles.bannerImage}

                        />
                    </View>
                </ImageBackground>

                {/* Categories Grid */}
                <View style={styles.gridContainer}>
                    {ADHKAR_CATEGORIES.map((item) => (
                        <View key={item.id} style={styles.gridItemWrapper}>
                            {renderCategoryItem({ item })}
                        </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 20,
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
        padding: 16,
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 110,
        position: 'relative',
    },
    bannerContent: {
        flex: 1,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    bannerSubtitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 8,
        opacity: 0.9,
    },
    bannerTitle: {
        color: 'white',
        fontSize: 18,
        lineHeight: 24,
    },
    startBtn: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 22,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    bannerTextContainer: {
        flex: 1,
        paddingRight: 8,
    },
    startBtnText: {
        color: '#62206E',
        fontSize: 14,
    },
    bannerImageContainer: {
        position: 'absolute',
        right: 4,
        bottom: 1,
        width: 140,
        height: 120,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItemWrapper: {
        width: '48%',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        height: 96,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F2EAF3',
    }, cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        paddingRight: 8,
    },
    cardTitle: {
        fontSize: 16,
        color: '#1F2937',
        marginBottom: 4,
    },
    cardCount: {
        fontSize: 12,
        color: '#6B7280',
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryIcon: {
        width: '100%',
        height: '100%',
    },
});
