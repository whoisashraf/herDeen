import { BOTTOM_NAV_HEIGHT, BottomNav } from '@/components/dashboard/BottomNav';
import { useThemeMode } from '@/contexts/theme-context';
import { ThemePalette, useAppColors } from '@/hooks/use-app-colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth-context'; // Import useAuth

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PURPLE = '#E18DFF';
const BG_COLOR = '#13181C';
const SURFACE = '#1F2125';
const SURFACE_ELEVATED = '#16171A';
const BORDER = '#5B6268';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#FFFFFFB2';
const DANGER = '#FF3B30';

interface SettingsItemProps {
    icon: string;
    label: string;
    subtitle?: string;
    onPress: () => void;
    showBorder?: boolean;
    colors: ThemePalette;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
    icon,
    label,
    subtitle,
    onPress,
    showBorder = true,
    colors,
}) => (
    <View>
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={onPress}
        >
            <View style={styles.itemLeft}>
                <View style={[styles.itemIconTile, { backgroundColor: colors.surface }]}>
                    <IconSymbol name={icon as any} size={22} color={colors.textMuted} />
                </View>
                <View style={styles.itemTextWrap}>
                    <Text style={[styles.itemLabel, { color: colors.text }]} numberOfLines={1} ellipsizeMode="tail">{label}</Text>
                    {subtitle ? (
                        <Text style={[styles.itemSubtitle, { color: colors.textMuted }]} numberOfLines={1} ellipsizeMode="tail">
                            {subtitle}
                        </Text>
                    ) : null}
                </View>
            </View>
            <View style={styles.itemRight}>
                <IconSymbol name="chevron.right" size={24} color={colors.textFaint} />
            </View>
        </TouchableOpacity>
        {showBorder ? <View style={[styles.itemBorder, { borderBottomColor: colors.border }]} /> : null}
    </View>
);

const SettingsGroup: React.FC<{ title: string; children: React.ReactNode; colors: ThemePalette }> = ({ title, children, colors }) => (
    <View style={styles.groupContainer}>
        <Text style={[styles.groupTitle, { color: colors.textFaint }]}>{title}</Text>
        <View>{children}</View>
    </View>
);

