import telegramIcon from '@/assets/icons/telegram_icon.png';
import whatsappIcon from '@/assets/icons/whatsapp_icon.png';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { Image, Linking, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

interface CommunityModalProps {
    visible: boolean;
    onClose: () => void;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({ visible, onClose }) => {
    const handleTelegramPress = () => {
        Linking.openURL('https://t.me/your_group_link');
    };

    const handleWhatsappPress = () => {
        Linking.openURL('https://chat.whatsapp.com/your_group_link');
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Handle Indicator */}
                    <View style={styles.handle} />

                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <IconSymbol name="xmark" size={24} color="#4A4A4A" />
                    </TouchableOpacity>

                    {/* Community Image */}
                    <Image
                        source={require('@/assets/images/community.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />

                    {/* Title */}
                    <ThemedText type="poppins-bold" style={styles.title}>
                        Join the HerDeen Sisterhood 💞
                    </ThemedText>

                    {/* Subtitle */}
                    <ThemedText type="poppins-regular" style={styles.subtitle}>
                        Connect with supportive Muslimah sisters who are also striving to balance Deen and Dunya — just like you.
                    </ThemedText>

                    {/* Telegram Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.telegramButton]}
                        onPress={handleTelegramPress}
                    >
                        <View style={styles.buttonContent}>
                            <Image source={telegramIcon} style={styles.iconImage} />
                            <ThemedText type="poppins-semibold" style={styles.buttonText}>
                                Telegram
                            </ThemedText>
                        </View>
                    </TouchableOpacity>

                    {/* WhatsApp Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.whatsappButton]}
                        onPress={handleWhatsappPress}
                    >
                        <View style={styles.buttonContent}>
                            <Image source={whatsappIcon} style={styles.iconImage} />
                            <ThemedText type="poppins-semibold" style={[styles.buttonText, styles.whatsappText]}>
                                Whatsapp
                            </ThemedText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 32,
        paddingBottom: 40,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 10,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        marginBottom: 16,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    illustration: {
        width: '100%',
        height: 200,
        marginBottom: 24,
    },
    title: {
        fontSize: 22,
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    button: {
        width: '100%',
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    telegramButton: {
        backgroundColor: '#7C4A8D',
    },
    whatsappButton: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#AA74E0',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    iconImage: {
        width: 32,
        height: 32,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    whatsappText: {
        color: '#AA74E0',
    },
});
