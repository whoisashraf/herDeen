import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomActions({ onCompleted }: { onCompleted?: () => void }) {
    return (
        <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.saveButton} onPress={onCompleted}>
                <Text style={styles.saveButtonText}>Completed</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomActions: { paddingHorizontal: 20, paddingBottom: 32 },
    saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, backgroundColor: '#62206E', borderRadius: 12 },
    saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});