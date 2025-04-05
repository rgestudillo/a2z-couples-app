import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
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
                <StatusBar barStyle="dark-content" />
                <View style={styles.letterBadgeContainer}>
                    <View style={styles.letterBadge}>
                        <Text style={styles.letterText}>{letter?.toUpperCase()}</Text>
                    </View>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ff6b6b" />
                    <Text style={styles.loadingText}>Loading ideas...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Render the list header with letter badge
    const renderHeader = () => (
        <View style={styles.listHeader}>
            <View style={styles.letterBadge}>
                <Text style={styles.letterText}>{letter?.toUpperCase()}</Text>
            </View>
        </View>
    );

    // Render empty state
    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No ideas found for this letter.</Text>
            <Text style={styles.emptySubtext}>Try another letter!</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <FlatList
                data={ideas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <IdeaCard idea={item} type={ideaType} />}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmptyComponent}
                showsVerticalScrollIndicator={false}
                // Adding extra padding bottom ensures content is scrollable to the bottom
                ListFooterComponent={<View style={{ height: 40 }} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    letterBadgeContainer: {
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    listHeader: {
        paddingTop: 16,
        paddingBottom: 24,
        alignItems: 'center',
    },
    letterBadge: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ff6b6b',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    letterText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#fff',
    },
    listContent: {
        paddingHorizontal: 16,
        flexGrow: 1, // Ensures content fills available space
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
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#ffb8c6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        minHeight: 200,
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