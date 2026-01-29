import { IconSymbol } from '@/components/ui/icon-symbol';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PURPLE = '#5C1E68';
const TEXT_GRAY = '#4A4A4A';
const BG_COLOR = '#F9F9F9';

interface SettingsItemProps {
    icon: string;
    label: string;
    value?: string;
    onPress: () => void;
    showBorder?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
    icon,
    label,
    value,
    onPress,
    showBorder = true,
}) => (
    <View style={showBorder && styles.itemBorder}>
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={onPress}
        >
            <View style={styles.itemLeft}>
                <IconSymbol name={icon as any} size={22} color={PURPLE} />
                <Text style={styles.itemLabel} numberOfLines={1} ellipsizeMode="tail">{label}</Text>
            </View>
            <View style={styles.itemRight}>
                {value && <Text style={styles.itemValue} numberOfLines={1} ellipsizeMode="tail">{value}</Text>}
                <IconSymbol name="chevron.right" size={20} color="#C7C7CC" />
            </View>
        </TouchableOpacity>
    </View>
);

const SettingsGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View style={styles.groupContainer}>{children}</View>
);

export default function SettingsScreen() {
    const router = useRouter();
    const [activeModal, setActiveModal] = React.useState<null | 'hijri' | 'time' | 'prayer' | 'location' | 'manualLocation' | 'manualLocationSearch'>(null);
    const [hijriAdjustment, setHijriAdjustment] = React.useState(0);
    const [timeFormat, setTimeFormat] = React.useState('12 hours');
    const [prayerMethod, setPrayerMethod] = React.useState('Muslim World League (MWL)');
    const [isAutomaticLocation, setIsAutomaticLocation] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLogoutModalVisible, setIsLogoutModalVisible] = React.useState(false);

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
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ImageBackground
                source={require('@/assets/images/bg-settings.jpg')}
                style={styles.fullBackground}
                imageStyle={{ opacity: 1 }}
                resizeMode="cover"
            >
                <View
                    style={styles.imageOverlay}
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        <SafeAreaView>
                            <View style={styles.header}>
                                <View style={styles.profileSection}>
                                    <Image
                                        source={require('@/assets/images/profile.jpg')}
                                        style={styles.avatar}
                                    />
                                    <View>
                                        <Text style={styles.greetingText}>Assalamu Alaikum,</Text>
                                        <Text style={styles.nameText}>Aishah Abdullahi!</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                                    <Image
                                        source={require('@/assets/icons/menu_custom.png')}
                                        style={{ width: 24, height: 24, tintColor: PURPLE }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.titleRow}>
                                <Text style={styles.title}>Settings</Text>
                                <TouchableOpacity onPress={() => setIsLogoutModalVisible(true)}>
                                    <AntDesign name="logout" size={22} color="#FF3B30" />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>

                        {/* Group 1: Profile & Account */}
                        <SettingsGroup>
                            <SettingsItem
                                icon="person"
                                label="Profile Info"
                                onPress={() => router.push('/(drawer)/settings/profile')}
                            />
                            <SettingsItem
                                icon="lock"
                                label="Change Password"
                                onPress={() => router.push('/(drawer)/settings/password')}
                            />
                            <SettingsItem
                                icon="translate"
                                label="Language Preference"
                                value="English"
                                onPress={() => router.push('/(drawer)/settings/language')}
                                showBorder={false}
                            />
                        </SettingsGroup>

                        {/* Group 2: Notifications */}
                        <SettingsGroup>
                            <SettingsItem
                                icon="bell"
                                label="Reminders & Notification"
                                onPress={() => router.push('/(drawer)/settings/notifications')}
                                showBorder={false}
                            />
                        </SettingsGroup>

                        {/* Group 3: Theme */}
                        <SettingsGroup>
                            <SettingsItem
                                icon="moon"
                                label="Theme"
                                value="System"
                                onPress={() => router.push('/(drawer)/settings/theme')}
                                showBorder={false}
                            />
                        </SettingsGroup>

                        {/* Group 4: Prayer Settings */}
                        <SettingsGroup>
                            <SettingsItem
                                icon="calendar"
                                label="Hijri Adjust"
                                value={hijriAdjustment.toString()}
                                onPress={() => setActiveModal('hijri')}
                            />
                            <SettingsItem
                                icon="clock"
                                label="Time Format"
                                value={timeFormat}
                                onPress={() => setActiveModal('time')}
                            />
                            <SettingsItem
                                icon="location"
                                label="Location"
                                value={isAutomaticLocation ? 'Automatic' : 'Manual'}
                                onPress={() => setActiveModal('location')}
                            />
                            <SettingsItem
                                icon="gearshape"
                                label="Prayer Calculation Method"
                                onPress={() => setActiveModal('prayer')}
                                showBorder={false}
                            />
                        </SettingsGroup>

                        {/* Group 5: Support & Info */}
                        <SettingsGroup>
                            <SettingsItem
                                icon="heart"
                                label="Support Us"
                                onPress={() => router.push('/(drawer)/settings/support')}
                            />
                            <SettingsItem
                                icon="phone"
                                label="Contact Us"
                                onPress={() => router.push('/(drawer)/settings/contact')}
                            />
                            <SettingsItem
                                icon="questionmark.circle"
                                label="FAQs"
                                onPress={() => router.push('/(drawer)/settings/faqs')}
                            />
                            <SettingsItem
                                icon="info.circle"
                                label="About HerDeen"
                                onPress={() => router.push('/(drawer)/settings/about')}
                                showBorder={false}
                            />
                        </SettingsGroup>

                        {/* Sign Out Button */}
                        <TouchableOpacity style={styles.signOutButton} onPress={() => setIsLogoutModalVisible(true)}>
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ImageBackground>

            {/* Dynamic Settings Modal */}
            <Modal
                visible={!!activeModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setActiveModal(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[
                        styles.modalContainer,
                        activeModal === 'prayer' && { height: 600 },
                        activeModal === 'location' && { height: 400 },
                        (activeModal === 'manualLocation' || activeModal === 'manualLocationSearch') && { height: SCREEN_HEIGHT * 0.8 },
                        (activeModal === 'time' || activeModal === 'hijri') && { height: 500 }
                    ]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {activeModal === 'hijri' && 'Adjust Hijri'}
                                {activeModal === 'time' && 'Time Format'}
                                {activeModal === 'prayer' && 'Prayer Method'}
                                {activeModal === 'location' && 'Location'}
                                {(activeModal === 'manualLocation' || activeModal === 'manualLocationSearch') && 'Manual Location'}
                            </Text>
                            <TouchableOpacity onPress={() => setActiveModal(null)}>
                                <IconSymbol name="xmark" size={24} color={PURPLE} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalContent}>
                            {activeModal === 'hijri' && (
                                <>
                                    <IconSymbol name="calendar" size={60} color={PURPLE} />
                                    <Text style={styles.modalSmallTitle}>Muharam 19, 1447 AH</Text>
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
                                                    hijriAdjustment === opt && styles.selectedAdjustmentText
                                                ]}>{opt}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </>
                            )}

                            {activeModal === 'time' && (
                                <>
                                    <View style={styles.iconBox}>
                                        <IconSymbol name="clock" size={32} color={PURPLE} />
                                    </View>
                                    <Text style={styles.modalDisplayValue}>06:30</Text>
                                    <View style={styles.optionsList}>
                                        {timeOptions.map((opt) => (
                                            <TouchableOpacity
                                                key={opt}
                                                style={styles.optionItem}
                                                onPress={() => setTimeFormat(opt)}>
                                                <View style={styles.optionLeft}>
                                                    <View style={styles.bullet} />
                                                    <Text style={styles.optionText}>{opt}</Text>
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
                                                style={styles.optionItem}
                                                onPress={() => setPrayerMethod(method)}>
                                                <Text
                                                    style={[styles.optionText, { flex: 1, flexShrink: 1, marginRight: 12 }]}
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
                                    <View style={[styles.optionItem, { borderBottomWidth: 0 }]}>
                                        <View>
                                            <Text style={styles.optionTextBold}>Automatic</Text>
                                            <Text style={styles.subLabel}>Oko Erin Kwara Nigeria</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => setIsAutomaticLocation(!isAutomaticLocation)}
                                            activeOpacity={0.8}
                                        >
                                            <View style={{
                                                width: 44,
                                                height: 24,
                                                borderRadius: 12,
                                                backgroundColor: isAutomaticLocation ? '#E9D7F0' : '#D1D1D6',
                                                padding: 2,
                                                justifyContent: 'center',
                                            }}>
                                                <View style={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: 10,
                                                    backgroundColor: isAutomaticLocation ? PURPLE : '#FFFFFF',
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
                                            style={styles.searchInput}
                                            placeholder="Search"
                                            placeholderTextColor="#8A8A8E"
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
                                                <TouchableOpacity key={idx} style={styles.optionItem}>
                                                    <Text style={styles.optionText}>{country.name}</Text>
                                                    <IconSymbol name="chevron.right" size={20} color="#C7C7CC" />
                                                </TouchableOpacity>
                                            ))
                                        ) : (
                                            cities.map((city, idx) => (
                                                <TouchableOpacity
                                                    key={idx}
                                                    style={styles.optionItem}
                                                    onPress={() => {
                                                        setActiveModal(null);
                                                        setSearchQuery('');
                                                    }}>
                                                    <Text style={styles.optionText}>{city}</Text>
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
                <View style={styles.logoutModalOverlay}>
                    <View style={styles.logoutModalContainer}>
                        <Image
                            source={require('@/assets/images/logout_illustration.png')}
                            style={styles.logoutIllustration}
                            resizeMode="contain"
                        />

                        <Text style={styles.logoutTitle}>Logging Out Already?</Text>
                        <Text style={styles.logoutSubtitle}>
                            Aww, don't go! we will miss you. Anyways, We'll be here when you're ready to come back.
                        </Text>

                        <TouchableOpacity
                            style={styles.confirmLogoutButton}
                            onPress={() => {
                                setIsLogoutModalVisible(false);

                            }}
                        >
                            <Text style={styles.confirmLogoutText}>Yes, see you soon!</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelLogoutButton}
                            onPress={() => setIsLogoutModalVisible(false)}
                        >
                            <Text style={styles.cancelLogoutText}>No, I changed my mind!</Text>
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
        backgroundColor: '#F9F9F9',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(248, 241, 241, 0.4)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        width: SCREEN_WIDTH,
        height: 450,
        backgroundColor: '#F9F9F9',
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
        color: '#2B0E30',
    },
    modalContent: {
        alignItems: 'center',
        gap: 25,
    },
    modalSmallTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_GRAY,
        marginTop: 10,
    },
    modalDisplayValue: {
        fontSize: 32,
        fontWeight: '700',
        color: '#2B0E30',
        marginVertical: 10,
    },
    iconBox: {
        width: 64,
        height: 64,
        backgroundColor: '#F2F2F7',
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
        borderBottomWidth: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomColor: '#F2F2F7',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#2B0E30',
        marginRight: 12,
    },
    optionText: {
        fontSize: 17,
        color: '#2B0E30',
        fontWeight: '500',
    },
    optionTextBold: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2B0E30',
    },
    subLabel: {
        fontSize: 14,
        color: '#8A8A8E',
        marginTop: 4,
    },
    searchContainer: {
        width: '100%',
        marginBottom: 16,
    },
    searchInput: {
        width: '100%',
        height: 56,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F2F2F7',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#2B0E30',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 1,
    },
    hijriDateText: {
        fontSize: 18,
        fontWeight: '600',
        color: TEXT_GRAY,
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
        color: TEXT_GRAY,
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
        paddingBottom: 40,
    },
    fullBackground: {
        flex: 1,
        width: SCREEN_WIDTH,
    },
    imageOverlay: {
        flex: 1,
        paddingTop: 0,
        gap: 12,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    closeButton: {
        padding: 8,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        borderWidth: 2,
        borderColor: PURPLE,
    },
    greetingText: {
        fontSize: 14,
        color: '#8A8A8E',
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500',
        color: TEXT_GRAY,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '500',
        color: TEXT_GRAY,
    },
    groupContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 16,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
        paddingBottom: 12,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    itemLabel: {
        fontSize: 16,
        color: TEXT_GRAY,
        marginLeft: 12,
        fontWeight: '500',
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemValue: {
        fontSize: 16,
        color: '#8A8A8E',
        marginRight: 8,
        maxWidth: SCREEN_WIDTH * 0.4,
    },
    signOutButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginHorizontal: 20,
        marginTop: 10,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    signOutText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF3B30',
    },
    logoutModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoutModalContainer: {
        width: Math.min(SCREEN_WIDTH, 430),
        backgroundColor: '#FFFFFF',
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
        color: '#2B0E30',
        textAlign: 'center',
    },
    logoutSubtitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#444444',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    confirmLogoutButton: {
        backgroundColor: '#FF4133',
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
        color: '#444444',
        fontSize: 16,
        fontWeight: '500',
    },
});
