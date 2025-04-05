import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type SettingItem = {
    title: string;
    subtitle: string;
    icon: string;
    iconColor: string;
    iconBgColor: string;
    route?: string;
    action?: () => void;
};

type SettingSection = {
    title: string;
    items: SettingItem[];
};

export default function SettingsScreen() {
    const settingSections: SettingSection[] = [
        {
            title: 'Partnerships',
            items: [
                {
                    title: 'List Your Business',
                    subtitle: 'Add your venue as a partner location',
                    icon: 'business-outline',
                    iconColor: '#5AC8FA',
                    iconBgColor: '#EEFAFF',
                    route: '/settings/business-partnership',
                },
                {
                    title: 'Feature Your Products',
                    subtitle: 'Showcase your products in our app',
                    icon: 'pricetag-outline',
                    iconColor: '#00CC99',
                    iconBgColor: '#E6FFF8',
                    route: '/settings/product-partnership',
                },
                {
                    title: 'Partnership Benefits',
                    subtitle: 'Learn about partnering with us',
                    icon: 'briefcase-outline',
                    iconColor: '#FF9500',
                    iconBgColor: '#FFF4E5',
                    route: '/settings/partnership-info',
                },
            ],
        },
        {
            title: 'Suggestions',
            items: [
                {
                    title: 'Date Ideas',
                    subtitle: 'Suggest new date ideas for couples',
                    icon: 'heart-outline',
                    iconColor: '#FF3B30',
                    iconBgColor: '#FFECEB',
                    route: '/settings/date-ideas',
                },
                {
                    title: 'Gift Ideas',
                    subtitle: 'Suggest gift ideas for your partner',
                    icon: 'gift-outline',
                    iconColor: '#FF9500',
                    iconBgColor: '#FFF4E5',
                    route: '/settings/gift-ideas',
                },
            ],
        },
        {
            title: 'App Settings',
            items: [
                {
                    title: 'Offline Data Manager',
                    subtitle: 'Manage cached data for offline use',
                    icon: 'cloud-download-outline',
                    iconColor: '#5E72E4',
                    iconBgColor: '#EDF0FD',
                    route: '/settings/data-manager',
                },
                {
                    title: 'Notifications',
                    subtitle: 'Manage how you receive alerts',
                    icon: 'notifications-outline',
                    iconColor: '#FF9500',
                    iconBgColor: '#FFF4E5',
                    route: '/settings/notifications',
                },
                {
                    title: 'Appearance',
                    subtitle: 'Customize app theme and layout',
                    icon: 'color-palette-outline',
                    iconColor: '#6C5CE7',
                    iconBgColor: '#F0EEFF',
                    route: '/settings/appearance',
                },
                {
                    title: 'Privacy & Security',
                    subtitle: 'Manage your data and privacy settings',
                    icon: 'shield-checkmark-outline',
                    iconColor: '#00CC99',
                    iconBgColor: '#E6FFF8',
                    route: '/settings/privacy',
                },
            ],
        },
        {
            title: 'Help & Support',
            items: [
                {
                    title: 'Report a Problem',
                    subtitle: 'Let us know if something isn\'t working',
                    icon: 'bug-outline',
                    iconColor: '#FF3A30',
                    iconBgColor: '#FFECEB',
                    route: '/settings/report-problem',
                },
                {
                    title: 'Request a Feature',
                    subtitle: 'Suggest new features for the app',
                    icon: 'bulb-outline',
                    iconColor: '#FFCC00',
                    iconBgColor: '#FFFBEA',
                    route: '/settings/request-feature',
                },
                {
                    title: 'Help Center',
                    subtitle: 'Frequently asked questions and guides',
                    icon: 'help-circle-outline',
                    iconColor: '#5AC8FA',
                    iconBgColor: '#EEFAFF',
                    route: '/settings/help',
                },
            ],
        },
        {
            title: 'About',
            items: [
                {
                    title: 'Rate the App',
                    subtitle: 'Share your experience with others',
                    icon: 'star-outline',
                    iconColor: '#FF9500',
                    iconBgColor: '#FFF4E5',
                    action: () => Linking.openURL('https://play.google.com/store/apps'),
                },
                {
                    title: 'Terms of Service',
                    subtitle: 'Read our terms and conditions',
                    icon: 'document-text-outline',
                    iconColor: '#8E8E93',
                    iconBgColor: '#F2F2F7',
                    route: '/settings/terms',
                },
                {
                    title: 'Privacy Policy',
                    subtitle: 'Learn how we protect your data',
                    icon: 'lock-closed-outline',
                    iconColor: '#8E8E93',
                    iconBgColor: '#F2F2F7',
                    route: '/settings/privacy-policy',
                },
            ],
        },
    ];

    const handleItemPress = (item: SettingItem) => {
        if (item.route) {
            router.push(item.route as any);
        } else if (item.action) {
            item.action();
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.profileSection}>
                <View style={styles.profileAvatar}>
                    <Ionicons name="person" size={40} color="#fff" />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>John & Jane</Text>
                    <Text style={styles.profileEmail}>Manage your account</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => router.push('/settings/profile' as any)}>
                    <Ionicons name="chevron-forward" size={20} color="#777" />
                </TouchableOpacity>
            </View>

            {settingSections.map((section, sectionIndex) => (
                <View key={sectionIndex} style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>

                    {section.items.map((item, itemIndex) => (
                        <TouchableOpacity
                            key={itemIndex}
                            style={[
                                styles.settingItem,
                                itemIndex === section.items.length - 1 ? styles.lastItem : null
                            ]}
                            onPress={() => handleItemPress(item)}
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
            ))}

            <View style={styles.appInfoSection}>
                <Text style={styles.appInfoTitle}>A2Z Couples App</Text>
                <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => console.log('Logout pressed')}
                >
                    <Ionicons name="log-out-outline" size={18} color="#FF3B30" style={styles.logoutIcon} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
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
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#5E72E4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: '#888',
    },
    editButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 16,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#FFF0F0',
    },
    logoutIcon: {
        marginRight: 8,
    },
    logoutText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: '500',
    },
}); 