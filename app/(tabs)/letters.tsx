import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AlphabetGrid from '../../components/AlphabetGrid';
import { useIdeas, IdeaType } from '../../context/IdeasContext';
import { Ionicons } from '@expo/vector-icons';

export default function LettersScreen() {
    const { currentCategory, setCurrentCategory } = useIdeas();
    const [activeTab, setActiveTab] = useState<IdeaType>(currentCategory);

    // Debug log
    console.log('LettersScreen - currentCategory:', currentCategory, 'activeTab:', activeTab);

    // Update activeTab when currentCategory changes
    useEffect(() => {
        console.log('LettersScreen - currentCategory changed, updating activeTab');
        setActiveTab(currentCategory);
    }, [currentCategory]);

    const handleTabChange = (tab: IdeaType) => {
        console.log('Changing tab from', activeTab, 'to', tab);
        setActiveTab(tab);
        setCurrentCategory(tab);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === IdeaType.DATE && styles.activeTab]}
                    onPress={() => handleTabChange(IdeaType.DATE)}
                >
                    <Ionicons
                        name="calendar"
                        size={22}
                        color={activeTab === IdeaType.DATE ? '#ff6b6b' : '#666'}
                    />
                    <Text style={[
                        styles.tabText,
                        activeTab === IdeaType.DATE && styles.activeTabText
                    ]}>
                        Date Ideas
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === IdeaType.GIFT && styles.activeTab]}
                    onPress={() => handleTabChange(IdeaType.GIFT)}
                >
                    <Ionicons
                        name="gift"
                        size={22}
                        color={activeTab === IdeaType.GIFT ? '#ff6b6b' : '#666'}
                    />
                    <Text style={[
                        styles.tabText,
                        activeTab === IdeaType.GIFT && styles.activeTabText
                    ]}>
                        Gift Ideas
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <AlphabetGrid />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 12,
        marginBottom: 10,
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
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#ff6b6b',
    },
    tabText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#ff6b6b',
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingTop: 16,
    },
}); 