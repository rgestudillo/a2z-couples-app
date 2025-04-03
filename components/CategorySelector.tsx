import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IdeaType, useIdeas } from '@/context/IdeasContext';

const CategorySelector: React.FC = () => {
    const { currentCategory, setCurrentCategory } = useIdeas();

    console.log('CategorySelector rendering with category:', currentCategory);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Choose your adventure</Text>
            <View style={styles.categoryContainer}>
                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        currentCategory === IdeaType.DATE && styles.activeDateButton
                    ]}
                    onPress={() => {
                        console.log('CategorySelector: Setting to DATE');
                        setCurrentCategory(IdeaType.DATE);
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="heart"
                            size={24}
                            color={currentCategory === IdeaType.DATE ? '#fff' : '#FF6B81'}
                        />
                    </View>
                    <Text
                        style={[
                            styles.categoryText,
                            currentCategory === IdeaType.DATE && styles.activeCategoryText
                        ]}
                    >
                        Date Ideas
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.categoryButton,
                        currentCategory === IdeaType.GIFT && styles.activeGiftButton
                    ]}
                    onPress={() => {
                        console.log('CategorySelector: Setting to GIFT');
                        setCurrentCategory(IdeaType.GIFT);
                    }}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="gift"
                            size={24}
                            color={currentCategory === IdeaType.GIFT ? '#fff' : '#7986CB'}
                        />
                    </View>
                    <Text
                        style={[
                            styles.categoryText,
                            currentCategory === IdeaType.GIFT && styles.activeCategoryText
                        ]}
                    >
                        Gift Ideas
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    heading: {
        fontSize: 17,
        fontWeight: '600',
        color: '#666',
        marginBottom: 12,
        textAlign: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        padding: 4,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 18,
        flex: 1,
        justifyContent: 'center',
    },
    activeDateButton: {
        backgroundColor: '#FF6B81',
    },
    activeGiftButton: {
        backgroundColor: '#7986CB',
    },
    iconContainer: {
        marginRight: 8,
    },
    categoryText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#555',
    },
    activeCategoryText: {
        color: '#fff',
    },
});

export default CategorySelector; 