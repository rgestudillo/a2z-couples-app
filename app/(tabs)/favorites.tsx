import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IdeaCard from '../../components/IdeaCard';
import { useIdeas, IdeaType } from '../../context/IdeasContext';

export default function FavoritesScreen() {
    const { getFavoriteIdeas, currentCategory, setCurrentCategory } = useIdeas();
    const [activeTab, setActiveTab] = useState<IdeaType>(currentCategory);

    // Debug log
    console.log('FavoritesScreen - currentCategory:', currentCategory, 'activeTab:', activeTab);

    // Update activeTab when currentCategory changes
    useEffect(() => {
        console.log('FavoritesScreen - currentCategory changed, updating activeTab');
        setActiveTab(currentCategory);
    }, [currentCategory]);

    const favoriteIdeas = getFavoriteIdeas(activeTab);

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={80} color="#ddd" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>
                Save your favorite {activeTab === IdeaType.DATE ? 'date' : 'gift'} ideas by tapping the heart icon on any idea card
            </Text>
        </View>
    );

    const handleTabChange = (tab: IdeaType) => {
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

            {favoriteIdeas.length === 0 ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={favoriteIdeas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <IdeaCard idea={item} type={activeTab} />}
                    contentContainerStyle={styles.listContent}
                />
            )}
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
    listContent: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
}); 