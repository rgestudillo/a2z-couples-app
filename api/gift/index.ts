import { GiftIdea } from '@/model/GiftIdea';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerClearGiftIdeasCache, CACHE_KEYS } from '@/utils/clearCaches';

// Cache key for AsyncStorage
const CACHE_KEY_GIFT_IDEAS = CACHE_KEYS.GIFT_IDEAS;

// Cache to store fetched gift ideas (in-memory)
let giftIdeasCache: GiftIdea[] | null = null;

// Helper function to get all gift ideas
export async function getAllGiftIdeas(): Promise<GiftIdea[]> {
    // Return from memory cache if available
    if (giftIdeasCache) {
        return giftIdeasCache;
    }

    try {
        // Try to fetch from Firestore first
        const giftIdeasCollection = collection(db, 'giftIdeas');
        let giftList: GiftIdea[] = [];

        try {
            const giftSnapshot = await getDocs(giftIdeasCollection);
            giftList = giftSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as GiftIdea[];

            // If we successfully got data from Firestore, save it to AsyncStorage as backup
            if (giftList.length > 0) {
                await AsyncStorage.setItem(CACHE_KEY_GIFT_IDEAS, JSON.stringify(giftList));
            }
        } catch (firestoreError) {
            console.warn('Error fetching gift ideas from Firestore, trying local cache:', firestoreError);

            // If Firestore fetch fails, try to load from AsyncStorage
            const cachedData = await AsyncStorage.getItem(CACHE_KEY_GIFT_IDEAS);
            if (cachedData) {
                giftList = JSON.parse(cachedData) as GiftIdea[];
                console.log('Loaded gift ideas from AsyncStorage cache');
            }
        }

        // Update memory cache
        giftIdeasCache = giftList;
        return giftList;
    } catch (error) {
        console.error('Error in getAllGiftIdeas:', error);
        return [];
    }
}

// Helper function to get gift ideas by letter
export async function getGiftIdeasByLetter(letter: string): Promise<GiftIdea[]> {
    try {
        // Try to get all ideas first from cache
        const allIdeas = await getAllGiftIdeas();

        // Filter by letter
        return allIdeas.filter(idea => idea.letter.toUpperCase() === letter.toUpperCase());
    } catch (error) {
        console.error('Error fetching gift ideas by letter:', error);
        return [];
    }
}

// Helper function to get a specific gift idea by ID
export async function getGiftIdeaById(id: string): Promise<GiftIdea | undefined> {
    try {
        // Check if we already have it in cache
        if (giftIdeasCache) {
            const cachedIdea = giftIdeasCache.find(idea => idea.id === id);
            if (cachedIdea) return cachedIdea;
        }

        // Try to get the idea directly from Firestore
        try {
            const ideaDoc = doc(db, 'giftIdeas', id);
            const ideaSnapshot = await getDoc(ideaDoc);

            if (ideaSnapshot.exists()) {
                return {
                    id: ideaSnapshot.id,
                    ...ideaSnapshot.data()
                } as GiftIdea;
            }
        } catch (firestoreError) {
            console.warn('Error fetching gift idea from Firestore, trying local cache:', firestoreError);
        }

        // If we couldn't get it directly or Firestore is unavailable, try to get all ideas
        // and find our idea in the complete list (which may come from AsyncStorage)
        const allIdeas = await getAllGiftIdeas();
        return allIdeas.find(idea => idea.id === id);
    } catch (error) {
        console.error('Error in getGiftIdeaById:', error);
        return undefined;
    }
}

// Helper function to get gift ideas by category
export async function getGiftIdeasByCategory(category: string): Promise<GiftIdea[]> {
    try {
        // Try to get all ideas first from cache
        const allIdeas = await getAllGiftIdeas();

        // Filter by category
        return allIdeas.filter(idea => idea.category.includes(category));
    } catch (error) {
        console.error('Error fetching gift ideas by category:', error);
        return [];
    }
}

// Helper function to get gift ideas by occasion
export async function getGiftIdeasByOccasion(occasion: string): Promise<GiftIdea[]> {
    try {
        // Try to get all ideas first from cache
        const allIdeas = await getAllGiftIdeas();

        // Filter by occasion
        return allIdeas.filter(idea =>
            idea.occasion && idea.occasion.includes(occasion)
        );
    } catch (error) {
        console.error('Error fetching gift ideas by occasion:', error);
        return [];
    }
}

// Clear cache function (useful for refreshing data)
export function clearGiftIdeasCache() {
    giftIdeasCache = null;
}

// Function to load initial data from AsyncStorage
export async function loadInitialCacheFromStorage() {
    if (giftIdeasCache === null) {
        try {
            const cachedData = await AsyncStorage.getItem(CACHE_KEY_GIFT_IDEAS);
            if (cachedData) {
                giftIdeasCache = JSON.parse(cachedData) as GiftIdea[];
                console.log('Initialized gift ideas cache from AsyncStorage');
            }
        } catch (error) {
            console.error('Error loading initial gift ideas cache:', error);
        }
    }
}

// Register the cache clearing function with our cache utility
registerClearGiftIdeasCache(clearGiftIdeasCache);

// Initialize cache on import
loadInitialCacheFromStorage().catch(console.error);

export default giftIdeasCache; 