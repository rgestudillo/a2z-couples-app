import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getBusinessById } from '@/api/business';
import { Business } from '@/model/Business';
import RefreshableScrollView from '@/components/RefreshableScrollView';
import { showNetworkRequiredMessage } from '@/utils/showOfflineToast';

export default function BusinessDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [business, setBusiness] = useState<Business | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBusiness = async () => {
        if (!id) {
            setError("Missing business ID");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const businessData = await getBusinessById(id);
            setBusiness(businessData);
            console.log("businessData", businessData);
            if (!businessData) {
                setError("Business not found");
            } else {
                setError(null);
            }
        } catch (err) {
            console.error("Error fetching business:", err);
            setError("Failed to load business details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusiness();
    }, [id]);

    const handleRefreshComplete = (success: boolean) => {
        if (success) {
            fetchBusiness();
        }
    };

    const handleCallPress = () => {
        if (business?.phone) {
            Linking.openURL(`tel:${business.phone}`);
        }
    };

    const handleWebsitePress = async () => {
        if (!business?.website) return;

        // Check network before opening external link
        const canProceed = await showNetworkRequiredMessage("Opening website");
        if (canProceed) {
            Linking.openURL(business.website);
        }
    };

    // Function to display rating as stars
    const renderRatingStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <View style={styles.ratingContainer}>
                {[...Array(fullStars)].map((_, i) => (
                    <Ionicons key={`full-${i}`} name="star" size={20} color="#FFD700" />
                ))}
                {halfStar && <Ionicons name="star-half" size={20} color="#FFD700" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Ionicons key={`empty-${i}`} name="star-outline" size={20} color="#FFD700" />
                ))}
                <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
        );
    };

    // Loading state
    if (loading) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#FF6B81" />
                <Text style={styles.loadingText}>Loading business details...</Text>
            </SafeAreaView>
        );
    }

    // Error state
    if (error || !business) {
        return (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
                <Ionicons name="alert-circle-outline" size={48} color="#FF3B30" />
                <Text style={styles.errorText}>{error || "Business not found"}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={fetchBusiness}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    // Prepare hours data for FlatList if it exists
    const hoursData = Array.isArray(business.hours) ? business.hours : [];

    // Render the main content as a header
    const renderHeader = () => (
        <>
            {business.imageUrl && (
                <Image
                    source={{ uri: business.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            <View style={styles.headerContainer}>
                <Text style={styles.title}>{business.name}</Text>
                <Text style={styles.priceRange}>{business.priceRange}</Text>
            </View>

            {renderRatingStars(business.rating)}

            <Text style={styles.description}>{business.description}</Text>

            <View style={styles.tagsContainer}>
                {business.tags?.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                )) || null}
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                    <Ionicons name="location-outline" size={24} color="#666" />
                    <Text style={styles.infoText}>{business.address}</Text>
                </View>

                {business.phone && (
                    <TouchableOpacity style={styles.infoItem} onPress={handleCallPress}>
                        <Ionicons name="call-outline" size={24} color="#666" />
                        <Text style={[styles.infoText, styles.linkText]}>{business.phone}</Text>
                    </TouchableOpacity>
                )}

                {business.website && (
                    <TouchableOpacity style={styles.infoItem} onPress={handleWebsitePress}>
                        <Ionicons name="globe-outline" size={24} color="#666" />
                        <Text style={[styles.infoText, styles.linkText]} numberOfLines={1}>
                            {business.website}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {hoursData.length > 0 && (
                <View style={styles.hoursHeaderContainer}>
                    <Text style={styles.sectionTitle}>Opening Hours</Text>
                </View>
            )}
        </>
    );

    // Render each hour item
    const renderHourItem = ({ item }: { item: { day: string; hours: string } }) => (
        <View style={styles.hourItem}>
            <Text style={styles.dayText}>{item.day}</Text>
            <Text style={styles.timeText}>{item.hours}</Text>
        </View>
    );

    // Render footer (empty to provide spacing)
    const renderFooter = () => <View style={styles.footer} />;

    return (
        <>
            <Stack.Screen
                options={{
                    title: business.name,
                }}
            />

            <SafeAreaView style={styles.container}>
                {hoursData.length > 0 ? (
                    <FlatList
                        data={hoursData}
                        keyExtractor={(item, index) => `hour-${index}`}
                        renderItem={renderHourItem}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                        contentContainerStyle={styles.content}
                        refreshControl={
                            <RefreshableScrollView
                                onRefreshComplete={handleRefreshComplete}
                            />
                        }
                    />
                ) : (
                    <FlatList
                        data={[]}
                        keyExtractor={() => "empty"}
                        renderItem={() => null}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                        contentContainerStyle={styles.content}
                        refreshControl={
                            <RefreshableScrollView
                                onRefreshComplete={handleRefreshComplete}
                            />
                        }
                    />
                )}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        marginTop: 12,
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 12,
    },
    retryButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FF6B81',
        borderRadius: 6,
    },
    retryButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    content: {
        padding: 0,
    },
    image: {
        width: '100%',
        height: 240,
        marginBottom: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
        flex: 1,
    },
    priceRange: {
        fontSize: 20,
        color: '#666',
        fontWeight: '500',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    ratingText: {
        marginLeft: 6,
        fontSize: 16,
        color: '#666',
    },
    description: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    tag: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 14,
        color: '#666',
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        margin: 20,
        marginTop: 0,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 16,
        color: '#444',
        marginLeft: 12,
        flex: 1,
    },
    linkText: {
        color: '#5a67d8',
    },
    hoursHeaderContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        paddingBottom: 8,
        margin: 20,
        marginTop: 0,
        marginBottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    hourItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    dayText: {
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
    },
    timeText: {
        fontSize: 16,
        color: '#666',
    },
    footer: {
        height: 24,
    },
}); 