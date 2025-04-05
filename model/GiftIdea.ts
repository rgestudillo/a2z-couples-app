export interface GiftIdea {
    id: string;
    title: string;
    letter: string;
    description: string;
    cost: '$' | '$$' | '$$$';
    category: string[];
    occasion: string[];
    image?: string;
}