import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDateIdeas } from '../../context/DateIdeasContext';
import { getBusinessesByIdeaId, Business } from '../../data/businesses';
import BusinessCard from '../../components/BusinessCard';

export default function IdeaDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getIdeaById, favoriteIdeas, addToFavorites, removeFromFavorites } = useDateIdeas();

    const idea = id ? getIdeaById(id) : undefined;
    const relatedBusinesses = id ? getBusinessesByIdeaId(id) : [];

    if (!idea) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Idea not found</Text>
            </SafeAreaView>
        );
    }

    const isFavorite = favoriteIdeas.includes(idea.id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFromFavorites(idea.id);
        } else {
            addToFavorites(idea.id);
        }
    };

    // Render the idea details as the header component of the FlatList
    const renderHeader = () => (
        <>
            <View style={styles.letterBadge}>
                <Text style={styles.letterText}>{idea.letter}</Text>
            </View>

            <Text style={styles.title}>{idea.title}</Text>

            <Text style={styles.description}>{idea.description}</Text>

            <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                    <Ionicons name="cash-outline" size={24} color="#666" />
                    <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Cost: </Text>
                        {idea.cost}
                    </Text>
                </View>

                <View style={styles.infoItem}>
                    <Ionicons name="time-outline" size={24} color="#666" />
                    <Text style={styles.infoText}>
                        <Text style={styles.infoLabel}>Duration: </Text>
                        {idea.duration}
                    </Text>
                </View>
            </View>

            <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>Categories:</Text>
                <View style={styles.categoryTags}>
                    {idea.category.map((cat, index) => (
                        <View key={index} style={styles.categoryTag}>
                            <Text style={styles.categoryText}>{cat}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {relatedBusinesses.length > 0 && (
                <View style={styles.businessesSection}>
                    <Text style={styles.sectionTitle}>Related Businesses</Text>
                    <Text style={styles.sectionSubtitle}>
                        Perfect places to experience this date idea
                    </Text>
                </View>
            )}
        </>
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: idea.title,
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={handleFavoriteToggle}
                            style={styles.favoriteButton}
                        >
                            <Ionicons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={28}
                                color={isFavorite ? '#ff6b6b' : '#333'}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <SafeAreaView style={styles.container}>
                {relatedBusinesses.length > 0 ? (
                    <FlatList
                        data={relatedBusinesses}
                        keyExtractor={(item: Business) => item.id}
                        renderItem={({ item }) => (
                            <BusinessCard
                                key={item.id}
                                business={item}
                            />
                        )}
                        ListHeaderComponent={renderHeader}
                        contentContainerStyle={styles.content}
                    />
                ) : (
                    <FlatList
                        data={[]}
                        keyExtractor={() => "empty"}
                        renderItem={() => null}
                        ListHeaderComponent={renderHeader}
                        contentContainerStyle={styles.content}
                    />
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: '#666',
    },
    content: {
        padding: 20,
    },
    favoriteButton: {
        padding: 8,
    },
    letterBadge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ff6b6b',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
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
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    description: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
        marginBottom: 32,
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 16,
        color: '#444',
        marginLeft: 12,
    },
    infoLabel: {
        fontWeight: '600',
    },
    categoryContainer: {
        marginBottom: 32,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    categoryTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryTag: {
        backgroundColor: '#e2e2e2',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 14,
        color: '#444',
    },
    businessesSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
}); 