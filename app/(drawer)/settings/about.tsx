import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
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

const PURPLE = '#E18DFF';
const CORAL = '#E89B8C';
export default function AboutScreen() {
    const router = useRouter();
    const { colors, isDark } = useAppColors();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>About HerDeen</Text>
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
                <Text style={[styles.aboutText, { color: colors.text }]}>
                    Most muslimah struggle to balance their deen wih life and they don't realise that missing a single prayer or reflection can disrupt their balance. In fact, neglecting spiritual routines can lead to feelings of guilt, anxiety, and disconnection. Every momentcounts, and a single missed oportunity for reflections and prayers can impact physical, mental and emotional wellbeing. HerDeen is designed to help you stay connected with your deen by providing gentle reminders and support to nuture your spiritual growth and daily harmony.
                </Text>

                {/* Links */}
                <View style={styles.linksContainer}>
                    <TouchableOpacity style={[styles.linkCard, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.linkText, { color: colors.text }]}>Terms of Service</Text>
                        <IconSymbol name="chevron.right" size={20} color={colors.textMuted} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.linkCard, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.linkText, { color: colors.text }]}>Privacy Policy</Text>
                        <IconSymbol name="chevron.right" size={20} color={colors.textMuted} />
                    </TouchableOpacity>
                </View>

                {/* Version */}
                <Text style={[styles.versionText, { color: colors.textMuted }]}>Version 1.0</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#13181C',
    },
    safeArea: {
        backgroundColor: '#13181C',
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
        color: '#FFFFFF',
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
        color: '#FFFFFF',
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
        borderBottomColor: '#5B6268',
    },
    linkText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    versionText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FFFFFFB2',
        textAlign: 'center',
        marginTop: 40,
    },
});
