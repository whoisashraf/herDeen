import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SettingItemProps = {
    icon: string | number; // icon can be a string (for IconSymbol) or a number (for Image require)
    iconType?: 'image' | 'symbol'; // Added iconType prop
    title: string;
    subText?: string;
    onPress?: () => void;
    isSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
};

const SettingItem: React.FC<SettingItemProps> = ({
    icon,
    iconType = 'symbol', // Default to symbol
    title,
    subText,
    onPress,
    isSwitch = false,
    switchValue,
    onSwitchChange,
}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    const iconColor = colors.icon;

    return (
        <TouchableOpacity
            style={[
                styles.settingItem,
                {
                    borderBottomColor: colors.surface,
                },
            ]}
            onPress={onPress}
            disabled={isSwitch}
            activeOpacity={0.7}
        >
            <View style={[styles.iconBox, { backgroundColor: '#1F2125' }]}>
                {iconType === 'image' ? (
                    <Image source={icon as number} style={[styles.localIcon, { tintColor: iconColor }]} />
                ) : (
                    <IconSymbol name={icon as string} size={22} color={iconColor} />
                )}
            </View>
            <View style={styles.itemTextContainer}>
                <ThemedText type="poppins-medium" style={[styles.itemText, { color: colors.text }]}>
                    {title}
                </ThemedText>
                {subText && (
                    <ThemedText type="poppins-regular" style={[styles.itemSubText, { color: colors.textMuted }]}>
                        {subText}
                    </ThemedText>
                )}
            </View>
            {isSwitch ? (
                <Switch
                    trackColor={{ false: '#FFFFFF4D', true: colors.primary }}
                    thumbColor={colors.background}
                    ios_backgroundColor="#FFFFFF4D"
                    onValueChange={onSwitchChange}
                    value={switchValue}
                />
            ) : (
                <IconSymbol name="chevron.right" size={18} color={colors.textMuted} />
            )}
        </TouchableOpacity>
    );
};

