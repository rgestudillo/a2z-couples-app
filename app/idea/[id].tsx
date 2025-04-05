import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Linking, Modal, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useIdeas, IdeaType, DateIdea, GiftIdea } from '@/context/IdeasContext';
import { getBusinessesByIdeaId } from '@/api/business';
import { Business } from '@/model/Business';
import BusinessCard from '@/components/BusinessCard';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MemoriesGallery } from '@/components/memories';
import { getProductsByGiftId } from '@/api/product';
import { Product } from '@/model/Product';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handlePress = () => {
        router.push({
            pathname: "/product/[id]",
            params: { id: product.id }
        } as any);
    };

    return (
        <TouchableOpacity style={styles.productCard} onPress={handlePress}>
            <View style={styles.productHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
            </View>
            <Text style={styles.productDescription} numberOfLines={2}>
                {product.description}
            </Text>
            <View style={styles.productFooter}>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
                <TouchableOpacity style={styles.shopButton}>
                    <Text style={styles.shopButtonText}>View Details</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default function IdeaDetailScreen() {
    const { id, type } = useLocalSearchParams<{ id: string, type: string }>();
    const {
        getIdeaById,
        favoriteIdeas,
        addToFavorites,
        removeFromFavorites,
        currentCategory,
        isIdeaCompleted,
        markIdeaAsCompleted,
        markIdeaAsIncomplete
    } = useIdeas();

    // Use type from params or fall back to current category
    const ideaType = (type || currentCategory) as IdeaType;

    // States for async data
    const [idea, setIdea] = useState<DateIdea | GiftIdea | undefined>(undefined);
    const [isLoadingIdea, setIsLoadingIdea] = useState(true);
    const [relatedBusinesses, setRelatedBusinesses] = useState<Business[]>([]);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [isLoadingRelated, setIsLoadingRelated] = useState(true);

    // Load idea and related data
    useEffect(() => {
        async function loadData() {
            if (!id) return;

            setIsLoadingIdea(true);
            try {
                // Load the idea
                const ideaData = await getIdeaById(ideaType, id);
                setIdea(ideaData);

                // Load related data based on idea type
                setIsLoadingRelated(true);
                if (ideaType === IdeaType.DATE) {
                    const businesses = await getBusinessesByIdeaId(id);
                    setRelatedBusinesses(businesses);
                } else if (ideaType === IdeaType.GIFT) {
                    const products = await getProductsByGiftId(id);
                    setRelatedProducts(products);
                }
            } catch (error) {
                console.error('Error loading idea data:', error);
            } finally {
                setIsLoadingIdea(false);
                setIsLoadingRelated(false);
            }
        }

        loadData();
    }, [id, ideaType, getIdeaById]);

    // New states for modal and images
    const [congratsModalVisible, setCongratsModalVisible] = useState(false);
    const [attachedImages, setAttachedImages] = useState<string[]>([]);

    // Load attached images from AsyncStorage
    useEffect(() => {
        if (id) {
            loadAttachedImages();
        }
    }, [id]);

    // Function to load attached images from AsyncStorage
    const loadAttachedImages = async () => {
        try {
            const savedImages = await AsyncStorage.getItem(`idea_images_${id}`);
            if (savedImages) {
                setAttachedImages(JSON.parse(savedImages));
            }
        } catch (error) {
            console.error('Error loading attached images:', error);
        }
    };

    // Function to save attached images to AsyncStorage
    const saveAttachedImages = async (images: string[]) => {
        try {
            await AsyncStorage.setItem(`idea_images_${id}`, JSON.stringify(images));
        } catch (error) {
            console.error('Error saving attached images:', error);
        }
    };

    // Loading state
    if (isLoadingIdea) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={ideaType === IdeaType.DATE ? "#FF6B81" : "#7986CB"} />
                <Text style={styles.loadingText}>Loading idea...</Text>
            </SafeAreaView>
        );
    }

    // Error state
    if (!idea) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Idea not found</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const isFavorite = (favoriteIdeas[ideaType] || []).includes(idea.id);
    const isCompleted = isIdeaCompleted(ideaType, idea.id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFromFavorites(ideaType, idea.id);
        } else {
            addToFavorites(ideaType, idea.id);
        }
    };

    const handleCompletedToggle = () => {
        if (!isCompleted) {
            markIdeaAsCompleted(ideaType, idea.id);
            setCongratsModalVisible(true);
        } else {
            markIdeaAsIncomplete(ideaType, idea.id);
        }
    };

    // Render idea details based on type
    const renderIdeaDetails = () => {
        if (ideaType === IdeaType.DATE) {
            const dateIdea = idea as DateIdea;
            return (
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Ionicons name="cash-outline" size={24} color="#666" />
                        <Text style={styles.infoText}>
                            <Text style={styles.infoLabel}>Cost: </Text>
                            {dateIdea.cost}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="time-outline" size={24} color="#666" />
                        <Text style={styles.infoText}>
                            <Text style={styles.infoLabel}>Duration: </Text>
                            {dateIdea.duration}
                        </Text>
                    </View>
                </View>
            );
        } else if (ideaType === IdeaType.GIFT) {
            const giftIdea = idea as GiftIdea;
            return (
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Ionicons name="cash-outline" size={24} color="#666" />
                        <Text style={styles.infoText}>
                            <Text style={styles.infoLabel}>Cost: </Text>
                            {giftIdea.cost}
                        </Text>
                    </View>

                    {giftIdea.occasion && giftIdea.occasion.length > 0 && (
                        <View style={styles.infoItem}>
                            <Ionicons name="gift-outline" size={24} color="#666" />
                            <Text style={styles.infoText}>
                                <Text style={styles.infoLabel}>Perfect for: </Text>
                                {giftIdea.occasion.join(', ')}
                            </Text>
                        </View>
                    )}
                </View>
            );
        }

        return null;
    };

    // Render the idea details as the header component of the FlatList
    const renderHeader = () => (
        <>
            <View
                style={styles.letterBadge}
            >
                <Text style={styles.letterText}>{idea.letter}</Text>
                {attachedImages.length > 0 && (
                    <View style={styles.imageBadge}>
                        <Text style={styles.imageBadgeText}>{attachedImages.length}</Text>
                    </View>
                )}
            </View>

            <Text style={styles.title}>{idea.title}</Text>

            {isCompleted && (
                <View style={styles.completedBanner}>
                    <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                    <Text style={styles.completedBannerText}>Completed</Text>
                </View>
            )}

            <Text style={styles.description}>{idea.description}</Text>

            {renderIdeaDetails()}

            <View style={styles.actions}>
                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        isCompleted ? styles.completedButton : styles.incompleteButton
                    ]}
                    onPress={handleCompletedToggle}
                >
                    <Ionicons
                        name={isCompleted ? "checkbox" : "square-outline"}
                        size={20}
                        color="#FFFFFF"
                    />
                    <Text style={styles.actionButtonText}>
                        {isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>Categories:</Text>
                <View style={styles.categoryTags}>
                    {idea.category.map((cat: string, index: number) => (
                        <View key={index} style={styles.categoryTag}>
                            <Text style={styles.categoryText}>{cat}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Replace the simple image gallery with our new MemoriesGallery component */}
            <MemoriesGallery
                images={attachedImages}
                onImagesUpdated={(newImages) => {
                    setAttachedImages(newImages);
                    saveAttachedImages(newImages);
                }}
                saveKey={`idea_images_${id}`}
                title="Memories"
                letter={idea.letter}
            />

            {ideaType === IdeaType.DATE && (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Places to Try</Text>
                    {isLoadingRelated && (
                        <ActivityIndicator size="small" color="#FF6B81" style={{ marginLeft: 10 }} />
                    )}
                </View>
            )}

            {ideaType === IdeaType.GIFT && (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Related Products</Text>
                    {isLoadingRelated && (
                        <ActivityIndicator size="small" color="#7986CB" style={{ marginLeft: 10 }} />
                    )}
                </View>
            )}
        </>
    );

    const renderEmptyComponent = () => {
        if (isLoadingRelated) {
            return null; // Don't show empty state while loading
        }

        if (ideaType === IdeaType.DATE) {
            return (
                <View style={styles.emptyContainer}>
                    <Ionicons name="business" size={50} color="#ccc" />
                    <Text style={styles.emptyText}>No places found for this idea</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.emptyContainer}>
                    <Ionicons name="gift" size={50} color="#ccc" />
                    <Text style={styles.emptyText}>No products found for this idea</Text>
                </View>
            );
        }
    };

    // Render the main component
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerRight: () => (
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
                    ),
                    title: ""
                }}
            />

            {ideaType === IdeaType.DATE ? (
                <FlatList
                    data={relatedBusinesses}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <BusinessCard business={item} />}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={renderEmptyComponent}
                    contentContainerStyle={styles.contentContainer}
                />
            ) : (
                <FlatList
                    data={relatedProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={renderEmptyComponent}
                    contentContainerStyle={styles.contentContainer}
                />
            )}

            {/* Congrats Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={congratsModalVisible}
                onRequestClose={() => setCongratsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                        <Text style={styles.congratsTitle}>Congratulations!</Text>
                        <Text style={styles.congratsText}>
                            You've completed this {ideaType === IdeaType.DATE ? 'date' : 'gift'} idea!
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setCongratsModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        padding: 32,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    letterBadge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FF6B81',
        marginBottom: 16,
        position: 'relative',
    },
    letterText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FF6B81',
    },
    imageBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#7986CB',
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 24,
    },
    infoContainer: {
        marginBottom: 24,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoLabel: {
        fontWeight: '600',
        color: '#444',
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
    },
    categoryContainer: {
        marginBottom: 24,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
    },
    categoryTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryTag: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    categoryText: {
        color: '#666',
        fontSize: 14,
    },
    actions: {
        marginBottom: 24,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#4CAF50',
    },
    completedButton: {
        backgroundColor: '#FF6B81',
    },
    incompleteButton: {
        backgroundColor: '#4CAF50',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    completedBanner: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    completedBannerText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 16,
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 16,
    },
    backButton: {
        backgroundColor: '#FF6B81',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 16,
        textAlign: 'center',
    },
    favoriteButton: {
        padding: 8,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderLeftWidth: 3,
        borderLeftColor: '#7986CB',
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#7986CB',
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#666',
    },
    shopButton: {
        backgroundColor: '#7986CB22',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    shopButtonText: {
        color: '#7986CB',
        fontSize: 12,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    congratsTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    congratsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    closeButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    }
}); 