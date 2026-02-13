import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface OnboardingSuccessModalProps {
    visible: boolean;
    onClose: () => void;
    onRevealGift: () => void;
}

export default function OnboardingSuccessModal({
    visible,
    onClose,
    onRevealGift
}: OnboardingSuccessModalProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Close button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={28} color="#FFFFFF" />
                    </TouchableOpacity>

                    {/* Celebration image */}
                    <View style={styles.celebrationContainer}>
                        <Image
                            source={require('@/assets/images/celebration_thumbsup.png')}
                            style={styles.celebrationImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Title */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>You're In! </Text>
                        <Text style={styles.sparkle}>✨</Text>
                    </View>

                    {/* Subtitle */}
                    <Text style={styles.subtitle}>
                        Your HerDeen space is ready. Let's grow{'\n'}with faith and intention.
                    </Text>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.revealButton}
                            onPress={onRevealGift}
                            activeOpacity={0.85}
                        >
                            <ThemedText type="poppins-semibold" style={styles.revealButtonText}>
                                Click to reveal your gift
                            </ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeTextButton}
                            onPress={onClose}
                            activeOpacity={0.7}
                        >
                            <ThemedText type="poppins-medium" style={styles.closeTextButtonText}>
                                Close
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#1F2125',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderWidth: 1,
        borderColor: '#0000001A',
        paddingTop: 32,
        paddingHorizontal: 32,
        paddingBottom: 48,
        minHeight: 420,
        maxWidth: 420,
        width: '100%',
        alignSelf: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 24,
        right: 24,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    celebrationContainer: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    celebrationImage: {
        width: 280,
        height: 180,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 40,
        color: '#FFFFFF',
        fontFamily: 'Amiri_700Bold',
        textAlign: 'center',
    },
    sparkle: {
        fontSize: 32,
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#9CA3AF',
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    buttonContainer: {
        gap: 16,
        marginTop: 'auto',
    },
    revealButton: {
        backgroundColor: '#E18DFF',
        borderRadius: 100,
        paddingVertical: 16,
        width: '100%',
        alignItems: 'center',
    },
    revealButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    closeTextButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    closeTextButtonText: {
        color: '#9CA3AF',
        fontSize: 16,
    },
});
