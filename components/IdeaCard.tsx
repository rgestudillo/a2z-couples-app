import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BaseIdea, IdeaType, useIdeas, DateIdea, GiftIdea } from '../context/IdeasContext';

interface IdeaCardProps {
    idea: BaseIdea;
    type: IdeaType;
    compact?: boolean;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, type, compact = false }) => {
    const { favoriteIdeas, addToFavorites, removeFromFavorites } = useIdeas();
    const isFavorite = (favoriteIdeas[type] || []).includes(idea.id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFromFavorites(type, idea.id);
        } else {
            addToFavorites(type, idea.id);
        }
    };

    const handlePress = () => {
        // Navigate to the idea detail screen with type
        try {
            router.push({
                pathname: "/idea/[id]",
                params: { id: idea.id, type }
            } as any);
        } catch (error) {
            console.error("Navigation error:", error);
            // Fallback navigation using string path
            router.push(`/idea/${idea.id}?type=${type}` as any);
        }
    };

    // Get theme color based on type
    const getThemeColor = (): string => {
        return type === IdeaType.DATE ? '#FF6B81' : '#7986CB';
    };

    // Get icon based on the idea's first category
    const getCategoryIcon = () => {
        if (type === IdeaType.DATE) {
            if (idea.category.some(c => c.toLowerCase().includes('outdoor'))) return 'sunny-outline' as const;
            if (idea.category.some(c => c.toLowerCase().includes('food'))) return 'restaurant-outline' as const;
            if (idea.category.some(c => c.toLowerCase().includes('movie'))) return 'film-outline' as const;
            return 'heart-circle-outline' as const;
        } else {
            if (idea.category.some(c => c.toLowerCase().includes('tech'))) return 'hardware-chip-outline' as const;
            if (idea.category.some(c => c.toLowerCase().includes('home'))) return 'home-outline' as const;
            if (idea.category.some(c => c.toLowerCase().includes('food'))) return 'cafe-outline' as const;
            return 'gift-outline' as const;
        }
    };

    const renderTags = () => {
        const themeColor = getThemeColor();

        return (
            <View style={styles.footer}>
                <View style={[styles.tag, { backgroundColor: `${themeColor}22` }]}>
                    <Text style={[styles.tagText, { color: themeColor }]}>{idea.cost}</Text>
                </View>

                {type === IdeaType.DATE && (
                    <View style={[styles.tag, { backgroundColor: `${themeColor}22` }]}>
                        <Text style={[styles.tagText, { color: themeColor }]}>
                            {(idea as DateIdea).duration}
                        </Text>
                    </View>
                )}

                {type === IdeaType.GIFT && (
                    <View style={[styles.tag, { backgroundColor: `${themeColor}22` }]}>
                        <Text style={[styles.tagText, { color: themeColor }]}>
                            {(idea as GiftIdea).occasion && (idea as GiftIdea).occasion.length > 0
                                ? (idea as GiftIdea).occasion[0]
                                : 'Gift'}
                        </Text>
                    </View>
                )}

                {!compact && idea.category.length > 0 && (
                    <View style={[styles.tag, { backgroundColor: `${themeColor}22` }]}>
                        <Text style={[styles.tagText, { color: themeColor }]}>{idea.category[0]}</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                compact ? styles.compactCard : null,
                pressed ? styles.pressed : null,
                { borderColor: getThemeColor() }
            ]}
            onPress={handlePress}
        >
            <View style={styles.letterCircle}>
                <Text style={[styles.letterText, { color: getThemeColor() }]}>{idea.letter}</Text>
            </View>

            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Ionicons name={getCategoryIcon()} size={18} color={getThemeColor()} style={styles.categoryIcon} />
                    <Text style={styles.title}>{idea.title}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleFavoriteToggle}
                    style={styles.favoriteButton}
                >
                    <Ionicons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={24}
                        color={isFavorite ? "#FF6B81" : "#999"}
                    />
                </TouchableOpacity>
            </View>

            {!compact && (
                <Text style={styles.description} numberOfLines={2}>
                    {idea.description}
                </Text>
            )}

            {renderTags()}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#ffb8c6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
        position: 'relative',
        borderLeftWidth: 4,
        borderColor: '#FF6B81',
    },
    compactCard: {
        padding: 12,
        marginBottom: 8,
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.99 }],
    },
    letterCircle: {
        position: 'absolute',
        top: -10,
        right: 16,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ffb8c6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        zIndex: 1,
    },
    letterText: {
        fontSize: 16,
        fontWeight: '700',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    categoryIcon: {
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        flex: 1,
    },
    favoriteButton: {
        padding: 6,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
        paddingLeft: 2,
    },
    footer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    tag: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 4,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '500',
    },
});

export default IdeaCard; 