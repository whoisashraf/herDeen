import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColors } from '@/hooks/use-app-colors';
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

const PURPLE = '#E18DFF';
const LIGHT_PURPLE = '#332646';

export default function ContactUsScreen() {
    const router = useRouter();
    const { colors, isDark } = useAppColors();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Contact Us</Text>
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
                        <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
                            <View style={[styles.iconBox, { backgroundColor: colors.chip }]}>
                                <IconSymbol name="mail" size={24} color={PURPLE} />
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Email Address</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>support@herdeen.com</Text>
                            </View>
                        </View>

                        {/* Phone */}
                        <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
                            <View style={[styles.iconBox, { backgroundColor: colors.chip }]}>
                                <IconSymbol name="phone" size={24} color={PURPLE} />
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Phone</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>support@herdeen.com</Text>
                            </View>
                        </View>

                        {/* Address */}
                        <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
                            <View style={[styles.iconBox, { backgroundColor: colors.chip }]}>
                                <IconSymbol name="location" size={24} color={PURPLE} />
                            </View>
                            <View style={styles.infoTextContainer}>
                                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Address</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>E4/817G, Adekile, Idi-Orogbo, Ibadan.</Text>
                            </View>
                        </View>
                    </View>

                    {/* Contact Form */}
                    <Text style={[styles.formTitle, { color: colors.text }]}>Send Us a Message</Text>

                    <View style={[styles.formCard, { backgroundColor: colors.surface }]}>
                        {/* Name Row */}
                        <View style={styles.nameRow}>
                            <View style={styles.nameInputContainer}>
                                <Text style={[styles.inputLabel, { color: colors.textMuted }]}>First Name</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                                    placeholder="Aishah"
                                    placeholderTextColor={colors.textMuted}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                            </View>
                            <View style={styles.nameInputContainer}>
                                <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Last Name</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                                    placeholder="Abdullahi"
                                    placeholderTextColor={colors.textMuted}
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Email Address</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                                placeholder="aishahabdullahi09@gmail.com"
                                placeholderTextColor={colors.textMuted}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Message */}
                        <View style={styles.inputContainer}>
                            <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Message</Text>
                            <TextInput
                                style={[styles.input, styles.messageInput, { backgroundColor: colors.background, color: colors.text }]}
                                placeholder="Type your message here..."
                                placeholderTextColor={colors.textMuted}
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
        backgroundColor: '#1F2125',
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
        color: '#FFFFFFB2',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    formTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    formCard: {
        backgroundColor: '#1F2125',
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
        color: '#FFFFFFB2',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#13181C',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#FFFFFF',
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
        backgroundColor: '#16171A',
        shadowOpacity: 0.1,
    },
    sendButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFFFFF',
    },
});
