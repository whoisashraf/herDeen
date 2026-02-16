import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemePalette, useAppColors } from '@/hooks/use-app-colors';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SettingItemProps = {
    icon: string | number;
    iconType?: 'image' | 'symbol';
    title: string;
    subText?: string;
    onPress?: () => void;
    isSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    colors: ThemePalette;
    isLight: boolean;
    showDivider?: boolean;
};

const SettingItem: React.FC<SettingItemProps> = ({
    icon,
    iconType = 'symbol',
    title,
    subText,
    onPress,
    isSwitch = false,
    switchValue,
    onSwitchChange,
    colors,
    isLight,
    showDivider = true,
}) => {
    const iconColor = isLight ? '#1B2129' : colors.icon;
    const iconBg = isLight ? '#EAEAEA' : colors.surface;
    const titleColor = isLight ? '#171D26' : colors.text;
    const subtitleColor = isLight ? '#5B626B' : colors.textMuted;
    const chevronColor = isLight ? '#B3B3B8' : colors.textMuted;
    const dividerColor = isLight ? '#D9D9D9' : colors.border;
    const toggleOn = isLight ? '#CF7FEF' : '#A978E8';
    const toggleOff = isLight ? '#B6B6B9' : '#FFFFFF4D';

    return (
        <View style={styles.settingGroup}>
            <TouchableOpacity
                style={styles.settingItem}
                onPress={onPress}
                disabled={isSwitch && !onPress}
                activeOpacity={0.75}
            >
                <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
                    {iconType === 'image' ? (
                        <Image source={icon as number} style={[styles.localIcon, { tintColor: iconColor }]} />
                    ) : (
                        <IconSymbol name={icon as string} size={26} color={iconColor} />
                    )}
                </View>

                <View style={styles.itemTextContainer}>
                    <ThemedText type="poppins-medium" style={[styles.itemText, { color: titleColor }]}>
                        {title}
                    </ThemedText>
                    {subText ? (
                        <ThemedText type="poppins-regular" style={[styles.itemSubText, { color: subtitleColor }]}>
                            {subText}
                        </ThemedText>
                    ) : null}
                </View>

                {isSwitch ? (
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => onSwitchChange?.(!switchValue)}
                        style={styles.toggleHit}
                    >
                        <View
                            style={[
                                styles.toggleTrack,
                                {
                                    backgroundColor: switchValue ? toggleOn : toggleOff,
                                    alignItems: switchValue ? 'flex-end' : 'flex-start',
                                },
                            ]}
                        >
                            <View style={styles.toggleKnob} />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <IconSymbol name="chevron.right" size={28} color={chevronColor} />
                )}
            </TouchableOpacity>

            {showDivider ? <View style={[styles.itemDivider, { backgroundColor: dividerColor }]} /> : null}
        </View>
    );
};

