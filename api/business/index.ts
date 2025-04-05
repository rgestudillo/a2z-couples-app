import { Business } from '@/model/Business';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerClearBusinessesCache, CACHE_KEYS } from '@/utils/clearCaches';

// Cache key for AsyncStorage
const CACHE_KEY_BUSINESSES = CACHE_KEYS.BUSINESSES;

// Cache to store fetched businesses (in-memory)
let businessesCache: Business[] | null = null;

// Helper function to get all businesses
export async function getAllBusinesses(): Promise<Business[]> {
    // Return from memory cache if available
    if (businessesCache) {
        return businessesCache;
    }

    try {
        // Try to fetch from Firestore first
        const businessesCollection = collection(db, 'businesses');
        let businessList: Business[] = [];

        try {
            const businessSnapshot = await getDocs(businessesCollection);
            businessList = businessSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Business[];

            // If we successfully got data from Firestore, save it to AsyncStorage as backup
            if (businessList.length > 0) {
                await AsyncStorage.setItem(CACHE_KEY_BUSINESSES, JSON.stringify(businessList));
            }
        } catch (firestoreError) {
            console.warn('Error fetching businesses from Firestore, trying local cache:', firestoreError);

            // If Firestore fetch fails, try to load from AsyncStorage
            const cachedData = await AsyncStorage.getItem(CACHE_KEY_BUSINESSES);
            if (cachedData) {
                businessList = JSON.parse(cachedData) as Business[];
                console.log('Loaded businesses from AsyncStorage cache');
            }
        }

        // Update memory cache
        businessesCache = businessList;
        return businessList;
    } catch (error) {
        console.error('Error in getAllBusinesses:', error);
        return [];
    }
}

// Helper function to get businesses related to a specific idea
export async function getBusinessesByIdeaId(ideaId: string): Promise<Business[]> {
    try {
        // Try to get all businesses first from cache
        const allBusinesses = await getAllBusinesses();

        // Filter by ideaId
        return allBusinesses.filter(business =>
            business.relatedIdeaIds && business.relatedIdeaIds.includes(ideaId)
        );
    } catch (error) {
        console.error('Error fetching businesses by idea ID:', error);
        return [];
    }
}

// Helper function to get a specific business by ID
export async function getBusinessById(id: string): Promise<Business | undefined> {
    try {
        // Check if we already have it in cache
        if (businessesCache) {
            const cachedBusiness = businessesCache.find(business => business.id === id);
            if (cachedBusiness) return cachedBusiness;
        }

        // Try to get the business directly from Firestore
        try {
            const businessDoc = doc(db, 'businesses', id);
            const businessSnapshot = await getDoc(businessDoc);

            if (businessSnapshot.exists()) {
                return {
                    id: businessSnapshot.id,
                    ...businessSnapshot.data()
                } as Business;
            }
        } catch (firestoreError) {
            console.warn('Error fetching business from Firestore, trying local cache:', firestoreError);
        }

        // If we couldn't get it directly or Firestore is unavailable, try to get all businesses
        // and find our business in the complete list (which may come from AsyncStorage)
        const allBusinesses = await getAllBusinesses();
        return allBusinesses.find(business => business.id === id);
    } catch (error) {
        console.error('Error in getBusinessById:', error);
        return undefined;
    }
}

// Clear cache function (useful for refreshing data)
export function clearBusinessesCache() {
    businessesCache = null;
}

// Function to load initial data from AsyncStorage
export async function loadInitialCacheFromStorage() {
    if (businessesCache === null) {
        try {
            const cachedData = await AsyncStorage.getItem(CACHE_KEY_BUSINESSES);
            if (cachedData) {
                businessesCache = JSON.parse(cachedData) as Business[];
                console.log('Initialized businesses cache from AsyncStorage');
            }
        } catch (error) {
            console.error('Error loading initial businesses cache:', error);
        }
    }
}

// Register the cache clearing function with our cache utility
registerClearBusinessesCache(clearBusinessesCache);

// Initialize cache on import
loadInitialCacheFromStorage().catch(console.error);

export default businessesCache; 