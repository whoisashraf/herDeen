import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock Data for Al-Fatiha
const VERSES = [
    {
        id: 1,
        arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
        isBismillah: true
    },
    {
        id: 1,
        arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
    },
    {
        id: 2,
        arabic: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    },
    {
        id: 3,
        arabic: "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
    },
    {
        id: 4,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    },
    {
        id: 5,
        arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    },
    {
        id: 6,
        arabic: "صِرَٰطَ ٱلَّذِينَ أَنعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ",
    },
    {
        id: 7,
        arabic: "وَلَا ٱلضَّآلِّينَ",
    }
];

export default function SurahDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const isDark = colorScheme === 'dark';
    const screenBackground = isDark ? '#090909' : colors.background;
    const surfaceBackground = isDark ? '#1C1C1E' : '#F7F7F7';
    const primaryText = isDark ? '#FFFFFF' : colors.text;
    const mutedText = isDark ? '#8E8E93' : colors.textMuted;

    return (
        <View style={[styles.container, { backgroundColor: screenBackground }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.headerIconButton, { backgroundColor: surfaceBackground }]}>
                    <IconSymbol name="arrow.left" size={24} color={primaryText} />
                </TouchableOpacity>

                <View style={styles.headerTitleContainer}>
                    <TouchableOpacity style={styles.titleWrapper}>
                        <ThemedText type="poppins-medium" style={[styles.headerTitle, { color: primaryText }]}>
                            Al-Fatiah
                        </ThemedText>
                        <IconSymbol name="chevron.down" size={16} color={primaryText} />
                    </TouchableOpacity>
                    <ThemedText type="poppins-regular" style={[styles.headerSubtitle, { color: mutedText }]}>
                        Page 1 • Juz 1/Hizb 1
                    </ThemedText>
                </View>

                <TouchableOpacity style={[styles.headerIconButton, styles.rightHeaderButton, { backgroundColor: surfaceBackground }]}>
                    <IconSymbol name="hexagon" size={24} color={primaryText} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Intro Banner */}
                <View style={styles.bannerContainer}>
                    <ImageBackground
                        source={require('@/assets/images/quranOpen.png')}
                        style={styles.bannerBackground}
                        imageStyle={styles.bannerImageStyle}
                        resizeMode="contain"
                    >
                        <View style={styles.bannerOverlay}>
                            <ThemedText type="amiri-bold" style={styles.surahArabicName}>
                                الفاتحة
                            </ThemedText>
                            <ThemedText type="poppins-medium" style={styles.surahEnglishName}>
                                Al-Fatiah • The Opening
                            </ThemedText>
                        </View>
                    </ImageBackground>
                </View>

                {/* Bismillah */}
                <View style={styles.bismillahContainer}>
                    <ThemedText type="amiri-bold" style={[styles.bismillahText, { color: primaryText }]}>
                        بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                    </ThemedText>
                </View>

                {/* Verse Text Area */}
                <View style={styles.versesWrapper}>
                    <View style={styles.versesRow}>
                        {VERSES.filter(v => !v.isBismillah).map((verse, index) => (
                            <React.Fragment key={index}>
                                <ThemedText type="amiri-bold" style={[styles.verseLargeText, { color: primaryText }]}>
                                    {verse.arabic}
                                </ThemedText>
                                <View style={styles.verseMarker}>
                                    <IconSymbol name="circle" size={32} color={primaryText} />
                                    {/* This would ideally be a custom verse marker icon from the design */}
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <ThemedText type="poppins-regular" style={[styles.pageNumber, { color: mutedText }]}>1</ThemedText>
            </View>
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
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        marginBottom: 20,
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
        alignItems: 'flex-start',
        marginLeft: 12,
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    headerTitle: {
        fontSize: 17,
        color: 'white',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#8E8E93',
    },
    rightHeaderButton: {
        marginLeft: 'auto',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    bannerContainer: {
        height: 180,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 40,
        backgroundColor: '#E18DFF', // Matches the purple in screenshot
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerOverlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImageStyle: {
        position: 'absolute',
        right: -60,
        bottom: -60,
        width: '100%',
        height: '100%',
        opacity: 0.15,
    },
    surahArabicName: {
        fontSize: 42,
        color: 'white',
        marginBottom: 8,
    },
    surahEnglishName: {
        fontSize: 16,
        color: 'white',
    },

    bismillahContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    bismillahText: {
        fontSize: 28,
        color: 'white',
    },
    versesWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    versesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignSelf: 'center',
        maxWidth: 340,
        gap: 12,
    },
    verseLargeText: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
        lineHeight: 52,
    },
    verseMarker: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    pageNumber: {
        color: '#8E8E93',
        fontSize: 14,
    },
});