export default function PrayerSettingsScreen() {
    const router = useRouter();
    const { colors, isDark } = useAppColors();
    const insets = useSafeAreaInsets();

    const [adhanSoundEnabled, setAdhanSoundEnabled] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [jumuahReminderEnabled, setJumuahReminderEnabled] = useState(true);
    const [tahajjudReminderEnabled, setTahajjudReminderEnabled] = useState(false);
    const [asrMethod, setAsrMethod] = useState<'Shafi' | 'Hanafi'>('Shafi');
    const [isAsrModalVisible, setIsAsrModalVisible] = useState(false);

    const isLight = !isDark;
    const pageBg = isLight ? '#F1F1F1' : colors.background;
    const headerBg = isLight ? '#EAEAEA' : colors.surface;
    const headerTextColor = isLight ? '#151B24' : colors.text;
    const sectionColor = isLight ? '#ACACB0' : colors.textMuted;
    const asrOptionIconBg = isLight ? '#F0F0F0' : colors.surfaceSoft;
    const asrOptionIconColor = isLight ? '#1B2129' : '#D487FA';

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: pageBg }]}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={[styles.headerButton, { backgroundColor: headerBg }]}
                >
                    <IconSymbol name="arrow.left" size={24} color={headerTextColor} />
                </TouchableOpacity>
                <ThemedText type="poppins-semibold" style={[styles.headerTitle, { color: headerTextColor }]}>
                    Prayer settings
                </ThemedText>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
            >
                <ThemedText type="poppins-regular" style={[styles.sectionTitle, { color: sectionColor }]}>
                    Prayer Location
                </ThemedText>

                <SettingItem
                    icon={require('@/assets/icons/current-location.png')}
                    iconType="image"
                    title="Current Location"
                    subText="Ilorin East, Nigeria"
                    onPress={() => router.push('/prayer-times/current-location')}
                    colors={colors}
                    isLight={isLight}
                />
                <SettingItem
                    icon={require('@/assets/icons/calculation-method.png')}
                    iconType="image"
                    title="Calculation method"
                    subText="Muslim World League (MWL)"
                    onPress={() => router.push('/prayer-times/calculation-method')}
                    colors={colors}
                    isLight={isLight}
                />
                <SettingItem
                    icon={require('@/assets/icons/asr-method.png')}
                    iconType="image"
                    title="Asr Method"
                    subText="Standard / Hanafi"
                    onPress={() => setIsAsrModalVisible(true)}
                    colors={colors}
                    isLight={isLight}
                />

                <ThemedText type="poppins-regular" style={[styles.sectionTitle, styles.sectionWithTopGap, { color: sectionColor }]}>
                    Adhan & Sound
                </ThemedText>
                <SettingItem
                    icon={require('@/assets/icons/volume-high.png')}
                    iconType="image"
                    title="Adhan sound"
                    subText={adhanSoundEnabled ? 'Enabled' : 'Disabled'}
                    isSwitch
                    switchValue={adhanSoundEnabled}
                    onSwitchChange={setAdhanSoundEnabled}
                    colors={colors}
                    isLight={isLight}
                />
                <SettingItem
                    icon={require('@/assets/icons/screen-rotation.png')}
                    iconType="image"
                    title="Vibration"
                    subText={vibrationEnabled ? 'Enabled' : 'Disabled'}
                    isSwitch
                    switchValue={vibrationEnabled}
                    onSwitchChange={setVibrationEnabled}
                    colors={colors}
                    isLight={isLight}
                />

                <ThemedText type="poppins-regular" style={[styles.sectionTitle, styles.sectionWithTopGap, { color: sectionColor }]}>
                    Special Times
                </ThemedText>
                <SettingItem
                    icon={require('@/assets/icons/the-prophets-mosque.png')}
                    iconType="image"
                    title="Jumu'ah reminder"
                    subText={jumuahReminderEnabled ? 'Enabled' : 'Disabled'}
                    isSwitch
                    switchValue={jumuahReminderEnabled}
                    onSwitchChange={setJumuahReminderEnabled}
                    colors={colors}
                    isLight={isLight}
                />
                <SettingItem
                    icon={require('@/assets/icons/tahajjud-eminder.png')}
                    iconType="image"
                    title="Tahajjud reminder"
                    subText={tahajjudReminderEnabled ? 'Enabled' : 'Disabled'}
                    isSwitch
                    switchValue={tahajjudReminderEnabled}
                    onSwitchChange={setTahajjudReminderEnabled}
                    colors={colors}
                    isLight={isLight}
                    showDivider
                />
            </ScrollView>

            <Modal
                visible={isAsrModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsAsrModalVisible(false)}
            >
                <View style={[styles.asrOverlay, { backgroundColor: colors.overlay }]}>
                    <View style={[styles.asrSheet, { backgroundColor: colors.surface }]}>
                        <View style={[styles.asrHandle, { backgroundColor: colors.textMuted }]} />
                        <View style={styles.asrHeader}>
                            <ThemedText type="poppins-semibold" style={[styles.asrTitle, { color: colors.text }]}>
                                Asr Method
                            </ThemedText>
                            <TouchableOpacity onPress={() => setIsAsrModalVisible(false)}>
                                <IconSymbol name="xmark" size={22} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.asrOption}
                            activeOpacity={0.8}
                            onPress={() => setAsrMethod('Shafi')}
                        >
                            <View style={styles.asrLeft}>
                                <View style={[styles.asrIconBox, { backgroundColor: asrOptionIconBg }]}>
                                    <IconSymbol name="sun.max" size={19} color={asrOptionIconColor} />
                                </View>
                                <ThemedText type="poppins-medium" style={[styles.asrOptionText, { color: colors.text }]}>
                                    Shafi
                                </ThemedText>
                            </View>
                            {asrMethod === 'Shafi' ? (
                                <View style={styles.asrCheck}>
                                    <IconSymbol name="checkmark" size={18} color="#E18DFF" />
                                    <IconSymbol name="checkmark" size={18} color="#E18DFF" style={styles.asrCheckBack} />
                                </View>
                            ) : null}
                        </TouchableOpacity>

                        <View style={[styles.asrDivider, { backgroundColor: colors.border }]} />

                        <TouchableOpacity
                            style={styles.asrOption}
                            activeOpacity={0.8}
                            onPress={() => setAsrMethod('Hanafi')}
                        >
                            <View style={styles.asrLeft}>
                                <View style={[styles.asrIconBox, { backgroundColor: asrOptionIconBg }]}>
                                    <IconSymbol name="sun.min" size={19} color={asrOptionIconColor} />
                                </View>
                                <ThemedText type="poppins-medium" style={[styles.asrOptionText, { color: colors.text }]}>
                                    Hanafi
                                </ThemedText>
                            </View>
                            {asrMethod === 'Hanafi' ? (
                                <View style={styles.asrCheck}>
                                    <IconSymbol name="checkmark" size={18} color="#E18DFF" />
                                    <IconSymbol name="checkmark" size={18} color="#E18DFF" style={styles.asrCheckBack} />
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
        paddingHorizontal: 20,
        paddingBottom: 14,
    },
    headerButton: {
        width: 58,
        height: 58,
        borderRadius: 29,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        lineHeight: 30,
        marginLeft: 16,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 6,
    },
    sectionTitle: {
        fontSize: 18,
        lineHeight: 26,
        marginBottom: 12,
    },
    sectionWithTopGap: {
        marginTop: 32,
    },
    settingGroup: {
        marginBottom: 2,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 86,
        paddingVertical: 10,
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    localIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
    },
    itemTextContainer: {
        flex: 1,
        paddingRight: 14,
    },
    itemText: {
        fontSize: 22 / 1.4,
        lineHeight: 30,
    },
    itemSubText: {
        fontSize: 17 / 1.4,
        lineHeight: 22,
        marginTop: 2,
    },
    itemDivider: {
        height: 1,
        marginLeft: 72,
    },
    toggleHit: {
        paddingLeft: 10,
        paddingVertical: 6,
    },
    toggleTrack: {
        width: 54,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    toggleKnob: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
    },
    asrOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    asrSheet: {
        width: '100%',
        height: 285,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    asrOptionText: {
        fontSize: 18,
    },
    asrDivider: {
        height: 1.5,
    },
    asrCheck: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    asrCheckBack: {
        marginLeft: -6,
    },
});
