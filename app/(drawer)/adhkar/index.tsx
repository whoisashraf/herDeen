import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { ADHKAR_CATEGORIES } from '@/constants/adhkar-data';

export default function AdhkarScreen() {
    const router = useRouter();

    const renderCategoryItem = (item: typeof ADHKAR_CATEGORIES[0]) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => router.push(`/(drawer)/adhkar/${item.id}`)}
            >
                <View style={styles.cardContent}>
                    <ThemedText type="poppins-medium" style={styles.cardTitle}>
                        {item.title}
                    </ThemedText>
                    <Image source={item.icon} style={styles.categoryIcon} resizeMode="contain" />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Stack.Screen options={{ headerShown: false }} />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color="white" />
                    </TouchableOpacity>
                    <ThemedText type="poppins-bold" style={styles.headerTitle}>Adhkar</ThemedText>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <IconSymbol name="magnifyingglass" size={20} color="#636366" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search duas"
                            placeholderTextColor="#636366"
                            style={styles.searchInput}
                        />
                    </View>

                    {/* Categories Grid */}
                    <View style={styles.gridContainer}>
                        {ADHKAR_CATEGORIES.map((item) => renderCategoryItem(item))}
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
        marginBottom: 16,
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
        fontSize: 28,
        color: 'white',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 24,
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    card: {
        width: '48%',
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        padding: 20,
        height: 120,
        marginBottom: 12,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    cardTitle: {
        fontSize: 16,
        color: 'white',
        flex: 1,
        lineHeight: 22,
    },
    categoryIcon: {
        width: 45,
        height: 45,
        tintColor: '#e7c5f3',
    },
});
