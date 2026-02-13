import CardBg from '@/assets/images/card-bg.png';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function OverviewCard({ completed = 4, total = 5, percentage = 60 }: { completed?: number; total?: number; percentage?: number }) {
    return (
        <View style={styles.overviewContainer}>
            <ImageBackground source={CardBg} style={styles.overviewCard} imageStyle={{ borderRadius: 16 }} resizeMode="cover">
                <LinearGradient colors={["rgba(168,85,247,0.35)", "rgba(74,12,99,0.35)"]} style={styles.overviewGradient} start={[0, 0]} end={[1, 1]}>
                    <View style={styles.overviewContent}>
                        <View style={styles.overviewLeft}>
                            <Text style={styles.overviewTitle}>Today&#39;s Overview</Text>
                            <Text style={styles.overviewSubtitle}>
                                Very in the remembrance of Allah do heart find rest
                            </Text>
                            <View style={styles.progressBadge}>
                                <Text style={styles.progressBadgeText}>{`${completed} of ${total} Ibadah complete`}</Text>
                            </View>
                        </View>

                        <View style={styles.progressCircleContainer}>
                            <View style={styles.progressCircleBackground} />
                            <View style={styles.progressCircleForeground} />
                            <Text style={styles.progressPercentage}>{percentage}%</Text>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    overviewContainer: { paddingHorizontal: 20, marginBottom: 24 },
    overviewCard: { backgroundColor: '#E18DFF', borderRadius: 16, minHeight: 140, overflow: 'hidden' },
    overviewGradient: { flex: 1, padding: 20, justifyContent: 'center', borderRadius: 16 },
    overviewContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    overviewLeft: { flex: 1, paddingRight: 16 },
    overviewTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    overviewSubtitle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 12, fontStyle: 'italic', marginBottom: 16 },
    progressBadge: { backgroundColor: 'white', borderRadius: 8, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6 },
    progressBadgeText: { color: '#E18DFF', fontSize: 12, fontWeight: 'bold' },
    progressCircleContainer: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', position: 'relative' },
    progressCircleBackground: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'center', position: 'absolute' },
    progressCircleForeground: { width: 80, height: 80, borderRadius: 40, borderTopWidth: 4, borderRightWidth: 4, borderBottomWidth: 0, borderLeftWidth: 0, borderColor: 'white', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '45deg' }], position: 'absolute' },
    progressPercentage: { color: 'white', fontSize: 20, fontWeight: 'bold' },
});