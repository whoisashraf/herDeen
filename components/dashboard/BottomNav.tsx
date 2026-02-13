import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Approximate height of the bottom nav bar (for scroll content padding). */
export const BOTTOM_NAV_HEIGHT = 88;

export const BottomNav = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    // Active color from the design looks like a lavender purple
    const activeColor = '#E18DFF';
    const inactiveColor = '#8E8E93';

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                    borderTopColor: colors.surface,
                    zIndex: 999,
                    paddingBottom: 12 + insets.bottom,
                },
            ]}>
            <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push('/')}
            >
                <IconSymbol
                    name="house.fill"
                    size={24}
                    color={pathname === '/' || pathname === '/(drawer)' ? activeColor : inactiveColor}
                />
                <ThemedText
                    type="poppins-medium"
                    style={[styles.navText, { color: pathname === '/' || pathname === '/(drawer)' ? activeColor : inactiveColor }]}
                >
                    Home
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push('/journal')}
            >
                <IconSymbol
                    name="book"
                    size={24}
                    color={pathname.includes('/journal') ? activeColor : inactiveColor}
                />
                <ThemedText type="poppins-medium" style={[styles.navText, { color: pathname.includes('/journal') ? activeColor : inactiveColor }]}>
                    Journal
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push('/quran')}
            >
                <IconSymbol
                    name="book.pages"
                    size={24}
                    color={pathname.includes('/quran') ? activeColor : inactiveColor}
                />
                <ThemedText
                    type="poppins-medium"
                    style={[styles.navText, { color: pathname.includes('/quran') ? activeColor : inactiveColor }]}
                >
                    Quran
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push('/tracker')}
            >
                <IconSymbol
                    name="drop"
                    size={24}
                    color={pathname.includes('/tracker') ? activeColor : inactiveColor}
                />
                <ThemedText type="poppins-medium" style={[styles.navText, { color: pathname.includes('/tracker') ? activeColor : inactiveColor }]}>
                    Hayd
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push('/settings')}
            >
                <Image
                    source={require('@/assets/images/profile.jpg')}
                    style={[styles.profileIcon, { borderColor: pathname.includes('/settings') ? activeColor : 'transparent' }]}
                />
                <ThemedText type="poppins-medium" style={[styles.navText, { color: pathname.includes('/settings') ? activeColor : inactiveColor }]}>
                    Me
                </ThemedText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
        flex: 1,
    },
    navText: {
        fontSize: 11,
    },
    profileIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
    },
});
