import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: 'welcome',
        type: 'splash'
    },
    {
        id: 'balance',
        type: 'content',
        image: require('@/assets/images/onboarding-read.png'),
        titleLine1: 'Balance Your',
        titleLine2: {
            text1: 'Deen',
            color1: '#AA74E0',
            text2: ' & ',
            color2: '#FFFFFF',
            text3: 'Dunya',
            color3: '#FEA1CD',
        },
        buttonText: 'Next'
    },
    {
        id: 'plan',
        type: 'content',
        image: require('@/assets/images/onboarding-plan.png'),
        titleLine1: 'Plan your day',
        titleLine1Styles: [
            { text: 'Plan', color: '#AA74E0' },
            { text: ' your day', color: '#FFFFFF' }
        ],
        titleLine2: {
            text1: 'With',
            color1: '#FFFFFF',
            text2: ' ',
            color2: '#FFFFFF',
            text3: 'Intention',
            color3: '#FEA1CD',
        },
        buttonText: 'Next'
    },
    {
        id: 'grow',
        type: 'content',
        image: require('@/assets/images/onboarding-sisterhood.png'),
        titleLine1: 'Grow and shine',
        titleLine1Styles: [
            { text: 'Grow', color: '#AA74E0' },
            { text: ' and shine', color: '#FFFFFF' }
        ],
        titleLine2: {
            text1: 'With',
            color1: '#FFFFFF',
            text2: ' ',
            color2: '#FFFFFF',
            text3: 'Sisterhood',
            color3: '#FFB6C1',
        },
        buttonText: 'Join Us',
        showLogin: true
    }
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (currentIndex === 0) {
            const timer = setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                    index: 1,
                    animated: true,
                });
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            router.replace('/(auth)/sign-up');
        }
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        // Slide 1: Welcome / Splash Style
        if (item.type === 'splash') {
            return (
                <View style={{ width, height }}>
                    <ImageBackground
                        source={require('@/assets/images/first-screen.jpg')}
                        style={styles.welcomeBackground}
                        resizeMode="cover"
                    >
                        <View style={styles.welcomeOverlay} />
                        <View style={styles.welcomeContent}>
                            <View style={styles.logoContainer}>
                                <Image
                                    source={require('@/assets/icons/first-logo.png')}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            );
        }

        // Slide 2+: Content Slides
        const contentIndex = index - 1;
        const totalContentSlides = SLIDES.length - 1;

        return (
            <View style={[styles.slideContainer, { width }]}>
                <View style={styles.illustrationContainer}>
                    <Image
                        source={item.image}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textContainer}>
                    {/* Title Line 1 */}
                    <View style={styles.titleRow}>
                        {item.titleLine1Styles ? (
                            item.titleLine1Styles.map((part: any, i: number) => (
                                <ThemedText key={i} type="poppins-bold" style={[styles.title, { color: part.color }]}>
                                    {part.text}
                                </ThemedText>
                            ))
                        ) : (
                            <ThemedText type="poppins-bold" style={styles.title}>
                                {item.titleLine1}
                            </ThemedText>
                        )}
                    </View>

                    {/* Title Line 2 */}
                    <View style={styles.titleRow}>
                        <ThemedText type="poppins-bold" style={[styles.title, { color: item.titleLine2.color1 }]}>
                            {item.titleLine2.text1}
                        </ThemedText>
                        <ThemedText type="poppins-bold" style={[styles.title, { color: item.titleLine2.color2 }]}>
                            {item.titleLine2.text2}
                        </ThemedText>
                        <ThemedText type="poppins-bold" style={[styles.title, { color: item.titleLine2.color3 }]}>
                            {item.titleLine2.text3}
                        </ThemedText>
                    </View>
                </View>

                {/* Pagination Dots */}
                <View style={styles.paginationContainer}>
                    {Array.from({ length: totalContentSlides }).map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                contentIndex === i ? styles.activeDot : styles.inactiveDot
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <ThemedText type="poppins-medium" style={styles.buttonText}>
                        {item.buttonText}
                    </ThemedText>
                </TouchableOpacity>

                {item.showLogin && (
                    <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={styles.loginContainer}>
                        <ThemedText type="poppins-regular" style={styles.loginText}>
                            Login
                        </ThemedText>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                style={{ flex: 1 }}
            />

            {currentIndex === 0 && (
                <TouchableOpacity
                    style={styles.welcomeTouchArea}
                    onPress={handleNext}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
    },
    // Welcome Slide Styles
    welcomeBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AA74E0',
    },
    welcomeOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#AA74E0',
        opacity: 0.9,
    },
    welcomeContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.35,
        height: width * 0.35,
    },
    welcomeTouchArea: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
    },

    // Content Slide Styles
    slideContainer: {
        flex: 1,
        backgroundColor: '#111111',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        paddingBottom: 40,
    },
    illustrationContainer: {
        width: width - 20,
        height: 450,
        borderRadius: 40,
        backgroundColor: '#1F2125',
        marginTop: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
        overflow: 'hidden',
        paddingTop: 25,
    },
    illustration: {
        width: '60%',
        height: '60%',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 40,
        gap: 4,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 32,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 40,
    },
    paginationContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 40,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    activeDot: {
        backgroundColor: '#AA74E0',
    },
    inactiveDot: {
        borderWidth: 1,
        borderColor: '#AA74E0',
    },
    button: {
        backgroundColor: '#AA74E0',
        width: 200,
        height: 58,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    loginContainer: {
        padding: 5,
    },
    loginText: {
        color: '#8E8E93',
        fontSize: 14,
    }
});
