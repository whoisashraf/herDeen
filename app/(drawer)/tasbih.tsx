import resetIcon from '@/assets/icons/reset_icon.png';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

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
    const progress = count / currentDhikr.target;
    const beadsToShow = Math.min(count, 8);

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
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <ThemedText type="poppins-semibold" style={styles.headerTitle}>
                    Tasbih
                </ThemedText>
                <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                    <Image source={resetIcon} style={styles.resetIcon} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <Pressable style={styles.content} onPress={handleCount}>
                {/* Dhikr Card */}
                <View style={styles.dhikrCard}>
                    {/* Arabic Text at Top */}
                    <View style={styles.arabicSection}>
                        <ThemedText type="amiri-bold" style={styles.arabicText}>
                            {currentDhikr.arabic}
                        </ThemedText>
                    </View>

                    {/* Dashed Separator */}
                    <View style={styles.separator} />

                    {/* Navigation Row with Transliteration */}
                    <View style={styles.navigationRow}>
                        <TouchableOpacity
                            onPress={handlePrevious}
                            disabled={currentDhikrIndex === 0}
                            style={[styles.navButton, currentDhikrIndex === 0 && styles.navButtonDisabled]}
                        >
                            <IconSymbol
                                name="chevron.left"
                                size={32}
                                color={currentDhikrIndex === 0 ? '#E0E0E0' : '#1A1A1A'}
                            />
                        </TouchableOpacity>

                        <View style={styles.dhikrTextContainer}>
                            {/* Transliteration */}
                            <ThemedText type="poppins-medium" style={styles.transliteration}>
                                {currentDhikr.transliteration}
                            </ThemedText>
                        </View>

                        <TouchableOpacity
                            onPress={handleNext}
                            disabled={currentDhikrIndex === dhikrList.length - 1}
                            style={[
                                styles.navButton,
                                currentDhikrIndex === dhikrList.length - 1 && styles.navButtonDisabled,
                            ]}
                        >
                            <IconSymbol
                                name="chevron.right"
                                size={32}
                                color={currentDhikrIndex === dhikrList.length - 1 ? '#E0E0E0' : '#1A1A1A'}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Dashed Separator */}
                    <View style={styles.separator} />

                    {/* Translation at Bottom */}
                    <View style={styles.translationSection}>
                        <ThemedText type="poppins-regular" style={styles.translation}>
                            {currentDhikr.translation}
                        </ThemedText>
                    </View>
                </View>

                {/* Counter Display */}
                <View style={styles.counterContainer}>
                    <View style={styles.counterDisplay}>
                        <ThemedText type="poppins-medium" style={styles.countNumber}>
                            {count}
                        </ThemedText>
                        <ThemedText type="poppins-regular" style={styles.countTarget}>
                            /{currentDhikr.target}
                        </ThemedText>
                    </View>
                    <ThemedText type="poppins-medium" style={styles.roundsText}>
                        Rounds: {rounds}
                    </ThemedText>
                </View>

                {/* Beads Visualization */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.beadsContainer}
                    contentContainerStyle={styles.beadsContent}
                    ref={(ref) => {
                        if (ref && count > 0) {
                            ref.scrollTo({ x: (count - 1) * 50, animated: true });
                        }
                    }}
                >
                    <View style={styles.beadsWrapper}>
                        {[...Array(currentDhikr.target)].map((_, index) => {
                            const isActive = index < count;

                            // Create a prominent Arch/Hump curve
                            const totalBeads = currentDhikr.target;
                            const progress = index / (totalBeads - 1); // 0 to 1

                            // Use Sine for a perfect semi-circle arch
                            // sin(0)=0, sin(PI/2)=1, sin(PI)=0
                            const angle = progress * Math.PI;
                            const amplitude = 80; // significant height for the curve
                            const yFactor = Math.sin(angle);

                            // High in middle (low marginTop), Low at ends (high marginTop)
                            // Base margin is where the peak sits
                            const baseTop = 10;
                            const additionalOffset = amplitude * (1 - yFactor);

                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.bead,
                                        {
                                            marginTop: baseTop + additionalOffset,
                                        },
                                        isActive ? styles.beadActive : styles.beadInactive,
                                    ]}
                                />
                            );
                        })}
                    </View>
                </ScrollView>

                {/* Instruction Text */}
                <ThemedText type="poppins-regular" style={styles.instructionText}>
                    Click or swipe to count
                </ThemedText>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 18,
        color: '#1A1A1A',

    },
    resetButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    resetIcon: {
        width: 24,
        height: 24,
        tintColor: '#62206E',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    dhikrCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 0,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    arabicSection: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginHorizontal: 20,
    },
    navigationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    navButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButtonDisabled: {
        opacity: 1,
    },
    dhikrTextContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    arabicText: {
        fontSize: 24,
        color: '#62206E',
        textAlign: 'center',
        lineHeight: 40,
    },
    transliteration: {
        fontSize: 22,
        color: '#1A1A1A',
        fontStyle: 'italic',
    },
    translationSection: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    translation: {
        fontSize: 16,
        color: '#1A1A1A',
        textAlign: 'center',
    },
    counterContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    counterDisplay: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    countNumber: {
        fontSize: 48,
        color: '#2B0E30',
    },
    countTarget: {
        fontSize: 32,
        color: '#2B0E30',
    },
    roundsText: {
        fontSize: 16,
        color: '#2B0E30',
    },
    beadsContainer: {
        height: 150,
        marginTop: 40,
        marginBottom: 20,
    },
    beadsContent: {
        paddingHorizontal: 20,
    },
    beadsWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
    },
    bead: {
        width: 36,
        height: 36,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    beadInactive: {
        backgroundColor: '#D4C5D8',
    },
    beadActive: {
        backgroundColor: '#62206E',
    },
    instructionText: {
        fontSize: 16,
        color: '#999999',
        textAlign: 'center',
        marginTop: 60,
        fontStyle: 'italic',
    },
});
