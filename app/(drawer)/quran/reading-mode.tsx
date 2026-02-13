import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    ImageBackground,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import cardBg from '@/assets/images/card-bg.png';

const SURAHS = [
    { number: 1, name: 'Al-Faatiha', englishName: 'The Opening', verses: 7, arabicName: 'الفاتحة' },
    { number: 2, name: 'Al-Baqara', englishName: 'The Cow', verses: 286, arabicName: 'البقرة' },
    { number: 3, name: 'Al-i-Imraan', englishName: 'The Family of Imran', verses: 200, arabicName: 'آل عمران' },
    { number: 4, name: 'An-Nisaa', englishName: 'Women', verses: 176, arabicName: 'النساء' },
    { number: 5, name: 'Al-Maaida', englishName: 'The Food', verses: 120, arabicName: 'المائدة' },
    { number: 6, name: 'Al-Anam', englishName: 'The Cattle', verses: 165, arabicName: 'الأنعام' },
    { number: 7, name: 'Al-Araf', englishName: 'The Heights', verses: 206, arabicName: 'الأعراف' },
    { number: 8, name: 'Al-Anfal', englishName: 'The Spoils of War', verses: 75, arabicName: 'الأنفال' },
    { number: 9, name: 'At-Tawbah', englishName: 'The Repentance', verses: 129, arabicName: 'التوبة' },
    { number: 10, name: 'Yunus', englishName: 'Jonah', verses: 109, arabicName: 'يونس' },
];

export default function ReadingModeScreen() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

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
                    <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/(drawer)/quran/1')}>
                        <IconSymbol name="line.3.horizontal" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <IconSymbol name="bookmark" size={24} color="#000" />
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
                                <ThemedText type="poppins-bold" style={styles.bannerTitle}>
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

                {/* Arabic Text Content */}
                <View style={styles.textContainer}>
                    <Text style={styles.arabicText}>
                        <Text>ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ (1) </Text>
                        <Text>ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ (2) </Text>
                        <Text>مَـٰلِكِ يَوْمِ ٱلدِّينِ (3) </Text>
                        <Text>إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (4) </Text>
                        <Text>ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ (5) </Text>
                        <Text>صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ (6) </Text>
                        {/* Adding a 7th verse mock if needed to match length */}
                        <Text> صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ (7)</Text>
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomBarButton}>
                    <IconSymbol name="chevron.left" size={24} color="#E18DFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton} onPress={() => setModalVisible(true)}>
                    <IconSymbol name="line.3.horizontal" size={24} color="#E18DFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton}>
                    <IconSymbol name="bookmark" size={24} color="#E18DFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomBarButton}>
                    <IconSymbol name="chevron.right" size={24} color="#E18DFF" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <ThemedText type="poppins-medium" style={styles.modalTitle}>Select Surah</ThemedText>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <IconSymbol name="xmark" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={SURAHS}
                            keyExtractor={(item) => item.number.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setModalVisible(false);
                                        router.replace(`/(drawer)/quran/${item.number}`);
                                    }}
                                >
                                    <View style={styles.surahNumberContainer}>
                                        <IconSymbol name="seal" size={42} color="#FFFFFF" style={{ position: 'absolute' }} />
                                        <View style={styles.starShape}>
                                            <View style={[styles.starSquare, styles.starSquareRotated]} />
                                            <View style={styles.starSquare} />
                                        </View>
                                        <ThemedText type="poppins-medium" style={styles.surahNumber}>{item.number}</ThemedText>
                                    </View>
                                    <View style={styles.surahInfo}>
                                        <ThemedText type="poppins-medium" style={styles.modalSurahName}>{item.name}</ThemedText>
                                        <ThemedText type="poppins-regular" style={styles.modalSurahSub}>{item.englishName} ({item.verses})</ThemedText>
                                    </View>
                                    <ThemedText type="amiri-regular" style={styles.modalArabicName}>{item.arabicName}</ThemedText>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
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
        color: '#000',
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
        fontSize: 20,
        opacity: 0.9,
    },
    bismillah: {
        color: 'white',
        fontSize: 26,
        textAlign: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    arabicText: {
        fontFamily: 'Amiri-regular',
        fontSize: 24,
        color: '#2B0E30',
        textAlign: 'right',
        lineHeight: 65,
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
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        maxHeight: '80%',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        color: '#2B0E30',
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginLeft: 58,
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
        borderColor: '#E18DFF',
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
    modalSurahName: {
        fontSize: 16,
        color: '#1F2937',
        marginBottom: 2,
    },
    modalSurahSub: {
        fontSize: 12,
        color: '#6B7280',
    },
    modalArabicName: {
        fontSize: 20,
        color: '#E18DFF',
    },
});
