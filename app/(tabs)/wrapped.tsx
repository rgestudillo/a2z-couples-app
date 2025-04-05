import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IdeaCard from '@/components/IdeaCard';
import { useIdeas, IdeaType } from '@/context/IdeasContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateIdea } from '@/model/DateIdea';
import { GiftIdea } from '@/model/GiftIdea';
import CategorySelector from '@/components/CategorySelector';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const { width } = Dimensions.get('window');

export default function WrappedScreen() {
    const {
        getFavoriteIdeas,
        currentCategory,
        setCurrentCategory,
        completedIdeas,
        allIdeas,
        isIdeaCompleted,
        getIdeasByLetter
    } = useIdeas();
    const [activeTab, setActiveTab] = useState<IdeaType>(currentCategory);
    const [showFavorites, setShowFavorites] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [showImagesModal, setShowImagesModal] = useState(false);
    const [letterImages, setLetterImages] = useState<{ [key: string]: string[] }>({});
    const [favoriteIdeasList, setFavoriteIdeasList] = useState<(DateIdea | GiftIdea)[]>([]);

    // Update activeTab when currentCategory changes
    useEffect(() => {
        setActiveTab(currentCategory);
    }, [currentCategory]);

    // Load favorite ideas when activeTab changes
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favorites = await getFavoriteIdeas(activeTab);
                setFavoriteIdeasList(favorites);
            } catch (error) {
                console.error('Error loading favorite ideas:', error);
                setFavoriteIdeasList([]);
            }
        };

        loadFavorites();
    }, [activeTab, getFavoriteIdeas]);

    // Load images for completed ideas whenever the active tab changes
    useEffect(() => {
        loadImagesForCompletedIdeas();
    }, [activeTab]);

    // Helper function to load images for all completed ideas
    const loadImagesForCompletedIdeas = async () => {
        const imagesMap: { [key: string]: string[] } = {};

        // Get all completed ideas for the current category
        const completed = completedIdeas[activeTab] || [];

        for (const ideaId of completed) {
            try {
                const savedImages = await AsyncStorage.getItem(`idea_images_${ideaId}`);
                if (savedImages) {
                    const idea = allIdeas[activeTab].find(i => i.id === ideaId);
                    if (idea) {
                        const letter = idea.letter;
                        if (!imagesMap[letter]) {
                            imagesMap[letter] = [];
                        }
                        imagesMap[letter] = [...imagesMap[letter], ...JSON.parse(savedImages)];
                    }
                }
            } catch (error) {
                console.error('Error loading attached images:', error);
            }
        }

        setLetterImages(imagesMap);
    };

    // Helper function to get the number of completed ideas for a specific letter
    const getCompletedCountForLetter = (letter: string, type: IdeaType) => {
        const ideas = allIdeas[type].filter(idea => idea.letter === letter);
        return ideas.filter(idea => isIdeaCompleted(type, idea.id)).length;
    };

    // Helper function to get the number of images for a specific letter
    const getImagesCountForLetter = (letter: string) => {
        return letterImages[letter]?.length || 0;
    };

    // Helper function to get all the letters that have completed ideas
    const getCompletedLetters = (type: IdeaType) => {
        return ALPHABET.filter(letter => {
            const ideasForLetter = allIdeas[type].filter(idea => idea.letter === letter);
            return ideasForLetter.some(idea => isIdeaCompleted(type, idea.id));
        });
    };

    // Get completion percentage data
    const getCompletionData = () => {
        const completedLetters = getCompletedLetters(activeTab);
        const totalAvailableLetters = ALPHABET.filter(letter =>
            allIdeas[activeTab].some(idea => idea.letter === letter)
        ).length;

        const completedPercent = totalAvailableLetters > 0
            ? Math.round((completedLetters.length / totalAvailableLetters) * 100)
            : 0;

        return {
            completedLetters,
            totalAvailableLetters,
            completedPercent
        };
    };

    const { completedLetters, totalAvailableLetters, completedPercent } = getCompletionData();

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    // Handle letter click to show images
    const handleLetterClick = (letter: string) => {
        // Only respond if the letter has completed ideas
        const hasCompletedIdeas = getCompletedCountForLetter(letter, activeTab) > 0;
        if (hasCompletedIdeas) {
            setSelectedLetter(letter);

            // Only show modal if there are images for this letter
            if (letterImages[letter] && letterImages[letter].length > 0) {
                setShowImagesModal(true);
            }
        }
    };

    // Render alphabet progress
    const renderAlphabetProgress = () => {
        return (
            <View style={styles.alphabetProgressContainer}>
                <View style={styles.progressHeader}>
                    <Text style={styles.progressTitle}>Your A-Z Progress</Text>
                    <View style={styles.progressActions}>
                        <View style={styles.progressBadge}>
                            <Text style={styles.progressBadgeText}>{completedPercent}%</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.favoriteButton}
                            onPress={toggleFavorites}
                        >
                            <Ionicons
                                name={showFavorites ? "heart" : "heart-outline"}
                                size={26}
                                color={showFavorites ? "#FF6B81" : "#666"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.letterGrid}>
                    {ALPHABET.map((letter) => {
                        const hasIdeasForLetter = allIdeas[activeTab].some(idea => idea.letter === letter);
                        const completedCount = getCompletedCountForLetter(letter, activeTab);
                        const totalForLetter = allIdeas[activeTab].filter(idea => idea.letter === letter).length;
                        const isCompleted = completedCount > 0;
                        const completionRatio = totalForLetter > 0 ? completedCount / totalForLetter : 0;
                        const imagesCount = getImagesCountForLetter(letter);

                        return (
                            <TouchableOpacity
                                key={letter}
                                style={[
                                    styles.letterItem,
                                    !hasIdeasForLetter && styles.letterDisabled,
                                    isCompleted && styles.letterCompleted,
                                ]}
                                onPress={() => handleLetterClick(letter)}
                                disabled={!isCompleted}
                            >
                                <Text
                                    style={[
                                        styles.letterText,
                                        !hasIdeasForLetter && styles.letterTextDisabled,
                                        isCompleted && styles.letterTextCompleted
                                    ]}
                                >
                                    {letter}
                                </Text>
                                {isCompleted && (
                                    <View style={styles.letterBadge}>
                                        <Ionicons name="checkmark" size={10} color="#fff" />
                                    </View>
                                )}
                                {imagesCount > 0 && (
                                    <View style={styles.imageBadge}>
                                        <Ionicons name="images" size={8} color="#fff" />
                                        <Text style={styles.imageBadgeText}>{imagesCount}</Text>
                                    </View>
                                )}
                                {hasIdeasForLetter && (
                                    <View style={styles.letterProgress}>
                                        <View
                                            style={[
                                                styles.letterProgressFill,
                                                { width: `${completionRatio * 100}%` }
                                            ]}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    // Render achievement cards
    const renderAchievements = () => {
        return (
            <View style={styles.achievementsContainer}>
                <Text style={styles.sectionTitle}>Achievements</Text>

                <View style={styles.achievementCards}>
                    <View style={styles.achievementCard}>
                        <View style={styles.achievementIcon}>
                            <Ionicons name="trophy" size={24} color="#FFD700" />
                        </View>
                        <Text style={styles.achievementTitle}>Letters Completed</Text>
                        <Text style={styles.achievementValue}>
                            {completedLetters.length}/{totalAvailableLetters}
                        </Text>
                    </View>

                    <View style={styles.achievementCard}>
                        <View style={styles.achievementIcon}>
                            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                        </View>
                        <Text style={styles.achievementTitle}>Ideas Completed</Text>
                        <Text style={styles.achievementValue}>
                            {(completedIdeas[activeTab] || []).length}
                        </Text>
                    </View>

                    <View style={styles.achievementCard}>
                        <View style={styles.achievementIcon}>
                            <Ionicons name="heart" size={24} color="#FF6B81" />
                        </View>
                        <Text style={styles.achievementTitle}>Favorites</Text>
                        <Text style={styles.achievementValue}>
                            {favoriteIdeasList.length}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    // Render recently completed
    const renderRecentlyCompleted = () => {
        const recentlyCompleted = allIdeas[activeTab]
            .filter(idea => isIdeaCompleted(activeTab, idea.id))
            .slice(0, 3);

        if (recentlyCompleted.length === 0) {
            return (
                <View style={styles.emptyStateContainer}>
                    <Ionicons name="checkmark-circle-outline" size={60} color="#ddd" />
                    <Text style={styles.emptyStateText}>
                        You haven't completed any {activeTab === IdeaType.DATE ? 'date' : 'gift'} ideas yet.
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.recentlyCompletedContainer}>
                <Text style={styles.sectionTitle}>Recently Completed</Text>
                {recentlyCompleted.map(idea => (
                    <IdeaCard
                        key={idea.id}
                        idea={idea}
                        type={activeTab}
                    />
                ))}
            </View>
        );
    };

    // Render favorites
    const renderFavorites = () => {
        if (favoriteIdeasList.length === 0) {
            return (
                <View style={styles.emptyStateContainer}>
                    <Ionicons name="heart-outline" size={60} color="#ddd" />
                    <Text style={styles.emptyStateText}>
                        You haven't favorited any {activeTab === IdeaType.DATE ? 'date' : 'gift'} ideas yet.
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.favoritesContainer}>
                <Text style={styles.sectionTitle}>Your Favorites</Text>
                {favoriteIdeasList.map(idea => (
                    <IdeaCard
                        key={idea.id}
                        idea={idea}
                        type={activeTab}
                    />
                ))}
            </View>
        );
    };

    // Render share card
    const renderShareCard = () => {
        return (
            <View style={styles.shareCardContainer}>
                <View style={styles.shareCard}>
                    <Text style={styles.shareCardTitle}>Share Your Progress!</Text>
                    <Text style={styles.shareCardDescription}>
                        Show off your completed A-Z ideas with friends and family
                    </Text>
                    <TouchableOpacity style={styles.shareButton}>
                        <Ionicons name="share-social" size={18} color="#fff" />
                        <Text style={styles.shareButtonText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.selectorContainer}>
                <CategorySelector containerStyle={styles.categorySelectorStyle} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {showFavorites ? (
                    renderFavorites()
                ) : (
                    <>
                        {renderAlphabetProgress()}
                        {renderAchievements()}
                        {renderShareCard()}
                        {renderRecentlyCompleted()}
                    </>
                )}
            </ScrollView>

            {/* Images Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showImagesModal}
                onRequestClose={() => setShowImagesModal(false)}
            >
                <View style={styles.imagesModalView}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowImagesModal(false)}
                        >
                            <Ionicons name="close-circle" size={36} color="#ff6b6b" />
                        </TouchableOpacity>
                        <View style={styles.letterBadgeModal}>
                            <Text style={styles.letterTextModal}>{selectedLetter}</Text>
                        </View>
                        <Text style={styles.modalTitle}>Our {selectedLetter} Memories</Text>
                    </View>

                    {selectedLetter && letterImages[selectedLetter] && letterImages[selectedLetter].length > 0 ? (
                        <ScrollView
                            contentContainerStyle={styles.memoriesScrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.memoriesContainer}>
                                {letterImages[selectedLetter].map((uri, index) => (
                                    <View key={index} style={styles.memoryCard}>
                                        <Image
                                            source={{ uri }}
                                            style={styles.memoryImage}
                                            resizeMode="cover"
                                        />
                                        <View style={styles.memoryOverlay}>
                                            <View style={styles.memoryLetterBadge}>
                                                <Text style={styles.memoryLetterText}>{selectedLetter}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={styles.noImagesContainer}>
                            <View style={styles.emptyImageIcon}>
                                <Ionicons name="images-outline" size={60} color="#ff6b6b" />
                            </View>
                            <Text style={styles.noImagesText}>
                                No memories for letter {selectedLetter} yet
                            </Text>
                            <Text style={styles.noImagesSubText}>
                                Complete an idea with this letter and add photos!
                            </Text>
                        </View>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    selectorContainer: {
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    categorySelectorStyle: {
        marginTop: 0,
        marginBottom: 4,
    },
    scrollContent: {
        padding: 16,
    },
    alphabetProgressContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    progressActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBadge: {
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 12,
    },
    progressBadgeText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 12,
    },
    favoriteButton: {
        padding: 4,
    },
    letterGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    letterItem: {
        width: (width - 80) / 7,
        height: (width - 80) / 7,
        margin: 4,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    letterDisabled: {
        opacity: 0.4,
    },
    letterCompleted: {
        backgroundColor: '#E8F5E9',
        borderColor: '#4CAF50',
    },
    letterText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#666',
    },
    letterTextDisabled: {
        color: '#aaa',
    },
    letterTextCompleted: {
        color: '#4CAF50',
    },
    letterBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterProgress: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#f0f0f0',
    },
    letterProgressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
    },
    achievementsContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    achievementCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    achievementCard: {
        width: (width - 48) / 3.3,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    achievementIcon: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    achievementTitle: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginBottom: 4,
    },
    achievementValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    shareCardContainer: {
        marginBottom: 16,
    },
    shareCard: {
        backgroundColor: '#7986CB',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    shareCardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    shareCardDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: 16,
    },
    shareButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareButtonText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 8,
    },
    recentlyCompletedContainer: {
        marginBottom: 16,
    },
    favoritesContainer: {
        padding: 0,
    },
    emptyStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
    },
    imageBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        backgroundColor: '#5C6BC0',
        borderRadius: 8,
        paddingHorizontal: 4,
        height: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBadgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: 'bold',
        marginLeft: 2,
    },
    imagesModalView: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        borderRadius: 30,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 16,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 16,
        zIndex: 1,
    },
    letterBadgeModal: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ff6b6b',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    letterTextModal: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    memoriesScrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
    memoriesContainer: {
        alignItems: 'center',
    },
    memoryCard: {
        width: width - 64,
        height: width - 64,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        position: 'relative',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    memoryImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    memoryOverlay: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 12,
    },
    memoryLetterBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 107, 107, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    memoryLetterText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    noImagesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        marginTop: 40,
        flex: 1,
    },
    emptyImageIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFF0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    noImagesText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginTop: 16,
        fontWeight: 'bold',
    },
    noImagesSubText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginTop: 8,
    },
    imagesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    imageWrapper: {
        width: '48%',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    gridImage: {
        width: '100%',
        height: 180,
        borderRadius: 8,
    }
}); 