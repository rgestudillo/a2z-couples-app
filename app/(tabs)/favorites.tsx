import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IdeaCard from '../../components/IdeaCard';
import { useDateIdeas } from '../../context/DateIdeasContext';

export default function FavoritesScreen() {
    const { getFavoriteIdeas } = useDateIdeas();
    const favoriteIdeas = getFavoriteIdeas();

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={80} color="#ddd" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>
                Save your favorite date ideas by tapping the heart icon on any idea card
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {favoriteIdeas.length === 0 ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={favoriteIdeas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <IdeaCard idea={item} />}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    listContent: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
}); 