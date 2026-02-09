import { BottomNav } from '@/components/dashboard/BottomNav';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRAYER_TIMES = [
    { id: '1', name: 'Fajr', adhanTime: '04:48', iqamaTime: '05:32', icon: require('@/assets/icons/Pray Time - 3D Ramadhan Illustration Pack (Front).png'), isMuted: true, isCurrent: false },
    { id: '2', name: 'Dhuhr', adhanTime: '12:20', icon: require('@/assets/icons/Pray Time - 3D Ramadhan Illustration Pack (Front).png'), isMuted: false, isCurrent: false },
    { id: '3', name: 'Asr', adhanTime: '16:14', icon: require('@/assets/icons/Pray Time - 3D Ramadhan Illustration Pack (Front).png'), isMuted: false, isCurrent: true },
    { id: '4', name: 'Maghrib', adhanTime: '18:43', icon: require('@/assets/icons/Pray Time - 3D Ramadhan Illustration Pack (Front).png'), isMuted: true, isCurrent: false },
    { id: '5', name: 'Isha', adhanTime: '19:50', icon: require('@/assets/icons/Pray Time - 3D Ramadhan Illustration Pack (Front).png'), isMuted: true, isCurrent: false },
];

export default function PrayerTimesScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.headerBtn, { backgroundColor: colors.surface }]}>
                    <IconSymbol name="arrow.left" size={20} color={colors.text} />
                </TouchableOpacity>
                <ThemedText type="poppins-bold" style={[styles.headerTitle, { color: colors.text }]}>Prayer</ThemedText>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                    onPress={() => router.push('/settings/prayer-settings')}
                    style={[styles.headerBtn, { backgroundColor: colors.surface }]}
                >
                    <IconSymbol name="hexagon" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Date & Location Banner */}
                <View style={[styles.bannerContainer, { backgroundColor: '#AA74E0' }]}>
                    <ImageBackground
                        source={require('@/assets/images/bg-image.png')}
                        style={styles.bannerBackground}
                        imageStyle={{ borderRadius: 28, opacity: 1 }}
                        resizeMode="cover"
                    >
                        <View style={styles.bannerContent}>
                            <View>
                                <View style={styles.bannerLocation}>
                                    <IconSymbol name="location.fill" size={14} color="white" />
                                    <ThemedText type="poppins-medium" style={[styles.locationText, { color: "white" }]}>Ilorin East</ThemedText>
                                </View>
                                <ThemedText type="poppins-bold" style={[styles.bannerDate, { color: "white" }]}>17 Ramadan, 1447</ThemedText>
                                <ThemedText type="poppins-medium" style={[styles.bannerDay, { color: "white" }]}>40 Jan, 2025</ThemedText>
                            </View>

                            <View style={styles.circularProgress}>
                                <ThemedText type="poppins-regular" style={[styles.hijriYear, { color: "white", opacity: 0.8 }]}>Asr</ThemedText>
                                <ThemedText type="poppins-bold" style={[styles.hijriText, { color: "white" }]}>16:14</ThemedText>
                                <ThemedText type="poppins-regular" style={[styles.hijriYear, { color: "white", opacity: 0.8 }]}>-05:37:43</ThemedText>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* Prayer List */}
                <View style={styles.prayerList}>
                    {PRAYER_TIMES.map((prayer) => (
                        <View key={prayer.id} style={styles.prayerContainer}>
                            <View
                                style={[
                                    styles.prayerItem,
                                    { backgroundColor: prayer.isCurrent ? '#AA74E0' : colors.surface },
                                ]}
                            >
                                <View style={styles.prayerLeft}>
                                    <View style={[styles.iconBox, { backgroundColor: prayer.isCurrent ? 'rgba(255,255,255,0.2)' : colors.background }]}>
                                        <Image
                                            source={prayer.icon}
                                            style={[styles.prayerIcon, { tintColor: prayer.isCurrent ? 'white' : colors.text }]}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View>
                                        <ThemedText type="poppins-bold" style={[styles.prayerName, { color: prayer.isCurrent ? 'white' : colors.text }]}>
                                            {prayer.name}{prayer.isCurrent ? ' (now)' : ''}
                                        </ThemedText>
                                        {prayer.name === 'Fajr' && (
                                            <ThemedText type="poppins-regular" style={[styles.subLabel, { color: prayer.isCurrent ? 'white' : colors.textMuted }]}>
                                                Rising
                                            </ThemedText>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.prayerRight}>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <ThemedText type="poppins-bold" style={[styles.prayerTime, { color: prayer.isCurrent ? 'white' : colors.text }]}>
                                            {prayer.adhanTime}
                                        </ThemedText>
                                        {prayer.name === 'Fajr' && (
                                            <ThemedText type="poppins-regular" style={[styles.subTimeLabel, { color: prayer.isCurrent ? 'white' : colors.textMuted }]}>
                                                05:32
                                            </ThemedText>
                                        )}
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={[styles.speakerBtn, { backgroundColor: colors.surface }]}>
                                <IconSymbol
                                    name={prayer.isMuted ? 'speaker.slash.fill' : 'speaker.wave.2.fill'}
                                    size={20}
                                    color={prayer.isMuted ? colors.textMuted : colors.text}
                                />
                            </TouchableOpacity>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    headerBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    headerTitle: {
        fontSize: 20,
        color: '#1A1C1E',
        marginLeft: 16,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    bannerContainer: {
        height: 180,
        borderRadius: 28,
        overflow: 'hidden',
        marginBottom: 24,
    },
    bannerBackground: {
        flex: 1,
        padding: 24,
    },
    bannerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    bannerDay: {
        fontSize: 14,
        opacity: 0.9,
    },
    bannerDate: {
        fontSize: 18,
        marginVertical: 4,
    },
    bannerLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationText: {
        fontSize: 12,
    },
    circularProgress: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftColor: '#FFFFFF',
    },
    hijriText: {
        fontSize: 24,
    },
    hijriYear: {
        fontSize: 11,
    },
    prayerList: {
        gap: 12,
    },
    prayerContainer: {
        flexDirection: 'row',
        gap: 8,
        height: 80,
    },
    prayerItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    prayerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prayerIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    prayerName: {
        fontSize: 16,
    },
    subLabel: {
        fontSize: 12,
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
    subTimeLabel: {
        fontSize: 12,
        marginTop: -2,
    },
    speakerBtn: {
        width: 60,
        height: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
