export interface Business {
    id: string;
    name: string;
    description: string;
    address: string;
    phone?: string;
    website?: string;
    priceRange: '$' | '$$' | '$$$';
    rating: number;
    imageUrl?: string;
    hours?: string;
    relatedIdeaIds: string[];
    tags: string[];
}

