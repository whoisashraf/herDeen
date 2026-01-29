import { IconSymbol } from '@/components/ui/icon-symbol';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Animated,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const PURPLE = '#5C1E68';
const TEXT_GRAY = '#1A1A1A';
const BG_COLOR = '#F9F9F9';

const CustomSwitch: React.FC<{
    isEnabled: boolean;
    onToggle: (value: boolean) => void;
}> = ({ isEnabled, onToggle }) => {
    const [animatedValue] = useState(new Animated.Value(isEnabled ? 1 : 0));

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isEnabled ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isEnabled]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 22],
    });

    const trackColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#E9E9EB', '#DABFDE'], // Light purple track when active
    });

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onToggle(!isEnabled)}
        >
            <View style={styles.switchContainer}>
                <Animated.View style={[styles.switchTrack, { backgroundColor: trackColor }]} />
                <Animated.View
                    style={[
                        styles.switchThumb,
                        { transform: [{ translateX }] }
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
};

interface NotificationItemProps {
    icon: string | React.ReactNode;
    label: string;
    isEnabled: boolean;
    onToggle: (value: boolean) => void;
    showBorder?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
    icon,
    label,
    isEnabled,
    onToggle,
    showBorder = true,
}) => (
    <View style={[styles.itemContainer, showBorder && styles.itemBorder]}>
        <View style={styles.itemLeft}>
            <View style={styles.iconContainer}>
                {typeof icon === 'string' ? (
                    <IconSymbol name={icon as any} size={22} color={PURPLE} />
                ) : (
                    icon
                )}
            </View>
            <Text style={styles.itemLabel}>{label}</Text>
        </View>
        <CustomSwitch isEnabled={isEnabled} onToggle={onToggle} />
    </View>
);

interface PrayerReminderRowProps {
    icon: string | React.ReactNode;
    label: string;
    isNotificationEnabled: boolean;
    onToggleNotification: () => void;
    showBorder?: boolean;
}

const PrayerReminderRow: React.FC<PrayerReminderRowProps> = ({
    icon,
    label,
    isNotificationEnabled,
    onToggleNotification,
    showBorder = true,
}) => (
    <View style={[styles.prayerRow, showBorder && styles.itemBorder]}>
        <View style={styles.itemLeft}>
            {typeof icon === 'string' ? (
                <IconSymbol name={icon as any} size={22} color={TEXT_GRAY} />
            ) : (
                icon
            )}
            <Text style={styles.prayerLabel}>{label}</Text>
        </View>
        <TouchableOpacity onPress={onToggleNotification}>
            <View style={[
                styles.bellButton,
                isNotificationEnabled ? styles.bellActive : styles.bellInactive
            ]}>
                <IconSymbol
                    name="bell.fill"
                    size={18}
                    color="#FFFFFF"
                />
            </View>
        </TouchableOpacity>
    </View>
);

