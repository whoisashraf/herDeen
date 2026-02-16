import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { QIBLA_DIRECTION_LIGHT_SVG } from '@/constants/qibla-direction-light-svg';
import { QIBLA_DIRECTION_SVG } from '@/constants/qibla-direction-svg';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Location from 'expo-location';
import { Stack, useRouter } from 'expo-router';
import { Magnetometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

const { width } = Dimensions.get('window');
const COMPASS_WIDTH = Math.min(width - 20, 375);
const DARK_COMPASS_ASPECT_RATIO = 493 / 375;
const LIGHT_COMPASS_ASPECT_RATIO = 541 / 375;
const SVG_POINTER_BASE_BEARING = 309.4;

export default function QiblaScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const isDark = colorScheme === 'dark';
    const colors = Colors[colorScheme];
    const insets = useSafeAreaInsets();
    const compassHeight = COMPASS_WIDTH * (isDark ? DARK_COMPASS_ASPECT_RATIO : LIGHT_COMPASS_ASPECT_RATIO);
    const qiblaSvg = isDark ? QIBLA_DIRECTION_SVG : QIBLA_DIRECTION_LIGHT_SVG;

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
        });

        Magnetometer.setUpdateInterval(100);

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        const relativeBearing = (qiblaAngle - heading + 360) % 360;
        const targetRotation = relativeBearing - SVG_POINTER_BASE_BEARING;
        rotation.value = withSpring(targetRotation, { damping: 20, stiffness: 100 });
    }, [heading, qiblaAngle, rotation]);

    const animatedCompassStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const getDirectionText = (degree: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(degree / 45) % 8];
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
                        onPress={() => router.push('/prayer-times/prayer-settings')}
                        style={[styles.headerBtn, { backgroundColor: colors.surface }]}
                    >
                        <IconSymbol name="hexagon" size={20} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Compass Container */}
                <View style={styles.compassMainContainer}>
                    <Animated.View style={[styles.compassSvgWrapper, { width: COMPASS_WIDTH, height: compassHeight }, animatedCompassStyle]}>
                        <SvgXml xml={qiblaSvg} width={COMPASS_WIDTH} height={compassHeight} />
                    </Animated.View>

                    {/* Center readout stays static while compass rotates */}
                    <View style={[styles.innerDisplay, { backgroundColor: isDark ? '#1A1D22' : '#F1F2F4' }]}>
                        <View style={styles.innerDisplayTextContainer}>
                            <ThemedText type="poppins-semibold" style={[styles.headingDegree, { color: colors.text }]}>
                                {heading}°
                            </ThemedText>
                            <ThemedText type="poppins-regular" style={[styles.headingDirection, { color: colors.textMuted }]}>
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
    compassSvgWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerDisplay: {
        position: 'absolute',
        width: 130,
        height: 130,
        borderRadius: 65,
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
        fontSize: 28,
    },
    headingDirection: {
        fontSize: 14,
        marginTop: -4,
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
