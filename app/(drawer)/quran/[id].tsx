import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    ImageBackground,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View
} from 'react-native';

const SURAH_OPTIONS = [
    { number: 1, name: 'Al-Faatiha', englishName: 'The Opening', verses: 7, arabicName: 'الفاتحة', location: 'Makkah' },
    { number: 2, name: 'Al-Baqara', englishName: 'The Cow', verses: 286, arabicName: 'البقرة', location: 'Madinah' },
    { number: 3, name: 'Al-i-Imraan', englishName: 'The Family of Imran', verses: 200, arabicName: 'آل عمران', location: 'Madinah' },
    { number: 4, name: 'An-Nisaa', englishName: 'Women', verses: 176, arabicName: 'النساء', location: 'Madinah' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة', location: 'Madinah' },
    { number: 6, name: "Al-An'aam", englishName: 'The Cattle', verses: 165, arabicName: 'الأنعام', location: 'Makkah' },
    { number: 7, name: "Al-A'raaf", englishName: 'The Heights', verses: 206, arabicName: 'الأعراف', location: 'Makkah' },
];

const TRANSLATION_LANGUAGES = ['English', 'French', 'Spanish', 'Hausa', 'Deutsche'] as const;

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
    const { id, openSettings } = useLocalSearchParams<{ id?: string; openSettings?: string }>();
    const [isSurahModalVisible, setIsSurahModalVisible] = useState(false);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
    const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
    const [readingMode, setReadingMode] = useState<'quran' | 'withTranslation'>('quran');
    const [alwaysOn, setAlwaysOn] = useState(true);
    const [translationLanguage, setTranslationLanguage] = useState<(typeof TRANSLATION_LANGUAGES)[number]>('English');

    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const isDark = colorScheme === 'dark';
    const screenBackground = isDark ? '#0F1117' : colors.background;
    const surfaceBackground = isDark ? '#1C1F27' : colors.surface;
    const iconChipBackground = isDark ? '#232834' : '#ECEFF4';
    const primaryText = isDark ? '#F2F3F6' : colors.text;
    const mutedText = isDark ? '#A7ACB7' : colors.textMuted;
    const borderColor = isDark ? '#303544' : colors.border;
    const modalOverlayColor = isDark ? 'rgba(6, 8, 12, 0.62)' : 'rgba(10, 12, 16, 0.34)';
    const accentColor = '#C77DFF';
    const selectedRowBackground = isDark ? '#2A2240' : '#F5ECFF';
    const selectedRowBorder = isDark ? '#A56AFF' : '#B775FF';
    const handleColor = isDark ? '#767C88' : '#A9ADB4';
    const currentSurahNumber = Number(id ?? 1);
    const currentSurah = useMemo(
        () => SURAH_OPTIONS.find((item) => item.number === currentSurahNumber) ?? SURAH_OPTIONS[0],
        [currentSurahNumber]
    );

    useEffect(() => {
        if (openSettings === '1') {
            setIsSettingsModalVisible(true);
        }
    }, [openSettings]);

    const openLanguageSheet = () => {
        setIsSettingsModalVisible(false);
        setIsLanguageModalVisible(true);
    };

    const backToSettingsSheet = () => {
        setIsLanguageModalVisible(false);
        setIsSettingsModalVisible(true);
    };

    return (
        <View style={[styles.container, { backgroundColor: screenBackground }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.headerIconButton, { backgroundColor: surfaceBackground }]}>
                    <IconSymbol name="arrow.left" size={24} color={primaryText} />
                </TouchableOpacity>

                <View style={styles.headerTitleContainer}>
                    <TouchableOpacity style={styles.titleWrapper} onPress={() => setIsSurahModalVisible(true)}>
                        <ThemedText type="poppins-medium" style={[styles.headerTitle, { color: primaryText }]}>
                            {currentSurah.name}
                        </ThemedText>
                        <IconSymbol name="chevron.down" size={16} color={primaryText} />
                    </TouchableOpacity>
                    <ThemedText type="poppins-regular" style={[styles.headerSubtitle, { color: mutedText }]}>
                        Page 1 • Juz 1/Hizb 1
                    </ThemedText>
                </View>

                <TouchableOpacity
                    style={[styles.headerIconButton, styles.rightHeaderButton, { backgroundColor: surfaceBackground }]}
                    onPress={() => setIsSettingsModalVisible(true)}
                >
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
                                {currentSurah.arabicName}
                            </ThemedText>
                            <ThemedText type="poppins-medium" style={styles.surahEnglishName}>
                                {currentSurah.name} • {currentSurah.englishName}
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

            <Modal
                animationType="slide"
                transparent
                visible={isSurahModalVisible}
                onRequestClose={() => setIsSurahModalVisible(false)}
            >
                <View style={[styles.modalOverlay, { backgroundColor: modalOverlayColor }]}>
                    <View style={[styles.sheetContainer, { backgroundColor: surfaceBackground }]}>
                        <View style={[styles.sheetHandle, { backgroundColor: handleColor }]} />
                        <View style={styles.sheetHeader}>
                            <ThemedText type="poppins-semibold" style={[styles.sheetTitle, { color: primaryText }]}>
                                Select Surah
                            </ThemedText>
                            <TouchableOpacity
                                style={[styles.sheetCloseButton, { backgroundColor: iconChipBackground }]}
                                onPress={() => setIsSurahModalVisible(false)}
                            >
                                <IconSymbol name="xmark" size={22} color={primaryText} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={SURAH_OPTIONS}
                            keyExtractor={(item) => item.number.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.surahSheetItem}
                                    onPress={() => {
                                        setIsSurahModalVisible(false);
                                        if (item.number !== currentSurahNumber) {
                                            router.replace(`/(drawer)/quran/${item.number}`);
                                        }
                                    }}
                                >
                                    <View style={styles.surahSheetMain}>
                                        <View style={styles.surahNumberContainer}>
                                            <View style={styles.starShape}>
                                                <View style={[styles.starSquare, styles.starSquareRotated, { borderColor }]} />
                                                <View style={[styles.starSquare, { borderColor }]} />
                                            </View>
                                            <ThemedText type="poppins-medium" style={[styles.surahNumber, { color: primaryText }]}>
                                                {item.number}
                                            </ThemedText>
                                        </View>
                                        <View style={styles.surahSheetText}>
                                            <ThemedText type="poppins-medium" style={[styles.surahSheetName, { color: primaryText }]}>
                                                {item.name}
                                            </ThemedText>
                                            <ThemedText type="poppins-regular" style={[styles.surahSheetMeta, { color: mutedText }]}>
                                                {item.verses} verses • {item.location}
                                            </ThemedText>
                                        </View>
                                    </View>
                                    <ThemedText type="amiri-regular" style={[styles.surahSheetArabic, { color: primaryText }]}>
                                        {item.arabicName}
                                    </ThemedText>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={[styles.sheetSeparator, { backgroundColor: borderColor }]} />}
                        />
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent
                visible={isSettingsModalVisible}
                onRequestClose={() => setIsSettingsModalVisible(false)}
            >
                <View style={[styles.modalOverlay, { backgroundColor: modalOverlayColor }]}>
                    <View style={[styles.sheetContainer, { backgroundColor: surfaceBackground }]}>
                        <View style={[styles.sheetHandle, { backgroundColor: handleColor }]} />
                        <View style={styles.sheetHeader}>
                            <ThemedText type="poppins-semibold" style={[styles.sheetTitle, { color: primaryText }]}>
                                Settings
                            </ThemedText>
                            <TouchableOpacity
                                style={[styles.sheetCloseButton, { backgroundColor: iconChipBackground }]}
                                onPress={() => setIsSettingsModalVisible(false)}
                            >
                                <IconSymbol name="xmark" size={22} color={primaryText} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.settingsRow}>
                            <TouchableOpacity
                                style={[styles.settingsIconWrap, { backgroundColor: iconChipBackground }]}
                                onPress={() => setReadingMode((prev) => (prev === 'quran' ? 'withTranslation' : 'quran'))}
                            >
                                <IconSymbol name="textformat.size" size={20} color={primaryText} />
                            </TouchableOpacity>
                            <View style={styles.settingsContent}>
                                <ThemedText type="poppins-medium" style={[styles.settingsLabel, { color: primaryText }]}>
                                    Reading mode
                                </ThemedText>
                                <View style={styles.readingModeButtons}>
                                    <TouchableOpacity
                                        style={[
                                            styles.readingModeButton,
                                            {
                                                borderColor: readingMode === 'quran' ? selectedRowBorder : borderColor,
                                                backgroundColor: readingMode === 'quran' ? selectedRowBackground : 'transparent',
                                            },
                                        ]}
                                        onPress={() => setReadingMode('quran')}
                                    >
                                        <ThemedText
                                            type="poppins-medium"
                                            style={[
                                                styles.readingModeText,
                                                { color: readingMode === 'quran' ? primaryText : mutedText },
                                            ]}
                                        >
                                            Quran only
                                        </ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.readingModeButton,
                                            {
                                                borderColor: readingMode === 'withTranslation' ? selectedRowBorder : borderColor,
                                                backgroundColor: readingMode === 'withTranslation' ? selectedRowBackground : 'transparent',
                                            },
                                        ]}
                                        onPress={() => setReadingMode('withTranslation')}
                                    >
                                        <ThemedText
                                            type="poppins-medium"
                                            style={[
                                                styles.readingModeText,
                                                { color: readingMode === 'withTranslation' ? primaryText : mutedText },
                                            ]}
                                        >
                                            With Translation
                                        </ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.sheetSeparator, { backgroundColor: borderColor }]} />

                        <View style={styles.settingsRow}>
                            <TouchableOpacity
                                style={[styles.settingsIconWrap, { backgroundColor: iconChipBackground }]}
                                onPress={() => setAlwaysOn((prev) => !prev)}
                            >
                                <IconSymbol name="phone" size={20} color={primaryText} />
                            </TouchableOpacity>
                            <View style={styles.settingsContent}>
                                <ThemedText type="poppins-medium" style={[styles.settingsLabel, { color: primaryText }]}>
                                    Always on
                                </ThemedText>
                                <ThemedText type="poppins-regular" style={[styles.settingsHint, { color: mutedText }]}>
                                    Keep screen on while reading
                                </ThemedText>
                            </View>
                            <Switch
                                value={alwaysOn}
                                onValueChange={setAlwaysOn}
                                trackColor={{ false: isDark ? '#5F6571' : '#C7CBD2', true: accentColor }}
                                thumbColor={alwaysOn ? '#FFFFFF' : isDark ? '#E5E8EE' : '#FFFFFF'}
                                ios_backgroundColor={isDark ? '#5F6571' : '#C7CBD2'}
                            />
                        </View>

                        <View style={[styles.sheetSeparator, { backgroundColor: borderColor }]} />

                        <TouchableOpacity style={styles.settingsRow} onPress={openLanguageSheet}>
                            <View style={[styles.settingsIconWrap, { backgroundColor: iconChipBackground }]}>
                                <IconSymbol name="translate" size={20} color={primaryText} />
                            </View>
                            <View style={styles.settingsContent}>
                                <ThemedText type="poppins-medium" style={[styles.settingsLabel, { color: primaryText }]}>
                                    Translation language
                                </ThemedText>
                                <ThemedText type="poppins-regular" style={[styles.settingsHint, { color: mutedText }]}>
                                    {translationLanguage}
                                </ThemedText>
                            </View>
                            <IconSymbol name="chevron.right" size={26} color={mutedText} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent
                visible={isLanguageModalVisible}
                onRequestClose={() => setIsLanguageModalVisible(false)}
            >
                <View style={[styles.modalOverlay, { backgroundColor: modalOverlayColor }]}>
                    <View style={[styles.sheetContainer, { backgroundColor: surfaceBackground }]}>
                        <View style={[styles.sheetHandle, { backgroundColor: handleColor }]} />
                        <View style={styles.languageHeader}>
                            <TouchableOpacity
                                style={[styles.sheetBackButton, { backgroundColor: iconChipBackground }]}
                                onPress={backToSettingsSheet}
                            >
                                <IconSymbol name="arrow.left" size={22} color={primaryText} />
                            </TouchableOpacity>
                            <ThemedText type="poppins-semibold" style={[styles.languageTitle, { color: primaryText }]}>
                                Translation language
                            </ThemedText>
                        </View>
                        <FlatList
                            data={TRANSLATION_LANGUAGES}
                            keyExtractor={(item) => item}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.languageRow}
                                    onPress={() => {
                                        setTranslationLanguage(item);
                                        setIsLanguageModalVisible(false);
                                        setIsSettingsModalVisible(true);
                                    }}
                                >
                                    <ThemedText type="poppins-regular" style={[styles.languageLabel, { color: primaryText }]}>
                                        {item}
                                    </ThemedText>
                                    {translationLanguage === item && (
                                        <IconSymbol name="checkmark.done" size={22} color={accentColor} />
                                    )}
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={[styles.sheetSeparator, { backgroundColor: borderColor }]} />}
                        />
                    </View>
                </View>
            </Modal>
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
    },
    headerSubtitle: {
        fontSize: 12,
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
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheetContainer: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 24,
        maxHeight: '88%',
    },
    sheetHandle: {
        width: 74,
        height: 7,
        borderRadius: 999,
        alignSelf: 'center',
        marginBottom: 18,
    },
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    sheetTitle: {
        fontSize: 18,
    },
    sheetCloseButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    surahSheetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        gap: 10,
    },
    surahSheetMain: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        flex: 1,
    },
    surahSheetText: {
        gap: 1,
        flex: 1,
    },
    surahSheetName: {
        fontSize: 16,
    },
    surahSheetMeta: {
        fontSize: 14,
    },
    surahSheetArabic: {
        fontSize: 34,
        lineHeight: 40,
    },
    sheetSeparator: {
        height: 1,
        width: '100%',
    },
    settingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        gap: 14,
    },
    settingsIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsContent: {
        flex: 1,
    },
    settingsLabel: {
        fontSize: 16,
        marginBottom: 4,
    },
    settingsHint: {
        fontSize: 13,
    },
    readingModeButtons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    readingModeButton: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    readingModeText: {
        fontSize: 15,
    },
    languageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 10,
    },
    sheetBackButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageTitle: {
        fontSize: 18,
    },
    languageRow: {
        height: 78,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    languageLabel: {
        fontSize: 18,
    },
});