export default function NotificationsScreen() {
    const router = useRouter();
    const [settings, setSettings] = useState({
        prayerReminders: true,
        quranGoals: true,
        duaPrompts: true,
        cycleReminders: true,
        jumuahReminder: false,
    });

    const [prayerNotifications, setPrayerNotifications] = useState({
        fajr: true,
        sunrise: false,
        dhuhr: true,
        asr: true,
        maghrib: true,
        ishai: true,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const togglePrayer = (key: keyof typeof prayerNotifications) => {
        setPrayerNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={TEXT_GRAY} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Combined Reminders Card */}
                <View style={styles.groupCard}>
                    <View style={styles.groupHeader}>
                        <View style={styles.itemLeft}>
                            <View style={styles.iconContainer}>
                                <FontAwesome6 name="person-praying" size={20} color={PURPLE} />
                            </View>
                            <Text style={styles.groupTitle}>Prayer Reminders</Text>
                        </View>
                        <CustomSwitch
                            isEnabled={settings.prayerReminders}
                            onToggle={() => toggleSetting('prayerReminders')}
                        />
                    </View>

                    {settings.prayerReminders && (
                        <View style={styles.prayerList}>
                            <PrayerReminderRow
                                icon={<Feather name="cloud" size={22} color={TEXT_GRAY} />}
                                label="Fajr"
                                isNotificationEnabled={prayerNotifications.fajr}
                                onToggleNotification={() => togglePrayer('fajr')}
                            />
                            <PrayerReminderRow
                                icon={<Feather name="sun" size={22} color={TEXT_GRAY} />}
                                label="Sunrise"
                                isNotificationEnabled={prayerNotifications.sunrise}
                                onToggleNotification={() => togglePrayer('sunrise')}
                            />
                            <PrayerReminderRow
                                icon={<AntDesign name="clock-circle" size={20} color={TEXT_GRAY} />}
                                label="Dhuhr"
                                isNotificationEnabled={prayerNotifications.dhuhr}
                                onToggleNotification={() => togglePrayer('dhuhr')}
                            />
                            <PrayerReminderRow
                                icon={<Feather name="cloud" size={22} color={TEXT_GRAY} />}
                                label="Asr"
                                isNotificationEnabled={prayerNotifications.asr}
                                onToggleNotification={() => togglePrayer('asr')}
                            />
                            <PrayerReminderRow
                                icon={<Feather name="sunrise" size={22} color={TEXT_GRAY} />}
                                label="Maghrib"
                                isNotificationEnabled={prayerNotifications.maghrib}
                                onToggleNotification={() => togglePrayer('maghrib')}
                            />
                            <PrayerReminderRow
                                icon={<Feather name="moon" size={22} color={TEXT_GRAY} />}
                                label="Ishai"
                                isNotificationEnabled={prayerNotifications.ishai}
                                onToggleNotification={() => togglePrayer('ishai')}
                                showBorder={false}
                            />
                        </View>
                    )}

                    <View style={{ marginTop: 2 }}>
                        <NotificationItem
                            icon="hands.sparkles"
                            label="Qur'an / Tilawah Goals"
                            isEnabled={settings.quranGoals}
                            onToggle={() => toggleSetting('quranGoals')}
                        />
                    </View>
                    <NotificationItem
                        icon="heart.fill"
                        label="Du'a Prompts"
                        isEnabled={settings.duaPrompts}
                        onToggle={() => toggleSetting('duaPrompts')}
                    />
                    <NotificationItem
                        icon="bathtub"
                        label="Cycle & Ghusl Reminders"
                        isEnabled={settings.cycleReminders}
                        onToggle={() => toggleSetting('cycleReminders')}
                    />
                    <NotificationItem
                        icon={<FontAwesome5 name="mosque" size={18} color={PURPLE} />}
                        label="Jumu'ah Reminder"
                        isEnabled={settings.jumuahReminder}
                        onToggle={() => toggleSetting('jumuahReminder')}
                        showBorder={false}
                    />
                </View>
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
        padding: 16,
        paddingTop: 8,
    },
    groupCard: {
        width: 390,
        minHeight: 679,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        gap: 16,
        alignSelf: 'center',
        marginBottom: 24,
        // Soft shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    groupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    groupTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: TEXT_GRAY,
        marginLeft: 12,
    },
    iconContainer: {
        width: 32,
        alignItems: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemLabel: {
        fontSize: 16,
        color: TEXT_GRAY,
        marginLeft: 12,
        fontWeight: '500',
    },
    prayerList: {
        width: 358,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F2EAF3',
        alignSelf: 'center',
        marginTop: 0,
        padding: 12,
    },
    prayerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
    },
    prayerLabel: {
        fontSize: 16,
        color: '#444444',
        marginLeft: 12,
    },
    bellButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bellActive: {
        backgroundColor: PURPLE,
    },
    bellInactive: {
        backgroundColor: '#EBD6ED', // Light purple background
    },
    switchContainer: {
        width: 50,
        height: 28,
        justifyContent: 'center',
    },
    switchTrack: {
        width: 44,
        height: 20,
        borderRadius: 10,
        alignSelf: 'center',
    },
    switchThumb: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: PURPLE,
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});
