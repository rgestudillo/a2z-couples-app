import { Product } from '@/model/Product';

// Mock product data
const products: Product[] = [
    {
        id: 'prod-1',
        name: 'Apple Watch Series 7',
        description: 'The latest Apple Watch with advanced health features including blood oxygen monitoring, ECG, and sleep tracking. Water resistant with a larger, always-on Retina display that is easy to read in any light. Available in multiple colors and band options to match your style.',
        price: 399.99,
        priceRange: '$$$',
        rating: 4.8,
        imageUrl: 'https://example.com/apple-watch.jpg',
        affiliateLink: 'https://amazon.com/product/123',
        relatedIdeaIds: ['gift-1'],
        tags: ['Technology', 'Wearables', 'Health']
    },
    {
        id: 'prod-2',
        name: 'Weighted Blanket',
        description: 'Premium weighted blanket for better sleep and relaxation. The gentle pressure helps reduce anxiety and improve sleep quality. Made with high-quality, breathable materials that keep you comfortable all night long. Available in different weights and sizes to suit your needs.',
        price: 89.99,
        priceRange: '$$',
        rating: 4.6,
        imageUrl: 'https://example.com/blanket.jpg',
        affiliateLink: 'https://amazon.com/product/456',
        relatedIdeaIds: ['gift-2'],
        tags: ['Home', 'Comfort', 'Sleep']
    },
    {
        id: 'prod-3',
        name: 'Gourmet Chocolate Box',
        description: 'Assorted gourmet chocolates in an elegant gift box. Perfect for special occasions or as a thoughtful gift. Each chocolate is handcrafted with premium ingredients and presented in a beautiful box suitable for gifting.',
        price: 45.99,
        priceRange: '$$',
        rating: 4.5,
        imageUrl: 'https://example.com/chocolate.jpg',
        affiliateLink: 'https://amazon.com/product/789',
        relatedIdeaIds: ['gift-3'],
        tags: ['Food', 'Sweets', 'Gift']
    }
];

export default products; 