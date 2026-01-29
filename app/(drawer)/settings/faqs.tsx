import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const PURPLE = '#5C1E68';
const TEXT_GRAY = '#1A1A1A';
const BG_COLOR = '#F9F9F9';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "What's HerDeen?",
        answer: "HerDeen is more than an app—it's your digital companion for living intentionally as a Muslimah, with Allah at the center of every plan and habit.",
    },
    {
        question: "Is HerDeen Free to use?",
        answer: "Yes, HerDeen is completely free to download and use. We offer premium features for users who want additional functionality.",
    },
    {
        question: "What happens when I join HerDeen waitlist?",
        answer: "When you join our waitlist, you'll be among the first to know about new features, updates, and exclusive early access to premium content.",
    },
    {
        question: "Will my information be secure?",
        answer: "Absolutely. We take your privacy seriously and use industry-standard encryption to protect your personal information and data.",
    },
    {
        question: "Is HerDeen only for practicing Muslim?",
        answer: "HerDeen is designed for all Muslim women, whether you're just starting your spiritual journey or have been practicing for years. Everyone is welcome!",
    },
];

export default function FAQsScreen() {
    const router = useRouter();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="arrow.left" size={24} color={TEXT_GRAY} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>FAQs</Text>
                </View>
            </SafeAreaView>

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
                            <Text style={styles.heroTitle}>You've got a question?</Text>
                            <Text style={styles.heroSubtitle}>
                                We're here to answer all. Here are some{'\n'}frequently ask question for HerDeen
                            </Text>
                        </View>
                        <Image
                            source={require('@/assets/images/faq.png')}
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                    </View>
                </ImageBackground>

                {/* FAQ List */}
                <View style={styles.faqContainer}>
                    {faqData.map((faq, index) => (
                        <View key={index} style={styles.faqCard}>
                            <TouchableOpacity
                                style={styles.faqHeader}
                                onPress={() => toggleFAQ(index)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.faqQuestion}>{faq.question}</Text>
                                <View style={styles.iconCircle}>
                                    <IconSymbol
                                        name={expandedIndex === index ? "chevron.up" : "chevron.down"}
                                        size={20}
                                        color={PURPLE}
                                    />
                                </View>
                            </TouchableOpacity>
                            {expandedIndex === index && (
                                <Text style={styles.faqAnswer}>{faq.answer}</Text>
                            )}
                        </View>
                    ))}
                </View>

                {/* Contact Footer */}
                <View style={styles.contactFooter}>
                    <Text style={styles.contactText}>
                        Can't find an answer to your question?{' '}
                        <Text
                            style={styles.contactLink}
                            onPress={() => router.push('/(drawer)/settings/contact')}
                        >
                            Contact Us
                        </Text>
                    </Text>
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
        padding: 20,
        paddingBottom: 40,
    },
    heroCard: {
        height: 120,
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
        padding: 20,
    },
    heroTextContainer: {
        flex: 1,
    },
    heroTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 6,
    },
    heroSubtitle: {
        fontSize: 12,
        fontWeight: '400',
        color: '#FFFFFF',
        lineHeight: 18,
    },
    heroImage: {
        position: 'absolute',
        right: -10,
        top: -25,
        width: 120,
        height: 110,
    },
    faqContainer: {
        marginBottom: 24,
    },
    faqCard: {
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
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    faqQuestion: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#2B0E30',
        marginRight: 12,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: PURPLE + '20', 
        backgroundColor: PURPLE + '10', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    faqAnswer: {
        fontSize: 12,
        fontWeight: '400',
        color: '#6B6B6B',
        lineHeight: 22,
        marginTop: 12,
        paddingRight: 40,
    },
    contactFooter: {
        alignItems: 'center',
        marginTop: 8,
    },
    contactText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#2B0E30',
        textAlign: 'center',
    },
    contactLink: {
        color: PURPLE,
        fontWeight: '500',
    },
});
