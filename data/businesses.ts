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

// Sample business data
const businesses: Business[] = [
    {
        id: 'bus-a1-1',
        name: 'GameTime Arcade',
        description: 'A retro arcade with classic games and modern favorites. Perfect for a fun date night with competitive gameplay and nostalgic vibes.',
        address: '123 Entertainment Blvd, New York, NY 10001',
        phone: '(212) 555-1234',
        website: 'https://gametimearcade.example.com',
        priceRange: '$$',
        rating: 4.5,
        hours: 'Mon-Thu: 12pm-11pm, Fri-Sat: 12pm-1am, Sun: 12pm-10pm',
        relatedIdeaIds: ['a1'], // Arcade Night
        tags: ['Entertainment', 'Indoor', 'Games']
    },
    {
        id: 'bus-a1-2',
        name: 'Level Up Gaming Lounge',
        description: 'Modern arcade with VR experiences, console gaming stations, and classic arcade cabinets. Serves craft beer and gourmet snacks.',
        address: '456 Player One Street, New York, NY 10003',
        phone: '(212) 555-5678',
        website: 'https://levelupgaming.example.com',
        priceRange: '$$',
        rating: 4.7,
        hours: 'Daily: 2pm-2am',
        relatedIdeaIds: ['a1'], // Arcade Night
        tags: ['Entertainment', 'Indoor', 'Games', 'Food']
    },
    {
        id: 'bus-a2-1',
        name: 'Metropolitan Art Gallery',
        description: 'Contemporary art gallery featuring rotating exhibitions from local and international artists. Free guided tours available on weekends.',
        address: '789 Culture Avenue, New York, NY 10012',
        phone: '(212) 555-9012',
        website: 'https://metroart.example.com',
        priceRange: '$',
        rating: 4.8,
        hours: 'Tue-Sun: 10am-6pm, Closed Mondays',
        relatedIdeaIds: ['a2'], // Art Gallery Tour
        tags: ['Cultural', 'Indoor', 'Educational']
    },
    {
        id: 'bus-a2-2',
        name: 'The Modern Perspective',
        description: 'Boutique gallery specializing in emerging artists and experimental media. Hosts monthly opening receptions with complimentary wine.',
        address: '321 Artistic Lane, New York, NY 10014',
        phone: '(212) 555-3456',
        website: 'https://modernperspective.example.com',
        priceRange: '$',
        rating: 4.6,
        hours: 'Wed-Sun: 11am-7pm, Closed Mon-Tue',
        relatedIdeaIds: ['a2'], // Art Gallery Tour
        tags: ['Cultural', 'Indoor', 'Educational']
    },
    {
        id: 'bus-b1-1',
        name: 'Sweet Creations Baking Studio',
        description: 'Hands-on baking classes for couples. Learn to make everything from French pastries to artisanal bread in a fun, supportive environment.',
        address: '543 Sugar Street, New York, NY 10016',
        phone: '(212) 555-7890',
        website: 'https://sweetcreations.example.com',
        priceRange: '$$',
        rating: 4.9,
        hours: 'Classes by appointment: Tue-Sun 10am-8pm',
        relatedIdeaIds: ['b1'], // Baking Challenge
        tags: ['Food', 'Indoor', 'Creative', 'Educational']
    },
    {
        id: 'bus-c1-1',
        name: 'Culinary Couples',
        description: 'Cooking school specializing in couples classes. Learn international cuisines and techniques from professional chefs in a romantic setting.',
        address: '678 Gourmet Way, New York, NY 10018',
        phone: '(212) 555-2345',
        website: 'https://culinarycouples.example.com',
        priceRange: '$$$',
        rating: 4.8,
        hours: 'Classes available Thu-Sun: 6pm-9pm',
        relatedIdeaIds: ['c1'], // Cooking Class
        tags: ['Food', 'Educational', 'Indoor', 'Date Night']
    },
    {
        id: 'bus-d1-1',
        name: 'Rhythm & Move Dance Studio',
        description: 'Couples dance classes in various styles including salsa, ballroom, and swing. No experience necessary - perfect for beginners!',
        address: '987 Dancer Drive, New York, NY 10019',
        phone: '(212) 555-6789',
        website: 'https://rhythmandmove.example.com',
        priceRange: '$$',
        rating: 4.7,
        hours: 'Mon-Fri: 4pm-10pm, Sat-Sun: 10am-6pm',
        relatedIdeaIds: ['d1'], // Dance Class
        tags: ['Physical', 'Educational', 'Indoor']
    }
];

// Helper function to get businesses related to a specific idea
export function getBusinessesByIdeaId(ideaId: string): Business[] {
    return businesses.filter(business => business.relatedIdeaIds.includes(ideaId));
}

// Helper function to get a specific business by ID
export function getBusinessById(id: string): Business | undefined {
    return businesses.find(business => business.id === id);
}

export function getAllBusinesses(): Business[] {
    return businesses;
}

export default businesses; 