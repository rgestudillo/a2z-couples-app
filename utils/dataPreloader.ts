import { getAllDateIdeas, loadInitialCacheFromStorage as loadDateIdeasCache } from '@/api/date';
import { getAllGiftIdeas, loadInitialCacheFromStorage as loadGiftIdeasCache } from '@/api/gift';
import { getAllBusinesses, loadInitialCacheFromStorage as loadBusinessesCache } from '@/api/business';
import { getAllProducts, loadInitialCacheFromStorage as loadProductsCache } from '@/api/product';
import NetInfo from '@react-native-community/netinfo';
import * as clearCaches from '@/utils/clearCaches';

/**
 * Utility to preload data for the application
 * This helps ensure data is available both online and offline
 */
export async function preloadAppData(): Promise<void> {
    try {
        console.log('Starting data preloading...');

        // First, load any existing cached data from AsyncStorage
        // This ensures immediate offline access even before Firestore fetch completes
        await Promise.all([
            loadDateIdeasCache(),
            loadGiftIdeasCache(),
            loadBusinessesCache(),
            loadProductsCache()
        ]);

        console.log('Local caches initialized from AsyncStorage');

        // Check if we're online
        const netState = await NetInfo.fetch();

        if (netState.isConnected) {
            console.log('Online, fetching fresh data from Firestore...');

            // Try to fetch fresh data from Firestore if we're online
            // These calls will automatically update AsyncStorage as a side effect
            await Promise.all([
                getAllDateIdeas(),
                getAllGiftIdeas(),
                getAllBusinesses(),
                getAllProducts()
            ]);

            console.log('Firestore data fetch complete');
        } else {
            console.log('Offline, using cached data only');
        }
    } catch (error) {
        console.error('Error in data preloading:', error);
    }
}

/**
 * Reload all data from Firestore
 * This is useful when the user wants to force a refresh
 */
export async function refreshAppData(): Promise<boolean> {
    try {
        // Clear all in-memory caches to force a fetch
        clearCaches.clearAllMemoryCaches();

        // Check if we're online
        const netState = await NetInfo.fetch();

        if (netState.isConnected) {
            // Fetch fresh data
            await Promise.all([
                getAllDateIdeas(),
                getAllGiftIdeas(),
                getAllBusinesses(),
                getAllProducts()
            ]);

            return true; // Refresh successful
        } else {
            console.log('Cannot refresh data while offline');
            return false; // Refresh failed due to being offline
        }
    } catch (error) {
        console.error('Error refreshing app data:', error);
        return false; // Refresh failed due to error
    }
} 