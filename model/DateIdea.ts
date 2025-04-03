export interface DateIdea {
    id: string;
    title: string;
    letter: string;
    description: string;
    cost: '$' | '$$' | '$$$';
    duration: string;
    category: string[];
    image?: string;
}
