// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    enableIndexedDbPersistence,
    CACHE_SIZE_UNLIMITED,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
    Firestore
} from "firebase/firestore";
import { Platform } from 'react-native';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAISdo6bN2kTVLch0kBQaG1lYyX3IY7qZQ",
    authDomain: "folderly-dc7a3.firebaseapp.com",
    projectId: "folderly-dc7a3",
    storageBucket: "folderly-dc7a3.appspot.com",
    messagingSenderId: "369680016890",
    appId: "1:369680016890:web:6d12d54bdcf73661f33043",
    measurementId: "G-K800KSYWZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore with enhanced offline support
let db: Firestore;

// Use the new initialization method with better offline support
try {
    db = initializeFirestore(app, {
        localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
            cacheSizeBytes: CACHE_SIZE_UNLIMITED
        })
    });
    console.log('Enhanced Firestore offline persistence enabled');
} catch (err) {
    console.error('Failed to initialize with enhanced persistence, falling back to standard mode:', err);
    // Fallback to standard initialization
    db = getFirestore(app);

    // Try to enable standard offline persistence for older Firebase versions
    if (Platform.OS !== 'web') {
        enableIndexedDbPersistence(db)
            .catch((err) => {
                if (err.code === 'failed-precondition') {
                    // Multiple tabs open, persistence can only be enabled in one tab at a time
                    console.log('Persistence failed: Multiple tabs open');
                } else if (err.code === 'unimplemented') {
                    // The current browser/environment doesn't support persistence
                    console.log('Persistence not supported in this environment');
                } else {
                    console.error('Unknown persistence error:', err);
                }
            });
    }
}

export { db }; 