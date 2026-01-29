import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const PURPLE = '#5C1E68';
const CORAL = '#E89B8C';
const TEXT_GRAY = '#1A1A1A';
const BG_COLOR = '#F9F9F9';

export default function AboutScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={TEXT_GRAY} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>About HerDeen</Text>
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* App Logo */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/about_logo.png')}
                        style={styles.appIcon}
                        resizeMode="contain"
                    />
                    <View style={styles.logoTextContainer}>
                        <Text style={styles.logoTextHer}>Her</Text>
                        <Text style={styles.logoTextDeen}>Deen</Text>
                    </View>
                </View>

                {/* About Text */}
                <Text style={styles.aboutText}>
                    Most muslimah struggle to balance their deen wih life and they don't realise that missing a single prayer or reflection can disrupt their balance. In fact, neglecting spiritual routines can lead to feelings of guilt, anxiety, and disconnection. Every momentcounts, and a single missed oportunity for reflections and prayers can impact physical, mental and emotional wellbeing. HerDeen is designed to help you stay connected with your deen by providing gentle reminders and support to nuture your spiritual growth and daily harmony.
                </Text>

                {/* Links */}
                <View style={styles.linksContainer}>
                    <TouchableOpacity style={styles.linkCard}>
                        <Text style={styles.linkText}>Terms of Service</Text>
                        <IconSymbol name="chevron.right" size={20} color="#D6BCDB" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.linkCard}>
                        <Text style={styles.linkText}>Privacy Policy</Text>
                        <IconSymbol name="chevron.right" size={20} color="#D6BCDB" />
                    </TouchableOpacity>
                </View>

                {/* Version */}
                <Text style={styles.versionText}>Version 1.0</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    safeArea: {
        backgroundColor: BG_COLOR,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: TEXT_GRAY,
        marginLeft: 12,
    },
    scrollContent: {
        padding: 32,
        paddingBottom: 40,
    },
    logoContainer: {
        alignItems: 'flex-start',
        marginBottom: 32,
    },
    appIcon: {
        width: 130,
        height: 130,
        borderRadius: 15,
        marginBottom: 16,
    },
    logoTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoTextHer: {
        fontSize: 36,
        fontWeight: '700',
        color: PURPLE,
    },
    logoTextDeen: {
        fontSize: 36,
        fontWeight: '700',
        color: CORAL,
    },
    aboutText: {
        fontSize: 15,
        fontWeight: '400',
        color: TEXT_GRAY,
        lineHeight: 26,
        marginBottom: 40,
        textAlign: 'left',
    },
    linksContainer: {
        marginBottom: 32,
    },
    linkCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    linkText: {
        fontSize: 16,
        fontWeight: '500',
        color: TEXT_GRAY,
    },
    versionText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#8A8A8E',
        textAlign: 'center',
        marginTop: 40,
    },
});
