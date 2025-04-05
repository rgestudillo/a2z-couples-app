import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type SettingItem = {
    title: string;
    subtitle: string;
    icon: string;
    iconColor: string;
    iconBgColor: string;
    route: string;
};

export default function SettingsScreen() {
    const settingItems: SettingItem[] = [
        {
            title: 'Offline Data Manager',
            subtitle: 'Manage cached data for offline use',
            icon: 'cloud-download-outline',
            iconColor: '#FF6B81',
            iconBgColor: '#FFF0F3',
            route: '/settings/data-manager',
        },
        // Add more settings options here as needed
    ];

    const handleItemPress = (route: string) => {
        router.push(route as any);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
                <Text style={styles.headerSubtitle}>Customize your app experience</Text>
            </View>

            <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>App Settings</Text>

                {settingItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.settingItem,
                            index === settingItems.length - 1 ? styles.lastItem : null
                        ]}
                        onPress={() => handleItemPress(item.route)}
                    >
                        <View
                            style={[
                                styles.iconContainer,
                                { backgroundColor: item.iconBgColor }
                            ]}
                        >
                            <Ionicons name={item.icon as any} size={22} color={item.iconColor} />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.appInfoSection}>
                <Text style={styles.appInfoTitle}>A2Z Couples App</Text>
                <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    contentContainer: {
        padding: 16,
    },
    header: {
        marginBottom: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 6,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#888',
    },
    settingsSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        overflow: 'hidden',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    appInfoSection: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
    appInfoTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        marginBottom: 4,
    },
    appInfoVersion: {
        fontSize: 14,
        color: '#888',
    },
}); 