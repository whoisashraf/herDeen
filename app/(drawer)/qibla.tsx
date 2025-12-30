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

            // Calculate bearing to Kaaba
            const dLon = (kaabaLon - userLon) * Math.PI / 180;
            const lat1 = userLat * Math.PI / 180;
            const lat2 = kaabaLat * Math.PI / 180;

            const y = Math.sin(dLon) * Math.cos(lat2);
            const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            const bearing = Math.atan2(y, x) * 180 / Math.PI;

            setQiblaDirection((bearing + 360) % 360);

            // Calculate distance using Haversine formula
            const R = 6371; // Earth's radius in km
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
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <ThemedText type="poppins-semibold" style={styles.headerTitle}>
                    Qibla Compass
                </ThemedText>
                <View style={styles.placeholder} />
            </View>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                <View style={styles.mapContent}>
                    {/* Map Background Pattern */}
                    <View style={styles.mapGrid}>
                        {[...Array(6)].map((_, i) => (
                            <View key={`h-${i}`} style={styles.gridLineHorizontal} />
                        ))}
                        {[...Array(6)].map((_, i) => (
                            <View key={`v-${i}`} style={styles.gridLineVertical} />
                        ))}
                    </View>

                    {/* User Location Marker */}
                    <View style={styles.userMarker}>
                        <View style={styles.userMarkerInner}>
                            <View style={styles.userMarkerDot} />
                        </View>
                        <ThemedText type="poppins-semibold" style={styles.markerLabel}>
                            {location ? location.coords.latitude.toFixed(1) + '°N' : 'You'}
                        </ThemedText>
                    </View>

                    {/* Kaaba Marker */}
                    <View style={styles.kaabaMarker}>
                        <IconSymbol name="building.2" size={24} color="#FFFFFF" />
                        <ThemedText type="poppins-semibold" style={styles.kaabaLabel}>
                            Saudi Arabia
                        </ThemedText>
                    </View>

                    {/* Connection Line */}
                    <View style={styles.connectionLine} />

                    {/* Direction Badge */}
                    <View style={styles.directionBadge}>
                        <ThemedText type="poppins-bold" style={styles.directionBadgeText}>
                            {qiblaDirection.toFixed(0)}° NE
                        </ThemedText>
                    </View>
                </View>
            </View>

            {/* Compass Section */}
            <View style={styles.compassSection}>
                <View style={styles.compassContainer}>
                    {/* Compass Background */}
                    <View style={styles.compassBackground}>
                        {/* Outer Circle */}
                        <View style={styles.compassOuterCircle}>
                            {/* Inner Circle */}
                            <View style={styles.compassInnerCircle}>
                                {/* Cardinal Directions */}
                                <View style={styles.cardinalContainer}>
                                    <ThemedText type="poppins-semibold" style={[styles.cardinal, styles.cardinalN]}>N</ThemedText>
                                    <ThemedText type="poppins-semibold" style={[styles.cardinal, styles.cardinalE]}>E</ThemedText>
                                    <ThemedText type="poppins-semibold" style={[styles.cardinal, styles.cardinalS]}>S</ThemedText>
                                    <ThemedText type="poppins-semibold" style={[styles.cardinal, styles.cardinalW]}>W</ThemedText>
                                </View>

                                {/* Compass Rose */}
                                <View style={styles.compassRose}>
                                    <View style={styles.compassNeedle} />
                                    <View style={[styles.compassNeedle, styles.compassNeedleHorizontal]} />
                                    <View style={[styles.compassNeedle, styles.compassNeedleDiagonal1]} />
                                    <View style={[styles.compassNeedle, styles.compassNeedleDiagonal2]} />

                                    {/* Center Circle */}
                                    <View style={styles.compassCenter} />
                                </View>

                                {/* Kaaba Icon */}
                                <View
                                    style={[
                                        styles.kaabaIcon,
                                        { transform: [{ rotate: `${qiblaDirection}deg` }] }
                                    ]}
                                >
                                    <View style={styles.kaabaIconInner}>
                                        <IconSymbol name="building.2" size={20} color="#1A1A1A" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Distance Text */}
                <ThemedText type="poppins-medium" style={styles.distanceText}>
                    Distance to kaabah is {distance.toFixed(2)} KM
                </ThemedText>
            </View>
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
        backgroundColor: '#FFFFFF',
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
    placeholder: {
        width: 40,
    },
    mapContainer: {
        height: 250,
        backgroundColor: '#D4E8F7',
        margin: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    mapContent: {
        flex: 1,
        position: 'relative',
    },
    mapGrid: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
    },
    gridLineHorizontal: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        width: '100%',
    },
    gridLineVertical: {
        position: 'absolute',
        width: 1,
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        left: `${100 / 6}%`,
    },
    userMarker: {
        position: 'absolute',
        left: 40,
        bottom: 60,
        alignItems: 'center',
    },
    userMarkerInner: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#62206E',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    userMarkerDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
    },
    markerLabel: {
        fontSize: 12,
        color: '#1A1A1A',
        marginTop: 4,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    kaabaMarker: {
        position: 'absolute',
        right: 40,
        top: 40,
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        padding: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    kaabaLabel: {
        fontSize: 10,
        color: '#FFFFFF',
        marginTop: 4,
    },
    connectionLine: {
        position: 'absolute',
        left: 60,
        bottom: 80,
        width: width - 140,
        height: 2,
        backgroundColor: '#62206E',
        transform: [{ rotate: '25deg' }],
        borderStyle: 'dashed',
    },
    directionBadge: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    directionBadgeText: {
        fontSize: 18,
        color: '#62206E',
    },
    compassSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    compassContainer: {
        width: width * 0.7,
        height: width * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    compassBackground: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    compassOuterCircle: {
        width: '100%',
        height: '100%',
        borderRadius: width * 0.35,
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    compassInnerCircle: {
        width: '85%',
        height: '85%',
        borderRadius: width * 0.3,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    cardinalContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    cardinal: {
        position: 'absolute',
        fontSize: 20,
        color: '#62206E',
    },
    cardinalN: {
        top: 20,
        left: '50%',
        transform: [{ translateX: -10 }],
    },
    cardinalE: {
        right: 20,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    cardinalS: {
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -10 }],
    },
    cardinalW: {
        left: 20,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    compassRose: {
        width: '60%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    compassNeedle: {
        position: 'absolute',
        width: 4,
        height: '100%',
        backgroundColor: '#62206E',
    },
    compassNeedleHorizontal: {
        width: '100%',
        height: 4,
    },
    compassNeedleDiagonal1: {
        transform: [{ rotate: '45deg' }],
    },
    compassNeedleDiagonal2: {
        transform: [{ rotate: '-45deg' }],
    },
    compassCenter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FF6B35',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    kaabaIcon: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -20 }],
    },
    kaabaIconInner: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    distanceText: {
        fontSize: 16,
        color: '#4A4A4A',
        marginTop: 40,
    },
});
