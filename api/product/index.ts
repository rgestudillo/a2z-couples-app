import { Product } from '@/model/Product';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerClearProductsCache, CACHE_KEYS } from '@/utils/clearCaches';

// Cache key for AsyncStorage
const CACHE_KEY_PRODUCTS = CACHE_KEYS.PRODUCTS;

// Cache to store fetched products (in-memory)
let productsCache: Product[] | null = null;

// Helper function to get all products
export async function getAllProducts(): Promise<Product[]> {
    // Return from memory cache if available
    if (productsCache) {
        return productsCache;
    }

    try {
        // Try to fetch from Firestore first
        const productsCollection = collection(db, 'products');
        let productList: Product[] = [];

        try {
            const productSnapshot = await getDocs(productsCollection);
            productList = productSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];

            // If we successfully got data from Firestore, save it to AsyncStorage as backup
            if (productList.length > 0) {
                await AsyncStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(productList));
            }
        } catch (firestoreError) {
            console.warn('Error fetching products from Firestore, trying local cache:', firestoreError);

            // If Firestore fetch fails, try to load from AsyncStorage
            const cachedData = await AsyncStorage.getItem(CACHE_KEY_PRODUCTS);
            if (cachedData) {
                productList = JSON.parse(cachedData) as Product[];
                console.log('Loaded products from AsyncStorage cache');
            }
        }

        // Update memory cache
        productsCache = productList;
        return productList;
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        return [];
    }
}

// Helper function to get products related to a specific gift idea
export async function getProductsByIdeaId(ideaId: string): Promise<Product[]> {
    try {
        // Try to get all products first from cache
        const allProducts = await getAllProducts();

        // Filter by ideaId
        return allProducts.filter(product =>
            product.relatedGiftIds && product.relatedGiftIds.includes(ideaId)
        );
    } catch (error) {
        console.error('Error fetching products by idea ID:', error);
        return [];
    }
}

// More specifically named helper function
export async function getProductsByGiftId(giftId: string): Promise<Product[]> {
    try {
        // Try to get all products first from cache
        const allProducts = await getAllProducts();

        // Filter by giftId
        return allProducts.filter(product =>
            product.relatedGiftIds && product.relatedGiftIds.includes(giftId)
        );
    } catch (error) {
        console.error('Error fetching products by gift ID:', error);
        return [];
    }
}

// Find a product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
    try {
        // Check if we already have it in cache
        if (productsCache) {
            const cachedProduct = productsCache.find(product => product.id === id);
            if (cachedProduct) return cachedProduct;
        }

        // Try to get the product directly from Firestore
        try {
            const productDoc = doc(db, 'products', id);
            const productSnapshot = await getDoc(productDoc);

            if (productSnapshot.exists()) {
                return {
                    id: productSnapshot.id,
                    ...productSnapshot.data()
                } as Product;
            }
        } catch (firestoreError) {
            console.warn('Error fetching product from Firestore, trying local cache:', firestoreError);
        }

        // If we couldn't get it directly or Firestore is unavailable, try to get all products
        // and find our product in the complete list (which may come from AsyncStorage)
        const allProducts = await getAllProducts();
        return allProducts.find(product => product.id === id);
    } catch (error) {
        console.error('Error in getProductById:', error);
        return undefined;
    }
}

// Clear cache function (useful for refreshing data)
export function clearProductsCache() {
    productsCache = null;
}

// Function to load initial data from AsyncStorage
export async function loadInitialCacheFromStorage() {
    if (productsCache === null) {
        try {
            const cachedData = await AsyncStorage.getItem(CACHE_KEY_PRODUCTS);
            if (cachedData) {
                productsCache = JSON.parse(cachedData) as Product[];
                console.log('Initialized products cache from AsyncStorage');
            }
        } catch (error) {
            console.error('Error loading initial products cache:', error);
        }
    }
}

// Register the cache clearing function with our cache utility
registerClearProductsCache(clearProductsCache);

// Initialize cache on import
loadInitialCacheFromStorage().catch(console.error);

export default productsCache; 