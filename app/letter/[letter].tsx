import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import IdeaCard from '../../components/IdeaCard';
import { useIdeas, IdeaType } from '../../context/IdeasContext';

export default function LetterIdeasScreen() {
    const { letter, category } = useLocalSearchParams<{ letter: string, category: string }>();
    const { getIdeasByLetter, currentCategory } = useIdeas();

    // Use the category from params or fall back to current category
    const ideaType = category ? category as IdeaType : currentCategory;

    const ideas = letter ? getIdeasByLetter(ideaType, letter) : [];

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
    },
}); 