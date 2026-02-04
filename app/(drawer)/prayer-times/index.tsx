import { BottomNav } from '@/components/dashboard/BottomNav';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const PRAYER_TIMES = [
    { id: '1', name: 'Fajr', time: '05:12', icon: 'cloud', active: false },
    { id: '2', name: 'Sunrise', time: '06:34', icon: 'sun.max' },
    { id: '3', name: 'Dhuhr', time: '12:30', icon: 'sun.max', active: true },
    { id: '4', name: 'Asr', time: '15:52', icon: 'cloud', active: true, isCurrent: true },
    { id: '5', name: 'Maghrib', time: '18:45', icon: 'sun.min', active: true },
    { id: '6', name: 'Isha', time: '20:10', icon: 'moon', active: true },
];

export default function PrayerTimesScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    return (
        <View style={[styles.container, { backgroundColor: '#090909' }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
                    <IconSymbol name="arrow.left" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <ThemedText type="poppins-bold" style={styles.headerTitle}>Prayer Times</ThemedText>
                    <ThemedText type="poppins-regular" style={styles.headerSubtitle}>Lagos, Nigeria</ThemedText>
                </View>
                <TouchableOpacity style={styles.headerIconButton}>
                    <IconSymbol name="hexagon" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Date & Location Banner */}
                <View style={styles.bannerContainer}>
                    <ImageBackground
                        source={require('@/assets/images/card-bg.png')}
                        style={styles.bannerBackground}
                        imageStyle={{ borderRadius: 20, opacity: 0.1 }}
                        resizeMode="cover"
                    >
                        <View style={styles.bannerContent}>
                            <View>
                                <ThemedText type="poppins-medium" style={styles.bannerDay}>Friday</ThemedText>
                                <ThemedText type="poppins-bold" style={styles.bannerDate}>14th March, 2025</ThemedText>
                                <View style={styles.bannerLocation}>
                                    <IconSymbol name="location.fill" size={14} color="#AA74E0" />
                                    <ThemedText type="poppins-medium" style={styles.locationText}>Lagos, Nigeria</ThemedText>
                                </View>
                            </View>
                            <View style={styles.hijriContainer}>
                                <ThemedText type="poppins-bold" style={styles.hijriText}>17 Ramadhan</ThemedText>
                                <ThemedText type="poppins-medium" style={styles.hijriYear}>1446 AH</ThemedText>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* Next Prayer Countdown (Minimal like Quran Last Read) */}
                <View style={styles.nextPrayerLabelRow}>
                    <ThemedText type="poppins-medium" style={styles.sectionLabel}>TODAY'S SCHEDULE</ThemedText>
                    <View style={styles.countdownPill}>
                        <ThemedText type="poppins-bold" style={styles.countdownText}>- 02:15:20</ThemedText>
                    </View>
                </View>

                {/* Prayer List */}
                <View style={styles.prayerList}>
                    {PRAYER_TIMES.map((prayer, index) => (
                        <View key={prayer.id} style={[styles.prayerItem, prayer.isCurrent && styles.activePrayerItem]}>
                            <View style={styles.prayerLeft}>
                                <View style={[styles.iconBox, prayer.isCurrent && { backgroundColor: '#AA74E0' }]}>
                                    <IconSymbol name={prayer.icon as any} size={22} color={prayer.isCurrent ? 'white' : '#8E8E93'} />
                                </View>
                                <View>
                                    <ThemedText type="poppins-bold" style={[styles.prayerName, { color: prayer.isCurrent ? 'white' : '#E5E7EB' }]}>
                                        {prayer.name}
                                    </ThemedText>
                                    {prayer.isCurrent && (
                                        <ThemedText type="poppins-medium" style={styles.currentLabel}>CURRENT</ThemedText>
                                    )}
                                </View>
                            </View>
                            <View style={styles.prayerRight}>
                                <ThemedText type="poppins-bold" style={[styles.prayerTime, { color: prayer.isCurrent ? 'white' : '#E5E7EB' }]}>
                                    {prayer.time}
                                </ThemedText>
                                <TouchableOpacity style={styles.bellBtn}>
                                    <IconSymbol name={prayer.active ? "bell.fill" : "bell"} size={18} color={prayer.isCurrent ? "white" : "#8E8E93"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    bannerContainer: {
        height: 140,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 24,
        backgroundColor: '#1C1C1E',
    },
    bannerBackground: {
        flex: 1,
        padding: 20,
    },
    bannerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    bannerDay: {
        fontSize: 14,
        color: '#8E8E93',
    },
    bannerDate: {
        fontSize: 18,
        color: 'white',
        marginBottom: 8,
    },
    bannerLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 12,
        color: '#AA74E0',
    },
    hijriContainer: {
        alignItems: 'flex-end',
    },
    hijriText: {
        fontSize: 18,
        color: '#AA74E0',
    },
    hijriYear: {
        fontSize: 14,
        color: '#8E8E93',
    },
    nextPrayerLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 12,
        color: '#8E8E93',
        letterSpacing: 1,
    },
    countdownPill: {
        backgroundColor: '#AA74E01A',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    countdownText: {
        fontSize: 12,
        color: '#AA74E0',
    },
    prayerList: {
        gap: 12,
    },
    prayerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#1C1C1E',
    },
    activePrayerItem: {
        backgroundColor: '#1C162E',
        borderWidth: 1,
        borderColor: 'rgba(168, 85, 247, 0.3)',
    },
    prayerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#090909',
        justifyContent: 'center',
        alignItems: 'center',
    },
    prayerName: {
        fontSize: 16,
    },
    currentLabel: {
        fontSize: 10,
        color: '#AA74E0',
        marginTop: -2,
    },
    prayerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    prayerTime: {
        fontSize: 16,
    },
    bellBtn: {
        padding: 4,
    },
});
