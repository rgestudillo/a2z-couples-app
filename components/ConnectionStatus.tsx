import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { showOfflineMessage } from '@/utils/showOfflineToast';
import { refreshAppData } from '@/utils/dataPreloader';

const ConnectionStatus: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-40)).current;

    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            const prevConnected = isConnected;
            setIsConnected(state.isConnected);

            // Animate in or out based on connection state
            if (prevConnected !== state.isConnected) {
                if (state.isConnected) {
                    // Network came back online
                    animateOut();
                } else {
                    // Network went offline
                    animateIn();
                    showOfflineMessage();
                }
            }
        });

        // Initial check
        NetInfo.fetch().then((state: NetInfoState) => {
            setIsConnected(state.isConnected);

            // Set initial animation state
            if (!state.isConnected) {
                fadeAnim.setValue(1);
                slideAnim.setValue(0);
                showOfflineMessage();
            }
        });

        // Cleanup on unmount
        return () => {
            unsubscribe();
        };
    }, [isConnected]);

    const animateIn = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const animateOut = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -40,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const handleRefresh = async () => {
        if (isRefreshing) return;

        setIsRefreshing(true);
        try {
            const success = await refreshAppData();
            if (success) {
                // The network is back, animate out the banner
                animateOut();
            }
        } catch (error) {
            console.error("Error refreshing data:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    if (isConnected === true) {
        return null; // Don't show anything when connected
    }

    return (
        <Animated.View style={[
            styles.container,
            {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
            }
        ]}>
            <View style={styles.content}>
                <Ionicons name="cloud-offline" size={16} color="#fff" />
                <Text style={styles.text}>Offline Mode</Text>
            </View>

            <Pressable
                style={styles.refreshButton}
                onPress={handleRefresh}
                disabled={isRefreshing}
            >
                <Ionicons
                    name={isRefreshing ? "sync-circle" : "refresh-circle"}
                    size={20}
                    color="#fff"
                />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FF6B81',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
        paddingHorizontal: 16,
        zIndex: 9999,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    refreshButton: {
        padding: 4,
    }
});

export default ConnectionStatus; 