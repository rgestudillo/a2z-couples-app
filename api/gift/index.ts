import { GiftIdea } from '@/model/GiftIdea';
import giftIdeas from './data';

// Helper function to get gift ideas by letter
export function getGiftIdeasByLetter(letter: string): GiftIdea[] {
    return giftIdeas.filter(idea => idea.letter.toUpperCase() === letter.toUpperCase());
}

// Helper function to get a specific gift idea by ID
export function getGiftIdeaById(id: string): GiftIdea | undefined {
    return giftIdeas.find(idea => idea.id === id);
}

// Helper function to get gift ideas by category
export function getGiftIdeasByCategory(category: string): GiftIdea[] {
    return giftIdeas.filter(idea => idea.category.includes(category));
}

// Helper function to get gift ideas by occasion
export function getGiftIdeasByOccasion(occasion: string): GiftIdea[] {
    return giftIdeas.filter(idea => idea.occasion.includes(occasion));
}

// Get all gift ideas
export function getAllGiftIdeas(): GiftIdea[] {
    return giftIdeas;
}

export default giftIdeas; 