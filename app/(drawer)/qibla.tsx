import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Location from 'expo-location';
import { Stack, useRouter } from 'expo-router';
import { Magnetometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.85;

export default function QiblaScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const isDark = colorScheme === 'dark';
    const colors = Colors[colorScheme];
    const insets = useSafeAreaInsets();

    const [qiblaAngle, setQiblaAngle] = useState(0);
    const [heading, setHeading] = useState(0);

    const rotation = useSharedValue(0);

    useEffect(() => {
        (async () => {
            let { status: locStatus } = await Location.requestForegroundPermissionsAsync();
            if (locStatus === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                // Kaaba coordinates: 21.4225, 39.8262
                const kaabaLat = 21.4225;
                const kaabaLon = 39.8262;
                const userLat = location.coords.latitude;
                const userLon = location.coords.longitude;

                const dLon = (kaabaLon - userLon) * Math.PI / 180;
                const lat1 = userLat * Math.PI / 180;
                const lat2 = kaabaLat * Math.PI / 180;

                const y = Math.sin(dLon) * Math.cos(lat2);
                const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
                const bearing = Math.atan2(y, x) * 180 / Math.PI;
                setQiblaAngle((bearing + 360) % 360);
            }
        })();

        const subscription = Magnetometer.addListener(data => {
            let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
            angle = (angle + 360) % 360;
            // Adjust for device orientation if needed, but standard magnetometer is usually enough
            setHeading(Math.round(angle));
            rotation.value = withSpring(-angle, { damping: 20, stiffness: 100 });
        });

        Magnetometer.setUpdateInterval(100);

        return () => subscription.remove();
    }, []);

    const animatedCompassStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const getDirectionText = (degree: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(degree / 45) % 8];
    };

    const renderTicks = () => {
        const ticks = [];
        for (let i = 0; i < 360; i += 30) {
            ticks.push(
                <View key={i} style={[styles.tickContainer, { transform: [{ rotate: `${i}deg` }] }]}>
                    <ThemedText style={[styles.tickText, { color: colors.textMuted }]}>
                        {i}°
                    </ThemedText>
                </View>
            );
        }
        return ticks;
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.container}>
                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                    <TouchableOpacity onPress={() => router.back()} style={[styles.headerBtn, { backgroundColor: colors.surface }]}>
                        <IconSymbol name="arrow.left" size={20} color={colors.text} />
                    </TouchableOpacity>
                    <ThemedText type="poppins-bold" style={[styles.headerTitle, { color: colors.text }]}>
                        Qibla Direction
                    </ThemedText>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                        onPress={() => router.push('/settings/prayer-settings')}
                        style={[styles.headerBtn, { backgroundColor: colors.surface }]}
                    >
                        <IconSymbol name="hexagon" size={20} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Compass Container */}
                <View style={styles.compassMainContainer}>
                    <Animated.View style={[styles.compassWrapper, animatedCompassStyle]}>
                        {/* Outer Labels */}
                        <View style={styles.cardinalContainer}>
                            <ThemedText style={[styles.cardinalN, { color: '#FF3B30' }]}>N</ThemedText>
                            <ThemedText style={[styles.cardinalE, { color: colors.textMuted }]}>E</ThemedText>
                            <ThemedText style={[styles.cardinalS, { color: colors.textMuted }]}>S</ThemedText>
                            <ThemedText style={[styles.cardinalW, { color: colors.textMuted }]}>W</ThemedText>
                        </View>

                        {/* Outer Ring with ticks */}
                        <View style={[styles.outerRing, { borderColor: colors.surface }]}>
                            {renderTicks()}
                        </View>

                        {/* Qibla Pointer */}
                        <View style={[styles.qiblaPointerContainer, { transform: [{ rotate: `${qiblaAngle}deg` }] }]}>
                            <View style={styles.qiblaPointer} />
                        </View>
                    </Animated.View>

                    {/* Static Inner Display */}
                    <View style={[styles.innerDisplay, { backgroundColor: colors.surface }]}>
                        <View style={styles.innerDisplayTextContainer}>
                            <ThemedText style={[styles.headingDegree, { color: colors.text }]}>
                                {heading}°
                            </ThemedText>
                            <ThemedText style={[styles.headingDirection, { color: colors.textMuted }]}>
                                {getDirectionText(heading)}
                            </ThemedText>
                        </View>
                    </View>
                </View>

                {/* Bottom Instructions */}
                <View style={styles.footer}>
                    <ThemedText type="poppins-regular" style={[styles.instructionText, { color: colors.text }]}>
                        To find the Qibla, hold your phone flat and follow the arrow.
                    </ThemedText>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    headerBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
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
        marginLeft: 16,
    },
    compassMainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    compassWrapper: {
        width: COMPASS_SIZE,
        height: COMPASS_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardinalContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    cardinalN: { position: 'absolute', top: -30, left: '50%', transform: [{ translateX: -6 }], fontSize: 20, fontWeight: '700' },
    cardinalE: { position: 'absolute', right: -30, top: '50%', transform: [{ translateY: -12 }], fontSize: 20, fontWeight: '700' },
    cardinalS: { position: 'absolute', bottom: -30, left: '50%', transform: [{ translateX: -6 }], fontSize: 20, fontWeight: '700' },
    cardinalW: { position: 'absolute', left: -30, top: '50%', transform: [{ translateY: -12 }], fontSize: 20, fontWeight: '700' },
    outerRing: {
        width: '90%',
        height: '90%',
        borderRadius: COMPASS_SIZE * 0.45,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tickContainer: {
        position: 'absolute',
        height: '110%',
        width: 40,
        alignItems: 'center',
        paddingTop: 0,
    },
    tickText: {
        fontSize: 10,
        fontFamily: 'Poppins-Regular',
    },
    qiblaPointerContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qiblaPointer: {
        position: 'absolute',
        top: '15%',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 25,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#AA74E0',
    },
    innerDisplay: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    innerDisplayTextContainer: {
        alignItems: 'center',
    },
    headingDegree: {
        fontSize: 32,
        fontFamily: 'Poppins-Bold',
    },
    headingDirection: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        marginTop: -5,
    },
    footer: {
        paddingBottom: 40,
        alignItems: 'center',
    },
    instructionText: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: 30,
    },
});
