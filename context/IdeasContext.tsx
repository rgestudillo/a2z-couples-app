import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dateIdeas, { DateIdea as OriginalDateIdea } from '../data/dateIdeas';

// Re-export the DateIdea interface
export type DateIdea = OriginalDateIdea;

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

// Gift idea interface
export interface GiftIdea extends BaseIdea {
    occasion: string[];
    relatedProductIds: string[];
}

// Enum for idea types
export enum IdeaType {
    DATE = 'date',
    GIFT = 'gift'
}

// Mock gift ideas data - to be replaced with actual data file later
const giftIdeas: GiftIdea[] = [
    {
        id: 'gift-1',
        title: 'Apple Watch',
        letter: 'A',
        description: 'A premium smartwatch that makes a perfect gift for tech lovers.',
        cost: '$$$',
        category: ['Technology', 'Wearables'],
        occasion: ['Birthday', 'Anniversary'],
        relatedProductIds: [],
        image: 'https://example.com/apple-watch.jpg'
    },
    {
        id: 'gift-2',
        title: 'Blanket',
        letter: 'B',
        description: 'A cozy weighted blanket for comfort and relaxation.',
        cost: '$$',
        category: ['Home', 'Comfort'],
        occasion: ['Christmas', 'Housewarming'],
        relatedProductIds: [],
        image: 'https://example.com/blanket.jpg'
    },
    {
        id: 'gift-3',
        title: 'Chocolate Box',
        letter: 'C',
        description: 'Assorted gourmet chocolates in an elegant gift box.',
        cost: '$$',
        category: ['Food', 'Sweets'],
        occasion: ['Valentine\'s Day', 'Thank You'],
        relatedProductIds: [],
        image: 'https://example.com/chocolate.jpg'
    }
];

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
}

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const IdeasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentCategory, setCurrentCategoryState] = useState<IdeaType>(IdeaType.DATE);
    const [favoriteIdeas, setFavoriteIdeas] = useState<{ [key: string]: string[] }>({
        [IdeaType.DATE]: [],
        [IdeaType.GIFT]: []
    });

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