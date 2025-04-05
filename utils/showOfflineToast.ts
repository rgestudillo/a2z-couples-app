import { Platform, ToastAndroid, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

/**
 * Shows a toast/alert message to inform the user they are offline
 * using platform-specific notification methods
 */
export async function showOfflineMessage(message = 'You are currently offline. Some features may be limited.'): Promise<void> {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.LONG);
        } else {
            // Use Alert for iOS and other platforms
            Alert.alert('Offline Mode', message);
        }
    }
}

/**
 * Shows a toast/alert message to inform the user an action requires network connection
 */
export async function showNetworkRequiredMessage(action = 'This action'): Promise<boolean> {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
        const message = `${action} requires an internet connection. Please try again when you're back online.`;

        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.LONG);
        } else {
            // Use Alert for iOS and other platforms
            Alert.alert('Network Required', message);
        }
        return false;
    }

    return true;
}

/**
 * Shows a toast/alert message to indicate data is being loaded from cache
 */
export function showLoadingFromCacheMessage(): void {
    const message = 'Loading from cached data while offline';

    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    // We don't show an alert on iOS since it would be disruptive
}

/**
 * Shows a toast message when data has been successfully cached for offline use
 */
export function showDataCachedMessage(): void {
    const message = 'Data saved for offline use';

    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    // We don't show an alert on iOS since it would be disruptive
} 