export default function SettingsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { signOut } = useAuth(); // Call useAuth
    const [activeModal, setActiveModal] = React.useState<null | 'hijri' | 'time' | 'prayer' | 'location' | 'manualLocation' | 'manualLocationSearch'>(null);
    const [hijriAdjustment, setHijriAdjustment] = React.useState(0);
    const [timeFormat, setTimeFormat] = React.useState('12 hours');
    const [prayerMethod, setPrayerMethod] = React.useState('Muslim World League (MWL)');
    const [isAutomaticLocation, setIsAutomaticLocation] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLogoutModalVisible, setIsLogoutModalVisible] = React.useState(false);
    const { themeMode } = useThemeMode();
    const { colors, isDark } = useAppColors();

    const themeLabel = themeMode === 'system'
        ? 'System'
        : themeMode.charAt(0).toUpperCase() + themeMode.slice(1);

    const hijriOptions = [-3, -2, -1, 0, 1, 2, 3];
    const timeOptions = ['12 hours', '24 hours'];
    const prayerMethods = [
        'Muslim World League (MWL)',
        'Umm al-Qura, Makkah',
        'University of Islamic Sciences, Karachi',
        'Egyptian General Authority of Survey',
        'Institute of Geophysics, University of Tehran',
        'Ministry of Islamic Affairs, Morocco',
    ];

    const countries = [
        { name: 'Nigeria', flag: '🇳🇬' },
        { name: 'Afghanistan', flag: '🇦🇫' },
        { name: 'Aland Islands', flag: '🇦🇽' },
        { name: 'Albania', flag: '🇦🇱' },
    ];

    const cities = ['Lagos', 'Lafia', 'Lagos, Ikeja'];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            <SafeAreaView>
                <View style={[styles.header, { paddingTop: insets.top > 0 ? 4 : 18 }]}>
                    <TouchableOpacity onPress={() => router.back()} style={[styles.backCircle, { backgroundColor: colors.surface }]}>
                        <IconSymbol name="arrow.left" size={28} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: 40 + BOTTOM_NAV_HEIGHT + insets.bottom },
                ]}>
                <SettingsGroup title="Prayer Location" colors={colors}>
                    <SettingsItem
                        icon="person"
                        label="Profile"
                        subtitle="Ilorin East, Nigeria"
                        onPress={() => router.push('/(drawer)/settings/profile')}
                        colors={colors}
                    />
                    <SettingsItem
                        icon="lock"
                        label="Password"
                        subtitle="Muslim World League (MWL)"
                        onPress={() => router.push('/(drawer)/settings/password')}
                        colors={colors}
                    />
                    <SettingsItem
                        icon="translate"
                        label="Language"
                        subtitle="Standard / Hanafi"
                        onPress={() => router.push('/(drawer)/settings/language')}
                        showBorder={false}
                        colors={colors}
                    />
                </SettingsGroup>

                <SettingsGroup title="Adhan & Sound" colors={colors}>
                    <SettingsItem
                        icon="bell"
                        label="Notification"
                        subtitle="Standard / Hanafi"
                        onPress={() => router.push('/(drawer)/settings/notifications')}
                        colors={colors}
                    />
                    <SettingsItem
                        icon="moon"
                        label="Theme"
                        subtitle={themeLabel}
                        onPress={() => router.push('/(drawer)/settings/theme')}
                        colors={colors}
                    />
                    <SettingsItem
                        icon="calendar"
                        label="Hijri Adjust"
                        subtitle={`Current: ${hijriAdjustment}`}
                        onPress={() => setActiveModal('hijri')}
                        showBorder={false}
                        colors={colors}
                    />
                </SettingsGroup>

                <SettingsGroup title="Prayer Preferences" colors={colors}>
                    <SettingsItem
                        icon="clock"
                        label="Time Format"
                        subtitle={timeFormat}
                        onPress={() => setActiveModal('time')}
                        colors={colors}
                    />
                    <SettingsItem
                        icon="location"
                        label="Location"
                        subtitle={isAutomaticLocation ? 'Automatic' : 'Manual'}
                        onPress={() => setActiveModal('location')}
                        colors={colors}
                    />
                    <SettingsItem
                        icon="gearshape"
                        label="Calculation Method"
                        subtitle={prayerMethod}
                        onPress={() => setActiveModal('prayer')}
                        showBorder={false}
                        colors={colors}
                    />
                </SettingsGroup>

                <SettingsGroup title="More" colors={colors}>
                    <SettingsItem
                        icon="heart"
                        label="Support Us"
                        subtitle="Help keep HerDeen growing"
                        onPress={() => router.push('/(drawer)/settings/support')}
                        colors={colors}
                    />
                    <SettingsItem
                        icon="phone"
                        label="Contact Us"
                        subtitle="Get in touch with support"
                        onPress={() => router.push('/(drawer)/settings/contact')}
                        colors={colors}
                    />
                    <SettingsItem
                        icon="questionmark.circle"
                        label="FAQs"
                        subtitle="Common questions and answers"
                        onPress={() => router.push('/(drawer)/settings/faqs')}
                        colors={colors}
                    />
                    <SettingsItem
                        icon="info.circle"
                        label="About HerDeen"
                        subtitle="Version info and legal"
                        onPress={() => router.push('/(drawer)/settings/about')}
                        showBorder={false}
                        colors={colors}
                    />
                </SettingsGroup>

                <TouchableOpacity
                    style={[
                        styles.signOutButton,
                        { backgroundColor: colors.destructiveBg, borderColor: isDark ? '#3A232A' : '#F1CDD2' }
                    ]}
                    onPress={() => setIsLogoutModalVisible(true)}>
                    <Text style={[styles.signOutText, { color: colors.destructiveText }]}>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>
            <BottomNav />

            {/* Dynamic Settings Modal */}
            <Modal
                visible={!!activeModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setActiveModal(null)}
            >
                <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
                    <View style={[
                        styles.modalContainer,
                        { backgroundColor: colors.surface },
                        activeModal === 'prayer' && { height: 600 },
                        activeModal === 'location' && { height: 400 },
                        (activeModal === 'manualLocation' || activeModal === 'manualLocationSearch') && { height: SCREEN_HEIGHT * 0.8 },
                        (activeModal === 'time' || activeModal === 'hijri') && { height: 500 }
                    ]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>
                                {activeModal === 'hijri' && 'Adjust Hijri'}
                                {activeModal === 'time' && 'Time Format'}
                                {activeModal === 'prayer' && 'Prayer Method'}
                                {activeModal === 'location' && 'Location'}
                                {(activeModal === 'manualLocation' || activeModal === 'manualLocationSearch') && 'Manual Location'}
                            </Text>
                            <TouchableOpacity onPress={() => setActiveModal(null)}>
                                <IconSymbol name="xmark" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalContent}>
                            {activeModal === 'hijri' && (
                                <>
                                    <IconSymbol name="calendar" size={60} color={PURPLE} />
                                    <Text style={[styles.modalSmallTitle, { color: colors.text }]}>Muharam 19, 1447 AH</Text>
                                    <View style={styles.adjustmentRow}>
                                        {hijriOptions.map((opt) => (
                                            <TouchableOpacity
                                                key={opt}
                                                onPress={() => setHijriAdjustment(opt)}
                                                style={[
                                                    styles.adjustmentCircle,
                                                    hijriAdjustment === opt && styles.selectedAdjustmentCircle
                                                ]}>
                                                <Text style={[
                                                    styles.adjustmentText,
                                                    { color: colors.textMuted },
                                                    hijriAdjustment === opt && styles.selectedAdjustmentText
                                                ]}>{opt}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </>
                            )}

                            {activeModal === 'time' && (
                                <>
                                    <View style={[styles.iconBox, { backgroundColor: colors.surfaceSoft }]}>
                                        <IconSymbol name="clock" size={32} color={PURPLE} />
                                    </View>
                                    <Text style={[styles.modalDisplayValue, { color: colors.text }]}>06:30</Text>
                                    <View style={styles.optionsList}>
                                        {timeOptions.map((opt) => (
                                            <TouchableOpacity
                                                key={opt}
                                                style={[styles.optionItem, { borderBottomColor: colors.border }]}
                                                onPress={() => setTimeFormat(opt)}>
                                                <View style={styles.optionLeft}>
                                                    <View style={[styles.bullet, { backgroundColor: colors.textMuted }]} />
                                                    <Text style={[styles.optionText, { color: colors.text }]}>{opt}</Text>
                                                </View>
                                                {timeFormat === opt && <IconSymbol name="checkmark" size={20} color={PURPLE} />}
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </>
                            )}

                            {activeModal === 'prayer' && (
                                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                                    <View style={styles.optionsList}>
                                        {prayerMethods.map((method) => (
                                            <TouchableOpacity
                                                key={method}
                                                style={[styles.optionItem, { borderBottomColor: colors.border }]}
                                                onPress={() => setPrayerMethod(method)}>
                                                <Text
                                                    style={[styles.optionText, { color: colors.text, flex: 1, flexShrink: 1, marginRight: 12 }]}
                                                    numberOfLines={2}
                                                >
                                                    {method}
                                                </Text>
                                                {prayerMethod === method && <IconSymbol name="checkmark" size={20} color={PURPLE} />}
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            )}

                            {activeModal === 'location' && (
                                <View style={{ width: '100%' }}>
                                    <View style={[styles.optionItem, { borderBottomWidth: 0, borderBottomColor: colors.border }]}>
                                        <View>
                                            <Text style={[styles.optionTextBold, { color: colors.text }]}>Automatic</Text>
                                            <Text style={[styles.subLabel, { color: colors.textMuted }]}>Oko Erin Kwara Nigeria</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => setIsAutomaticLocation(!isAutomaticLocation)}
                                            activeOpacity={0.8}
                                        >
                                            <View style={{
                                                width: 44,
                                                height: 24,
                                                borderRadius: 12,
                                                backgroundColor: isAutomaticLocation ? '#332646' : '#4B5263',
                                                padding: 2,
                                                justifyContent: 'center',
                                            }}>
                                                <View style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 10,
                                                    backgroundColor: isAutomaticLocation ? PURPLE : '#D6DAE2',
                                                    transform: [{ translateX: isAutomaticLocation ? 20 : 0 }]
                                                }} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {!isAutomaticLocation && (
                                        <TouchableOpacity
                                            style={[styles.confirmButton, { marginTop: 20 }]}
                                            onPress={() => setActiveModal('manualLocation')}
                                        >
                                            <Text style={styles.confirmButtonText}>Set Manual Location</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}

                            {(activeModal === 'manualLocation' || activeModal === 'manualLocationSearch') && (
                                <View style={{ width: '100%', flex: 1 }}>
                                    <View style={styles.searchContainer}>
                                        <TextInput
                                            style={[styles.searchInput, { backgroundColor: colors.surfaceSoft, borderColor: colors.border, color: colors.text }]}
                                            placeholder="Search"
                                            placeholderTextColor={colors.textMuted}
                                            value={searchQuery}
                                            onChangeText={(text: string) => {
                                                setSearchQuery(text);
                                                setActiveModal(text.length > 0 ? 'manualLocationSearch' : 'manualLocation');
                                            }}
                                        />
                                    </View>

                                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                        {activeModal === 'manualLocation' ? (
                                            countries.map((country, idx) => (
                                                <TouchableOpacity key={idx} style={[styles.optionItem, { borderBottomColor: colors.border }]}>
                                                    <Text style={[styles.optionText, { color: colors.text }]}>{country.name}</Text>
                                                    <IconSymbol name="chevron.right" size={20} color={colors.textMuted} />
                                                </TouchableOpacity>
                                            ))
                                        ) : (
                                            cities.map((city, idx) => (
                                                <TouchableOpacity
                                                    key={idx}
                                                    style={[styles.optionItem, { borderBottomColor: colors.border }]}
                                                    onPress={() => {
                                                        setActiveModal(null);
                                                        setSearchQuery('');
                                                    }}>
                                                    <Text style={[styles.optionText, { color: colors.text }]}>{city}</Text>
                                                </TouchableOpacity>
                                            ))
                                        )}
                                    </ScrollView>
                                </View>
                            )}

                            {activeModal !== 'location' && activeModal !== 'manualLocation' && activeModal !== 'manualLocationSearch' && (
                                <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={() => setActiveModal(null)}
                                >
                                    <Text style={styles.confirmButtonText}>Confirm</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Logout Confirmation Modal */}
            <Modal
                visible={isLogoutModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsLogoutModalVisible(false)}
            >
                <View style={[styles.logoutModalOverlay, { backgroundColor: colors.overlay }]}>
                    <View style={[styles.logoutModalContainer, { backgroundColor: colors.surface }]}>
                        <Image
                            source={require('@/assets/images/logout_illustration.png')}
                            style={styles.logoutIllustration}
                            resizeMode="contain"
                        />

                        <Text style={[styles.logoutTitle, { color: colors.text }]}>Logging Out Already?</Text>
                        <Text style={[styles.logoutSubtitle, { color: colors.textMuted }]}>
                            Aww, don't go! we will miss you. Anyways, We'll be here when you're ready to come back.
                        </Text>

                        <TouchableOpacity
                            style={styles.confirmLogoutButton}
                            onPress={() => {
                                setIsLogoutModalVisible(false);
                                signOut(); // Call signOut
                            }}
                        >
                            <Text style={styles.confirmLogoutText}>Yes, see you soon!</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelLogoutButton}
                            onPress={() => setIsLogoutModalVisible(false)}
                        >
                            <Text style={[styles.cancelLogoutText, { color: colors.textMuted }]}>No, I changed my mind!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(7, 9, 14, 0.62)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        width: SCREEN_WIDTH,
        height: 450,
        backgroundColor: SURFACE,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 25,
        paddingRight: 20,
        paddingBottom: 60,
        paddingLeft: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: TEXT_PRIMARY,
    },
    modalContent: {
        alignItems: 'center',
        gap: 25,
    },
    modalSmallTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_PRIMARY,
        marginTop: 10,
    },
    modalDisplayValue: {
        fontSize: 32,
        fontWeight: '700',
        color: TEXT_PRIMARY,
        marginVertical: 10,
    },
    iconBox: {
        width: 64,
        height: 64,
        backgroundColor: SURFACE_ELEVATED,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsList: {
        width: '100%',
        marginTop: 10,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomColor: BORDER,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: TEXT_SECONDARY,
        marginRight: 12,
    },
    optionText: {
        fontSize: 17,
        color: TEXT_PRIMARY,
        fontWeight: '500',
    },
    optionTextBold: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_PRIMARY,
    },
    subLabel: {
        fontSize: 14,
        color: TEXT_SECONDARY,
        marginTop: 4,
    },
    searchContainer: {
        width: '100%',
        marginBottom: 16,
    },
    searchInput: {
        width: '100%',
        height: 56,
        backgroundColor: SURFACE_ELEVATED,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: BORDER,
        paddingHorizontal: 16,
        fontSize: 16,
        color: TEXT_PRIMARY,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0,
        shadowRadius: 4,
        elevation: 0,
    },
    hijriDateText: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_PRIMARY,
        marginTop: 10,
    },
    adjustmentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    adjustmentCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedAdjustmentCircle: {
        backgroundColor: PURPLE,
    },
    adjustmentText: {
        fontSize: 16,
        color: TEXT_SECONDARY,
        fontWeight: '500',
    },
    selectedAdjustmentText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: PURPLE,
        width: '100%',
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 8,
        gap: 16,
    },
    backCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: SURFACE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: TEXT_PRIMARY,
    },
    groupContainer: {
        marginBottom: 26,
    },
    groupTitle: {
        fontSize: 16,
        lineHeight: 22,
        color: '#4C5261',
        marginBottom: 12,
        fontWeight: '500',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 88,
        paddingVertical: 12,
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
        marginLeft: 72,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: 10,
    },
    itemIconTile: {
        width: 56,
        height: 56,
        borderRadius: 18,
        backgroundColor: SURFACE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTextWrap: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    itemLabel: {
        fontSize: 16,
        lineHeight: 22,
        color: TEXT_PRIMARY,
        fontWeight: '600',
    },
    itemSubtitle: {
        marginTop: 4,
        fontSize: 13,
        lineHeight: 18,
        color: TEXT_SECONDARY,
        fontWeight: '500',
    },
    itemRight: {
        marginLeft: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutButton: {
        backgroundColor: '#1D1217',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#3A232A',
        marginTop: 10,
        minHeight: 56,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutText: {
        fontSize: 16,
        fontWeight: '600',
        color: DANGER,
    },
    logoutModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoutModalContainer: {
        width: Math.min(SCREEN_WIDTH, 430),
        backgroundColor: SURFACE,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 25,
        paddingRight: 20,
        paddingBottom: 40,
        paddingLeft: 20,
        gap: 20,
        alignItems: 'center',
    },
    logoutIllustration: {
        width: 140,
        height: 80,
    },
    logoutTitle: {
        fontSize: 24,
        fontWeight: '500',
        color: TEXT_PRIMARY,
        textAlign: 'center',
    },
    logoutSubtitle: {
        fontSize: 15,
        fontWeight: '400',
        color: TEXT_SECONDARY,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    confirmLogoutButton: {
        backgroundColor: DANGER,
        width: '100%',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
    },
    confirmLogoutText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    cancelLogoutButton: {
        width: '100%',
        paddingVertical: 12,
        alignItems: 'center',
    },
    cancelLogoutText: {
        color: TEXT_SECONDARY,
        fontSize: 16,
        fontWeight: '500',
    },
});
