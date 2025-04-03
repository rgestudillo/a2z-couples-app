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
    // Add other date ideas here from the original file
];

export default dateIdeas; 