import { BottomNav } from '@/components/dashboard/BottomNav';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function QiblaScreen() {
    const router = useRouter();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [qiblaDirection, setQiblaDirection] = useState(0);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // Calculate Qibla direction (Kaaba coordinates: 21.4225, 39.8262)
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

            setQiblaDirection((bearing + 360) % 360);

            const R = 6371;
            const dLat = (kaabaLat - userLat) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;

            setDistance(distance);
        })();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: '#090909' }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
                    <IconSymbol name="arrow.left" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <ThemedText type="poppins-bold" style={styles.headerTitle}>Qibla</ThemedText>
                    <ThemedText type="poppins-regular" style={styles.headerSubtitle}>Compass</ThemedText>
                </View>
                <TouchableOpacity style={styles.headerIconButton}>
                    <IconSymbol name="location.fill" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Main Compass UI */}
            <View style={styles.content}>
                <View style={styles.directionInfo}>
                    <ThemedText type="poppins-bold" style={styles.directionDegrees}>{qiblaDirection.toFixed(0)}°</ThemedText>
                    <ThemedText type="poppins-medium" style={styles.directionText}>North East</ThemedText>
                </View>

                <View style={styles.compassContainer}>
                    <View style={styles.outerGlow} />
                    <View style={styles.outerRing}>
                        <View style={styles.innerRing}>
                            <View style={styles.cardinalRow}>
                                <ThemedText type="poppins-bold" style={styles.cardinalText}>N</ThemedText>
                            </View>
                            <View style={[styles.cardinalRow, styles.cardinalRowE]}>
                                <ThemedText type="poppins-bold" style={styles.cardinalText}>E</ThemedText>
                            </View>
                            <View style={[styles.cardinalRow, styles.cardinalRowS]}>
                                <ThemedText type="poppins-bold" style={styles.cardinalText}>S</ThemedText>
                            </View>
                            <View style={[styles.cardinalRow, styles.cardinalRowW]}>
                                <ThemedText type="poppins-bold" style={styles.cardinalText}>W</ThemedText>
                            </View>

                            {/* Rotation needed for compass effect */}
                            <View
                                style={[
                                    styles.needleContainer,
                                    { transform: [{ rotate: `${qiblaDirection}deg` }] }
                                ]}
                            >
                                <View style={styles.needlePointer} />
                                <View style={styles.kaabaIconBox}>
                                    <IconSymbol name="building.2.fill" size={24} color="white" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomInfo}>
                    <View style={styles.infoPill}>
                        <IconSymbol name="map.fill" size={16} color="#AA74E0" />
                        <ThemedText type="poppins-medium" style={styles.infoPillText}>
                            Distance: {distance.toFixed(0)} KM
                        </ThemedText>
                    </View>
                </View>
            </View>

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
        alignItems: 'center',
        paddingTop: 40,
    },
    directionInfo: {
        alignItems: 'center',
        marginBottom: 40,
    },
    directionDegrees: {
        fontSize: 48,
        color: 'white',
    },
    directionText: {
        fontSize: 16,
        color: '#AA74E0',
    },
    compassContainer: {
        width: width * 0.8,
        height: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerGlow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: width * 0.4,
        backgroundColor: '#AA74E0',
        opacity: 0.05,
    },
    outerRing: {
        width: '90%',
        height: '90%',
        borderRadius: width * 0.36,
        borderWidth: 2,
        borderColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerRing: {
        width: '95%',
        height: '95%',
        borderRadius: width * 0.34,
        backgroundColor: '#111111',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardinalRow: {
        position: 'absolute',
        top: 20,
    },
    cardinalRowE: {
        top: '50%',
        right: 20,
        transform: [{ translateY: -10 }],
    },
    cardinalRowS: {
        bottom: 20,
        top: 'auto',
    },
    cardinalRowW: {
        top: '50%',
        left: 20,
        transform: [{ translateY: -10 }],
    },
    cardinalText: {
        color: '#8E8E93',
        fontSize: 16,
    },
    needleContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    needlePointer: {
        width: 4,
        height: '80%',
        backgroundColor: '#1C1C1E',
        borderRadius: 2,
    },
    kaabaIconBox: {
        position: 'absolute',
        top: 20,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#AA74E0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#090909',
    },
    bottomInfo: {
        marginTop: 60,
    },
    infoPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 8,
        borderWidth: 1,
        borderColor: '#262626',
    },
    infoPillText: {
        color: 'white',
        fontSize: 14,
    },
});
