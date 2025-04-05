import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getAllBusinesses } from '@/api/business';
import { getAllProducts } from '@/api/product';
import { Business } from '@/model/Business';
import { Product } from '@/model/Product';
import BusinessCard from '@/components/BusinessCard';
import { Ionicons } from '@expo/vector-icons';
import { useIdeas, IdeaType } from '@/context/IdeasContext';
import ProductCard from '@/components/ProductCard';
import { useFocusEffect } from 'expo-router';
import CategorySelector from '@/components/CategorySelector';

// Define browse sections
enum BrowseSection {
    PLACES = 'places',
    PRODUCTS = 'products'
}

const BrowseScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currentCategory, refreshIdeas } = useIdeas();
    const [activeSection, setActiveSection] = useState<BrowseSection>(
        currentCategory === IdeaType.DATE ? BrowseSection.PLACES : BrowseSection.PRODUCTS
    );

    // Load data on mount and when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            loadData();
            return () => { };
        }, [])
    );

    // Load data from Firebase
    const loadData = async () => {
        try {
            setIsLoading(true);

            // Refresh the ideas context data
            await refreshIdeas();

            // Load businesses and products
            const businessesData = await getAllBusinesses();
            const productsData = await getAllProducts();

            setBusinesses(businessesData);
            setProducts(productsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Sync activeSection with currentCategory when currentCategory changes externally
    useEffect(() => {
        const newSection = currentCategory === IdeaType.DATE ? BrowseSection.PLACES : BrowseSection.PRODUCTS;
        if (activeSection !== newSection) {
            console.log('Syncing section with category:', currentCategory);
            setActiveSection(newSection);
        }
    }, [currentCategory]);

    // Filter businesses based on search term
    const filteredBusinesses = businesses.filter((business: Business) =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter products based on search term
    const filteredProducts = products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render empty state based on active section
    const renderEmptyState = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={activeSection === BrowseSection.PLACES ? "#FF6B81" : "#7986CB"} />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            );
        }

        const iconName = activeSection === BrowseSection.PLACES ? "business" : "gift";
        const themeColor = activeSection === BrowseSection.PLACES ? "#FF6B81" : "#7986CB";

        return (
            <View style={styles.emptyContainer}>
                <View style={[styles.emptyIconContainer, { backgroundColor: `${themeColor}15` }]}>
                    <Ionicons name={iconName} size={60} color={themeColor} />
                </View>
                <Text style={[styles.emptyText, { color: themeColor }]}>
                    No {activeSection === BrowseSection.PLACES ? "places" : "products"} found
                </Text>
                <Text style={styles.emptySubtext}>Try a different search term</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Category Selector with Places/Products labels */}
            <View style={styles.selectorContainer}>
                <CategorySelector
                    dateLabel="Places"
                    giftLabel="Products"
                    dateIcon="business-outline"
                    giftIcon="gift-outline"
                    containerStyle={styles.categorySelectorStyle}
                />
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Search ${activeSection === BrowseSection.PLACES ? 'places' : 'products'}...`}
                    placeholderTextColor="#aaa"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                {searchTerm.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchTerm('')}>
                        <Ionicons
                            name="close-circle"
                            size={20}
                            color="#999"
                            style={styles.clearIcon}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {activeSection === BrowseSection.PLACES ? (
                isLoading || filteredBusinesses.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <FlatList
                        data={filteredBusinesses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <BusinessCard business={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        onRefresh={loadData}
                        refreshing={isLoading}
                    />
                )
            ) : (
                isLoading || filteredProducts.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ProductCard product={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        onRefresh={loadData}
                        refreshing={isLoading}
                    />
                )
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8F9',
    },
    selectorContainer: {
        paddingTop: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 16,
        height: 48,
        shadowColor: '#ffb8c6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#444',
    },
    clearIcon: {
        padding: 4,
    },
    listContent: {
        padding: 20,
        paddingTop: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    categorySelectorStyle: {
        marginTop: 0,
    },
});

export default BrowseScreen; 