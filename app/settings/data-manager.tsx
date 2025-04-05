import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RefreshableScrollView from '@/components/RefreshableScrollView';
import { preloadAppData, refreshAppData } from '@/utils/dataPreloader';
import { clearAllCaches, clearAllStorageCaches, CACHE_KEYS } from '@/utils/clearCaches';
import { showNetworkRequiredMessage, showDataCachedMessage } from '@/utils/showOfflineToast';

export default function DataManagerScreen() {
    const [isConnected, setIsConnected] = useState<boolean | null>(true);
    const [isLoading, setIsLoading] = useState(false);
    const [cacheInfo, setCacheInfo] = useState<{ [key: string]: { size: string, date: string } | null }>({});

    useEffect(() => {
        // Check connection status
        NetInfo.fetch().then((state) => {
            setIsConnected(state.isConnected);
        });

        // Get cache info
        getCacheInfo();

        // Subscribe to network changes
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const getCacheInfo = async () => {
        try {
            const info: { [key: string]: { size: string, date: string } | null } = {};

            for (const [key, value] of Object.entries(CACHE_KEYS)) {
                const data = await AsyncStorage.getItem(value);
                if (data) {
                    // Get size in KB
                    const size = (data.length / 1024).toFixed(2) + ' KB';
                    // Get metadata if available
                    const metaKey = `${value}_meta`;
                    const meta = await AsyncStorage.getItem(metaKey);
                    const date = meta ? JSON.parse(meta).lastUpdated : 'Unknown';

                    info[key] = { size, date: new Date(date).toLocaleString() || 'Unknown' };
                } else {
                    info[key] = null;
                }
            }

            setCacheInfo(info);
        } catch (error) {
            console.error('Error getting cache info:', error);
        }
    };

    const refreshAllData = async () => {
        if (!isConnected) {
            await showNetworkRequiredMessage('Refreshing data');
            return;
        }

        setIsLoading(true);
        try {
            await refreshAppData();
            showDataCachedMessage();
            // Refresh cache info after update
            await getCacheInfo();
        } catch (error) {
            console.error('Error refreshing data:', error);
            Alert.alert('Error', 'Failed to refresh data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const clearAllData = async () => {
        Alert.alert(
            'Clear All Cached Data',
            'This will remove all offline data. You will need an internet connection to reload this data. Continue?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            await clearAllCaches();
                            await getCacheInfo();
                        } catch (error) {
                            console.error('Error clearing cache:', error);
                            Alert.alert('Error', 'Failed to clear cache. Please try again.');
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ]
        );
    };

    const handleRefreshComplete = (success: boolean) => {
        if (success) {
            getCacheInfo();
            showDataCachedMessage();
        }
    };

    const formatCacheTitle = (key: string) => {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    return (
        <View style={styles.container}>
            <RefreshableScrollView
                contentContainerStyle={styles.content}
                onRefreshComplete={handleRefreshComplete}
            >
                <View style={styles.statusContainer}>
                    <View style={styles.statusIndicator}>
                        <View style={[
                            styles.connectionDot,
                            { backgroundColor: isConnected ? '#4CD964' : '#FF3B30' }
                        ]} />
                        <Text style={styles.statusText}>
                            {isConnected ? 'Online' : 'Offline'}
                        </Text>
                    </View>
                    <Text style={styles.statusDescription}>
                        {isConnected
                            ? 'You can refresh data and browse normally'
                            : 'Only cached data is available. Pull down to refresh when back online.'}
                    </Text>
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.refreshButton]}
                        onPress={refreshAllData}
                        disabled={isLoading || !isConnected}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Ionicons name="refresh" size={20} color="#fff" />
                                <Text style={styles.actionButtonText}>Refresh All Data</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.clearButton]}
                        onPress={clearAllData}
                        disabled={isLoading}
                    >
                        <Ionicons name="trash-outline" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>Clear All Cached Data</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cacheInfoContainer}>
                    <Text style={styles.sectionTitle}>Cached Data</Text>

                    {Object.entries(cacheInfo).map(([key, info]) => (
                        <View key={key} style={styles.cacheItem}>
                            <View style={styles.cacheItemHeader}>
                                <Text style={styles.cacheItemTitle}>{formatCacheTitle(key)}</Text>
                                <View style={[
                                    styles.cacheDot,
                                    { backgroundColor: info ? '#4CD964' : '#FF3B30' }
                                ]} />
                            </View>

                            {info ? (
                                <View style={styles.cacheDetails}>
                                    <Text style={styles.cacheDetailText}>Size: {info.size}</Text>
                                    <Text style={styles.cacheDetailText}>Last Updated: {info.date}</Text>
                                </View>
                            ) : (
                                <Text style={styles.noCacheText}>No cached data available</Text>
                            )}
                        </View>
                    ))}
                </View>

                <View style={styles.tipContainer}>
                    <Ionicons name="information-circle-outline" size={20} color="#888" />
                    <Text style={styles.tipText}>
                        Tip: Pull down anywhere on this screen to refresh data when online.
                    </Text>
                </View>
            </RefreshableScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    content: {
        padding: 16,
    },
    statusContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    connectionDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    statusText: {
        fontSize: 18,
        fontWeight: '600',
    },
    statusDescription: {
        fontSize: 14,
        color: '#666',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 12,
        flex: 0.48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    refreshButton: {
        backgroundColor: '#007AFF',
    },
    clearButton: {
        backgroundColor: '#FF3B30',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 8,
    },
    cacheInfoContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    cacheItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
    },
    cacheItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cacheItemTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    cacheDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    cacheDetails: {
        marginTop: 8,
    },
    cacheDetailText: {
        color: '#666',
        fontSize: 14,
    },
    noCacheText: {
        color: '#999',
        fontStyle: 'italic',
        marginTop: 8,
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 24,
    },
    tipText: {
        color: '#666',
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
    },
}); 