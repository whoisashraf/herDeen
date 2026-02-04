import { BottomNav } from '@/components/dashboard/BottomNav';
import { ThemedText } from '@/components/themed-text';
import { ActionGrid } from '@/components/tracker/ActionGrid';
import { CycleHistory } from '@/components/tracker/CycleHistory';
import { CycleStatusCard } from '@/components/tracker/CycleStatusCard';
import { MyCycles } from '@/components/tracker/MyCycles';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function TrackerScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    return (
        <View style={[styles.container, { backgroundColor: '#090909' }]}>
            <View style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
                        <IconSymbol name="arrow.left" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={styles.headerTitleContainer}>
                        <ThemedText type="poppins-bold" style={styles.headerTitle}>Menstrual Tracker</ThemedText>
                        <ThemedText type="poppins-regular" style={styles.headerSubtitle}>Day 12 • Follicular Phase</ThemedText>
                    </View>

                    <TouchableOpacity style={styles.headerIconButton}>
                        <IconSymbol name="hexagon" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    {/* Banner similar to Quran */}
                    <View style={styles.bannerContainer}>
                        <ImageBackground
                            source={require('@/assets/images/header_bg.jpg')}
                            style={styles.bannerBackground}
                            imageStyle={{ borderRadius: 24, opacity: 0.1 }}
                        >
                            <View style={styles.bannerContent}>
                                <View>
                                    <ThemedText type="poppins-medium" style={styles.bannerLabel}>PERIOD IN</ThemedText>
                                    <ThemedText type="poppins-bold" style={styles.bannerMainText}>14 Days</ThemedText>
                                    <ThemedText type="poppins-regular" style={styles.bannerSubText}>Low chance of pregnancy</ThemedText>
                                </View>
                                <View style={styles.bannerIconContainer}>
                                    <IconSymbol name="drop.fill" size={40} color="#AA74E0" />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    <CycleStatusCard />
                    <ActionGrid />
                    <MyCycles />
                    <CycleHistory />
                </ScrollView>
            </View>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
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
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
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
        padding: 24,
    },
    bannerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    bannerLabel: {
        fontSize: 12,
        color: '#8E8E93',
        letterSpacing: 1,
        marginBottom: 4,
    },
    bannerMainText: {
        fontSize: 28,
        color: 'white',
        marginBottom: 4,
    },
    bannerSubText: {
        fontSize: 12,
        color: '#AA74E0',
    },
    bannerIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#AA74E01A',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
