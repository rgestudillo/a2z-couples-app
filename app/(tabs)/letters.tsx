import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import AlphabetGrid from '@/components/AlphabetGrid';
import { useIdeas } from '@/context/IdeasContext';
import CategorySelector from '@/components/CategorySelector';

export default function LettersScreen() {
    const { currentCategory } = useIdeas();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.selectorContainer}>
                <CategorySelector containerStyle={styles.categorySelectorStyle} />
            </View>

            <View style={styles.content}>
                <AlphabetGrid />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8F9',
    },
    selectorContainer: {
        paddingTop: 8,
    },
    categorySelectorStyle: {
        marginTop: 0,
    },
    content: {
        flex: 1,
    },
}); 