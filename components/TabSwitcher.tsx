import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TabOption = {
    key: string;
    label: string;
    icon: string;
    activeColor?: string;
    inactiveColor?: string;
};

interface TabSwitcherProps {
    tabs: TabOption[];
    activeTab: string;
    onTabChange: (tabKey: string) => void;
    styleType?: 'underline' | 'filled';
    containerStyle?: any;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
    tabs,
    activeTab,
    onTabChange,
    styleType = 'underline',
    containerStyle,
}) => {
    return (
        <View style={[styles.tabsContainer, containerStyle]}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                const activeColor = tab.activeColor || '#ff6b6b';
                const inactiveColor = tab.inactiveColor || '#666';

                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={[
                            styles.tab,
                            styleType === 'underline' && { borderBottomWidth: 2, borderBottomColor: isActive ? activeColor : 'transparent' },
                            styleType === 'filled' && {
                                backgroundColor: isActive ? activeColor : 'transparent',
                                borderRadius: 18,
                            },
                        ]}
                        onPress={() => onTabChange(tab.key)}
                    >
                        <Ionicons
                            name={tab.icon as any}
                            size={22}
                            color={isActive ? (styleType === 'filled' ? '#fff' : activeColor) : inactiveColor}
                        />
                        <Text
                            style={[
                                styles.tabText,
                                isActive && styleType === 'underline' && { color: activeColor, fontWeight: '600' },
                                isActive && styleType === 'filled' && { color: '#fff', fontWeight: '600' },
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    tabText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
});

export default TabSwitcher; 