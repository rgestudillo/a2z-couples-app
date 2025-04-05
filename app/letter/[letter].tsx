import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import IdeaCard from '@/components/IdeaCard';
import { useIdeas, IdeaType, DateIdea, GiftIdea } from '@/context/IdeasContext';

export default function LetterIdeasScreen() {
    const { letter, category } = useLocalSearchParams<{ letter: string, category: string }>();
    const { getIdeasByLetter, currentCategory } = useIdeas();
    const [ideas, setIdeas] = useState<(DateIdea | GiftIdea)[]>([]);
    const [loading, setLoading] = useState(true);

    // Use the category from params or fall back to current category
    const ideaType = category ? category as IdeaType : currentCategory;

    // Load ideas when component mounts or when letter/category changes
    useEffect(() => {
        async function loadIdeas() {
            setLoading(true);
            try {
                if (letter) {
                    const ideasData = await getIdeasByLetter(ideaType, letter);
                    console.log('Ideas fetched:', ideasData);
                    setIdeas(ideasData || []);
                }
            } catch (error) {
                console.error('Error loading ideas:', error);
                setIdeas([]);
            } finally {
                setLoading(false);
            }
        }

        loadIdeas();
    }, [letter, ideaType, getIdeasByLetter]);

    // Render loading state
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.letterBadge}>
                    <Text style={styles.letterText}>{letter?.toUpperCase()}</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ff6b6b" />
                    <Text style={styles.loadingText}>Loading ideas...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.letterBadge}>
                <Text style={styles.letterText}>{letter?.toUpperCase()}</Text>
            </View>

            <Text style={styles.title}>
                {ideas.length} {ideas.length === 1 ? 'Idea' : 'Ideas'} for "{letter?.toUpperCase()}"
            </Text>

            <FlatList
                data={ideas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <IdeaCard idea={item} type={ideaType} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No ideas found for this letter.</Text>
                        <Text style={styles.emptySubtext}>Try another letter!</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    letterBadge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ff6b6b',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    letterText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    listContent: {
        padding: 16,
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        marginTop: 48,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#888',
    },
}); 