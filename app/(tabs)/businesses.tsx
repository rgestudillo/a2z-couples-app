import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import { getAllBusinesses, Business } from '../../data/businesses';
import BusinessCard from '../../components/BusinessCard';
import { Ionicons } from '@expo/vector-icons';

export default function BusinessesScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const allBusinesses = getAllBusinesses();

    // Filter businesses based on search term
    const filteredBusinesses = allBusinesses.filter((business: Business) =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name, category, or keyword..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                {searchTerm.length > 0 && (
                    <Ionicons
                        name="close-circle"
                        size={20}
                        color="#666"
                        style={styles.clearIcon}
                        onPress={() => setSearchTerm('')}
                    />
                )}
            </View>

            {filteredBusinesses.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="business" size={60} color="#ccc" />
                    <Text style={styles.emptyText}>No businesses found</Text>
                    <Text style={styles.emptySubtext}>Try a different search term</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredBusinesses}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <BusinessCard business={item} />}
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        marginHorizontal: 16,
        marginVertical: 12,
        borderRadius: 8,
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
    },
    clearIcon: {
        padding: 4,
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
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
        textAlign: 'center',
    },
}); 