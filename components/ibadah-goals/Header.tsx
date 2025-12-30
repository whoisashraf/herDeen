import { IconSymbol } from '@/components/ui/icon-symbol';
import { DrawerActions } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
    const navigation = useNavigation();
    const toggleDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <View style={styles.avatarContainer}>
                    <Image source={require('@/assets/images/profile.jpg')} style={styles.avatarImage} contentFit="cover" placeholder={null} transition={1000} />
                </View>
                <View>
                    <Text style={styles.greetingText}>Assalamu Alaikum,</Text>
                    <Text style={styles.userNameText}>Aisha!</Text>
                </View>
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity>
                    <IconSymbol name="bell" size={24} color="#374151" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleDrawer}>
                    <IconSymbol name="line.3.horizontal" size={24} color="#374151" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    greetingText: {
        fontSize: 14,
        color: '#6B7280',
    },
    userNameText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#2F0633',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    }
});