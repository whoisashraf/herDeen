import { BottomNav } from '@/components/dashboard/BottomNav';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Dhikr {
    id: number;
    arabic: string;
    transliteration: string;
    translation: string;
    target: number;
}

const dhikrList: Dhikr[] = [
    {
        id: 1,
        arabic: 'سُبْحَانَ اللهِ',
        transliteration: 'Subhana lah',
        translation: 'Glory be to Allah',
        target: 33,
    },
    {
        id: 2,
        arabic: 'الْحَمْدُ لِلَّهِ',
        transliteration: 'Alhamdulillah',
        translation: 'All praise is due to Allah',
        target: 33,
    },
    {
        id: 3,
        arabic: 'اللهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        translation: 'Allah is the Greatest',
        target: 33,
    },
    {
        id: 4,
        arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
        transliteration: 'La ilaha illallah',
        translation: 'There is no god but Allah',
        target: 100,
    },
];

export default function TasbihScreen() {
    const router = useRouter();
    const [currentDhikrIndex, setCurrentDhikrIndex] = useState(0);
    const [count, setCount] = useState(0);
    const [rounds, setRounds] = useState(1);

    const currentDhikr = dhikrList[currentDhikrIndex];

    const handleCount = () => {
        if (count < currentDhikr.target) {
            setCount(count + 1);
        } else {
            setCount(0);
            setRounds(rounds + 1);
        }
    };

    const handleReset = () => {
        setCount(0);
        setRounds(1);
    };

    const handlePrevious = () => {
        if (currentDhikrIndex > 0) {
            setCurrentDhikrIndex(currentDhikrIndex - 1);
            setCount(0);
            setRounds(1);
        }
    };

    const handleNext = () => {
        if (currentDhikrIndex < dhikrList.length - 1) {
            setCurrentDhikrIndex(currentDhikrIndex + 1);
            setCount(0);
            setRounds(1);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: '#090909' }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
                    <IconSymbol name="arrow.left" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <ThemedText type="poppins-bold" style={styles.headerTitle}>Tasbih</ThemedText>
                    <ThemedText type="poppins-regular" style={styles.headerSubtitle}>Counter</ThemedText>
                </View>
                <TouchableOpacity onPress={handleReset} style={styles.headerIconButton}>
                    <IconSymbol name="arrow.clockwise" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <Pressable style={styles.content} onPress={handleCount}>
                <View style={styles.dhikrCard}>
                    <ThemedText type="amiri-bold" style={styles.arabicText}>
                        {currentDhikr.arabic}
                    </ThemedText>
                    <ThemedText type="poppins-medium" style={styles.transliteration}>
                        {currentDhikr.transliteration}
                    </ThemedText>
                    <ThemedText type="poppins-regular" style={styles.translation}>
                        {currentDhikr.translation}
                    </ThemedText>

                    <View style={styles.navRow}>
                        <TouchableOpacity
                            onPress={handlePrevious}
                            disabled={currentDhikrIndex === 0}
                            style={[styles.navBtn, currentDhikrIndex === 0 && { opacity: 0.3 }]}
                        >
                            <IconSymbol name="chevron.left" size={24} color="white" />
                        </TouchableOpacity>
                        <ThemedText type="poppins-medium" style={styles.dhikrNavText}>
                            {currentDhikrIndex + 1} / {dhikrList.length}
                        </ThemedText>
                        <TouchableOpacity
                            onPress={handleNext}
                            disabled={currentDhikrIndex === dhikrList.length - 1}
                            style={[styles.navBtn, currentDhikrIndex === dhikrList.length - 1 && { opacity: 0.3 }]}
                        >
                            <IconSymbol name="chevron.right" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Main Counter Display */}
                <View style={styles.counterWrapper}>
                    <View style={styles.mainCircle}>
                        <ThemedText type="poppins-bold" style={styles.countText}>{count}</ThemedText>
                        <ThemedText type="poppins-medium" style={styles.targetText}>target: {currentDhikr.target}</ThemedText>
                    </View>
                    <View style={styles.roundBadge}>
                        <ThemedText type="poppins-bold" style={styles.roundText}>Round {rounds}</ThemedText>
                    </View>
                </View>

                <ThemedText type="poppins-regular" style={styles.tapTip}>Tap anywhere to count</ThemedText>
            </Pressable>

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
    content: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    dhikrCard: {
        width: '100%',
        backgroundColor: '#1C1C1E',
        borderRadius: 32,
        padding: 32,
        alignItems: 'center',
        marginBottom: 60,
        gap: 12,
        borderWidth: 1,
        borderColor: '#262626',
    },
    arabicText: {
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
    },
    transliteration: {
        fontSize: 18,
        color: '#AA74E0',
        textAlign: 'center',
    },
    translation: {
        fontSize: 14,
        color: '#8E8E93',
        textAlign: 'center',
    },
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        gap: 24,
    },
    navBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#090909',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dhikrNavText: {
        color: 'white',
        fontSize: 14,
    },
    counterWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainCircle: {
        width: 220,
        height: 220,
        borderRadius: 110,
        borderWidth: 8,
        borderColor: '#1C1C1E',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#090909',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
    },
    countText: {
        fontSize: 72,
        color: 'white',
    },
    targetText: {
        fontSize: 14,
        color: '#8E8E93',
        marginTop: -10,
    },
    roundBadge: {
        position: 'absolute',
        bottom: -15,
        backgroundColor: '#AA74E0',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    roundText: {
        color: 'white',
        fontSize: 14,
    },
    tapTip: {
        marginTop: 60,
        fontSize: 14,
        color: '#8E8E93',
    },
});
