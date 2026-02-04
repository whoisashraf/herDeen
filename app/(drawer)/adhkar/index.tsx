import { BottomNav } from '@/components/dashboard/BottomNav';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import { ADHKAR_CATEGORIES } from '@/constants/adhkar-data';

export default function AdhkarScreen() {
    const router = useRouter();

    const renderCategoryItem = ({ item }: { item: typeof ADHKAR_CATEGORIES[0] }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => router.push(`/(drawer)/adhkar/${item.id}`)}
            >
                <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <ThemedText type="poppins-bold" style={styles.cardTitle}>
                            {item.title}
                        </ThemedText>
                        <ThemedText type="poppins-regular" style={styles.cardCount}>
                            {item.count} Adhkar
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
        <View style={[styles.container, { backgroundColor: '#090909' }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
                    <IconSymbol name="arrow.left" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <ThemedText type="poppins-bold" style={styles.headerTitle}>Adhkar</ThemedText>
                    <ThemedText type="poppins-regular" style={styles.headerSubtitle}>Daily Remembrance</ThemedText>
                </View>
                <TouchableOpacity style={styles.headerIconButton}>
                    <IconSymbol name="magnifyingglass" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Banner */}
                <View style={styles.bannerContainer}>
                    <ImageBackground
                        source={require('@/assets/images/card-bg.png')}
                        style={styles.bannerBackground}
                        imageStyle={{ borderRadius: 24, opacity: 0.1 }}
                        resizeMode="cover"
                    >
                        <View style={styles.bannerContent}>
                            <View style={styles.bannerLeft}>
                                <ThemedText type="poppins-medium" style={styles.bannerSubtitle}>Remember Allah</ThemedText>
                                <ThemedText type="poppins-bold" style={styles.bannerTitle}>Morning & Evening Adhkar</ThemedText>
                                <TouchableOpacity style={styles.startBtn} onPress={() => router.push('/tasbih')}>
                                    <ThemedText type="poppins-medium" style={styles.startBtnText}>Start Now</ThemedText>
                                    <IconSymbol name="arrow.right" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                            <Image
                                source={require('@/assets/images/adhkar.png')}
                                style={styles.bannerImage}
                                resizeMode="contain"
                            />
                        </View>
                    </ImageBackground>
                </View>

                {/* Section Title */}
                <ThemedText type="poppins-medium" style={styles.sectionLabel}>CATEGORIES</ThemedText>

                {/* Categories Grid */}
                <View style={styles.gridContainer}>
                    {ADHKAR_CATEGORIES.map((item) => (
                        <View key={item.id} style={styles.gridItemWrapper}>
                            {renderCategoryItem({ item })}
                        </View>
                    ))}
                </View>
            </ScrollView>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    headerIconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#8E8E93',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    bannerContainer: {
        height: 160,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 32,
        backgroundColor: '#1C1C1E',
    },
    bannerBackground: {
        flex: 1,
    },
    bannerContent: {
        flexDirection: 'row',
        padding: 24,
        flex: 1,
        alignItems: 'center',
    },
    bannerLeft: {
        flex: 1,
        zIndex: 1,
    },
    bannerSubtitle: {
        color: '#AA74E0',
        fontSize: 14,
        marginBottom: 4,
    },
    bannerTitle: {
        color: 'white',
        fontSize: 20,
        marginBottom: 16,
    },
    startBtn: {
        backgroundColor: '#AA74E0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 8,
    },
    startBtnText: {
        color: 'white',
        fontSize: 14,
    },
    bannerImage: {
        width: 120,
        height: 120,
        opacity: 0.8,
    },
    sectionLabel: {
        fontSize: 12,
        color: '#8E8E93',
        letterSpacing: 1,
        marginBottom: 16,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    gridItemWrapper: {
        width: '48%',
    },
    card: {
        backgroundColor: '#1C1C1E',
        borderRadius: 24,
        padding: 16,
        height: 120,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#262626',
    },
    cardContent: {
        justifyContent: 'space-between',
        height: '100%',
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 15,
        color: 'white',
        marginBottom: 4,
    },
    cardCount: {
        fontSize: 12,
        color: '#8E8E93',
    },
    iconContainer: {
        alignSelf: 'flex-end',
        width: 40,
        height: 40,
    },
    categoryIcon: {
        width: '100%',
        height: '100%',
    },
});
