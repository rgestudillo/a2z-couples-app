import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Linking, Modal, Image, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useIdeas, IdeaType, DateIdea, GiftIdea } from '@/context/IdeasContext';
import { getBusinessesByIdeaId } from '@/api/business';
import { Business } from '@/model/Business';
import BusinessCard from '@/components/BusinessCard';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MemoriesGallery } from '@/components/memories';
import { getProductsByIdeaId } from '@/api/product';
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

    const idea = id ? getIdeaById(ideaType, id) : undefined;

    // Get related items based on idea type
    const relatedBusinesses = (ideaType === IdeaType.DATE && id) ? getBusinessesByIdeaId(id) : [];
    const relatedProducts = (ideaType === IdeaType.GIFT && id) ? getProductsByIdeaId(id) : [];

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

    if (!idea) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Idea not found</Text>
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

            {ideaType === IdeaType.DATE && relatedBusinesses.length > 0 && (
                <View style={styles.relatedSection}>
                    <Text style={styles.sectionTitle}>Related Businesses</Text>
                    <Text style={styles.sectionSubtitle}>
                        Perfect places to experience this date idea
                    </Text>
                </View>
            )}

            {ideaType === IdeaType.GIFT && relatedProducts.length > 0 && (
                <View style={styles.relatedSection}>
                    <Text style={styles.sectionTitle}>Shopping Options</Text>
                    <Text style={styles.sectionSubtitle}>
                        Where to buy this gift (affiliate links)
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
                {ideaType === IdeaType.DATE && relatedBusinesses.length > 0 ? (
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
                ) : ideaType === IdeaType.GIFT && relatedProducts.length > 0 ? (
                    <FlatList
                        data={relatedProducts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ProductCard product={item} />
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

            {/* Congratulations Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={congratsModalVisible}
                onRequestClose={() => setCongratsModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Ionicons name="checkmark-circle" size={60} color="#4CAF50" style={styles.modalIcon} />
                        <Text style={styles.modalTitle}>Congratulations!</Text>
                        <Text style={styles.modalText}>You've completed this idea!</Text>
                        <Text style={styles.modalSubText}>Would you like to add some photos to remember this moment?</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cameraButton]}
                                onPress={async () => {
                                    // First check camera permissions
                                    const { status } = await ImagePicker.requestCameraPermissionsAsync();

                                    if (status !== 'granted') {
                                        Alert.alert('Permission needed', 'We need camera permission to take photos');
                                        return;
                                    }

                                    // Hide modal first
                                    setCongratsModalVisible(false);

                                    // Need to wait for modal to fully close before camera can open
                                    setTimeout(async () => {
                                        try {
                                            const result = await ImagePicker.launchCameraAsync({
                                                allowsEditing: false,
                                                quality: 0.8,
                                            });

                                            if (!result.canceled && result.assets && result.assets.length > 0) {
                                                const newImages = [...attachedImages, result.assets[0].uri];
                                                setAttachedImages(newImages);
                                                saveAttachedImages(newImages);
                                            }
                                        } catch (error) {
                                            console.error('Error taking photo:', error);
                                            Alert.alert('Error', 'Failed to take photo. Please try again.');
                                        }
                                    }, 800); // Increased timeout to ensure modal is fully closed
                                }}
                            >
                                <Ionicons name="camera" size={24} color="#fff" />
                                <Text style={styles.modalButtonText}>Take Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.galleryButton]}
                                onPress={() => {
                                    // Hide modal first
                                    setCongratsModalVisible(false);

                                    // Need to wait for modal to fully close before picker can open
                                    setTimeout(async () => {
                                        try {
                                            const result = await ImagePicker.launchImageLibraryAsync({
                                                allowsEditing: false,
                                                quality: 0.8,
                                                allowsMultipleSelection: true,
                                                selectionLimit: 10,
                                            });

                                            if (!result.canceled && result.assets && result.assets.length > 0) {
                                                const newImageUris = result.assets.map(asset => asset.uri);
                                                const newImages = [...attachedImages, ...newImageUris];
                                                setAttachedImages(newImages);
                                                saveAttachedImages(newImages);
                                            }
                                        } catch (error) {
                                            console.error('Error picking image:', error);
                                            Alert.alert('Error', 'Failed to pick image. Please try again.');
                                        }
                                    }, 800); // Increased timeout to ensure modal is fully closed
                                }}
                            >
                                <Ionicons name="images" size={24} color="#fff" />
                                <Text style={styles.modalButtonText}>Gallery</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.skipButton}
                            onPress={() => setCongratsModalVisible(false)}
                        >
                            <Text style={styles.skipButtonText}>Skip for now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    imageBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#4CAF50',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
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
    relatedSection: {
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
    },
    productHeader: {
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
        fontWeight: '600',
        color: '#666',
    },
    shopButton: {
        backgroundColor: '#5a67d8',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    shopButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    completedBanner: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    completedBannerText: {
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 8,
    },
    actions: {
        marginVertical: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    completedButton: {
        backgroundColor: '#4CAF50',
    },
    incompleteButton: {
        backgroundColor: '#9E9E9E',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 8,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalIcon: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
        color: '#444',
    },
    modalSubText: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
        color: '#666',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
        width: '48%',
    },
    cameraButton: {
        backgroundColor: '#5C6BC0',
    },
    galleryButton: {
        backgroundColor: '#26A69A',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    skipButton: {
        padding: 10,
    },
    skipButtonText: {
        color: '#666',
        fontSize: 16,
    },
}); 