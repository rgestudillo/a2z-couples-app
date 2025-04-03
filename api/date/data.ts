import { DateIdea } from '@/model/DateIdea';

const dateIdeas: DateIdea[] = [
    {
        id: 'a1',
        title: 'Arcade Night',
        letter: 'A',
        description: 'Visit a local arcade and challenge each other to some friendly competition. Try classic games and new releases to see who gets the high score!',
        cost: '$$',
        duration: '2-3 hours',
        category: ['Entertainment', 'Indoor', 'Competitive'],
    },
    {
        id: 'a2',
        title: 'Art Gallery Tour',
        letter: 'A',
        description: 'Explore local art galleries together. Discuss your favorite pieces and learn about different art styles and artists.',
        cost: '$',
        duration: '2-3 hours',
        category: ['Cultural', 'Indoor', 'Educational'],
    },
    {
        id: 'b1',
        title: 'Baking Challenge',
        letter: 'B',
        description: 'Pick a recipe and bake something delicious together. You can even make it a friendly competition!',
        cost: '$',
        duration: '3-4 hours',
        category: ['Food', 'Indoor', 'Creative'],
    },
    {
        id: 'b2',
        title: 'Beach Picnic',
        letter: 'B',
        description: 'Pack some food and drinks and enjoy a relaxing picnic at the beach. Watch the sunset for an extra romantic experience.',
        cost: '$',
        duration: '4-5 hours',
        category: ['Outdoor', 'Food', 'Romantic'],
    },
    {
        id: 'c1',
        title: 'Cooking Class',
        letter: 'C',
        description: 'Take a cooking class together to learn new recipes and techniques. Many venues offer special couples cooking classes.',
        cost: '$$$',
        duration: '3-4 hours',
        category: ['Food', 'Educational', 'Indoor'],
        image: 'https://example.com/cooking-class.jpg'
    },
    {
        id: 'c2',
        title: 'Concert Night',
        letter: 'C',
        description: 'Attend a concert of a band or artist you both enjoy. Live music creates lasting memories and a special shared experience.',
        cost: '$$$',
        duration: '4-5 hours',
        category: ['Entertainment', 'Music', 'Night Out'],
        image: 'https://example.com/concert.jpg'
    },
    {
        id: 'd1',
        title: 'Dance Class',
        letter: 'D',
        description: 'Learn a new dance style together. From salsa to ballroom, dancing is a fun way to connect physically and build trust.',
        cost: '$$',
        duration: '1-2 hours',
        category: ['Physical', 'Educational', 'Indoor'],
        image: 'https://example.com/dance-class.jpg'
    },
    {
        id: 'd2',
        title: 'Drive-in Movie',
        letter: 'D',
        description: 'Experience the nostalgic charm of a drive-in movie. Bring blankets and snacks for a cozy movie night under the stars.',
        cost: '$$',
        duration: '3-4 hours',
        category: ['Entertainment', 'Outdoor', 'Relaxing'],
        image: 'https://example.com/drive-in.jpg'
    },
    {
        id: 'e1',
        title: 'Escape Room',
        letter: 'E',
        description: 'Test your problem-solving skills in an escape room. Work together to solve puzzles and escape before time runs out!',
        cost: '$$',
        duration: '1-2 hours',
        category: ['Entertainment', 'Indoor', 'Problem Solving'],
        image: 'https://example.com/escape-room.jpg'
    },
    {
        id: 'f1',
        title: 'Farmers Market Tour',
        letter: 'F',
        description: 'Visit a local farmers market, sample fresh produce, and pick ingredients to cook a meal together later.',
        cost: '$',
        duration: '2-3 hours',
        category: ['Food', 'Outdoor', 'Shopping'],
        image: 'https://example.com/farmers-market.jpg'
    },
    {
        id: 'g1',
        title: 'Game Night',
        letter: 'G',
        description: 'Stay in for a cozy game night with board games or video games. Add some snacks and drinks for a perfect evening.',
        cost: '$',
        duration: '3-4 hours',
        category: ['Entertainment', 'Indoor', 'Competitive'],
        image: 'https://example.com/game-night.jpg'
    },
    {
        id: 'h1',
        title: 'Hiking Adventure',
        letter: 'H',
        description: 'Explore nature together on a scenic hiking trail. Enjoy fresh air, exercise, and beautiful views.',
        cost: '$',
        duration: '3-5 hours',
        category: ['Outdoor', 'Physical', 'Nature'],
        image: 'https://example.com/hiking.jpg'
    },
    {
        id: 'i1',
        title: 'Ice Cream Tour',
        letter: 'I',
        description: 'Visit several ice cream shops in your area and sample different flavors. Create your own rating system for the ultimate ice cream showdown.',
        cost: '$',
        duration: '2-3 hours',
        category: ['Food', 'Fun', 'Casual'],
        image: 'https://example.com/ice-cream.jpg'
    },
    {
        id: 'j1',
        title: 'Jazz Club Evening',
        letter: 'J',
        description: 'Spend an evening at a jazz club enjoying live music in an intimate setting. Perfect for conversation and connection.',
        cost: '$$',
        duration: '3-4 hours',
        category: ['Music', 'Night Out', 'Romantic'],
        image: 'https://example.com/jazz-club.jpg'
    },
    {
        id: 'k1',
        title: 'Kayaking Trip',
        letter: 'K',
        description: 'Paddle together on a kayaking adventure. Explore waterways, enjoy nature, and work as a team.',
        cost: '$$',
        duration: '2-4 hours',
        category: ['Outdoor', 'Physical', 'Water'],
        image: 'https://example.com/kayaking.jpg'
    },
    {
        id: 'l1',
        title: 'Laser Tag Battle',
        letter: 'L',
        description: 'Challenge each other to a fun-filled laser tag game. Great for releasing stress and friendly competition.',
        cost: '$$',
        duration: '1-2 hours',
        category: ['Entertainment', 'Indoor', 'Active'],
        image: 'https://example.com/laser-tag.jpg'
    },
    {
        id: 'm1',
        title: 'Museum Exploration',
        letter: 'M',
        description: 'Visit a museum and discover new exhibits together. Science, history, art - choose based on your shared interests.',
        cost: '$',
        duration: '2-3 hours',
        category: ['Cultural', 'Educational', 'Indoor'],
        image: 'https://example.com/museum.jpg'
    },
    {
        id: 'n1',
        title: 'Night Sky Stargazing',
        letter: 'N',
        description: 'Find a spot away from city lights to stargaze. Bring a telescope or use a star-identifying app to locate constellations.',
        cost: '$',
        duration: '2-3 hours',
        category: ['Outdoor', 'Romantic', 'Night'],
        image: 'https://example.com/stargazing.jpg'
    },
    {
        id: 'o1',
        title: 'Open Mic Night',
        letter: 'O',
        description: 'Attend an open mic night at a local café or bar. You might discover new talent or even work up the courage to perform together!',
        cost: '$',
        duration: '2-3 hours',
        category: ['Entertainment', 'Night Out', 'Cultural'],
        image: 'https://example.com/open-mic.jpg'
    },
    {
        id: 'p1',
        title: 'Pottery Class',
        letter: 'P',
        description: 'Get creative with clay in a pottery class. Create something beautiful together that you can keep as a memento.',
        cost: '$$',
        duration: '2-3 hours',
        category: ['Creative', 'Educational', 'Indoor'],
        image: 'https://example.com/pottery.jpg'
    },
    {
        id: 'q1',
        title: 'Quiet Reading Date',
        letter: 'Q',
        description: 'Visit a bookstore or library, select books for each other, and spend time reading side by side at a café.',
        cost: '$',
        duration: '2-3 hours',
        category: ['Relaxing', 'Indoor', 'Intellectual'],
        image: 'https://example.com/reading-date.jpg'
    },
    {
        id: 'r1',
        title: 'Rock Climbing',
        letter: 'R',
        description: 'Try indoor rock climbing for an exciting physical challenge that builds trust and communication.',
        cost: '$$',
        duration: '2-3 hours',
        category: ['Physical', 'Indoor', 'Adventure'],
        image: 'https://example.com/rock-climbing.jpg'
    },
    {
        id: 's1',
        title: 'Sunset Watching',
        letter: 'S',
        description: 'Find a scenic spot to watch the sunset together. Bring a blanket, some wine, and enjoy nature\'s show.',
        cost: '$',
        duration: '1-2 hours',
        category: ['Outdoor', 'Romantic', 'Relaxing'],
        image: 'https://example.com/sunset.jpg'
    },
    {
        id: 't1',
        title: 'Theater Show',
        letter: 'T',
        description: 'See a play, musical, or comedy show at a local theater. Discuss the performance over dinner afterward.',
        cost: '$$$',
        duration: '3-4 hours',
        category: ['Entertainment', 'Cultural', 'Night Out'],
        image: 'https://example.com/theater.jpg'
    },
    {
        id: 'u1',
        title: 'Urban Exploration',
        letter: 'U',
        description: 'Be tourists in your own city. Visit landmarks, take photos, and discover hidden gems you\'ve never noticed before.',
        cost: '$',
        duration: '4-6 hours',
        category: ['Outdoor', 'Adventure', 'Cultural'],
        image: 'https://example.com/urban-exploration.jpg'
    },
    {
        id: 'v1',
        title: 'Virtual Reality Experience',
        letter: 'V',
        description: 'Visit a VR arcade and immerse yourselves in virtual worlds. Take turns playing and watching each other\'s reactions.',
        cost: '$$',
        duration: '1-2 hours',
        category: ['Technology', 'Indoor', 'Entertainment'],
        image: 'https://example.com/vr-arcade.jpg'
    },
    {
        id: 'w1',
        title: 'Wine Tasting Tour',
        letter: 'W',
        description: 'Visit a local winery or attend a wine tasting event. Learn about different varieties while enjoying samples.',
        cost: '$$',
        duration: '2-4 hours',
        category: ['Food', 'Educational', 'Sophisticated'],
        image: 'https://example.com/wine-tasting.jpg'
    },
    {
        id: 'y1',
        title: 'Yoga Class',
        letter: 'Y',
        description: 'Take a yoga class together. Many studios offer partner yoga specifically designed for couples.',
        cost: '$$',
        duration: '1-2 hours',
        category: ['Physical', 'Wellness', 'Indoor'],
        image: 'https://example.com/yoga.jpg'
    },
    {
        id: 'z1',
        title: 'Zoo Visit',
        letter: 'Z',
        description: 'Spend the day at the zoo watching animals and learning about wildlife conservation together.',
        cost: '$$',
        duration: '3-5 hours',
        category: ['Outdoor', 'Educational', 'Wildlife'],
        image: 'https://example.com/zoo.jpg'
    }
];

export default dateIdeas; 