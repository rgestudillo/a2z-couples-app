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
import IdeaCard from '@/components/IdeaCard';
import { useIdeas, IdeaType } from '@/context/IdeasContext';
import { BaseIdea } from '@/context/IdeasContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CategorySelector from '@/components/CategorySelector';
import IdentificationCard from '../../components/IdentificationCard';

export default function HomeScreen() {
  const { allIdeas, currentCategory } = useIdeas();
  const ideas = allIdeas[currentCategory];

  // Get 2 random ideas to feature from the current category
  const getRandomIdeas = (count: number) => {
    const shuffled = [...ideas].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const featuredIdeas = getRandomIdeas(2);

  // Navigate to letters tab
  const handleBrowseAllPress = () => {
    router.push('/(tabs)/letters' as any);
  };

  // Navigate to browse tab
  const handleBrowsePress = () => {
    router.push('/(tabs)/browse' as any);
  };

  // Render header section with the alphabet grid
  const renderHeader = () => (
    <>
      {/* Identification Card */}
      <View style={styles.idCardContainer}>
        <IdentificationCard />
      </View>

      {/* Category Selector with simplified design */}
      <CategorySelector />

      {/* Quick Action Buttons in cute card style */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={handleBrowseAllPress}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons name="grid-outline" size={28} color="#FF6B81" />
          </View>
          <Text style={styles.actionTitle}>A to Z</Text>
          <Text style={styles.actionSubtitle}>Browse all ideas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={handleBrowsePress}
        >
          <View style={styles.actionIconContainer}>
            <Ionicons
              name={currentCategory === IdeaType.DATE ? "business-outline" : "pricetag-outline"}
              size={28}
              color="#FF6B81"
            />
          </View>
          <Text style={styles.actionTitle}>
            {currentCategory === IdeaType.DATE ? "Places" : "Gifts"}
          </Text>
          <Text style={styles.actionSubtitle}>
            {currentCategory === IdeaType.DATE ? "Find date spots" : "Shop gifts"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Featured Ideas Section */}
      <View style={styles.featuredContainer}>
        <View style={styles.sectionTitleRow}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="heart" size={20} color="#FF6B81" />
            <Text style={styles.sectionTitle}>For You</Text>
          </View>
          <TouchableOpacity onPress={handleBrowseAllPress}>
            <Text style={styles.viewAllText}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={featuredIdeas}
        keyExtractor={(item: BaseIdea) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <IdeaCard idea={item} type={currentCategory} />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={60} color="#ffb8c6" />
            <Text style={styles.emptyText}>No ideas yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F9', // Soft pink background
  },
  listContent: {
    paddingBottom: 32,
  },
  idCardContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#ffb8c6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF0F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#444',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  featuredContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#444',
    marginLeft: 8,
  },
  viewAllText: {
    color: '#FF6B81',
    fontWeight: '600',
    fontSize: 14,
  },
  cardWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 12,
  },
});
