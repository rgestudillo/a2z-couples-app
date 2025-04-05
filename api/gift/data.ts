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
        image: 'https://example.com/chocolate.jpg'
    },
    {
        id: 'gift-4',
        title: 'Decanter Set',
        letter: 'D',
        description: 'Elegant crystal decanter with matching glasses for the whiskey enthusiast.',
        cost: '$$$',
        category: ['Home', 'Luxury'],
        occasion: ['Anniversary', 'Housewarming'],
        image: 'https://example.com/decanter.jpg'
    },
    {
        id: 'gift-5',
        title: 'Essential Oil Diffuser',
        letter: 'E',
        description: 'Aromatherapy diffuser with a set of essential oils for relaxation and wellness.',
        cost: '$$',
        category: ['Wellness', 'Home'],
        occasion: ['Birthday', 'Christmas'],
        image: 'https://example.com/diffuser.jpg'
    },
    {
        id: 'gift-6',
        title: 'Fitness Tracker',
        letter: 'F',
        description: 'Advanced fitness tracker to monitor workouts, heart rate, and sleep patterns.',
        cost: '$$',
        category: ['Technology', 'Fitness'],
        occasion: ['Birthday', 'New Year'],
        image: 'https://example.com/fitness-tracker.jpg'
    },
    {
        id: 'gift-7',
        title: 'Gaming Console',
        letter: 'G',
        description: 'Latest gaming console with immersive gameplay and entertainment features.',
        cost: '$$$',
        category: ['Technology', 'Entertainment'],
        occasion: ['Birthday', 'Christmas'],
        image: 'https://example.com/gaming-console.jpg'
    },
    {
        id: 'gift-8',
        title: 'Headphones',
        letter: 'H',
        description: 'Noise-cancelling headphones with superior sound quality.',
        cost: '$$$',
        category: ['Technology', 'Music'],
        occasion: ['Birthday', 'Graduation'],
        image: 'https://example.com/headphones.jpg'
    },
    {
        id: 'gift-9',
        title: 'Indoor Plant Collection',
        letter: 'I',
        description: 'Set of low-maintenance indoor plants to brighten any space.',
        cost: '$$',
        category: ['Home', 'Nature'],
        occasion: ['Housewarming', 'Thank You'],
        image: 'https://example.com/indoor-plants.jpg'
    },
    {
        id: 'gift-10',
        title: 'Jewelry Box',
        letter: 'J',
        description: 'Handcrafted wooden jewelry box with multiple compartments.',
        cost: '$$',
        category: ['Accessories', 'Storage'],
        occasion: ['Anniversary', 'Birthday'],
        image: 'https://example.com/jewelry-box.jpg'
    },
    {
        id: 'gift-11',
        title: 'Kitchen Gadget Set',
        letter: 'K',
        description: 'Collection of innovative kitchen gadgets for the home chef.',
        cost: '$$',
        category: ['Kitchen', 'Practical'],
        occasion: ['Housewarming', 'Wedding'],
        image: 'https://example.com/kitchen-gadgets.jpg'
    },
    {
        id: 'gift-12',
        title: 'Leather Wallet',
        letter: 'L',
        description: 'Premium leather wallet with RFID protection and multiple card slots.',
        cost: '$$',
        category: ['Accessories', 'Fashion'],
        occasion: ['Birthday', 'Graduation'],
        image: 'https://example.com/leather-wallet.jpg'
    },
    {
        id: 'gift-13',
        title: 'Massage Gun',
        letter: 'M',
        description: 'Therapeutic massage device for muscle recovery and relaxation.',
        cost: '$$$',
        category: ['Wellness', 'Fitness'],
        occasion: ['Birthday', 'Anniversary'],
        image: 'https://example.com/massage-gun.jpg'
    },
    {
        id: 'gift-14',
        title: 'Necklace',
        letter: 'N',
        description: 'Elegant pendant necklace in sterling silver or gold.',
        cost: '$$$',
        category: ['Jewelry', 'Fashion'],
        occasion: ['Anniversary', 'Valentine\'s Day'],
        image: 'https://example.com/necklace.jpg'
    },
    {
        id: 'gift-15',
        title: 'Outdoor Pizza Oven',
        letter: 'O',
        description: 'Portable outdoor pizza oven for authentic, restaurant-quality pizzas at home.',
        cost: '$$$',
        category: ['Kitchen', 'Outdoor'],
        occasion: ['Housewarming', 'Christmas'],
        image: 'https://example.com/pizza-oven.jpg'
    },
    {
        id: 'gift-16',
        title: 'Polaroid Camera',
        letter: 'P',
        description: 'Instant camera that prints photos on the spot for immediate memories.',
        cost: '$$',
        category: ['Technology', 'Photography'],
        occasion: ['Birthday', 'Graduation'],
        image: 'https://example.com/polaroid.jpg'
    },
    {
        id: 'gift-17',
        title: 'Quilt',
        letter: 'Q',
        description: 'Handmade patchwork quilt for warmth and a personalized touch.',
        cost: '$$',
        category: ['Home', 'Handmade'],
        occasion: ['Wedding', 'Housewarming'],
        image: 'https://example.com/quilt.jpg'
    },
    {
        id: 'gift-18',
        title: 'Record Player',
        letter: 'R',
        description: 'Vintage-style record player with modern features for vinyl enthusiasts.',
        cost: '$$$',
        category: ['Music', 'Technology'],
        occasion: ['Birthday', 'Christmas'],
        image: 'https://example.com/record-player.jpg'
    },
    {
        id: 'gift-19',
        title: 'Smartwatch',
        letter: 'S',
        description: 'Multi-functional smartwatch with health tracking and notifications.',
        cost: '$$$',
        category: ['Technology', 'Fitness'],
        occasion: ['Birthday', 'Anniversary'],
        image: 'https://example.com/smartwatch.jpg'
    },
    {
        id: 'gift-20',
        title: 'Travel Backpack',
        letter: 'T',
        description: 'Durable, water-resistant backpack with multiple compartments for travel.',
        cost: '$$',
        category: ['Travel', 'Accessories'],
        occasion: ['Graduation', 'Birthday'],
        image: 'https://example.com/travel-backpack.jpg'
    },
    {
        id: 'gift-21',
        title: 'Umbrella',
        letter: 'U',
        description: 'Windproof, automatic umbrella with a stylish design.',
        cost: '$',
        category: ['Accessories', 'Practical'],
        occasion: ['Housewarming', 'Thank You'],
        image: 'https://example.com/umbrella.jpg'
    },
    {
        id: 'gift-22',
        title: 'Virtual Reality Headset',
        letter: 'V',
        description: 'Immersive VR headset for gaming and interactive experiences.',
        cost: '$$$',
        category: ['Technology', 'Entertainment'],
        occasion: ['Birthday', 'Christmas'],
        image: 'https://example.com/vr-headset.jpg'
    },
    {
        id: 'gift-23',
        title: 'Wireless Earbuds',
        letter: 'W',
        description: 'High-quality wireless earbuds with noise cancellation and long battery life.',
        cost: '$$',
        category: ['Technology', 'Music'],
        occasion: ['Birthday', 'Graduation'],
        image: 'https://example.com/wireless-earbuds.jpg'
    },
    {
        id: 'gift-24',
        title: 'Xbox Gift Card',
        letter: 'X',
        description: 'Digital gift card for games and content on Xbox platforms.',
        cost: '$$',
        category: ['Gaming', 'Digital'],
        occasion: ['Birthday', 'Thank You'],
        image: 'https://example.com/xbox-card.jpg'
    },
    {
        id: 'gift-25',
        title: 'Yoga Mat',
        letter: 'Y',
        description: 'Premium, eco-friendly yoga mat for fitness and wellness.',
        cost: '$',
        category: ['Fitness', 'Wellness'],
        occasion: ['Birthday', 'New Year'],
        image: 'https://example.com/yoga-mat.jpg'
    },
    {
        id: 'gift-26',
        title: 'Zen Garden',
        letter: 'Z',
        description: 'Desktop zen garden for relaxation and stress relief.',
        cost: '$',
        category: ['Wellness', 'Decor'],
        occasion: ['Thank You', 'Housewarming'],
        image: 'https://example.com/zen-garden.jpg'
    }
];

export default giftIdeas; 