import { DateIdea } from '@/model/DateIdea';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerClearDateIdeasCache, CACHE_KEYS } from '@/utils/clearCaches';

// Cache key for AsyncStorage
const CACHE_KEY_DATE_IDEAS = CACHE_KEYS.DATE_IDEAS;
const CACHE_META_KEY = `${CACHE_KEY_DATE_IDEAS}_meta`;

// Cache to store fetched date ideas (in-memory)
let dateIdeasCache: DateIdea[] | null = null;

// Helper function to get all date ideas
export async function getAllDateIdeas(): Promise<DateIdea[]> {
    // Return from memory cache if available
    if (dateIdeasCache) {
        return dateIdeasCache;
    }

    try {
        // Try to fetch from Firestore first
        const dateIdeasCollection = collection(db, 'dateIdeas');
        let dateList: DateIdea[] = [];

        try {
            const dateSnapshot = await getDocs(dateIdeasCollection);
            dateList = dateSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as DateIdea[];

            // If we successfully got data from Firestore, save it to AsyncStorage as backup
            if (dateList.length > 0) {
                await AsyncStorage.setItem(CACHE_KEY_DATE_IDEAS, JSON.stringify(dateList));

                // Save metadata about this cache
                const metadata = {
                    lastUpdated: new Date().toISOString(),
                    count: dateList.length
                };
                await AsyncStorage.setItem(CACHE_META_KEY, JSON.stringify(metadata));
            }
        } catch (firestoreError) {
            console.warn('Error fetching date ideas from Firestore, trying local cache:', firestoreError);

            // If Firestore fetch fails, try to load from AsyncStorage
            const cachedData = await AsyncStorage.getItem(CACHE_KEY_DATE_IDEAS);
            if (cachedData) {
                dateList = JSON.parse(cachedData) as DateIdea[];
                console.log('Loaded date ideas from AsyncStorage cache');
            }
        }

        // Update memory cache
        dateIdeasCache = dateList;
        return dateList;
    } catch (error) {
        console.error('Error in getAllDateIdeas:', error);
        return [];
    }
}

// Helper function to get date ideas by letter
export async function getDateIdeasByLetter(letter: string): Promise<DateIdea[]> {
    try {
        // Try to get all ideas first from cache
        const allIdeas = await getAllDateIdeas();

        // Filter by letter
        return allIdeas.filter(idea => idea.letter.toUpperCase() === letter.toUpperCase());
    } catch (error) {
        console.error('Error fetching date ideas by letter:', error);
        return [];
    }
}

// Helper function to get a specific date idea by ID
export async function getDateIdeaById(id: string): Promise<DateIdea | undefined> {
    try {
        // Check if we already have it in cache
        if (dateIdeasCache) {
            const cachedIdea = dateIdeasCache.find(idea => idea.id === id);
            if (cachedIdea) return cachedIdea;
        }

        // Try to get the idea directly from Firestore
        try {
            const ideaDoc = doc(db, 'dateIdeas', id);
            const ideaSnapshot = await getDoc(ideaDoc);

            if (ideaSnapshot.exists()) {
                return {
                    id: ideaSnapshot.id,
                    ...ideaSnapshot.data()
                } as DateIdea;
            }
        } catch (firestoreError) {
            console.warn('Error fetching date idea from Firestore, trying local cache:', firestoreError);
        }

        // If we couldn't get it directly or Firestore is unavailable, try to get all ideas
        // and find our idea in the complete list (which may come from AsyncStorage)
        const allIdeas = await getAllDateIdeas();
        return allIdeas.find(idea => idea.id === id);
    } catch (error) {
        console.error('Error in getDateIdeaById:', error);
        return undefined;
    }
}

// Helper function to get date ideas by category
export async function getDateIdeasByCategory(category: string): Promise<DateIdea[]> {
    try {
        // Try to get all ideas first from cache
        const allIdeas = await getAllDateIdeas();

        // Filter by category
        return allIdeas.filter(idea => idea.category.includes(category));
    } catch (error) {
        console.error('Error fetching date ideas by category:', error);
        return [];
    }
}

// Clear cache function (useful for refreshing data)
export function clearDateIdeasCache() {
    dateIdeasCache = null;
}

// Function to load initial data from AsyncStorage
export async function loadInitialCacheFromStorage() {
    if (dateIdeasCache === null) {
        try {
            const cachedData = await AsyncStorage.getItem(CACHE_KEY_DATE_IDEAS);
            if (cachedData) {
                dateIdeasCache = JSON.parse(cachedData) as DateIdea[];
                console.log('Initialized date ideas cache from AsyncStorage');
            }
        } catch (error) {
            console.error('Error loading initial date ideas cache:', error);
        }
    }
}

// Register the cache clearing function with our cache utility
registerClearDateIdeasCache(clearDateIdeasCache);

// Initialize cache on import
loadInitialCacheFromStorage().catch(console.error);

export default dateIdeasCache; 