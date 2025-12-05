import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import cardBg from '@/assets/images/card-bg.png';

// Mock Data for Al-Fatiha
const VERSES = [
    {
        id: 1,
        arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
        translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        isBismillah: true
    },
    {
        id: 2,
        arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
        translation: "[All] praise is [due] to Allah, Lord of the worlds -"
    },
    {
        id: 3,
        arabic: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
        translation: "The Entirely Merciful, the Especially Merciful,"
    },
    {
        id: 4,
        arabic: "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
        translation: "Sovereign of the Day of Recompense."
    },
    {
        id: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        translation: "It is You we worship and You we ask for help."
    },
    {
        id: 6,
        arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
        translation: "Guide us to the straight path –"
    },
    {
        id: 7,
        arabic: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
        translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray."
    }
];

export default function SurahDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // We can use this to fetch data later

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
                        Al-Fathia
                    </ThemedText>
                </View>
                <View style={styles.headerRight}>
                    {/* book, bookmark icons (using approximations if exact not available) */}
                    <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/(drawer)/quran/reading-mode')}>
                        <IconSymbol name="book" size={24} color="#62206E" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <IconSymbol name="bookmark" size={24} color="#62206E" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Banner */}
                <View style={styles.bannerContainer}>
                    <ImageBackground
                        source={cardBg}
                        style={styles.bannerGradient}
                        imageStyle={{ borderRadius: 20 }}
                        resizeMode="cover"
                    >
                        <View style={styles.bannerContent}>
                            <View style={styles.bannerTitleRow}>
                                <ThemedText type="poppins-medium" style={styles.bannerTitle}>
                                    Al-Faatiha
                                </ThemedText>
                                <ThemedText type="poppins-medium" style={styles.bannerSubtitle}>
                                    The Opening
                                </ThemedText>
                            </View>
                            <ThemedText type="amiri-bold" style={styles.bismillah}>
                                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                            </ThemedText>
                        </View>
                    </ImageBackground>
                </View>

                {/* Verses List */}
                <View style={styles.versesContainer}>
                    {VERSES.filter(v => !v.isBismillah).map((verse, index) => (
                        <View key={verse.id} style={styles.verseItem}>
                            {/* Verse Arabic */}
                            <View style={styles.verseArabicContainer}>
                                <ThemedText type="amiri-bold" style={styles.verseArabic}>
                                    {verse.arabic}
                                </ThemedText>
                            </View>

                            {/* Verse Translation */}
                            <ThemedText type="poppins-regular" style={styles.verseTranslation}>
                                {verse.translation}
                            </ThemedText>

                            {/* Separator if needed (not in mock explicitly but good for reading) */}
                            {index < VERSES.length - 2 && <View style={styles.verseSeparator} />}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomBarButton}>
                    <IconSymbol name="chevron.left" size={24} color="#62206E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton}>
                    <IconSymbol name="line.3.horizontal" size={24} color="#62206E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton}>
                    <IconSymbol name="bookmark" size={24} color="#62206E" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton}>
                    <IconSymbol name="chevron.right" size={24} color="#62206E" />
                </TouchableOpacity>
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
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    headerButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        color: '#62206E', 
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 100, 
    },
    bannerContainer: {
        marginBottom: 32,
        borderRadius: 20,
        overflow: 'hidden',
        height: 200, 
        shadowColor: '#9055FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    bannerGradient: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerContent: {
        alignItems: 'center',
    },
    bannerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    bannerTitle: {
        color: 'white',
        fontSize: 26,
    },
    bannerSubtitle: {
        color: 'white',
        fontSize: 26,
        opacity: 0.9,
    },
    bismillah: {
        color: 'white',
        fontSize: 26,
        textAlign: 'center',
    },
    versesContainer: {
        gap: 24,
    },
    verseItem: {
        marginBottom: 8,
    },
    verseArabicContainer: {
        width: '100%',
        alignItems: 'flex-end', 
        marginBottom: 12,
        backgroundColor: 'rgba(98, 32, 110, 0.03)', 
        padding: 10,
        borderRadius: 10,
    },
    verseArabic: {
        fontSize: 24,
        color: '#1F2937',
        textAlign: 'right',
        lineHeight: 40,
    },
    verseTranslation: {
        fontSize: 16,
        color: '#4B5563',
        lineHeight: 24,
    },
    verseSeparator: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginTop: 24,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 30,
        left: 24,
        right: 24,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    bottomBarButton: {
        padding: 10,
    }
});
