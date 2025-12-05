import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import cardBg from '@/assets/images/card-bg.png';
import quranOpen from '@/assets/images/quranOpen.png';

const SURAHS = [
    { number: 1, name: 'Al-Faatiha', englishName: 'The Opening', verses: 7, arabicName: 'الفاتحة' },
    { number: 2, name: 'Al-Baqara', englishName: 'The Cow', verses: 286, arabicName: 'البقرة' },
    { number: 3, name: 'Al-i-Imraan', englishName: 'The Family of Imran', verses: 200, arabicName: 'آل عمران' },
    { number: 4, name: 'An-Nisaa', englishName: 'Women', verses: 176, arabicName: 'النساء' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة' },
];

const JUZ_DATA = [
    {
        title: "Juz'u 1",
        arabicTitle: "الْجُزْءُ الْأَوَّلُ",
        items: [
            { id: '1-1', text: "In the name of Allah, the entire...", subtext: "The Opening (7)", arabic: "الفاتحة", badge: 1 },
            { id: '1-2', text: "In the name of Allah, the entire...", subtext: "The Opening (7)", arabic: "الفاتحة", badge: 1 },
            { id: '1-3', text: "In the name of Allah, the entire...", subtext: "The Opening (7)", arabic: "الفاتحة", badge: 1 },
            { id: '1-4', text: "In the name of Allah, the entire...", subtext: "The Opening (7)", arabic: "الفاتحة", badge: 1 },
        ]
    },
    {
        title: "Juz'u 2",
        arabicTitle: "الْجُزْءُ الثَّانِي",
        items: [
            { id: '2-1', text: "In the name of Allah, the entire...", subtext: "The Opening (7)", arabic: "الفاتحة", badge: 1 },
            { id: '2-2', text: "In the name of Allah, the entire...", subtext: "The Opening (7)", arabic: "الفاتحة", badge: 1 },
        ]
    }
];

const TABS = ['Surah', "Juz'u", 'Bookmarks'];

export default function QuranScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Surah');
    const [searchQuery, setSearchQuery] = useState('');

    const renderSurahItem = ({ item }: { item: typeof SURAHS[0] }) => (
        <TouchableOpacity style={styles.surahItem} onPress={() => router.push(`/(drawer)/quran/${item.number}`)}>
            <View style={styles.surahNumberContainer}>
                {/* Simulating the 8-pointed star with a specific icon or shape. 
                Using 'seal' or similar if available, else standard star */}
                <IconSymbol name="seal" size={42} color="#FFFFFF" style={{ position: 'absolute' }} />
                {/* Outline trick or just use a specific color. If 'seal' is filled, we need an outline. 
                If no outline icon, we might need a custom View shape. 
                Let's use a View with border for now as it's reliable without assets. */}
                <View style={styles.starShape}>
                    <View style={[styles.starSquare, styles.starSquareRotated]} />
                    <View style={styles.starSquare} />
                </View>
                <ThemedText type="poppins-bold" style={styles.surahNumber}>{item.number}</ThemedText>
            </View>
            <View style={styles.surahInfo}>
                <View style={styles.surahNameRow}>
                    <ThemedText type="poppins-medium" style={styles.surahName}>
                        {item.name}
                    </ThemedText>
                    <ThemedText type="amiri-bold" style={styles.arabicName}>
                        {item.arabicName}
                    </ThemedText>
                </View>
                <ThemedText type="poppins-regular" style={styles.englishName}>
                    {item.englishName} ({item.verses})
                </ThemedText>
            </View>
        </TouchableOpacity>
    );

    const renderJuzItem = ({ item, index }: { item: any, index: number }) => (
        <TouchableOpacity style={styles.surahItem} onPress={() => router.push(`/(drawer)/quran/juz-${index}`)}>
            <View style={styles.surahNumberContainer}>
                <IconSymbol name="seal" size={42} color="#FFFFFF" style={{ position: 'absolute' }} />
                <View style={styles.starShape}>
                    <View style={[styles.starSquare, styles.starSquareRotated]} />
                    <View style={styles.starSquare} />
                </View>
                <ThemedText type="poppins-bold" style={styles.surahNumber}>{index + 1}</ThemedText>
            </View>
            <View style={styles.surahInfo}>
                <View style={styles.surahNameRow}>
                    <ThemedText type="poppins-medium" style={styles.juzText} numberOfLines={1}>
                        {item.text}
                    </ThemedText>
                    <View style={styles.badgeContainer}>
                        {/* Badge shape simulation */}
                        <View style={[styles.badgeShape, styles.badgeShapeRotated]} />
                        <View style={styles.badgeShape} />
                        <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                </View>
                <View style={styles.surahNameRow}>
                    <ThemedText type="poppins-regular" style={styles.englishName}>
                        {item.subtext}
                    </ThemedText>
                    <ThemedText type="amiri-bold" style={styles.arabicNameSmall}>
                        {item.arabic}
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderContent = () => {
        if (activeTab === 'Surah') {
            return (
                <View style={styles.listContainer}>
                    {SURAHS.map((item, index) => (
                        <View key={index}>
                            {renderSurahItem({ item })}
                            {index < SURAHS.length - 1 && <View style={styles.separator} />}
                        </View>
                    ))}
                </View>
            );
        } else if (activeTab === "Juz'u") {
            return (
                <View style={styles.juzListContainer}>
                    {JUZ_DATA.map((juz, sectionIndex) => (
                        <View key={sectionIndex}>
                            <View style={styles.juzHeader}>
                                <ThemedText type="poppins-medium" style={styles.juzHeaderTitle}>{juz.title}</ThemedText>
                                <ThemedText type="amiri-bold" style={styles.juzHeaderArabic}>{juz.arabicTitle}</ThemedText>
                            </View>
                            <View style={styles.listContainer}>
                                {juz.items.map((item, index) => (
                                    <View key={item.id}>
                                        {renderJuzItem({ item, index })}
                                        {index < juz.items.length - 1 && <View style={styles.separator} />}
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            );
        } else {
            return (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconContainer}>
                        <IconSymbol name="seal" size={80} color="#FFFFFF" style={{ position: 'absolute' }} />
                        <View style={styles.emptyStarShape}>
                            <View style={[styles.emptyStarSquare, styles.emptyStarSquareRotated]} />
                            <View style={styles.emptyStarSquare} />
                        </View>
                        <Text style={styles.emptyExclamation}>!</Text>
                    </View>
                    <ThemedText type="poppins-medium" style={styles.emptyText}>No Bookmark Yet!</ThemedText>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                        <IconSymbol name="arrow.left" size={24} color="#000" />
                    </TouchableOpacity>
                    <ThemedText type="poppins-medium" style={styles.headerTitle}>
                        Al-Quran
                    </ThemedText>
                </View>
                <TouchableOpacity style={styles.headerButton}>
                    {/* Custom hamburger menu roughly approximated with 'line.3.horizontal' or similar */}
                    <IconSymbol name="line.3.horizontal" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <IconSymbol name="magnifyingglass" size={22} color="#4B5563" />
                </View>

                {/* Last Read Banner */}
                <View style={styles.bannerContainer}>
                    <ImageBackground
                        source={cardBg}
                        style={styles.bannerGradient}
                        imageStyle={{ borderRadius: 20 }}
                        resizeMode="cover"
                    >
                        {/* Background decorative patterns could go here as absolute positioned images */}
                        <View style={styles.bannerContent}>
                            <View style={styles.lastReadInfo}>
                                <View style={styles.lastReadHeader}>
                                    <IconSymbol name="book.fill" size={14} color="white" />
                                    <Text style={styles.lastReadLabel}>Last Read</Text>
                                </View>
                                <ThemedText type="amiri-bold" style={styles.lastReadSurahArabic}>
                                    الفاتحة
                                </ThemedText>
                                <Text style={styles.lastReadAyah}>Ayah No: 1</Text>
                            </View>

                            <View style={styles.bannerImageContainer}>
                                <Image source={quranOpen} style={styles.quranImage} resizeMode="contain" />
                            </View>
                        </View>

                        {/* Continue Button floating absolute */}
                        <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/(drawer)/quran/1')}>
                            <Text style={styles.continueButtonText}>Continue</Text>
                            <IconSymbol name="arrow.right" size={24} color="#62206E" />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, isActive && styles.activeTab]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <ThemedText
                                    type="poppins-medium"
                                    style={[styles.tabText, isActive && styles.activeTabText]}
                                >
                                    {tab}
                                </ThemedText>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Content based on Active Tab */}
                {renderContent()}
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
        marginBottom: 24,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        color: '#374151',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
        marginRight: 10,
    },
    bannerContainer: {
        marginBottom: 28,
        borderRadius: 20,
        overflow: 'hidden',
        height: 150,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    bannerGradient: {
        flex: 1,
        padding: 20,
        position: 'relative',
    },
    bannerContent: {
        flex: 1,
        flexDirection: 'row',
    },
    lastReadInfo: {
        flex: 1,
        paddingTop: 8,
    },
    lastReadHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 6,
    },
    lastReadLabel: {
        color: 'white',
        fontSize: 16,
    },
    lastReadSurahArabic: {
        color: 'white',
        fontSize: 22,
        marginBottom: 4,
        textAlign: 'left',
    },
    lastReadAyah: {
        color: 'white',
        fontSize: 14,
        opacity: 0.9,
    },
    bannerImageContainer: {
        width: 190,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quranImage: {
        width: 230,
        height: 140,
        marginLeft: 20,

    },
    continueButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 26,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    continueButtonText: {
        color: '#62206E',
        fontSize: 18,
    },
    tabsContainer: {
        flexDirection: 'row',
        padding: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: '#62206E',
    },
    tabText: {
        fontSize: 16,
        color: '#62206E',
        fontWeight: '500',
    },
    activeTabText: {
        color: 'white',
        fontWeight: '600',
    },
    listContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginTop: 10,
    },
    surahItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
    },
    surahNumberContainer: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        position: 'relative',
    },
    starShape: {
        position: 'absolute',
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starSquare: {
        width: 36,
        height: 36,
        borderWidth: 2,
        borderColor: '#62206E',
        position: 'absolute',
        borderRadius: 4,
    },
    starSquareRotated: {
        transform: [{ rotate: '45deg' }],
    },
    surahNumber: {
        fontSize: 12,
        color: '#000',
        zIndex: 1,
    },
    surahInfo: {
        flex: 1,
    },
    surahNameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    surahName: {
        fontSize: 16,
        color: '#1F2937',
    },
    arabicName: {
        fontSize: 20,
        color: '#62206E',
        fontFamily: 'Amiri-Bold',
    },
    englishName: {
        fontSize: 12,
        color: '#9CA3AF',
        textTransform: 'uppercase',
    },
    separator: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginLeft: 58,
    },
    // Juz Styles
    juzListContainer: {
        marginTop: 10,
    },
    juzHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 16,
        paddingHorizontal: 4,
    },
    juzHeaderTitle: {
        fontSize: 18,
        color: '#62206E',
    },
    juzHeaderArabic: {
        fontSize: 18,
        color: '#62206E',
    },
    juzText: {
        fontSize: 14,
        color: '#1F2937',
        flex: 1,
        marginRight: 8,
    },
    arabicNameSmall: {
        fontSize: 14,
        color: '#62206E',
    },
    badgeContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    badgeShape: {
        position: 'absolute',
        width: 24,
        height: 24,
        backgroundColor: '#D6BCDB', // Light purple
        borderRadius: 4,
    },
    badgeShapeRotated: {
        transform: [{ rotate: '45deg' }],
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#62206E',
        zIndex: 1,
    },
    // Empty State Styles
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
    },
    emptyStarShape: {
        position: 'absolute',
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStarSquare: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#62206E',
        position: 'absolute',
        borderRadius: 8,
    },
    emptyStarSquareRotated: {
        transform: [{ rotate: '45deg' }],
    },
    emptyExclamation: {
        fontSize: 32,
        color: '#62206E',
        fontWeight: 'bold',
        zIndex: 1,
    },
    emptyText: {
        fontSize: 16,
        color: '#1F2937',
    },
});

