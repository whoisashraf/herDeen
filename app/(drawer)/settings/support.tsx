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

const donationAmounts = [
    '₦2,000',
    '₦24,000',
    '₦55,000',
    '₦125,000',
    '₦560,000',
    '₦1,200,000',
];

export default function SupportUsScreen() {
    const router = useRouter();
    const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
    const [customAmount, setCustomAmount] = useState('');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={TEXT_GRAY} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Support Us</Text>
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
                                <Text style={styles.heroTitle}>Support Us</Text>
                                <Text style={styles.heroSubtitle}>
                                    Help us provide better services to{'\n'}all muslimahs
                                </Text>
                            </View>
                            <Image
                                source={require('@/assets/images/support.png')}
                                style={styles.heroImage}
                                resizeMode="contain"
                            />
                        </View>
                    </ImageBackground>

                    {/* Donation Amount Grid */}
                    <View style={styles.amountGrid}>
                        {donationAmounts.map((amount, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.amountCard,
                                    selectedAmount === amount && styles.amountCardSelected,
                                ]}
                                onPress={() => {
                                    setSelectedAmount(amount);
                                    setCustomAmount('');
                                }}
                            >
                                <Text
                                    style={[
                                        styles.amountText,
                                        selectedAmount === amount && styles.amountTextSelected,
                                    ]}
                                >
                                    {amount}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Custom Amount Input */}
                    <View style={styles.customAmountContainer}>
                        <TextInput
                            style={styles.customAmountInput}
                            placeholder="Enter custom amount"
                            placeholderTextColor="#8A8A8E"
                            value={customAmount}
                            onChangeText={(text) => {
                                setCustomAmount(text);
                                setSelectedAmount(null);
                            }}
                            keyboardType="numeric"
                        />
                    </View>

                    {/* Support Button */}
                    <TouchableOpacity
                        style={[
                            styles.supportButton,
                            (!selectedAmount && !customAmount) && styles.supportButtonDisabled,
                        ]}
                        disabled={!selectedAmount && !customAmount}
                    >
                        <Text style={styles.supportButtonText}>Support Us</Text>
                    </TouchableOpacity>
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
        height: 100,
        borderRadius: 20,
        // overflow: 'hidden',
        marginBottom: 24,
    },
    heroCardImage: {
        borderRadius: 20,
    },
    heroContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    heroTextContainer: {
        flex: 1,
    },
    heroTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        margin: 4,
    },
    heroSubtitle: {
        fontSize: 12,
        fontWeight: '400',
        color: '#FFFFFF',
        lineHeight: 20,
    },
    heroImage: {
        width: 110,
        height: 150,
        marginLeft: 12,
        marginTop: 10,
    },
    amountGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
    },
    amountCard: {
        width: '30%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    amountCardSelected: {
        borderColor: PURPLE,
        backgroundColor: '#F9F3FB',
    },
    amountText: {
        fontSize: 14,
        fontWeight: '400',
        color: TEXT_GRAY,
    },
    amountTextSelected: {
        color: PURPLE,
        fontWeight: '700',
    },
    customAmountContainer: {
        marginBottom: 24,
    },
    customAmountInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F2F2F7',
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: TEXT_GRAY,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    supportButton: {
        backgroundColor: PURPLE,
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: PURPLE,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 4,
    },
    supportButtonDisabled: {
        backgroundColor: '#C7C7CC',
        shadowOpacity: 0.1,
    },
    supportButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
