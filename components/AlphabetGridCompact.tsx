import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useIdeas, IdeaType } from '../context/IdeasContext';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AlphabetGridCompact: React.FC = () => {
    const { allIdeas, currentCategory } = useIdeas();
    const ideas = allIdeas[currentCategory];

    const getIdeaCountForLetter = (letter: string): number => {
        return ideas.filter(idea => idea.letter === letter).length;
    };

    const handleLetterPress = (letter: string) => {
        // Navigate to the letter screen with category
        try {
            router.push({
                pathname: "/letter/[letter]",
                params: { letter, category: currentCategory }
            } as any);
        } catch (error) {
            console.error("Navigation error:", error);
            // Fallback navigation using string path
            router.push(`/letter/${letter}?category=${currentCategory}` as any);
        }
    };

    // Find letters with ideas
    const lettersWithIdeas = ALPHABET.filter(letter => getIdeaCountForLetter(letter) > 0);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {lettersWithIdeas.map((letter) => {
                    const count = getIdeaCountForLetter(letter);
                    return (
                        <TouchableOpacity
                            key={letter}
                            style={styles.letterBox}
                            onPress={() => handleLetterPress(letter)}
                        >
                            <Text style={styles.letter}>{letter}</Text>
                            <View style={styles.countBadge}>
                                <Text style={styles.count}>{count}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    scrollContent: {
        paddingHorizontal: 4,
    },
    letterBox: {
        width: 60,
        height: 70,
        marginHorizontal: 6,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        position: 'relative',
    },
    letter: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    countBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#ff6b6b',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    count: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
    },
});

export default AlphabetGridCompact; 