import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Linking
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useIdeas, IdeaType, GiftIdea } from '../../context/IdeasContext';

// Mock product data - to be replaced with actual product service
const mockProducts = [
    {
        id: 'prod-1',
        name: 'Apple Watch Series 7',
        description: 'The latest Apple Watch with advanced health features including blood oxygen monitoring, ECG, and sleep tracking. Water resistant with a larger, always-on Retina display that is easy to read in any light. Available in multiple colors and band options to match your style.',
        price: 399.99,
        priceRange: '$$$' as const,
        rating: 4.8,
        imageUrl: 'https://example.com/apple-watch.jpg',
        affiliateLink: 'https://amazon.com/product/123',
        relatedIdeaIds: ['gift-1'],
        tags: ['Technology', 'Wearables', 'Health']
    },
    {
        id: 'prod-2',
        name: 'Weighted Blanket',
        description: 'Premium weighted blanket for better sleep and relaxation. The gentle pressure helps reduce anxiety and improve sleep quality. Made with high-quality, breathable materials that keep you comfortable all night long. Available in different weights and sizes to suit your needs.',
        price: 89.99,
        priceRange: '$$' as const,
        rating: 4.6,
        imageUrl: 'https://example.com/blanket.jpg',
        affiliateLink: 'https://amazon.com/product/456',
        relatedIdeaIds: ['gift-2'],
        tags: ['Home', 'Comfort', 'Sleep']
    },
    {
        id: 'prod-3',
        name: 'Gourmet Chocolate Box',
        description: 'Assorted gourmet chocolates in an elegant gift box. Perfect for special occasions or as a thoughtful gift. Each chocolate is handcrafted with premium ingredients and presented in a beautiful box suitable for gifting.',
        price: 45.99,
        priceRange: '$$' as const,
        rating: 4.5,
        imageUrl: 'https://example.com/chocolate.jpg',
        affiliateLink: 'https://amazon.com/product/789',
        relatedIdeaIds: ['gift-3'],
        tags: ['Food', 'Sweets', 'Gift']
    }
];

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { allIdeas } = useIdeas();

    // Find the product based on ID
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Product not found</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Find related gift ideas - only executed if product exists
    const relatedGiftIdeas = product.relatedIdeaIds
        .map(ideaId => allIdeas[IdeaType.GIFT].find(idea => idea.id === ideaId))
        .filter((idea): idea is GiftIdea => idea !== undefined);

    const handleBuyNow = () => {
        if (product.affiliateLink) {
            Linking.openURL(product.affiliateLink);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Product Header */}
                <View style={styles.header}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                </View>

                {/* Rating */}
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={20} color="#FFD700" />
                    <Text style={styles.ratingText}>{product.rating} Rating</Text>
                </View>

                {/* Tags */}
                <View style={styles.tagsContainer}>
                    {product.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>

                {/* Related Gift Ideas (if any) */}
                {relatedGiftIdeas.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Related Gift Ideas</Text>
                        <View style={styles.relatedItemsList}>
                            {relatedGiftIdeas.map(idea => (
                                <View key={idea.id} style={styles.relatedItem}>
                                    <Text style={styles.relatedItemTitle}>{idea.title}</Text>
                                    <Text style={styles.relatedItemCategory}>{idea.category[0]}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Buy Button */}
                <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
                    <Ionicons name="cart" size={24} color="#fff" />
                    <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>

                <Text style={styles.affiliateDisclaimer}>
                    This link contains affiliate codes that help support the app.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: '#666',
    },
    header: {
        marginBottom: 16,
    },
    productName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 22,
        fontWeight: '700',
        color: '#ff6b6b',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingText: {
        marginLeft: 6,
        fontSize: 16,
        color: '#666',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
    },
    tag: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
    relatedItemsList: {
        marginTop: 8,
    },
    relatedItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    relatedItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    relatedItemCategory: {
        fontSize: 14,
        color: '#888',
    },
    buyButton: {
        backgroundColor: '#5a67d8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginVertical: 16,
    },
    buyButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 10,
    },
    affiliateDisclaimer: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginBottom: 20,
    },
}); 