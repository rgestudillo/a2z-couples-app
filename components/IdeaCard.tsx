import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { DateIdea } from '../data/dateIdeas';
import { useDateIdeas } from '../context/DateIdeasContext';

interface IdeaCardProps {
    idea: DateIdea;
    compact?: boolean;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, compact = false }) => {
    const { favoriteIdeas, addToFavorites, removeFromFavorites } = useDateIdeas();
    const isFavorite = favoriteIdeas.includes(idea.id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFromFavorites(idea.id);
        } else {
            addToFavorites(idea.id);
        }
    };

    const handlePress = () => {
        // Navigate to the idea detail screen
        try {
            router.push({
                pathname: "/idea/[id]",
                params: { id: idea.id }
            } as any);
        } catch (error) {
            console.error("Navigation error:", error);
            // Fallback navigation using string path
            router.push(`/idea/${idea.id}`);
        }
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                compact ? styles.compactCard : null,
                pressed ? styles.pressed : null
            ]}
            onPress={handlePress}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{idea.title}</Text>
                <TouchableOpacity
                    onPress={handleFavoriteToggle}
                    style={styles.favoriteButton}
                >
                    <Ionicons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={24}
                        color={isFavorite ? "#ff6b6b" : "#999"}
                    />
                </TouchableOpacity>
            </View>

            {!compact && (
                <Text style={styles.description} numberOfLines={2}>
                    {idea.description}
                </Text>
            )}

            <View style={styles.footer}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{idea.cost}</Text>
                </View>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{idea.duration}</Text>
                </View>
                {!compact && idea.category.length > 0 && (
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{idea.category[0]}</Text>
                    </View>
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    compactCard: {
        padding: 12,
        marginBottom: 8,
    },
    pressed: {
        opacity: 0.8,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    favoriteButton: {
        padding: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 4,
    },
    tag: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    tagText: {
        fontSize: 12,
        color: '#666',
    },
});

export default IdeaCard; 