import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Linking,
    ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useIdeas, IdeaType } from '@/context/IdeasContext';
import { getProductById } from '@/api/product';
import { Product } from '@/model/Product';
import { GiftIdea } from '@/model/GiftIdea';
import RefreshableScrollView from '@/components/RefreshableScrollView';
import { showNetworkRequiredMessage } from '@/utils/showOfflineToast';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { allIdeas } = useIdeas();
    const [product, setProduct] = useState<Product | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [relatedGiftIdeas, setRelatedGiftIdeas] = useState<GiftIdea[]>([]);

    const fetchProduct = async () => {
        if (!id) {
            setError("Missing product ID");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const productData = await getProductById(id as string);
            setProduct(productData);

            if (!productData) {
                setError("Product not found");
            } else {
                setError(null);

                // Find related gift ideas
                if (allIdeas && allIdeas[IdeaType.GIFT] && productData.relatedGiftIds) {
                    const related = productData.relatedGiftIds
                        .map(giftId => allIdeas[IdeaType.GIFT].find(idea => idea.id === giftId))
                        .filter((idea): idea is GiftIdea => idea !== undefined);
                    setRelatedGiftIdeas(related);
                }
            }
        } catch (err) {
            console.error("Error fetching product:", err);
            setError("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id, allIdeas]);

    const handleRefreshComplete = (success: boolean) => {
        if (success) {
            fetchProduct();
        }
    };

    const handleBuyNow = async () => {
        if (!product?.affiliateLink) return;

        // Check network before opening external link
        const canProceed = await showNetworkRequiredMessage("Opening product link");
        if (canProceed) {
            Linking.openURL(product.affiliateLink);
        }
    };

    // Loading state
    if (loading) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#FF6B81" />
                <Text style={styles.loadingText}>Loading product details...</Text>
            </SafeAreaView>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <Ionicons name="alert-circle-outline" size={48} color="#FF3B30" />
                <Text style={styles.errorText}>{error || "Product not found"}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={fetchProduct}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />

            <RefreshableScrollView
                onRefreshComplete={handleRefreshComplete}
                contentContainerStyle={styles.content}
            >
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
                    {product.tags?.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    )) || null}
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
            </RefreshableScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
        marginTop: 12,
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 12,
    },
    retryButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FF6B81',
        borderRadius: 6,
    },
    retryButtonText: {
        color: 'white',
        fontWeight: '600',
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff6b6b',
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8,
    },
    affiliateDisclaimer: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
}); 