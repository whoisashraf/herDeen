import { ActionGrid } from '@/components/tracker/ActionGrid';
import { CycleHistory } from '@/components/tracker/CycleHistory';
import { CycleStatusCard } from '@/components/tracker/CycleStatusCard';
import { MyCycles } from '@/components/tracker/MyCycles';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DrawerActions } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function TrackerScreen() {
    const navigation = useNavigation();

    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={styles.container}>
            {/* Background with pattern - using header_bg but masking it with gradient if needed */}
            <ImageBackground
                source={require('@/assets/images/header_bg.jpg')}
                style={styles.headerBackground}
                imageStyle={{ opacity: 0.1 }}
            >
                <View style={styles.safeArea}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <View style={styles.avatarContainer}>
                                <Image source={require('@/assets/images/profile.jpg')} style={styles.avatar} contentFit="cover" />
                            </View>
                            <View>
                                <Text style={styles.greetingGreeting}>Assalamu Alaikum,</Text>
                                <Text style={styles.greetingName}>Aisha!</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
                            <IconSymbol name="line.3.horizontal" size={24} color="#1F2937" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                        <CycleStatusCard />
                        <ActionGrid />
                        <MyCycles />
                        <CycleHistory />
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    headerBackground: {
        flex: 1,
        width: '100%',
    },
    safeArea: {
        flex: 1,
        paddingTop: 60,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: '#7F47DD',
        padding: 2,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
    },
    greetingGreeting: {
        fontSize: 12,
        color: '#6B7280',
    },
    greetingName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    menuButton: {
        padding: 4,
    },
});