export default function PrayerSettingsScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const insets = useSafeAreaInsets();

    const [adhanSoundEnabled, setAdhanSoundEnabled] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [jumuahReminderEnabled, setJumuahReminderEnabled] = useState(true);
    const [tahajjudReminderEnabled, setTahajjudReminderEnabled] = useState(false);
    const [asrMethod, setAsrMethod] = useState<'Shafi' | 'Hanafi'>('Shafi');
    const [isAsrModalVisible, setIsAsrModalVisible] = useState(false);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 5 }]}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={[styles.headerButton, { backgroundColor: colors.surface }]}
                >
                    <IconSymbol name="arrow.left" size={20} color={colors.icon} />
                </TouchableOpacity>
                <ThemedText type="poppins-bold" style={[styles.headerTitle, { color: colors.text }]}>
                    Prayer settings
                </ThemedText>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Prayer Location Section */}
                <ThemedText type="poppins-regular" style={[styles.sectionTitle, { color: colors.textMuted }]}>
                    Prayer Location
                </ThemedText>
                <SettingItem
                    icon={require('@/assets/icons/current-location.png')}
                    iconType="image"
                    title="Current Location"
                    subText="Ilorin East, Nigeria"
                    onPress={() => router.push('/(drawer)/settings/current-location')}
                />
                <SettingItem
                    icon={require('@/assets/icons/calculation-method.png')}
                    iconType="image"
                    title="Calculation method"
                    subText="Muslim World League (MWL)"
                    onPress={() => router.push('/(drawer)/settings/calculation-method')}
                />
                <SettingItem
                    icon={require('@/assets/icons/asr-method.png')}
                    iconType="image"
                    title="Asr Method"
                    subText="Standard / Hanafi"
                    onPress={() => setIsAsrModalVisible(true)}
                />

                {/* Adhan & Sound Section */}
                <ThemedText type="poppins-regular" style={[styles.sectionTitle, { color: colors.textMuted, marginTop: 32 }]}>
                    Adhan & Sound
                </ThemedText>
                <SettingItem
                    icon={require('@/assets/icons/volume-high.png')}
                    iconType="image"
                    title="Adhan sound"
                    subText={adhanSoundEnabled ? "Enabled" : "Disabled"}
                    isSwitch
                    switchValue={adhanSoundEnabled}
                    onSwitchChange={setAdhanSoundEnabled}
                />
                <SettingItem
                    icon={require('@/assets/icons/screen-rotation.png')}
                    iconType="image"
                    title="Vibration"
                    subText={vibrationEnabled ? "Enabled" : "Disabled"}
                    isSwitch
                    switchValue={vibrationEnabled}
                    onSwitchChange={setVibrationEnabled}
                />

                {/* Special Times Section */}
                <ThemedText type="poppins-regular" style={[styles.sectionTitle, { color: colors.textMuted, marginTop: 32 }]}>
                    Special Times
                </ThemedText>
                <SettingItem
                    icon={require('@/assets/icons/the-prophets-mosque.png')}
                    iconType="image"
                    title="Jumu'ah reminder"
                    subText={jumuahReminderEnabled ? "Enabled" : "Disabled"}
                    isSwitch
                    switchValue={jumuahReminderEnabled}
                    onSwitchChange={setJumuahReminderEnabled}
                />
                <SettingItem
                    icon={require('@/assets/icons/tahajjud-eminder.png')}
                    iconType="image"
                    title="Tahajjud reminder"
                    subText={tahajjudReminderEnabled ? "Enabled" : "Disabled"}
                    isSwitch
                    switchValue={tahajjudReminderEnabled}
                    onSwitchChange={setTahajjudReminderEnabled}
                />
            </ScrollView>

            <Modal
                visible={isAsrModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsAsrModalVisible(false)}
            >
                <View style={styles.asrOverlay}>
                    <View style={styles.asrSheet}>
                        <View style={styles.asrHandle} />
                        <View style={styles.asrHeader}>
                            <ThemedText type="poppins-semibold" style={styles.asrTitle}>
                                Asr Method
                            </ThemedText>
                            <TouchableOpacity onPress={() => setIsAsrModalVisible(false)}>
                                <IconSymbol name="xmark" size={22} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.asrOption}
                            activeOpacity={0.8}
                            onPress={() => setAsrMethod('Shafi')}
                        >
                            <View style={styles.asrLeft}>
                                <View style={styles.asrIconBox}>
                                    <IconSymbol name="sun" size={18} color="#0C0D10" />
                                </View>
                                <ThemedText type="poppins-medium" style={styles.asrOptionText}>
                                    Shafi
                                </ThemedText>
                            </View>
                            {asrMethod === 'Shafi' ? (
                                <View style={styles.asrCheck}>
                                    <IconSymbol name="checkmark" size={18} color="#A978E8" />
                                    <IconSymbol name="checkmark" size={18} color="#A978E8" style={styles.asrCheckBack} />
                                </View>
                            ) : null}
                        </TouchableOpacity>
                        <View style={styles.asrDivider} />
                        <TouchableOpacity
                            style={styles.asrOption}
                            activeOpacity={0.8}
                            onPress={() => setAsrMethod('Hanafi')}
                        >
                            <View style={styles.asrLeft}>
                                <View style={styles.asrIconBox}>
                                    <IconSymbol name="sun" size={18} color="#0C0D10" />
                                </View>
                                <ThemedText type="poppins-medium" style={styles.asrOptionText}>
                                    Hanafi
                                </ThemedText>
                            </View>
                            {asrMethod === 'Hanafi' ? (
                                <View style={styles.asrCheck}>
                                    <IconSymbol name="checkmark" size={18} color="#A978E8" />
                                    <IconSymbol name="checkmark" size={18} color="#A978E8" style={styles.asrCheckBack} />
                                </View>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 12,
        marginBottom: 8,
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        marginLeft: 16,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 28,
    },
    sectionTitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderBottomWidth: 1.5,
    },
    iconBox: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    localIcon: { // Style for local image icons
        width: 22, // Same size as IconSymbol
        height: 22, // Same size as IconSymbol
        resizeMode: 'contain',
    },
    itemTextContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 17,
    },
    itemSubText: {
        fontSize: 13,
        marginTop: 2,
    },
    asrOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    asrSheet: {
        width: '100%',
        height: 285,
        backgroundColor: '#16171A',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 24,
    },
    asrHandle: {
        alignSelf: 'center',
        width: 54,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#6B6F76',
        marginBottom: 18,
    },
    asrHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    asrTitle: {
        fontSize: 22,
        color: '#FFFFFF',
    },
    asrOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
    },
    asrLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    asrIconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#1F2125',
        alignItems: 'center',
        justifyContent: 'center',
    },
    asrOptionText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    asrDivider: {
        height: 1.5,
        backgroundColor: '#2A2D33',
    },
    asrCheck: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    asrCheckBack: {
        marginLeft: -6,
    },
});
