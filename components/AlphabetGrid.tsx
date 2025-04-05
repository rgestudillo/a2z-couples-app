import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useIdeas, IdeaType } from '../context/IdeasContext';
import { Ionicons } from '@expo/vector-icons';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AlphabetGrid: React.FC = () => {
    const { allIdeas, currentCategory, completedIdeas, loading } = useIdeas();
    const ideas = allIdeas[currentCategory];

    // Check if the grid has loaded ideas
    const [isReady, setIsReady] = useState(false);

    // Update ready state when ideas are loaded
    useEffect(() => {
        if (!loading && ideas && ideas.length > 0) {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    }, [loading, ideas]);

    const getIdeaCountForLetter = (letter: string): number => {
        if (!ideas) return 0;
        return ideas.filter(idea => idea.letter === letter).length;
    };

    const hasCompletedIdeasForLetter = (letter: string): boolean => {
        if (!ideas) return false;
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

    const getLetterColor = () => {
        return currentCategory === IdeaType.DATE ? '#FF6B81' : '#7986CB';
    };

    const renderItem = ({ item: letter }: { item: string }) => {
        const count = getIdeaCountForLetter(letter);
        const hasIdeas = count > 0;
        const hasCompleted = hasCompletedIdeasForLetter(letter);
        const themeColor = getLetterColor();

        return (
            <TouchableOpacity
                style={[
                    styles.letterBox,
                    hasIdeas ? [styles.hasIdeas, { borderColor: themeColor }] : styles.noIdeas,
                    hasCompleted && styles.completedLetterBox
                ]}
                onPress={() => handleLetterPress(letter)}
                disabled={!hasIdeas}
            >
                {hasCompleted && (
                    <View style={styles.completedCheck}>
                        <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    </View>
                )}
                <Text style={[
                    styles.letter,
                    hasIdeas ? [styles.letterActive, { color: themeColor }] : styles.letterInactive,
                    hasCompleted && styles.completedLetter
                ]}>
                    {letter}
                </Text>
                {hasIdeas && (
                    <View style={[
                        styles.countBadge,
                        { backgroundColor: hasCompleted ? '#4CAF50' : themeColor }
                    ]}>
                        <Text style={styles.count}>{count}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    // Render loading state
    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={getLetterColor()} />
                <Text style={styles.loadingText}>Loading ideas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name={currentCategory === IdeaType.DATE ? "heart-circle" : "gift"}
                    size={24}
                    color={getLetterColor()}
                />
                <Text style={[styles.headerText, { color: getLetterColor() }]}>
                    Browse {currentCategory === IdeaType.DATE ? "Date" : "Gift"} Ideas
                </Text>
            </View>

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
        backgroundColor: '#FFF8F9',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#ffb8c6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    legendColorBox: {
        width: 12,
        height: 12,
        borderRadius: 3,
        backgroundColor: '#FF6B81',
        marginRight: 5,
    },
    legendCompleted: {
        backgroundColor: '#4CAF50',
    },
    legendText: {
        fontSize: 12,
        color: '#666',
    },
    grid: {
        paddingVertical: 8,
        alignItems: 'center',
    },
    letterBox: {
        width: 75,
        height: 75,
        margin: 6,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ffb8c6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        position: 'relative',
    },
    completedLetterBox: {
        backgroundColor: '#F1F8E9', // Light green background
        borderColor: '#4CAF50', // Green border
    },
    completedCheck: {
        position: 'absolute',
        top: 8,
        left: 8,
    },
    hasIdeas: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#FF6B81',
    },
    noIdeas: {
        backgroundColor: '#f8f8f8',
        borderWidth: 2,
        borderColor: '#f0f0f0',
    },
    letter: {
        fontSize: 26,
        fontWeight: '700',
    },
    letterActive: {
        color: '#333',
    },
    letterInactive: {
        color: '#ccc',
    },
    completedLetter: {
        color: '#4CAF50',
    },
    countBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FF6B81',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    count: {
        fontSize: 12,
        color: 'white',
        fontWeight: '600',
    },
});

export default AlphabetGrid; 