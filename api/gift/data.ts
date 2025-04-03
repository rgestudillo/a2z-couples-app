import { GiftIdea } from '@/model/GiftIdea';

// Gift ideas data
const giftIdeas: GiftIdea[] = [
    {
        id: 'gift-1',
        title: 'Apple Watch',
        letter: 'A',
        description: 'A premium smartwatch that makes a perfect gift for tech lovers.',
        cost: '$$$',
        category: ['Technology', 'Wearables'],
        occasion: ['Birthday', 'Anniversary'],
        relatedProductIds: ['prod-1'],
        image: 'https://example.com/apple-watch.jpg'
    },
    {
        id: 'gift-2',
        title: 'Blanket',
        letter: 'B',
        description: 'A cozy weighted blanket for comfort and relaxation.',
        cost: '$$',
        category: ['Home', 'Comfort'],
        occasion: ['Christmas', 'Housewarming'],
        relatedProductIds: ['prod-2'],
        image: 'https://example.com/blanket.jpg'
    },
    {
        id: 'gift-3',
        title: 'Chocolate Box',
        letter: 'C',
        description: 'Assorted gourmet chocolates in an elegant gift box.',
        cost: '$$',
        category: ['Food', 'Sweets'],
        occasion: ['Valentine\'s Day', 'Thank You'],
        relatedProductIds: ['prod-3'],
        image: 'https://example.com/chocolate.jpg'
    }
];

export default giftIdeas; 