import { Business } from '@/model/Business';

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
    },
    {
        id: 'bus-c2-1',
        name: 'Soundwave Concert Hall',
        description: 'Intimate concert venue featuring a wide range of musical artists from up-and-coming local bands to international acts in an acoustic-focused space.',
        address: '234 Melody Lane, New York, NY 10020',
        phone: '(212) 555-8901',
        website: 'https://soundwavehall.example.com',
        priceRange: '$$$',
        rating: 4.8,
        hours: 'Shows typically start at 8pm, box office opens at 5pm',
        relatedIdeaIds: ['c2'], // Concert Night
        tags: ['Entertainment', 'Music', 'Night Out']
    },
    {
        id: 'bus-d2-1',
        name: 'Starlight Drive-In Theatre',
        description: 'Classic drive-in movie experience with dual screens showing new releases and cult classics. FM radio sound system and retro snack bar.',
        address: '432 Cinema Road, Jersey City, NJ 07307',
        phone: '(201) 555-9012',
        website: 'https://starlightdrivein.example.com',
        priceRange: '$$',
        rating: 4.6,
        hours: 'Fri-Sun: Opens at 7pm, first showing at sunset',
        relatedIdeaIds: ['d2'], // Drive-in Movie
        tags: ['Entertainment', 'Outdoor', 'Movies']
    },
    {
        id: 'bus-e1-1',
        name: 'Escape Artists',
        description: 'Premium escape room experiences with six unique themed rooms ranging from murder mysteries to sci-fi adventures. Perfect for couples looking for an exciting challenge.',
        address: '567 Puzzle Place, New York, NY 10022',
        phone: '(212) 555-3456',
        website: 'https://escapeartists.example.com',
        priceRange: '$$',
        rating: 4.9,
        hours: 'Mon-Thu: 3pm-10pm, Fri-Sun: 11am-midnight',
        relatedIdeaIds: ['e1'], // Escape Room
        tags: ['Entertainment', 'Indoor', 'Problem Solving']
    },
    {
        id: 'bus-f1-1',
        name: 'Urban Harvest Farmers Market',
        description: 'Weekly farmers market featuring over 50 local vendors selling fresh produce, artisanal foods, crafts, and flowers. Live music and cooking demonstrations.',
        address: '789 Green Street, New York, NY 10023',
        phone: '(212) 555-6789',
        website: 'https://urbanharvest.example.com',
        priceRange: '$',
        rating: 4.7,
        hours: 'Saturdays: 8am-2pm, year-round',
        relatedIdeaIds: ['f1'], // Farmers Market Tour
        tags: ['Food', 'Outdoor', 'Shopping']
    },
    {
        id: 'bus-h1-1',
        name: 'Highland Nature Preserve',
        description: 'Beautiful nature preserve with over 15 miles of hiking trails ranging from easy to challenging. Features waterfalls, scenic overlooks, and diverse wildlife.',
        address: '123 Forest Trail, Tarrytown, NY 10591',
        phone: '(914) 555-1234',
        website: 'https://highlandpreserve.example.com',
        priceRange: '$',
        rating: 4.9,
        hours: 'Daily: Sunrise to sunset',
        relatedIdeaIds: ['h1'], // Hiking Adventure
        tags: ['Outdoor', 'Physical', 'Nature']
    },
    {
        id: 'bus-j1-1',
        name: 'Blue Note Jazz Club',
        description: 'World-famous jazz club featuring top talent in an intimate setting. Full dinner menu and cocktail service available during performances.',
        address: '131 West 3rd Street, New York, NY 10012',
        phone: '(212) 555-3211',
        website: 'https://bluenote.example.com',
        priceRange: '$$$',
        rating: 4.8,
        hours: 'Shows at 8pm and 10:30pm nightly',
        relatedIdeaIds: ['j1'], // Jazz Club Evening
        tags: ['Music', 'Night Out', 'Entertainment']
    },
    {
        id: 'bus-k1-1',
        name: 'Harbor Kayak Adventures',
        description: 'Kayak rentals and guided tours around New York Harbor. See the city skyline and landmarks from a unique water perspective. All skill levels welcome.',
        address: '99 Hudson River Pier, New York, NY 10014',
        phone: '(212) 555-7890',
        website: 'https://harborkayak.example.com',
        priceRange: '$$',
        rating: 4.6,
        hours: 'May-Oct: 9am-7pm daily, weather permitting',
        relatedIdeaIds: ['k1'], // Kayaking Trip
        tags: ['Outdoor', 'Physical', 'Water']
    },
    {
        id: 'bus-l1-1',
        name: 'Tactical Laser Tag',
        description: 'State-of-the-art laser tag facility with multiple themed arenas. Advanced equipment and scoring system make for an immersive experience.',
        address: '450 Combat Lane, Brooklyn, NY 11201',
        phone: '(718) 555-9876',
        website: 'https://tacticallaser.example.com',
        priceRange: '$$',
        rating: 4.7,
        hours: 'Mon-Thu: 4pm-10pm, Fri: 4pm-midnight, Sat: 10am-midnight, Sun: 10am-9pm',
        relatedIdeaIds: ['l1'], // Laser Tag Battle
        tags: ['Entertainment', 'Indoor', 'Active']
    },
    {
        id: 'bus-m1-1',
        name: 'Metropolitan Museum of Modern Art',
        description: 'World-class art museum with extensive collections spanning ancient to contemporary art. Special exhibitions, guided tours, and educational programs available.',
        address: '1000 Fifth Avenue, New York, NY 10028',
        phone: '(212) 555-1000',
        website: 'https://metmuseum.example.com',
        priceRange: '$$',
        rating: 4.9,
        hours: 'Sun-Thu: 10am-5:30pm, Fri-Sat: 10am-9pm',
        relatedIdeaIds: ['m1'], // Museum Exploration
        tags: ['Cultural', 'Educational', 'Indoor']
    },
    {
        id: 'bus-n1-1',
        name: 'Celestial Observatory',
        description: 'Observatory with powerful telescopes and knowledgeable astronomers to guide your stargazing experience. Monthly special events coincide with celestial phenomena.',
        address: '789 Skyview Drive, Montauk, NY 11954',
        phone: '(631) 555-2345',
        website: 'https://celestialobservatory.example.com',
        priceRange: '$$',
        rating: 4.8,
        hours: 'Thu-Sun: Sunset to 11pm, weather permitting',
        relatedIdeaIds: ['n1'], // Night Sky Stargazing
        tags: ['Outdoor', 'Educational', 'Night']
    },
    {
        id: 'bus-p1-1',
        name: 'Clay Creation Studio',
        description: 'Pottery studio offering couples classes in wheel throwing and hand building techniques. Create mugs, bowls, or decorative pieces to take home after firing.',
        address: '234 Artisan Road, New York, NY 10013',
        phone: '(212) 555-6543',
        website: 'https://claycreation.example.com',
        priceRange: '$$',
        rating: 4.7,
        hours: 'Classes: Tue-Sun at 11am, 3pm, and 7pm',
        relatedIdeaIds: ['p1'], // Pottery Class
        tags: ['Creative', 'Educational', 'Indoor']
    },
    {
        id: 'bus-r1-1',
        name: 'Summit Climbing Gym',
        description: 'Indoor rock climbing facility with routes for all skill levels. Features bouldering walls, auto-belay stations, and traditional climbing. Includes expert instruction for beginners.',
        address: '567 Vertical Avenue, Brooklyn, NY 11215',
        phone: '(718) 555-7654',
        website: 'https://summitclimbing.example.com',
        priceRange: '$$',
        rating: 4.8,
        hours: 'Mon-Fri: 10am-11pm, Sat-Sun: 9am-10pm',
        relatedIdeaIds: ['r1'], // Rock Climbing
        tags: ['Physical', 'Indoor', 'Adventure']
    },
    {
        id: 'bus-s1-1',
        name: 'Sunset Point Park',
        description: 'Scenic park with panoramic views of the Hudson River and spectacular sunsets. Features landscaped gardens, walking paths, and comfortable seating areas.',
        address: '100 Riverside Drive, New York, NY 10024',
        phone: '(212) 555-8765',
        website: 'https://sunsetpointpark.example.com',
        priceRange: '$',
        rating: 4.9,
        hours: 'Daily: 6am-1am',
        relatedIdeaIds: ['s1'], // Sunset Watching
        tags: ['Outdoor', 'Romantic', 'Relaxing']
    },
    {
        id: 'bus-t1-1',
        name: 'Broadway Theatre District',
        description: 'Home to world-famous Broadway shows ranging from musical theater to dramatic plays. Pre-theater dining options and cocktail lounges nearby.',
        address: 'Times Square, New York, NY 10036',
        phone: '(212) 555-9876',
        website: 'https://broadwaytheatre.example.com',
        priceRange: '$$$',
        rating: 4.9,
        hours: 'Shows typically at 2pm and 8pm, varies by production',
        relatedIdeaIds: ['t1'], // Theater Show
        tags: ['Entertainment', 'Cultural', 'Night Out']
    },
    {
        id: 'bus-v1-1',
        name: 'VR World NYC',
        description: 'Largest virtual reality entertainment center in North America with over 50 experiences ranging from games to artistic and educational simulations.',
        address: '8 East 34th Street, New York, NY 10016',
        phone: '(212) 555-3210',
        website: 'https://vrworldnyc.example.com',
        priceRange: '$$',
        rating: 4.7,
        hours: 'Sun-Thu: 11am-10pm, Fri-Sat: 11am-midnight',
        relatedIdeaIds: ['v1'], // Virtual Reality Experience
        tags: ['Technology', 'Indoor', 'Entertainment']
    },
    {
        id: 'bus-w1-1',
        name: 'Hudson Valley Wine Tours',
        description: 'Guided tours of award-winning wineries in the Hudson Valley region. Transportation included with tastings at 3-4 wineries and a gourmet lunch stop.',
        address: '123 Vineyard Road, Hudson Valley, NY 12601',
        phone: '(845) 555-4321',
        website: 'https://hudsonvalleywine.example.com',
        priceRange: '$$$',
        rating: 4.8,
        hours: 'Tours depart at 10am, return by 6pm, reservations required',
        relatedIdeaIds: ['w1'], // Wine Tasting Tour
        tags: ['Food', 'Educational', 'Outdoor']
    },
    {
        id: 'bus-y1-1',
        name: 'Tranquil Yoga Studio',
        description: 'Serene yoga studio offering specialized couples yoga workshops. Focus on partner poses that build trust, communication, and connection.',
        address: '432 Zen Street, New York, NY 10011',
        phone: '(212) 555-5432',
        website: 'https://tranquilyoga.example.com',
        priceRange: '$$',
        rating: 4.6,
        hours: 'Couples workshops: Fri 7pm, Sat-Sun 10am and 4pm',
        relatedIdeaIds: ['y1'], // Yoga Class
        tags: ['Physical', 'Wellness', 'Indoor']
    },
    {
        id: 'bus-z1-1',
        name: 'Central Park Zoo',
        description: 'Urban zoo in the heart of Manhattan featuring over 130 species in naturalistic habitats. Special exhibits include tropical rainforest, polar zone, and children\'s zoo.',
        address: '64th Street and Fifth Avenue, New York, NY 10065',
        phone: '(212) 555-6789',
        website: 'https://centralparkzoo.example.com',
        priceRange: '$$',
        rating: 4.7,
        hours: 'Daily: 10am-5pm (Sept-May), 10am-5:30pm (Jun-Aug)',
        relatedIdeaIds: ['z1'], // Zoo Visit
        tags: ['Outdoor', 'Educational', 'Wildlife']
    }
];

export default businesses; 