import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import cardBg from '@/assets/images/card-bg.png';

const PRAYER_TIMES = [
    { id: '1', name: 'Fajr', time: '06:00', icon: 'cloud', active: false },
    { id: '2', name: 'Sunrise', time: '06:00', icon: 'sun.max', active: true },
    { id: '3', name: 'Dhuhr', time: '06:00', icon: 'sun.max', active: true },
    { id: '4', name: 'Asr', time: '06:00', icon: 'cloud', active: true, isCurrent: true },
    { id: '5', name: 'Maghrib', time: '06:00', icon: 'sun.min', active: true },
    { id: '6', name: 'Ishai', time: '06:00', icon: 'moon', active: true },
];

export default function PrayerTimesScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                    <IconSymbol name="arrow.left" size={24} color="#000" />
                </TouchableOpacity>
                <ThemedText type="poppins-semibold" style={styles.headerTitle}>Prayer times</ThemedText>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Location and Date */}
                <View style={styles.locationContainer}>
                    <View style={styles.locationRow}>
                        <IconSymbol name="location" size={20} color="#1F2937" />
                        <ThemedText type="poppins-medium" style={styles.locationText}>Ibadan</ThemedText>
                    </View>
                    <ThemedText type="poppins-regular" style={styles.dateText}>Friday</ThemedText>
                    <ThemedText type="poppins-regular" style={styles.dateText}>14th March, 2025.</ThemedText>
                </View>

                {/* Current Prayer Card */}
                <ImageBackground
                    source={cardBg}
                    style={styles.currentPrayerCard}
                    imageStyle={{ borderRadius: 20 }}
                    resizeMode="cover"
                >
                    <View style={styles.currentPrayerContent}>
                        <View>
                            <ThemedText type="poppins-medium" style={styles.currentPrayerName}>Asr</ThemedText>
                            <ThemedText type="poppins-bold" style={styles.currentPrayerTime}>15:50</ThemedText>
                        </View>
                        <View style={styles.currentPrayerRight}>
                            <ThemedText type="poppins-medium" style={styles.hijriDate}>17 Ramadan 1446 AH</ThemedText>
                            <View style={styles.countdownBadge}>
                                <ThemedText type="poppins-medium" style={styles.countdownText}>03:04 Minutes to Asr</ThemedText>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {/* Prayer Times List */}
                {PRAYER_TIMES.map((prayer, index) => (
                    <View
                        key={prayer.id}
                        style={styles.prayerCard}
                    >
                        <View style={styles.prayerLeft}>
                            <View style={styles.iconCircle}>
                                <IconSymbol
                                    name={prayer.icon as any}
                                    size={24}
                                    color={prayer.isCurrent ? '#62206E' : '#1F2937'}
                                />
                            </View>
                            <ThemedText
                                type="poppins-medium"
                                style={[styles.prayerName, prayer.isCurrent && styles.prayerNameActive]}
                            >
                                {prayer.name}
                            </ThemedText>
                        </View>
                        <ThemedText
                            type="poppins-regular"
                            style={styles.prayerTime}
                        >
                            {prayer.time}
                        </ThemedText>
                        <TouchableOpacity style={[styles.bellButton, prayer.isCurrent && styles.bellButtonActive]}>
                            <IconSymbol
                                name={prayer.active ? "bell.fill" : "bell"}
                                size={20}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                ))}
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
        paddingHorizontal: 24,
        marginBottom: 20,
        gap: 16,
    },
    headerTitle: {
        fontSize: 20,
        color: '#1F2937',
    },
    iconButton: {
        padding: 4,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 16,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationText: {
        fontSize: 14,
        color: '#1F2937',
    },
    dateText: {
        fontSize: 14,
        color: '#1F2937',
    },
    currentPrayerCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        minHeight: 100,
        overflow: 'hidden',
    },
    currentPrayerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    currentPrayerName: {
        color: 'white',
        fontSize: 16,
        marginBottom: 4,
    },
    currentPrayerTime: {
        color: 'white',
        fontSize: 40,
        lineHeight: 48,
    },
    currentPrayerRight: {
        alignItems: 'flex-end',
        gap: 8,
    },
    hijriDate: {
        color: 'white',
        fontSize: 12,
    },
    countdownBadge: {
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    countdownText: {
        color: 'white',
        fontSize: 10,
    },
    prayerCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    prayerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    prayerName: {
        fontSize: 16,
        color: '#1F2937',
        width: 100,
    },
    prayerNameActive: {
        color: '#62206E',
    },
    prayerTime: {
        fontSize: 16,
        color: '#1F2937',
        flex: 1,
        textAlign: 'center',
        marginRight: 24,
    },
    bellButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#62206E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bellButtonActive: {
        backgroundColor: '#62206E',
    },
});
