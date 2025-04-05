import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache keys for different data types
const CACHE_KEYS = {
    DATE_IDEAS: 'date_ideas_cache',
    GIFT_IDEAS: 'gift_ideas_cache',
    BUSINESSES: 'businesses_cache',
    PRODUCTS: 'products_cache'
};

// In-memory cache clearing functions - these will be implemented in their
// respective API modules, but we define empty ones here for safety
let clearDateIdeasCache = () => { };
let clearGiftIdeasCache = () => { };
let clearBusinessesCache = () => { };
let clearProductsCache = () => { };

// Register functions to clear in-memory caches
export function registerClearDateIdeasCache(fn: () => void) {
    clearDateIdeasCache = fn;
}

export function registerClearGiftIdeasCache(fn: () => void) {
    clearGiftIdeasCache = fn;
}

export function registerClearBusinessesCache(fn: () => void) {
    clearBusinessesCache = fn;
}

export function registerClearProductsCache(fn: () => void) {
    clearProductsCache = fn;
}

// Clear AsyncStorage cache for a specific type
export async function clearStorageCache(cacheKey: string): Promise<void> {
    try {
        await AsyncStorage.removeItem(cacheKey);
        console.log(`Cleared ${cacheKey} from AsyncStorage`);
    } catch (error) {
        console.error(`Failed to clear ${cacheKey} from AsyncStorage:`, error);
    }
}

// Clear all AsyncStorage caches
export async function clearAllStorageCaches(): Promise<void> {
    try {
        const keys = Object.values(CACHE_KEYS);
        await Promise.all(keys.map(key => AsyncStorage.removeItem(key)));
        console.log('All AsyncStorage caches cleared');
    } catch (error) {
        console.error('Failed to clear all AsyncStorage caches:', error);
    }
}

// Clear all in-memory caches
export function clearAllMemoryCaches(): void {
    clearDateIdeasCache();
    clearGiftIdeasCache();
    clearBusinessesCache();
    clearProductsCache();
    console.log('All in-memory caches cleared');
}

// Clear both in-memory and AsyncStorage caches
export function clearAllCaches(): void {
    clearAllMemoryCaches();
    clearAllStorageCaches().catch(console.error);
}

// Export the cache keys for use in other modules
export { CACHE_KEYS }; 