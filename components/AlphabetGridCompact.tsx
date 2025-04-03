import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useIdeas, IdeaType } from '../context/IdeasContext';
import { Ionicons } from '@expo/vector-icons';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AlphabetGridCompact: React.FC = () => {
    const { allIdeas, currentCategory, completedIdeas } = useIdeas();
    const ideas = allIdeas[currentCategory];

    const getIdeaCountForLetter = (letter: string): number => {
        return ideas.filter(idea => idea.letter === letter).length;
    };

    const hasCompletedIdeasForLetter = (letter: string): boolean => {
        const ideasForLetter = ideas.filter(idea => idea.letter === letter);
        return ideasForLetter.some(idea =>
            (completedIdeas[currentCategory] || []).includes(idea.id)
        );
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
                    const hasCompleted = hasCompletedIdeasForLetter(letter);
                    return (
                        <TouchableOpacity
                            key={letter}
                            style={[
                                styles.letterBox,
                                hasCompleted && styles.completedLetterBox
                            ]}
                            onPress={() => handleLetterPress(letter)}
                        >
                            {hasCompleted && (
                                <View style={styles.completedCheck}>
                                    <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                                </View>
                            )}
                            <Text style={[
                                styles.letter,
                                hasCompleted && styles.completedLetter
                            ]}>
                                {letter}
                            </Text>
                            <View style={[
                                styles.countBadge,
                                hasCompleted && styles.completedCountBadge
                            ]}>
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
        borderWidth: 1,
        borderColor: 'transparent',
    },
    completedLetterBox: {
        backgroundColor: '#F1F8E9',
        borderColor: '#4CAF50',
    },
    completedCheck: {
        position: 'absolute',
        top: 8,
        left: 8,
    },
    letter: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    completedLetter: {
        color: '#4CAF50',
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
    completedCountBadge: {
        backgroundColor: '#4CAF50',
    },
    count: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
    },
});

export default AlphabetGridCompact; 