import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllDateIdeas, getDateIdeasByLetter, getDateIdeaById } from '@/api/date';
import { getAllGiftIdeas, getGiftIdeasByLetter, getGiftIdeaById } from '@/api/gift';
import { getBusinessById, getBusinessesByIdeaId } from '@/api/business';
import { Business } from '@/model/Business';
import { DateIdea } from '@/model/DateIdea';
import { GiftIdea } from '@/model/GiftIdea';

// Base idea interface that all idea types will extend
export interface BaseIdea {
    id: string;
    title: string;
    letter: string;
    description: string;
    cost: '$' | '$$' | '$$$';
    category: string[];
    image?: string;
}

// Enum for idea types
export enum IdeaType {
    DATE = 'date',
    GIFT = 'gift'
}

interface IdeasContextType {
    allIdeas: {
        [IdeaType.DATE]: DateIdea[];
        [IdeaType.GIFT]: GiftIdea[];
    };
    loading: boolean;
    currentCategory: IdeaType;
    setCurrentCategory: (category: IdeaType) => void;
    favoriteIdeas: { [key: string]: string[] };
    addToFavorites: (type: IdeaType, id: string) => void;
    removeFromFavorites: (type: IdeaType, id: string) => void;
    getIdeasByLetter: (type: IdeaType, letter: string) => Promise<(DateIdea | GiftIdea)[]>;
    getIdeaById: (type: IdeaType, id: string) => Promise<(DateIdea | GiftIdea) | undefined>;
    getFavoriteIdeas: (type: IdeaType) => Promise<(DateIdea | GiftIdea)[]>;
    completedIdeas: { [key: string]: string[] };
    completedBusinesses: string[];
    markIdeaAsCompleted: (type: IdeaType, id: string) => void;
    markIdeaAsIncomplete: (type: IdeaType, id: string) => void;
    markBusinessAsCompleted: (businessId: string) => void;
    markBusinessAsIncomplete: (businessId: string) => void;
    isIdeaCompleted: (type: IdeaType, id: string) => boolean;
    isBusinessCompleted: (businessId: string) => boolean;
    refreshIdeas: () => Promise<void>;
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const IdeasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentCategory, setCurrentCategoryState] = useState<IdeaType>(IdeaType.DATE);
    const [favoriteIdeas, setFavoriteIdeas] = useState<{ [key: string]: string[] }>({
        [IdeaType.DATE]: [],
        [IdeaType.GIFT]: []
    });
    const [completedIdeas, setCompletedIdeas] = useState<{ [key: string]: string[] }>({
        [IdeaType.DATE]: [],
        [IdeaType.GIFT]: []
    });
    const [completedBusinesses, setCompletedBusinesses] = useState<string[]>([]);
    const [allIdeas, setAllIdeas] = useState<{
        [IdeaType.DATE]: DateIdea[];
        [IdeaType.GIFT]: GiftIdea[];
    }>({
        [IdeaType.DATE]: [],
        [IdeaType.GIFT]: []
    });

    // Debug: Log current category state
    useEffect(() => {
        console.log('IdeasContext - Current category changed to:', currentCategory);
    }, [currentCategory]);

    // Load all ideas from Firebase
    const loadAllIdeas = useCallback(async () => {
        try {
            setLoading(true);
            const dateIdeas = await getAllDateIdeas();
            const giftIdeas = await getAllGiftIdeas();

            setAllIdeas({
                [IdeaType.DATE]: dateIdeas,
                [IdeaType.GIFT]: giftIdeas
            });
        } catch (error) {
            console.error('Error loading ideas:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to refresh ideas
    const refreshIdeas = useCallback(async () => {
        await loadAllIdeas();
    }, [loadAllIdeas]);

    // Initial data loading
    useEffect(() => {
        loadAllIdeas();
    }, [loadAllIdeas]);

    // Memoized setter function to avoid recreating it on each render
    const setCurrentCategory = useCallback((category: IdeaType) => {
        console.log('IdeasContext - Setting category from', currentCategory, 'to', category);
        setCurrentCategoryState(category);
    }, [currentCategory]);

    // Load favorites from AsyncStorage
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    setFavoriteIdeas(JSON.parse(storedFavorites));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };

        loadFavorites();
    }, []);

    // Load completed items from AsyncStorage
    useEffect(() => {
        const loadCompletedItems = async () => {
            try {
                const storedCompletedIdeas = await AsyncStorage.getItem('completedIdeas');
                if (storedCompletedIdeas) {
                    setCompletedIdeas(JSON.parse(storedCompletedIdeas));
                }

                const storedCompletedBusinesses = await AsyncStorage.getItem('completedBusinesses');
                if (storedCompletedBusinesses) {
                    setCompletedBusinesses(JSON.parse(storedCompletedBusinesses));
                }
            } catch (error) {
                console.error('Error loading completed items:', error);
            }
        };

        loadCompletedItems();
    }, []);

    // Save favorites to AsyncStorage whenever it changes
    useEffect(() => {
        const saveFavorites = async () => {
            try {
                await AsyncStorage.setItem('favorites', JSON.stringify(favoriteIdeas));
            } catch (error) {
                console.error('Error saving favorites:', error);
            }
        };

        saveFavorites();
    }, [favoriteIdeas]);

    // Save completed items to AsyncStorage whenever they change
    useEffect(() => {
        const saveCompletedItems = async () => {
            try {
                await AsyncStorage.setItem('completedIdeas', JSON.stringify(completedIdeas));
                await AsyncStorage.setItem('completedBusinesses', JSON.stringify(completedBusinesses));
            } catch (error) {
                console.error('Error saving completed items:', error);
            }
        };

        saveCompletedItems();
    }, [completedIdeas, completedBusinesses]);

    const addToFavorites = useCallback((type: IdeaType, id: string) => {
        setFavoriteIdeas((prev) => {
            const currentFavorites = prev[type] || [];
            if (!currentFavorites.includes(id)) {
                return {
                    ...prev,
                    [type]: [...currentFavorites, id]
                };
            }
            return prev;
        });
    }, []);

    const removeFromFavorites = useCallback((type: IdeaType, id: string) => {
        setFavoriteIdeas((prev) => ({
            ...prev,
            [type]: (prev[type] || []).filter((favId) => favId !== id)
        }));
    }, []);

    const markIdeaAsCompleted = useCallback((type: IdeaType, id: string) => {
        setCompletedIdeas((prev) => {
            const currentCompleted = prev[type] || [];
            if (!currentCompleted.includes(id)) {
                return {
                    ...prev,
                    [type]: [...currentCompleted, id]
                };
            }
            return prev;
        });
    }, []);

    const markIdeaAsIncomplete = useCallback((type: IdeaType, id: string) => {
        setCompletedIdeas((prev) => ({
            ...prev,
            [type]: (prev[type] || []).filter((ideaId) => ideaId !== id)
        }));
    }, []);

    const markBusinessAsCompleted = useCallback(async (businessId: string) => {
        // First, add the business to completed businesses
        setCompletedBusinesses((prev) => {
            if (!prev.includes(businessId)) {
                return [...prev, businessId];
            }
            return prev;
        });

        try {
            // Get the business details to find its related idea
            const business = await getBusinessById(businessId);
            if (business && business.relatedIdeaIds.length > 0) {
                const ideaId = business.relatedIdeaIds[0]; // Take the first related idea

                // Mark the parent idea as completed as soon as at least one business is completed
                markIdeaAsCompleted(IdeaType.DATE, ideaId);
            }
        } catch (error) {
            console.error('Error marking business as completed:', error);
        }
    }, [completedBusinesses, markIdeaAsCompleted]);

    const markBusinessAsIncomplete = useCallback(async (businessId: string) => {
        // First remove the business from completed businesses
        setCompletedBusinesses((prev) =>
            prev.filter((id) => id !== businessId)
        );

        try {
            // Get the business details to find its related idea
            const business = await getBusinessById(businessId);
            if (business && business.relatedIdeaIds.length > 0) {
                const ideaId = business.relatedIdeaIds[0]; // Take the first related idea

                // Get all businesses related to this idea
                const relatedBusinesses = await getBusinessesByIdeaId(ideaId);

                // Check if there are still other completed businesses for this idea
                const hasCompletedBusinesses = relatedBusinesses.some(
                    (b: Business) => b.id !== businessId && completedBusinesses.includes(b.id)
                );

                // If no other businesses are completed, mark the parent idea as incomplete
                if (!hasCompletedBusinesses) {
                    markIdeaAsIncomplete(IdeaType.DATE, ideaId);
                }
            }
        } catch (error) {
            console.error('Error marking business as incomplete:', error);
        }
    }, [completedBusinesses, markIdeaAsIncomplete]);

    const isIdeaCompleted = useCallback((type: IdeaType, id: string) => {
        return (completedIdeas[type] || []).includes(id);
    }, [completedIdeas]);

    const isBusinessCompleted = useCallback((businessId: string) => {
        return completedBusinesses.includes(businessId);
    }, [completedBusinesses]);

    const getIdeasByLetter = useCallback(async (type: IdeaType, letter: string) => {
        if (type === IdeaType.DATE) {
            return await getDateIdeasByLetter(letter);
        } else {
            return await getGiftIdeasByLetter(letter);
        }
    }, []);

    const getIdeaById = useCallback(async (type: IdeaType, id: string) => {
        if (type === IdeaType.DATE) {
            return await getDateIdeaById(id);
        } else {
            return await getGiftIdeaById(id);
        }
    }, []);

    const getFavoriteIdeas = useCallback(async (type: IdeaType) => {
        const favoriteIds = favoriteIdeas[type] || [];
        if (favoriteIds.length === 0) return [];

        const ideas = type === IdeaType.DATE ?
            await getAllDateIdeas() :
            await getAllGiftIdeas();

        return ideas.filter((idea) => favoriteIds.includes(idea.id));
    }, [favoriteIdeas]);

    // Debug log on each render
    console.log('IdeasProvider rendering with category:', currentCategory);

    const contextValue = {
        allIdeas,
        loading,
        currentCategory,
        setCurrentCategory,
        favoriteIdeas,
        addToFavorites,
        removeFromFavorites,
        getIdeasByLetter,
        getIdeaById,
        getFavoriteIdeas,
        completedIdeas,
        completedBusinesses,
        markIdeaAsCompleted,
        markIdeaAsIncomplete,
        markBusinessAsCompleted,
        markBusinessAsIncomplete,
        isIdeaCompleted,
        isBusinessCompleted,
        refreshIdeas,
    };

    return (
        <IdeasContext.Provider value={contextValue}>
            {children}
        </IdeasContext.Provider>
    );
};

export const useIdeas = (): IdeasContextType => {
    const context = useContext(IdeasContext);
    if (context === undefined) {
        throw new Error('useIdeas must be used within an IdeasProvider');
    }
    return context;
};

export { DateIdea, GiftIdea };
