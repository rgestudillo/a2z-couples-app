import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        priceRange: '$' | '$$' | '$$$';
        rating: number;
        imageUrl: string;
        affiliateLink: string;
        relatedIdeaIds: string[];
        tags: string[];
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handlePress = () => {
        // Navigate to product details screen (to be implemented)
        console.log(`Navigate to product: ${product.id}`);
        // Uncomment when product detail screen is ready
        // router.push(`/product/${product.id}` as any);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <View style={styles.cardHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
            </View>
            <Text style={styles.productDescription} numberOfLines={2}>
                {product.description}
            </Text>
            <View style={styles.cardFooter}>
                <View style={styles.tagsContainer}>
                    {product.tags.slice(0, 2).map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginRight: 8,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ff6b6b',
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tagsContainer: {
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 6,
    },
    tagText: {
        fontSize: 12,
        color: '#666',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
});

export default ProductCard; 