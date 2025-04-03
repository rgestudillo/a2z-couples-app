export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    priceRange: '$' | '$$' | '$$$';
    rating: number;
    imageUrl: string;
    affiliateLink: string;
    relatedIdeaIds: string[];
    tags: string[];
}
