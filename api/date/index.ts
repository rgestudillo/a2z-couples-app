import { DateIdea } from '@/model/DateIdea';
import dateIdeas from './data';

// Helper function to get date ideas by letter
export function getDateIdeasByLetter(letter: string): DateIdea[] {
    return dateIdeas.filter(idea => idea.letter.toUpperCase() === letter.toUpperCase());
}

// Helper function to get a specific date idea by ID
export function getDateIdeaById(id: string): DateIdea | undefined {
    return dateIdeas.find(idea => idea.id === id);
}

// Helper function to get date ideas by category
export function getDateIdeasByCategory(category: string): DateIdea[] {
    return dateIdeas.filter(idea => idea.category.includes(category));
}

// Get all date ideas
export function getAllDateIdeas(): DateIdea[] {
    return dateIdeas;
}

export default dateIdeas; 