import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useDateIdeas } from '../context/DateIdeasContext';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AlphabetGrid: React.FC = () => {
    const { allIdeas } = useDateIdeas();

    const getIdeaCountForLetter = (letter: string): number => {
        return allIdeas.filter(idea => idea.letter === letter).length;
    };

    const handleLetterPress = (letter: string) => {
        // Navigate to the letter screen
        try {
            router.push({
                pathname: "/letter/[letter]",
                params: { letter }
            } as any);
        } catch (error) {
            console.error("Navigation error:", error);
            // Fallback navigation using string path
            router.push(`/letter/${letter}`);
        }
    };

    const renderItem = ({ item: letter }: { item: string }) => {
        const count = getIdeaCountForLetter(letter);
        const hasIdeas = count > 0;

        return (
            <TouchableOpacity
                style={[
                    styles.letterBox,
                    hasIdeas ? styles.hasIdeas : styles.noIdeas,
                ]}
                onPress={() => handleLetterPress(letter)}
                disabled={!hasIdeas}
            >
                <Text style={[
                    styles.letter,
                    hasIdeas ? styles.letterActive : styles.letterInactive
                ]}>
                    {letter}
                </Text>
                {hasIdeas && (
                    <Text style={styles.count}>{count}</Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={ALPHABET}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                numColumns={4}
                contentContainerStyle={styles.grid}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    grid: {
        paddingVertical: 8,
        alignItems: 'center',
    },
    letterBox: {
        width: 80,
        height: 80,
        margin: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    hasIdeas: {
        backgroundColor: '#ffffff',
    },
    noIdeas: {
        backgroundColor: '#f0f0f0',
    },
    letter: {
        fontSize: 28,
        fontWeight: '700',
    },
    letterActive: {
        color: '#333',
    },
    letterInactive: {
        color: '#aaa',
    },
    count: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});

export default AlphabetGrid; 