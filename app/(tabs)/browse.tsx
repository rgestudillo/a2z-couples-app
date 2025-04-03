import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { getAllBusinesses } from '@/api/business';
import { Business } from '@/model/Business';
import BusinessCard from '@/components/BusinessCard';
import { Ionicons } from '@expo/vector-icons';
import { useIdeas, IdeaType, GiftIdea } from '@/context/IdeasContext';
import ProductCard from '@/components/ProductCard';

// Mock product data - to be replaced with actual API/data later
const mockProducts = [
    {
        id: 'prod-1',
        name: 'Apple Watch Series 7',
        description: 'The latest Apple Watch with advanced health features',
        price: 399.99,
        priceRange: '$$$' as const,
        rating: 4.8,
        imageUrl: 'https://example.com/apple-watch.jpg',
        affiliateLink: 'https://amazon.com/product/123',
        relatedIdeaIds: ['gift-1'],
        tags: ['Technology', 'Wearables']
    },
    {
        id: 'prod-2',
        name: 'Weighted Blanket',
        description: 'Premium weighted blanket for better sleep and relaxation',
        price: 89.99,
        priceRange: '$$' as const,
        rating: 4.6,
        imageUrl: 'https://example.com/blanket.jpg',
        affiliateLink: 'https://amazon.com/product/456',
        relatedIdeaIds: ['gift-2'],
        tags: ['Home', 'Comfort']
    },
    {
        id: 'prod-3',
        name: 'Gourmet Chocolate Box',
        description: 'Assorted gourmet chocolates in an elegant gift box',
        price: 45.99,
        priceRange: '$$' as const,
        rating: 4.5,
        imageUrl: 'https://example.com/chocolate.jpg',
        affiliateLink: 'https://amazon.com/product/789',
        relatedIdeaIds: ['gift-3'],
        tags: ['Food', 'Sweets']
    }
];

// Define browse sections
enum BrowseSection {
    PLACES = 'places',
    PRODUCTS = 'products'
}

const BrowseScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const allBusinesses = getAllBusinesses();
    const { currentCategory, setCurrentCategory, allIdeas } = useIdeas();
    const [activeSection, setActiveSection] = useState<BrowseSection>(
        currentCategory === IdeaType.DATE ? BrowseSection.PLACES : BrowseSection.PRODUCTS
    );

    // Handle section changes
    const handleSectionChange = (section: BrowseSection) => {
        setActiveSection(section);
        // Update category based on section
        if (section === BrowseSection.PLACES && currentCategory !== IdeaType.DATE) {
            console.log('Setting category to DATE for Places section');
            setCurrentCategory(IdeaType.DATE);
        } else if (section === BrowseSection.PRODUCTS && currentCategory !== IdeaType.GIFT) {
            console.log('Setting category to GIFT for Products section');
            setCurrentCategory(IdeaType.GIFT);
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
    const filteredBusinesses = allBusinesses.filter((business: Business) =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter products based on search term
    const filteredProducts = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render empty state based on active section
    const renderEmptyState = () => {
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
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Browse</Text>
                <Text style={styles.headerSubtitle}>
                    Find {activeSection === BrowseSection.PLACES ? "date spots" : "gift ideas"}
                </Text>
            </View>

            {/* Section Selector */}
            <View style={styles.sectionSelector}>
                <TouchableOpacity
                    style={[
                        styles.sectionTab,
                        activeSection === BrowseSection.PLACES && styles.activePlacesTab
                    ]}
                    onPress={() => handleSectionChange(BrowseSection.PLACES)}
                >
                    <Ionicons
                        name="business-outline"
                        size={22}
                        color={activeSection === BrowseSection.PLACES ? '#fff' : '#666'}
                    />
                    <Text
                        style={[
                            styles.sectionText,
                            activeSection === BrowseSection.PLACES && styles.activeSectionText
                        ]}
                    >
                        Places
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.sectionTab,
                        activeSection === BrowseSection.PRODUCTS && styles.activeProductsTab
                    ]}
                    onPress={() => handleSectionChange(BrowseSection.PRODUCTS)}
                >
                    <Ionicons
                        name="gift-outline"
                        size={22}
                        color={activeSection === BrowseSection.PRODUCTS ? '#fff' : '#666'}
                    />
                    <Text
                        style={[
                            styles.sectionText,
                            activeSection === BrowseSection.PRODUCTS && styles.activeSectionText
                        ]}
                    >
                        Products
                    </Text>
                </TouchableOpacity>
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
                filteredBusinesses.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <FlatList
                        data={filteredBusinesses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <BusinessCard business={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                )
            ) : (
                filteredProducts.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ProductCard product={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
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
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#444',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#888',
    },
    sectionSelector: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 18,
        padding: 4,
        marginHorizontal: 20,
    },
    sectionTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 16,
        flex: 1,
    },
    activePlacesTab: {
        backgroundColor: '#FF6B81',
    },
    activeProductsTab: {
        backgroundColor: '#7986CB',
    },
    sectionText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#555',
        marginLeft: 8,
    },
    activeSectionText: {
        color: '#fff',
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
});

export default BrowseScreen; 