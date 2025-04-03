import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AlphabetGridCompact from '../../components/AlphabetGridCompact';
import IdeaCard from '../../components/IdeaCard';
import { useDateIdeas } from '../../context/DateIdeasContext';
import { DateIdea } from '../../data/dateIdeas';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { allIdeas } = useDateIdeas();

  // Get 5 random date ideas to feature
  const getRandomIdeas = (count: number) => {
    const shuffled = [...allIdeas].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const featuredIdeas = getRandomIdeas(5);

  // Navigate to letters tab
  const handleBrowseAllPress = () => {
    router.push('/(tabs)/letters' as any);
  };

  // Navigate to businesses page
  const handleExploreBusinessesPress = () => {
    router.push('/(tabs)/businesses' as any);
  };

  // Render header section with the alphabet grid
  const renderHeader = () => (
    <>
      {/* Hero Section with Gradient */}
      <LinearGradient
        colors={['#ff6b6b', '#ff8e8e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroSection}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Find Your Next Date</Text>
          <Text style={styles.subheader}>Browse ideas from A to Z and discover local date spots</Text>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleBrowseAllPress}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons name="grid-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionText}>All Letters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleExploreBusinessesPress}
        >
          <View style={[styles.actionIconContainer, { backgroundColor: '#5a67d8' }]}>
            <Ionicons name="business-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.actionText}>Date Spots</Text>
        </TouchableOpacity>
      </View>

      {/* Browse by Letter Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Popular Letters</Text>
            <Text style={styles.sectionDescription}>
              Quick access to date ideas
            </Text>
          </View>
          <TouchableOpacity onPress={handleBrowseAllPress}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <AlphabetGridCompact />
      </View>

      <View style={styles.divider} />

      {/* Featured Ideas Section */}
      <View style={styles.featuredContainer}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.featuredTitleContainer}>
            <Ionicons name="star" size={24} color="#ff6b6b" />
            <Text style={styles.featuredTitle}>Featured Ideas</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/letters' as any)}>
            <Text style={styles.viewAllText}>More Ideas</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.featuredSubtitle}>
          Feeling spontaneous? Try one of these
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={featuredIdeas}
        keyExtractor={(item: DateIdea) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <IdeaCard idea={item} />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    paddingBottom: 32,
  },
  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContainer: {
    marginBottom: 8,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subheader: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -30,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  actionIconContainer: {
    backgroundColor: '#ff6b6b',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#777',
  },
  viewAllText: {
    color: '#ff6b6b',
    fontWeight: '600',
    fontSize: 14,
  },
  divider: {
    height: 8,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  featuredContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 16,
  },
  featuredTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
    marginBottom: 16,
  },
  cardWrapper: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
});
