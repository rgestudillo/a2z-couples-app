import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dateIdeas, { DateIdea } from '../data/dateIdeas';
import giftIdeas, { GiftIdea } from '../data/giftIdeas';
import { Business } from '../data/businesses';
import products from '../data/products';

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
    currentCategory: IdeaType;
    setCurrentCategory: (category: IdeaType) => void;
    favoriteIdeas: { [key: string]: string[] };
    addToFavorites: (type: IdeaType, id: string) => void;
    removeFromFavorites: (type: IdeaType, id: string) => void;
    getIdeasByLetter: (type: IdeaType, letter: string) => (DateIdea | GiftIdea)[];
    getIdeaById: (type: IdeaType, id: string) => (DateIdea | GiftIdea) | undefined;
    getFavoriteIdeas: (type: IdeaType) => (DateIdea | GiftIdea)[];
    completedIdeas: { [key: string]: string[] };
    completedBusinesses: string[];
    markIdeaAsCompleted: (type: IdeaType, id: string) => void;
    markIdeaAsIncomplete: (type: IdeaType, id: string) => void;
    markBusinessAsCompleted: (businessId: string) => void;
    markBusinessAsIncomplete: (businessId: string) => void;
    isIdeaCompleted: (type: IdeaType, id: string) => boolean;
    isBusinessCompleted: (businessId: string) => boolean;
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const IdeasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

    // Debug: Log current category state
    useEffect(() => {
        console.log('IdeasContext - Current category changed to:', currentCategory);
    }, [currentCategory]);

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

    const markBusinessAsCompleted = useCallback((businessId: string) => {
        // First, add the business to completed businesses
        setCompletedBusinesses((prev) => {
            if (!prev.includes(businessId)) {
                return [...prev, businessId];
            }
            return prev;
        });

        // Import needed function from businesses module
        const { getBusinessById } = require('../data/businesses');

        // Get the business details to find its related idea
        const business = getBusinessById(businessId);
        if (business && business.relatedIdeaIds.length > 0) {
            const ideaId = business.relatedIdeaIds[0]; // Take the first related idea

            // Mark the parent idea as completed as soon as at least one business is completed
            markIdeaAsCompleted(IdeaType.DATE, ideaId);
        }
    }, [completedBusinesses, markIdeaAsCompleted]);

    const markBusinessAsIncomplete = useCallback((businessId: string) => {
        // First remove the business from completed businesses
        setCompletedBusinesses((prev) =>
            prev.filter((id) => id !== businessId)
        );

        // Import needed functions from businesses module
        const { getBusinessById, getBusinessesByIdeaId } = require('../data/businesses');

        // Get the business details to find its related idea
        const business = getBusinessById(businessId);
        if (business && business.relatedIdeaIds.length > 0) {
            const ideaId = business.relatedIdeaIds[0]; // Take the first related idea

            // Get all businesses related to this idea
            const relatedBusinesses = getBusinessesByIdeaId(ideaId);

            // Check if there are still other completed businesses for this idea
            const hasCompletedBusinesses = relatedBusinesses.some(
                (b: Business) => b.id !== businessId && completedBusinesses.includes(b.id)
            );

            // If no other businesses are completed, mark the parent idea as incomplete
            if (!hasCompletedBusinesses) {
                markIdeaAsIncomplete(IdeaType.DATE, ideaId);
            }
        }
    }, [completedBusinesses, markIdeaAsIncomplete]);

    const isIdeaCompleted = useCallback((type: IdeaType, id: string) => {
        return (completedIdeas[type] || []).includes(id);
    }, [completedIdeas]);

    const isBusinessCompleted = useCallback((businessId: string) => {
        return completedBusinesses.includes(businessId);
    }, [completedBusinesses]);

    const getIdeasByLetter = useCallback((type: IdeaType, letter: string) => {
        const ideas = type === IdeaType.DATE ? dateIdeas : giftIdeas;
        return ideas.filter((idea) => idea.letter === letter.toUpperCase());
    }, []);

    const getIdeaById = useCallback((type: IdeaType, id: string) => {
        const ideas = type === IdeaType.DATE ? dateIdeas : giftIdeas;
        return ideas.find((idea) => idea.id === id);
    }, []);

    const getFavoriteIdeas = useCallback((type: IdeaType) => {
        const ideas = type === IdeaType.DATE ? dateIdeas : giftIdeas;
        return ideas.filter((idea) => (favoriteIdeas[type] || []).includes(idea.id));
    }, [favoriteIdeas]);

    // Debug log on each render
    console.log('IdeasProvider rendering with category:', currentCategory);

    const contextValue = {
        allIdeas: {
            [IdeaType.DATE]: dateIdeas,
            [IdeaType.GIFT]: giftIdeas
        },
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
