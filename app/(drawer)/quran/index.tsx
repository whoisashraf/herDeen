import { BottomNav } from '@/components/dashboard/BottomNav';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const SURAHS = [
    { number: 1, name: 'Al-Faatiha', englishName: 'The Opening', verses: 7, arabicName: 'الفاتحة', location: 'Makkah' },
    { number: 2, name: 'Al-Baqara', englishName: 'The Cow', verses: 286, arabicName: 'البقرة', location: 'Madinah' },
    { number: 3, name: 'Al-i-Imraan', englishName: 'The Family of Imran', verses: 200, arabicName: 'آل عمران', location: 'Madinah' },
    { number: 4, name: 'An-Nisaa', englishName: 'Women', verses: 176, arabicName: 'النساء', location: 'Madinah' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة', location: 'Madinah' },
    { number: 6, name: 'Al-An\'aam', englishName: 'The Cattle', verses: 165, arabicName: 'الأنعام', location: 'Makkah' },
    { number: 7, name: 'Al-A\'raaf', englishName: 'The Heights', verses: 206, arabicName: 'الأعراف', location: 'Makkah' },
];

const JUZS = [
    {
        number: 1,
        arabicName: 'أَلْجُزْءُ أَلْأَوَّلُ',
        name: 'Juz\'u 1',
        verses: [
            { text: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ (1)', source: 'Al-faathia • Verse 1-7', surah: 'الفاتحة' },
            { text: 'إِنَّ ٱللَّهَ لَا يَسْتَحْىِۦٓ أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْ...', source: 'Al-baqara • Verse 1-22', surah: 'البقرة' },
            { text: 'أَتَأْمُرُونَ ٱلنَّاسَ بِٱلْبِرِّ وَتَنْسَوْنَ أَنْفُسَكُمْ وَأَنْتُمْ تَتْلُونَ أَل...', source: 'Al-baqara • Verse 1-7', surah: 'البقرة' },
            { text: 'وَإِذِ ٱسْتَسْقَىٰ مُوسَىٰ لِقَوْمِهِۦ فَقُلْنَا ٱضْرِب بِّعَصَاكَ ٱلْحَ...', source: 'Al-baqara • Verse 1-7', surah: 'البقرة' },
        ]
    }
];

const FAVORITES = [
    { text: 'ٱلَّذِينَ يَظُنُّونَ أَنَّهُم مُّلَـٰقُوا۟ رَبِّهِمْ وَأَنَّهُمْ إِلَيْهِ رَٰجِعُونَ', source: 'Al-baqara • Verse 46', surah: 'البقرة' },
    { text: 'ٱلَّذِينَ يَظُنُّونَ أَنَّهُم مُّلَـٰقُوا۟ رَبِّهِمْ وَأَنَّهُمْ إِلَيْهِ رَٰجِعُونَ', source: 'Al-baqara • Verse 46', surah: 'البقرة' },
    { text: 'ٱلَّذِينَ يَظُنُّونَ أَنَّهُم مُّلَـٰقُوا۟ رَبِّهِمْ وَأَنَّهُمْ إِلَيْهِ رَٰجِعُونَ', source: 'Al-baqara • Verse 46', surah: 'البقرة' },
];

const TABS = ['Surah', "Juz", 'Favorites'];

export default function QuranScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Surah');
    const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState('');
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const isDark = colorScheme === 'dark';
    const screenBackground = isDark ? '#090909' : colors.background;
    const surfaceBackground = isDark ? '#1C1C1E' : colors.surface;
    const primaryText = isDark ? '#FFFFFF' : colors.text;
    const mutedText = isDark ? '#8E8E93' : colors.textMuted;
    const dividerColor = isDark ? '#1C1C1E' : '#E6E8EB';
    const headerTitleColor = isDark ? '#FFFFFF' : '#1F2228';
    const headerIconBackground = isDark ? '#1C1C1E' : '#E4E4E6';
    const headerIconColor = isDark ? '#FFFFFF' : '#2A2E36';
    const activeTabBackground = isDark ? '#1C1C1E' : '#F3E2F8';

    const renderSurahItem = (item: typeof SURAHS[0], index: number) => (
        <TouchableOpacity
            key={index}
            style={styles.surahItem}
            onPress={() => router.push(`/(drawer)/quran/${item.number}`)}
        >
            <View style={styles.surahLeft}>
                <View style={styles.surahNumberContainer}>
                    <View style={styles.starShape}>
                        <View style={[styles.starSquare, styles.starSquareRotated]} />
                        <View style={styles.starSquare} />
                    </View>
                    <ThemedText type="poppins-bold" style={styles.surahNumber}>{item.number}</ThemedText>
                </View>
                <View style={styles.surahInfo}>
                    <ThemedText type="poppins-bold" style={[styles.surahName, { color: primaryText }]}>
                        {item.name}
                    </ThemedText>
                    <ThemedText type="poppins-regular" style={[styles.englishName, { color: mutedText }]}>
                        {item.verses} verses • {item.location}
                    </ThemedText>
                </View>
            </View>
            <ThemedText type="amiri-bold" style={[styles.arabicName, { color: primaryText }]}>
                {item.arabicName}
            </ThemedText>
        </TouchableOpacity>
    );

    const renderJuzItem = (juz: typeof JUZS[0]) => (
        <View key={juz.number}>
            <View style={styles.juzHeaderRow}>
                <ThemedText type="poppins-medium" style={[styles.juzTitle, { color: primaryText }]}>{juz.name}</ThemedText>
                <ThemedText type="amiri-bold" style={[styles.juzArabicTitle, { color: primaryText }]}>{juz.arabicName}</ThemedText>
            </View>
            {juz.verses.map((verse, idx) => (
                <View key={idx} style={styles.verseListItem}>
                    <View style={styles.verseListLeft}>
                        <View style={styles.verseStarContainer}>
                            <IconSymbol name="star" size={32} color="#1C1C1E" />
                            <ThemedText style={styles.verseNumberInsideStar}>{idx + 1}</ThemedText>
                        </View>
                    </View>
                    <View style={styles.verseListContent}>
                        <ThemedText type="amiri-bold" style={[styles.verseListArabic, { color: primaryText }]}>{verse.text}</ThemedText>
                        <View style={styles.verseListSourceRow}>
                            <ThemedText type="poppins-regular" style={[styles.verseListSource, { color: mutedText }]}>{verse.source}</ThemedText>
                            <ThemedText type="amiri-bold" style={[styles.verseListSurah, { color: primaryText }]}>{verse.surah}</ThemedText>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );

    const renderFavoriteItem = (fav: typeof FAVORITES[0], index: number) => (
        <View key={index} style={styles.verseListItem}>
            <View style={styles.verseListLeft}>
                <IconSymbol name="star.fill" size={24} color="#E18DFF" />
            </View>
            <View style={styles.verseListContent}>
                <ThemedText type="amiri-bold" style={[styles.verseListArabic, { color: primaryText }]}>{fav.text}</ThemedText>
                <View style={styles.verseListSourceRow}>
                    <ThemedText type="poppins-regular" style={[styles.verseListSource, { color: mutedText }]}>{fav.source}</ThemedText>
                    <ThemedText type="amiri-bold" style={[styles.verseListSurah, { color: primaryText }]}>{fav.surah}</ThemedText>
                </View>
            </View>
        </View>
    );

    if (isSearching) {
        return (
            <View style={[styles.container, { backgroundColor: screenBackground }]}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.searchHeader}>
                    <TouchableOpacity onPress={() => setIsSearching(false)} style={[styles.searchHeaderButton, { backgroundColor: surfaceBackground }]}>
                        <IconSymbol name="arrow.left" size={24} color={primaryText} />
                    </TouchableOpacity>
                    <View style={[styles.searchBar, { backgroundColor: surfaceBackground }]}>
                        <IconSymbol name="magnifyingglass" size={20} color={mutedText} />
                        <TextInput
                            autoFocus
                            placeholder="Search by surahs, juz, verses..."
                            placeholderTextColor={mutedText}
                            style={[styles.searchBarInput, { color: primaryText }]}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        {searchText.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchText('')}>
                                <IconSymbol name="xmark.circle.fill" size={20} color={mutedText} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Search results would go here */}
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: screenBackground }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <ThemedText type="poppins-semibold" style={[styles.headerTitle, { color: headerTitleColor }]}>
                    Quran
                </ThemedText>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={[styles.headerIconButton, { backgroundColor: headerIconBackground }]} onPress={() => setIsSearching(true)}>
                        <IconSymbol name="magnifyingglass" size={22} color={headerIconColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.headerIconButton, { backgroundColor: headerIconBackground }]}
                        onPress={() => router.push('/(drawer)/quran/1?openSettings=1')}
                    >
                        <IconSymbol name="hexagon" size={22} color={headerIconColor} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, isActive && [styles.activeTab, { backgroundColor: activeTabBackground }]]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <ThemedText
                                    type="poppins-medium"
                                    style={[styles.tabText, isActive ? styles.activeTabText : { color: mutedText }]}
                                >
                                    {tab}
                                </ThemedText>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Banner - Last Read (Only on Surah and Juz tabs) */}
                {activeTab !== 'Favorites' && (
                    <View style={styles.bannerContainer}>
                        <ImageBackground
                            source={require('@/assets/images/card-bg.png')}
                            style={styles.bannerBackground}
                            imageStyle={{ borderRadius: 20, opacity: 0.15 }}
                            resizeMode="cover"
                        >
                            <View style={styles.bannerContent}>
                                <View style={styles.bannerLeft}>
                                    <View style={styles.lastReadRow}>
                                        <IconSymbol name="book" size={18} color="white" />
                                        <ThemedText type="poppins-medium" style={styles.lastReadLabel}>Last Read</ThemedText>
                                    </View>
                                    <View style={styles.lastReadInfoRow}>
                                        <ThemedText type="poppins-regular" style={styles.lastReadVerse}>Ayah No: 12</ThemedText>
                                        <ThemedText type="amiri-bold" style={styles.lastReadSurahName}>الفاتحة</ThemedText>
                                    </View>
                                </View>

                                <View style={styles.bannerRight}>
                                    <Image
                                        source={require('@/assets/images/quranOpen.png')}
                                        style={styles.quranImage}
                                        resizeMode="contain"
                                    />
                                    <TouchableOpacity style={styles.continueButton}>
                                        <ThemedText type="poppins-medium" style={styles.continueText}>Continue</ThemedText>
                                        <IconSymbol name="arrow.right" size={16} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                )}

                {/* Content based on Tab */}
                <View style={styles.contentContainer}>
                    {activeTab === 'Surah' && SURAHS.map((item, index) => (
                        <View key={index}>
                            {renderSurahItem(item, index)}
                            <View style={[styles.separator, { backgroundColor: dividerColor }]} />
                        </View>
                    ))}

                    {activeTab === 'Juz' && JUZS.map(juz => renderJuzItem(juz))}

                    {activeTab === 'Favorites' && (
                        FAVORITES.length > 0 ? (
                            FAVORITES.map((fav, index) => (
                                <View key={index}>
                                    {renderFavoriteItem(fav, index)}
                                    <View style={[styles.separator, { backgroundColor: dividerColor }]} />
                                </View>
                            ))
                        ) : (
                            <View style={styles.emptyContainer}>
                                <IconSymbol name="star.slash.fill" size={80} color={dividerColor} />
                                <ThemedText type="poppins-medium" style={[styles.emptyText, { color: primaryText }]}>No favorites yet!</ThemedText>
                            </View>
                        )
                    )}
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
        paddingHorizontal: 22,
        marginBottom: 22,
    },
    headerTitle: {
        fontSize: 32,
        lineHeight: 38,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerIconButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        gap: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeTab: {
        backgroundColor: '#1C1C1E',
    },
    tabText: {
        fontSize: 16,
    },
    activeTabText: {
        color: '#E18DFF',
    },
    bannerContainer: {
        height: 140,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 32,
        backgroundColor: '#AA74E01A',
    },
    bannerBackground: {
        flex: 1,
        padding: 20,
    },
    bannerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    bannerLeft: {
        justifyContent: 'center',
    },
    lastReadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    lastReadLabel: {
        fontSize: 15,
        color: 'white',
    },
    lastReadInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    lastReadSurahName: {
        fontSize: 24,
        color: 'white',
    },
    lastReadVerse: {
        fontSize: 14,
        color: '#8E8E93',
    },
    bannerRight: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    quranImage: {
        width: 132,
        height: 102,
        position: 'absolute',
        top: -24,
        right: -18,
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 8,
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    continueText: {
        fontSize: 14,
        color: 'white',
    },
    contentContainer: {
        gap: 0,
    },
    surahItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    surahLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    surahNumberContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    starShape: {
        position: 'absolute',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starSquare: {
        width: 30,
        height: 30,
        borderWidth: 1.5,
        borderColor: '#444',
        position: 'absolute',
        borderRadius: 4,
    },
    starSquareRotated: {
        transform: [{ rotate: '45deg' }],
    },
    surahNumber: {
        fontSize: 14,
        color: 'white',
    },
    surahInfo: {
        gap: 2,
    },
    surahName: {
        fontSize: 18,
    },
    englishName: {
        fontSize: 13,
        color: '#8E8E93',
    },
    arabicName: {
        fontSize: 22,
        color: 'white',
    },
    separator: {
        height: 1,
        width: '100%',
    },
    juzHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 8,
    },
    juzTitle: {
        fontSize: 18,
        color: 'white',
    },
    juzArabicTitle: {
        fontSize: 22,
        color: 'white',
    },
    verseListItem: {
        flexDirection: 'row',
        paddingVertical: 20,
        gap: 16,
    },
    verseListLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
    },
    verseStarContainer: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verseNumberInsideStar: {
        position: 'absolute',
        color: '#8E8E93',
        fontSize: 12,
        fontWeight: 'bold',
    },
    verseListContent: {
        flex: 1,
        gap: 8,
    },
    verseListArabic: {
        fontSize: 20,
        color: 'white',
        lineHeight: 32,
    },
    verseListSourceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    verseListSource: {
        fontSize: 13,
        color: '#8E8E93',
    },
    verseListSurah: {
        fontSize: 16,
        color: 'white',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 20,
    },

    emptyText: {
        fontSize: 18,
        color: 'white',
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        gap: 16,
    },
    searchHeaderButton: {
        padding: 8,
        borderRadius: 22,
        backgroundColor: '#1C1C1E',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        borderRadius: 25,
        paddingHorizontal: 16,
        height: 50,
        gap: 12,
    },
    searchBarInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
});
