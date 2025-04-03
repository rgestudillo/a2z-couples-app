import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import AlphabetGrid from '../../components/AlphabetGrid';

export default function LettersScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <AlphabetGrid />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    content: {
        flex: 1,
        paddingTop: 16,
    },
}); 