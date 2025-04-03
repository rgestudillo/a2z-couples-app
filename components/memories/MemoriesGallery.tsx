import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    Dimensions,
    Alert,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

interface MemoriesGalleryProps {
    images: string[];
    onImagesUpdated: (newImages: string[]) => void;
    saveKey: string;
    title?: string;
    letter?: string;
}

const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
    images,
    onImagesUpdated,
    saveKey,
    title = 'Memories',
    letter
}) => {
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [loadingImages, setLoadingImages] = useState(false);

    // Function to save images to AsyncStorage
    const saveImages = async (imagesToSave: string[]) => {
        try {
            await AsyncStorage.setItem(saveKey, JSON.stringify(imagesToSave));
        } catch (error) {
            console.error('Error saving images:', error);
        }
    };

    // Function to handle picking images from gallery
    const handlePickImages = async () => {
        try {
            setLoadingImages(true);
            // Hide the gallery modal first to avoid conflicts
            setShowGalleryModal(false);

            // Increased delay to ensure modal is fully closed
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
                        const updatedImages = [...images, ...newImageUris];
                        onImagesUpdated(updatedImages);
                        await saveImages(updatedImages);
                    }

                    // Add delay before showing gallery modal again
                    setTimeout(() => {
                        setShowGalleryModal(true);
                        setLoadingImages(false);
                    }, 300);
                } catch (error) {
                    console.error('Error picking images:', error);
                    Alert.alert('Error', 'Failed to pick images. Please try again.');
                    setTimeout(() => {
                        setShowGalleryModal(true);
                        setLoadingImages(false);
                    }, 300);
                }
            }, 800);
        } catch (error) {
            console.error('Error picking images:', error);
            Alert.alert('Error', 'Failed to pick images. Please try again.');
            setLoadingImages(false);
            setShowGalleryModal(true);
        }
    };

    // Function to handle taking a photo
    const handleTakePhoto = async () => {
        try {
            setLoadingImages(true);
            // Request camera permissions
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permission needed', 'We need camera permission to take photos');
                setLoadingImages(false);
                return;
            }

            // Hide the gallery modal first to avoid conflicts
            setShowGalleryModal(false);

            // Increased delay to ensure modal is fully closed
            setTimeout(async () => {
                try {
                    const result = await ImagePicker.launchCameraAsync({
                        allowsEditing: false,
                        quality: 0.8,
                    });

                    if (!result.canceled && result.assets && result.assets.length > 0) {
                        const updatedImages = [...images, result.assets[0].uri];
                        onImagesUpdated(updatedImages);
                        await saveImages(updatedImages);
                    }

                    // Add delay before showing gallery modal again
                    setTimeout(() => {
                        setShowGalleryModal(true);
                        setLoadingImages(false);
                    }, 300);
                } catch (error) {
                    console.error('Error taking photo:', error);
                    Alert.alert('Error', 'Failed to take photo. Please try again.');
                    setTimeout(() => {
                        setShowGalleryModal(true);
                        setLoadingImages(false);
                    }, 300);
                }
            }, 800);
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.');
            setLoadingImages(false);
            setShowGalleryModal(true);
        }
    };

    // Function to delete an image
    const handleDeleteImage = (imageUri: string) => {
        Alert.alert(
            'Delete Memory',
            'Are you sure you want to delete this memory?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const updatedImages = images.filter(uri => uri !== imageUri);
                        onImagesUpdated(updatedImages);
                        await saveImages(updatedImages);
                        // Close fullscreen viewer if the deleted image was being viewed
                        if (fullScreenImage === imageUri) {
                            setFullScreenImage(null);
                        }
                    }
                }
            ]
        );
    };

    // Render horizontal gallery preview
    const renderGalleryPreview = () => {
        if (images.length === 0) {
            return (
                <View style={styles.emptyStateContainer}>
                    <Ionicons name="images-outline" size={40} color="#999" />
                    <Text style={styles.emptyStateText}>No memories yet</Text>
                    <TouchableOpacity
                        style={styles.addPhotosButton}
                        onPress={() => setShowGalleryModal(true)}
                    >
                        <Text style={styles.addPhotosText}>Add Photos</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.previewContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                    <TouchableOpacity
                        style={styles.viewAllButton}
                        onPress={() => setShowGalleryModal(true)}
                    >
                        <Text style={styles.viewAllText}>View All</Text>
                        <Ionicons name="chevron-forward" size={16} color="#ff6b6b" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {images.map((uri, index) => (
                        <TouchableOpacity
                            key={`${uri}_${index}`}
                            style={styles.previewImageContainer}
                            onPress={() => setFullScreenImage(uri)}
                        >
                            <Image
                                source={{ uri }}
                                style={styles.previewImage}
                                resizeMode="cover"
                            />
                            {(index === 0 && letter) && (
                                <View style={styles.letterBadge}>
                                    <Text style={styles.letterBadgeText}>{letter}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.addPhotoThumbnail}
                        onPress={() => setShowGalleryModal(true)}
                    >
                        <Ionicons name="add-circle" size={30} color="#ff6b6b" />
                        <Text style={styles.addPhotoText}>Add More</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    };

    return (
        <>
            {renderGalleryPreview()}

            {/* Full Screen Image Viewer */}
            <Modal
                visible={!!fullScreenImage}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setFullScreenImage(null)}
            >
                <View style={styles.fullScreenContainer}>
                    <TouchableOpacity
                        style={styles.fullScreenCloseButton}
                        onPress={() => setFullScreenImage(null)}
                    >
                        <Ionicons name="close-circle" size={36} color="#fff" />
                    </TouchableOpacity>

                    <Image
                        source={{ uri: fullScreenImage || '' }}
                        style={styles.fullScreenImage}
                        resizeMode="contain"
                    />

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => fullScreenImage && handleDeleteImage(fullScreenImage)}
                    >
                        <Ionicons name="trash-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Gallery Modal */}
            <Modal
                visible={showGalleryModal}
                animationType="slide"
                onRequestClose={() => setShowGalleryModal(false)}
            >
                <View style={styles.galleryModalContainer}>
                    <View style={styles.galleryModalHeader}>
                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => setShowGalleryModal(false)}
                        >
                            <Ionicons name="chevron-down" size={28} color="#333" />
                        </TouchableOpacity>

                        {letter && (
                            <View style={styles.modalLetterBadge}>
                                <Text style={styles.modalLetterText}>{letter}</Text>
                            </View>
                        )}

                        <Text style={styles.galleryModalTitle}>{title}</Text>
                    </View>

                    {loadingImages ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#ff6b6b" />
                            <Text style={styles.loadingText}>Loading images...</Text>
                        </View>
                    ) : (
                        <>
                            {images.length === 0 ? (
                                <View style={styles.emptyGalleryContainer}>
                                    <Ionicons name="images-outline" size={80} color="#ddd" />
                                    <Text style={styles.emptyGalleryText}>
                                        No memories collected yet
                                    </Text>
                                    <Text style={styles.emptyGallerySubText}>
                                        Add photos to remember this moment!
                                    </Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={images}
                                    keyExtractor={(item, index) => `${item}_${index}`}
                                    numColumns={2}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.galleryImageContainer}
                                            onPress={() => {
                                                setFullScreenImage(item);
                                                setShowGalleryModal(false);
                                            }}
                                        >
                                            <Image
                                                source={{ uri: item }}
                                                style={styles.galleryImage}
                                                resizeMode="cover"
                                            />
                                            <BlurView intensity={30} style={styles.imageCaptionBlur}>
                                                <TouchableOpacity
                                                    style={styles.galleryDeleteButton}
                                                    onPress={() => handleDeleteImage(item)}
                                                >
                                                    <Ionicons name="trash-outline" size={18} color="#fff" />
                                                </TouchableOpacity>
                                            </BlurView>
                                        </TouchableOpacity>
                                    )}
                                    contentContainerStyle={styles.galleryGrid}
                                />
                            )}

                            <View style={styles.actionButtonsContainer}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.cameraButton]}
                                    onPress={handleTakePhoto}
                                >
                                    <Ionicons name="camera" size={24} color="#fff" />
                                    <Text style={styles.actionButtonText}>Camera</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, styles.galleryButton]}
                                    onPress={handlePickImages}
                                >
                                    <Ionicons name="images" size={24} color="#fff" />
                                    <Text style={styles.actionButtonText}>Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    previewContainer: {
        marginTop: 16,
        marginBottom: 24,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: '#ff6b6b',
        fontWeight: '600',
        fontSize: 14,
        marginRight: 2,
    },
    scrollViewContent: {
        paddingRight: 12,
    },
    previewImageContainer: {
        position: 'relative',
        marginRight: 10,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    previewImage: {
        width: 120,
        height: 120,
        borderRadius: 12,
    },
    letterBadge: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: 'rgba(255, 107, 107, 0.9)',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterBadgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addPhotoThumbnail: {
        width: 120,
        height: 120,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ff6b6b',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 107, 107, 0.05)',
    },
    addPhotoText: {
        marginTop: 6,
        color: '#ff6b6b',
        fontWeight: '600',
    },
    emptyStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 12,
        marginTop: 8,
        marginBottom: 24,
    },
    emptyStateText: {
        marginTop: 8,
        color: '#999',
        fontSize: 16,
        marginBottom: 16,
    },
    addPhotosButton: {
        backgroundColor: '#ff6b6b',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addPhotosText: {
        color: '#fff',
        fontWeight: '600',
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: width,
        height: height,
    },
    fullScreenCloseButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: 'rgba(255, 70, 70, 0.8)',
        padding: 14,
        borderRadius: 30,
    },
    galleryModalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    galleryModalHeader: {
        alignItems: 'center',
        padding: 16,
        paddingTop: 50,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    closeModalButton: {
        position: 'absolute',
        left: 20,
        top: 50,
        zIndex: 10,
    },
    galleryModalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    modalLetterBadge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ff6b6b',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    modalLetterText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    galleryGrid: {
        padding: 4,
    },
    galleryImageContainer: {
        width: (width - 24) / 2,
        height: (width - 24) / 2,
        margin: 4,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    galleryImage: {
        width: '100%',
        height: '100%',
    },
    imageCaptionBlur: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 12,
    },
    galleryDeleteButton: {
        backgroundColor: 'rgba(255, 70, 70, 0.8)',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        justifyContent: 'center',
        width: 140,
    },
    cameraButton: {
        backgroundColor: '#5C6BC0',
    },
    galleryButton: {
        backgroundColor: '#26A69A',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    emptyGalleryContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyGalleryText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginTop: 16,
        textAlign: 'center',
    },
    emptyGallerySubText: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
});

export default MemoriesGallery; 