import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const PURPLE = '#5C1E68';
const TEXT_GRAY = '#1A1A1A';
const BG_COLOR = '#F9F9F9';
const LIGHT_PURPLE = '#F3E8F7';

export default function ContactUsScreen() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={TEXT_GRAY} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Contact Us</Text>
                </View>
            </SafeAreaView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Hero Card */}
                    <ImageBackground
                        source={require('@/assets/images/card-bg.png')}
                        style={styles.heroCard}
                        imageStyle={styles.heroCardImage}
                    >
                        <View style={styles.heroContent}>
                            <View style={styles.heroTextContainer}>
                                <Text style={styles.heroTitle}>Need help?</Text>
                                <Text style={styles.heroSubtitle}>Contact us!</Text>
                            </View>
                            <Image
                                source={require('@/assets/images/contact.png')}
                                style={styles.heroImage}
                                resizeMode="contain"
                            />
                        </View>
                    </ImageBackground>

                    {/* Contact Info Cards */}
                    <View style={styles.contactInfoContainer}>
                        {/* Email */}
                        <View style={styles.infoCard}>
                            <View style={styles.iconBox}>
                                <IconSymbol name="mail" size={24} color={PURPLE} />
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Email Address</Text>
                                <Text style={styles.infoValue}>support@herdeen.com</Text>
                            </View>
                        </View>

                        {/* Phone */}
                        <View style={styles.infoCard}>
                            <View style={styles.iconBox}>
                                <IconSymbol name="phone" size={24} color={PURPLE} />
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Phone</Text>
                                <Text style={styles.infoValue}>support@herdeen.com</Text>
                            </View>
                        </View>

                        {/* Address */}
                        <View style={styles.infoCard}>
                            <View style={styles.iconBox}>
                                <IconSymbol name="location" size={24} color={PURPLE} />
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Address</Text>
                                <Text style={styles.infoValue}>E4/817G, Adekile, Idi-Orogbo, Ibadan.</Text>
                            </View>
                        </View>
                    </View>

                    {/* Contact Form */}
                    <Text style={styles.formTitle}>Send Us a Message</Text>

                    <View style={styles.formCard}>
                        {/* Name Row */}
                        <View style={styles.nameRow}>
                            <View style={styles.nameInputContainer}>
                                <Text style={styles.inputLabel}>First Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Aishah"
                                    placeholderTextColor="#8A8A8E"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                            </View>
                            <View style={styles.nameInputContainer}>
                                <Text style={styles.inputLabel}>Last Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Abdullahi"
                                    placeholderTextColor="#8A8A8E"
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="aishahabdullahi09@gmail.com"
                                placeholderTextColor="#8A8A8E"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Message */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Message</Text>
                            <TextInput
                                style={[styles.input, styles.messageInput]}
                                placeholder="Type your message here..."
                                placeholderTextColor="#8A8A8E"
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                numberOfLines={6}
                                textAlignVertical="top"
                            />
                        </View>

                        {/* Send Button */}
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                (!firstName || !lastName || !email || !message) && styles.sendButtonDisabled,
                            ]}
                            disabled={!firstName || !lastName || !email || !message}
                        >
                            <Text style={styles.sendButtonText}>Send message</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
        padding: 20,
        paddingBottom: 40,
    },
    heroCard: {
        width: 390,
        height: 100,
        borderRadius: 10,
        marginBottom: 24,
        marginTop: 30,
        alignSelf: 'center',
    },
    heroCardImage: {
        borderRadius: 10,
    },
    heroContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        gap: 16,
    },
    heroTextContainer: {
        flex: 1,
    },
    heroTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    heroSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FFFFFF',
    },
    heroImage: {
        position: 'absolute',
        right: -20,
        bottom: -5,
        width: 180,
        height: 155,
    },
    contactInfoContainer: {
        marginBottom: 24,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconBox: {
        width: 48,
        height: 48,
        backgroundColor: LIGHT_PURPLE,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#444444',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2B0E30',
    },
    formTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_GRAY,
        marginBottom: 16,
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        width: 390,
        height: 457,
        borderRadius: 10,
        padding: 16,
        gap: 20,
        alignSelf: 'center',
        marginBottom: 20,
    },
    nameRow: {
        flexDirection: 'row',
        gap: 12,
    },
    nameInputContainer: {
        flex: 1,
    },
    inputContainer: {
        gap: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '400',
        color: '#444444',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: TEXT_GRAY,
    },
    messageInput: {
        height: 150,
        paddingTop: 14,
    },
    sendButton: {
        backgroundColor: PURPLE,
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        shadowColor: PURPLE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 4,
    },
    sendButtonDisabled: {
        backgroundColor: '#C7C7CC',
        shadowOpacity: 0.1,
    },
    sendButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFFFFF',
    },
});
