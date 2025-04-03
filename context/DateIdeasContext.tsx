import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dateIdeas, { DateIdea } from '../data/dateIdeas';

interface DateIdeasContextType {
    allIdeas: DateIdea[];
    favoriteIdeas: string[];
    addToFavorites: (id: string) => void;
    removeFromFavorites: (id: string) => void;
    getIdeasByLetter: (letter: string) => DateIdea[];
    getIdeaById: (id: string) => DateIdea | undefined;
    getFavoriteIdeas: () => DateIdea[];
}

const DateIdeasContext = createContext<DateIdeasContextType | undefined>(undefined);

export const DateIdeasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favoriteIdeas, setFavoriteIdeas] = useState<string[]>([]);

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

    const addToFavorites = (id: string) => {
        setFavoriteIdeas((prev) => {
            if (!prev.includes(id)) {
                return [...prev, id];
            }
            return prev;
        });
    };

    const removeFromFavorites = (id: string) => {
        setFavoriteIdeas((prev) => prev.filter((favId) => favId !== id));
    };

    const getIdeasByLetter = (letter: string) => {
        return dateIdeas.filter((idea) => idea.letter === letter.toUpperCase());
    };

    const getIdeaById = (id: string) => {
        return dateIdeas.find((idea) => idea.id === id);
    };

    const getFavoriteIdeas = () => {
        return dateIdeas.filter((idea) => favoriteIdeas.includes(idea.id));
    };

    return (
        <DateIdeasContext.Provider
            value={{
                allIdeas: dateIdeas,
                favoriteIdeas,
                addToFavorites,
                removeFromFavorites,
                getIdeasByLetter,
                getIdeaById,
                getFavoriteIdeas,
            }}
        >
            {children}
        </DateIdeasContext.Provider>
    );
};

export const useDateIdeas = (): DateIdeasContextType => {
    const context = useContext(DateIdeasContext);
    if (context === undefined) {
        throw new Error('useDateIdeas must be used within a DateIdeasProvider');
    }
    return context;
}; 