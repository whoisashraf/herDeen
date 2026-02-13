import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { LinearGradient } from 'expo-linear-gradient';
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
            color1: '#E18DFF',
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
            { text: 'Plan', color: '#E18DFF' },
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
            { text: 'Grow', color: '#E18DFF' },
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
    const colorScheme = useColorScheme() ?? 'dark';
    const colors = Colors[colorScheme];
    const isDark = colorScheme === 'dark';
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
        const contentBackground = isDark ? colors.background : '#ECECEE';
        const cardBackground = isDark ? '#1F2125' : '#E2E2E6';
        const headingColor = isDark ? '#FFFFFF' : '#1E2330';
        const secondaryHeadingColor = isDark ? '#FFFFFF' : '#1E2330';
        const accentPurple = '#E18DFF';
        const accentPink = '#F5A8D8';
        const buttonGradient = isDark ? ['#E18DFF', '#E18DFF'] : ['#C87AEF', '#E18DFF'];
        const buttonTextColor = '#FFFFFF';
        const inactiveDotColor = '#D39AFB';

        return (
            <View style={[styles.slideContainer, { width, backgroundColor: contentBackground }]}>
                <View style={[styles.illustrationContainer, { backgroundColor: cardBackground }]}>
                    <Image
                        source={item.image}
                        style={[styles.illustration, !isDark && styles.illustrationLight]}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textContainer}>
                    {/* Title Line 1 */}
                    <View style={styles.titleRow}>
                        {item.titleLine1Styles ? (
                            item.titleLine1Styles.map((part: any, i: number) => (
                                <ThemedText
                                    key={i}
                                    type={isDark ? 'poppins-bold' : 'amiri-bold'}
                                    style={[styles.title, { color: !isDark && part.color === '#FFFFFF' ? headingColor : part.color }]}>
                                    {part.text}
                                </ThemedText>
                            ))
                        ) : (
                            <ThemedText type={isDark ? 'poppins-bold' : 'amiri-bold'} style={[styles.title, { color: headingColor }]}>
                                {item.titleLine1}
                            </ThemedText>
                        )}
                    </View>

                    {/* Title Line 2 */}
                    <View style={styles.titleRow}>
                        <ThemedText
                            type={isDark ? 'poppins-bold' : 'amiri-bold'}
                            style={[styles.title, { color: !isDark ? accentPurple : item.titleLine2.color1 }]}>
                            {item.titleLine2.text1}
                        </ThemedText>
                        <ThemedText
                            type={isDark ? 'poppins-bold' : 'amiri-bold'}
                            style={[styles.title, { color: !isDark ? secondaryHeadingColor : item.titleLine2.color2 }]}>
                            {item.titleLine2.text2}
                        </ThemedText>
                        <ThemedText
                            type={isDark ? 'poppins-bold' : 'amiri-bold'}
                            style={[styles.title, { color: !isDark ? accentPink : item.titleLine2.color3 }]}>
                            {item.titleLine2.text3}
                        </ThemedText>
                    </View>
                </View>

                <View style={styles.bottomContent}>
                    {/* Pagination Dots */}
                    <View style={styles.paginationContainer}>
                        {Array.from({ length: totalContentSlides }).map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    contentIndex === i
                                        ? [styles.activeDot, { backgroundColor: accentPurple }]
                                        : [styles.inactiveDot, { borderColor: inactiveDotColor }]
                                ]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <LinearGradient
                            colors={buttonGradient}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.buttonGradient}>
                            <ThemedText type="poppins-medium" style={[styles.buttonText, { color: buttonTextColor }]}>
                                {item.buttonText}
                            </ThemedText>
                        </LinearGradient>
                    </TouchableOpacity>

                    {item.showLogin && (
                        <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={styles.loginContainer}>
                            <ThemedText type="poppins-regular" style={[styles.loginText, { color: isDark ? '#8E8E93' : '#5B6268' }]}>
                                Login
                            </ThemedText>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} translucent backgroundColor="transparent" />
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
        backgroundColor: '#13181C',
    },
    // Welcome Slide Styles
    welcomeBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E18DFF',
    },
    welcomeOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E18DFF',
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
        backgroundColor: '#13181C',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        paddingBottom: 30,
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
    illustrationLight: {
        width: '78%',
        height: '78%',
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
        fontSize: 33,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 41,
        fontWeight: '600',
    },
    bottomContent: {
        marginTop: 'auto',
        alignItems: 'center',
        width: '100%',
    },
    paginationContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 26,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    activeDot: {
        backgroundColor: '#E18DFF',
    },
    inactiveDot: {
        borderWidth: 1,
        borderColor: '#E18DFF',
    },
    button: {
        width: 200,
        height: 58,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 12,
    },
    buttonGradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    loginContainer: {
        padding: 5,
        marginBottom: 6,
    },
    loginText: {
        color: '#8E8E93',
        fontSize: 14,
    }
});
