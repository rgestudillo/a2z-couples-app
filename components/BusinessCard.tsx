import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Business } from '../data/businesses';

interface BusinessCardProps {
    business: Business;
    compact?: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, compact = false }) => {
    const handlePress = () => {
        // Navigate to the business detail screen
        try {
            router.push({
                pathname: "/business/[id]",
                params: { id: business.id }
            } as any);
        } catch (error) {
            console.error("Navigation error:", error);
            // Fallback navigation using string path
            router.push(`/business/${business.id}` as any);
        }
    };

    // Function to display rating as stars
    const renderRatingStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <View style={styles.ratingContainer}>
                {[...Array(fullStars)].map((_, i) => (
                    <Ionicons key={`full-${i}`} name="star" size={14} color="#FFD700" />
                ))}
                {halfStar && <Ionicons name="star-half" size={14} color="#FFD700" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#FFD700" />
                ))}
                <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
        );
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
                <Text style={styles.title}>{business.name}</Text>
                <Text style={styles.priceRange}>{business.priceRange}</Text>
            </View>

            {renderRatingStars(business.rating)}

            {!compact && (
                <Text style={styles.description} numberOfLines={2}>
                    {business.description}
                </Text>
            )}

            <View style={styles.addressContainer}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.address} numberOfLines={1}>
                    {business.address}
                </Text>
            </View>

            <View style={styles.footer}>
                {business.tags.slice(0, 3).map((tag, index) => (
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
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
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    priceRange: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#666',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
        flex: 1,
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

export default BusinessCard; 