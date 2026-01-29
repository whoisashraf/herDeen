import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
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

export default function ProfileScreen() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('Aishah');
    const [lastName, setLastName] = useState('Abdullahi');
    const [email, setEmail] = useState('aishahabdullahi09@gmail.com');
    const [phone, setPhone] = useState('+234 913 892 7486');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={TEXT_GRAY} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile Info</Text>
                </View>
            </SafeAreaView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Avatar Section */}
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={require('@/assets/images/profile.jpg')}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.editIconContainer}>
                                <IconSymbol name="camera" size={20} color={TEXT_GRAY} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholder="First Name"
                                placeholderTextColor="#C7C7CC"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                value={lastName}
                                onChangeText={setLastName}
                                placeholder="Last Name"
                                placeholderTextColor="#C7C7CC"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[styles.input, styles.disabledInput]}
                                value={email}
                                editable={false}
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mobile Number</Text>
                            <TextInput
                                style={styles.input}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                placeholder="Mobile Number"
                                placeholderTextColor="#C7C7CC"
                            />
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save Changes</Text>
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
        paddingBottom: 40,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: PURPLE,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#FFFFFF',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    form: {
        paddingHorizontal: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A4A4A',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        height: 58,
        paddingHorizontal: 16,
        fontSize: 16,
        color: TEXT_GRAY,
        // Soft Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    disabledInput: {
        color: '#8A8A8E',
        backgroundColor: '#F2F2F7',
        borderColor: 'transparent',
    },
    saveButton: {
        backgroundColor: PURPLE,
        height: 58,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: PURPLE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 4,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});
