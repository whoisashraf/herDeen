import { PrayerTimesCard } from '@/components/dashboard/PrayerTimesCard';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRAYER_TIMES = [
    { id: '1', name: 'Fajr', adhanTime: '04:48', iqamaTime: '05:32', subtitle: 'Rising', icon: 'sunrise', isMuted: true, isCurrent: false },
    { id: '2', name: 'Dhuhr', adhanTime: '12:20', icon: 'sun.max', isMuted: false, isCurrent: false },
    { id: '3', name: 'Asr', adhanTime: '16:14', icon: 'sun.min', isMuted: false, isCurrent: true },
    { id: '4', name: 'Maghrib', adhanTime: '18:43', icon: 'moon.stars', isMuted: true, isCurrent: false },
    { id: '5', name: 'Isha', adhanTime: '19:50', icon: 'moon', isMuted: true, isCurrent: false },
];

export default function PrayerTimesScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const isLight = colorScheme === 'light';
    const isDark = !isLight;
    const insets = useSafeAreaInsets();

    const pageBackground = isLight ? '#FFFFFF' : '#10131B';
    const cardBackground = isLight ? '#ECECEC' : '#1B1F2A';
    const rightActionBackground = isLight ? '#ECECEC' : '#1C202A';
    const headingColor = isLight ? '#151C24' : '#B9BEC7';
    const bodyTextColor = isLight ? '#5E6670' : '#707782';
    const rowIconColor = isLight ? '#D17FF5' : '#B97AED';
    const activeRowColor = isLight ? '#CA80EE' : '#A874DE';
    const activeTextColor = '#FFFFFF';
    const speakerColor = isLight ? '#CC81ED' : '#B97AED';
    const headerContentColor = colors.text;
    const headerButtonBg = colors.surface;
    const headerRow = (
        <View
            style={[
                styles.homeHeaderContainer,
                {
                    backgroundColor: colors.background,
                    paddingTop: insets.top + 12,
                },
            ]}>
            <View style={styles.homeHeaderLeft}>
                <TouchableOpacity onPress={() => router.back()} style={[styles.homeHeaderIconButton, { backgroundColor: headerButtonBg }]}>
                    <IconSymbol name="arrow.left" size={20} color={headerContentColor} />
                </TouchableOpacity>
                <ThemedText type="poppins-bold" style={[styles.homeHeaderTitle, { color: headerContentColor }]}>
                    Prayer
                </ThemedText>
            </View>
            <View style={styles.homeHeaderRight}>
                <TouchableOpacity
                    onPress={() => router.push('/prayer-times/prayer-settings')}
                    style={[styles.homeHeaderIconButton, { backgroundColor: headerButtonBg }]}
                >
                    <IconSymbol name="hexagon" size={20} color={headerContentColor} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: pageBackground }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {headerRow}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 36 }]}
            >
                <PrayerTimesCard
                    greeting="Ilroin East"
                    todayLabel=""
                    hijriDate="17 Ramadan, 1447"
                    gregorianDate="40 Jan, 2025"
                    prayerLabel="Asr"
                    prayerTime="16:14"
                    countdown="-05:37:43"
                    containerStyle={styles.homePrayerCardContainer}
                />

                <View style={styles.prayerList}>
                    {PRAYER_TIMES.map((prayer) => (
                        <View key={prayer.id} style={styles.prayerContainer}>
                            {isDark && !prayer.isCurrent ? (
                                <LinearGradient
                                    colors={['#1A1F2A', '#1D222D']}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    style={[styles.prayerItem, styles.darkRowOutline]}
                                >
                                    <View style={styles.prayerLeft}>
                                        <View style={[styles.iconBox, { backgroundColor: isLight ? '#F5F5F5' : '#0F131C' }]}>
                                            <IconSymbol
                                                name={prayer.icon}
                                                size={26}
                                                color={rowIconColor}
                                            />
                                        </View>
                                        <View>
                                            <ThemedText type="poppins-semibold" style={[styles.prayerName, { color: prayer.isCurrent ? activeTextColor : headingColor }]}>
                                                {prayer.name}{prayer.isCurrent ? ' (now)' : ''}
                                            </ThemedText>
                                            {prayer.subtitle && (
                                                <ThemedText type="poppins-regular" style={[styles.subLabel, { color: prayer.isCurrent ? '#F8EFFF' : bodyTextColor }]}>
                                                    {prayer.subtitle}
                                                </ThemedText>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.prayerRight}>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <ThemedText type="poppins-regular" style={[styles.prayerTime, { color: prayer.isCurrent ? activeTextColor : headingColor }]}>
                                                {prayer.adhanTime}
                                            </ThemedText>
                                            {prayer.iqamaTime && (
                                                <ThemedText type="poppins-regular" style={[styles.subTimeLabel, { color: prayer.isCurrent ? '#F8EFFF' : bodyTextColor }]}>
                                                    {prayer.iqamaTime}
                                                </ThemedText>
                                            )}
                                        </View>
                                    </View>
                                </LinearGradient>
                            ) : (
                                <View
                                    style={[
                                        styles.prayerItem,
                                        { backgroundColor: prayer.isCurrent ? activeRowColor : cardBackground },
                                        isLight && !prayer.isCurrent && styles.lightCardShadow,
                                        isDark && styles.darkRowOutline,
                                    ]}
                                >
                                    <View style={styles.prayerLeft}>
                                        <View style={[styles.iconBox, { backgroundColor: isLight ? '#F5F5F5' : '#0F131C' }]}>
                                            <IconSymbol
                                                name={prayer.icon}
                                                size={26}
                                                color={rowIconColor}
                                            />
                                        </View>
                                        <View>
                                            <ThemedText type="poppins-semibold" style={[styles.prayerName, { color: prayer.isCurrent ? activeTextColor : headingColor }]}>
                                                {prayer.name}{prayer.isCurrent ? ' (now)' : ''}
                                            </ThemedText>
                                            {prayer.subtitle && (
                                                <ThemedText type="poppins-regular" style={[styles.subLabel, { color: prayer.isCurrent ? '#F8EFFF' : bodyTextColor }]}>
                                                    {prayer.subtitle}
                                                </ThemedText>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.prayerRight}>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <ThemedText type="poppins-regular" style={[styles.prayerTime, { color: prayer.isCurrent ? activeTextColor : headingColor }]}>
                                                {prayer.adhanTime}
                                            </ThemedText>
                                            {prayer.iqamaTime && (
                                                <ThemedText type="poppins-regular" style={[styles.subTimeLabel, { color: prayer.isCurrent ? '#F8EFFF' : bodyTextColor }]}>
                                                    {prayer.iqamaTime}
                                                </ThemedText>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            )}
                            <TouchableOpacity style={[styles.speakerBtn, { backgroundColor: rightActionBackground }, isLight && styles.lightCardShadow, isDark && styles.darkRowOutline]}>
                                <IconSymbol
                                    name={prayer.isMuted ? 'speaker.slash.fill' : 'speaker.wave.2.fill'}
                                    size={24}
                                    color={speakerColor}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    homeHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    homeHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    homeHeaderRight: {
        flexDirection: 'row',
        gap: 12,
    },
    homeHeaderIconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeHeaderTitle: {
        fontSize: 16,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 34,
    },
    homePrayerCardContainer: {
        marginBottom: 22,
    },
    prayerList: {
        gap: 12,
    },
    prayerContainer: {
        flexDirection: 'row',
        gap: 8,
        height: 90,
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
        gap: 13,
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prayerName: {
        fontSize: 19,
        lineHeight: 26,
    },
    subLabel: {
        fontSize: 13.5,
        lineHeight: 18,
    },
    prayerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    prayerTime: {
        fontSize: 19,
        lineHeight: 26,
    },
    subTimeLabel: {
        fontSize: 15,
        lineHeight: 20,
        marginTop: -1,
    },
    speakerBtn: {
        width: 64,
        height: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightCardShadow: {
        shadowColor: '#B0B5BC',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.14,
        shadowRadius: 14,
        elevation: 3,
    },
    darkRowOutline: {
        borderWidth: 1,
        borderColor: '#222735',
    },
});
