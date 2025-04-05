# A2Z - The Ultimate A to Z Ideas App

## Overview
A2Z is a React Native mobile application that provides users with ideas organized alphabetically from A to Z across multiple categories. The app aims to be a comprehensive platform where users can discover and record everything from date ideas to gift suggestions. Each category follows the A-Z format to create an engaging and structured browsing experience, with affiliate links to products and businesses where applicable.

## Core Features

### Current Features
- **Alphabetical Browsing**: Browse ideas organized by the letters A-Z
- **Letter Categories**: Tap on any letter to see all ideas starting with that letter
- **Multiple Idea Types**: Currently supports Date Ideas and Gift Ideas, with more categories planned
- **Idea Details**: Each idea includes a title, description, estimated cost, and category
- **Business Recommendations**: View businesses related to each date idea
- **Product Recommendations**: View products related to gift ideas with affiliate links
- **Favorites**: Users can save their favorite ideas across categories
- **Simple UI/UX**: Clean, intuitive interface designed for easy navigation
- **Cross-platform**: Works on both iOS and Android devices

### Categories
1. **Date Ideas**: Creative date suggestions for couples with business recommendations
2. **Gift Ideas**: Gift suggestions with affiliate links to purchase options

### Future Enhancements
- **More A-Z Categories**: Expand to include A-Z meal ideas, activity ideas, etc.
- **User Accounts**: Allow users to create accounts to save preferences
- **Planning Tools**: Calendar integration for planning dates and gift purchases
- **Completed Items**: Track completed date ideas and purchased gifts
- **Custom Ideas**: Allow users to add their own ideas to any category
- **Notifications**: Reminders for planned dates or important gift-giving occasions
- **Location-based Suggestions**: Filter ideas based on location or weather
- **Challenges**: Complete A-Z challenges with rewards/achievements
- **Reviews**: Allow users to rate and review businesses and products
- **Save Favorites**: Let users bookmark businesses and products they want to revisit

## App Architecture

### Navigation Flow
1. **Home Screen**: Displays category selection and A-Z alphabet grid
2. **Category Screen**: Shows selected category (Date Ideas, Gift Ideas, etc.)
3. **Letter Screen**: Shows all ideas for the selected letter within a category
4. **Detail Screen**: Displays full details of the selected idea with related businesses/products
5. **Business/Product Screen**: Shows all businesses/products with search functionality
6. **Business/Product Detail Screen**: Displays detailed information
7. **Favorites Screen**: Shows saved favorite ideas across categories

### Project Structure
```
/app                # Expo Router screens and navigation
  /(tabs)           # Tab-based navigation screens (Home, Categories, Favorites)
  /letter           # Letter-specific screens
  /idea             # Idea detail screens (date, gift, etc.)
  /business         # Business detail screen
  /product          # Product detail screen
/assets             # Images, fonts, static resources
/components         # Reusable UI components
  /ui               # Basic UI components
  AlphabetGrid.tsx  # Grid of A-Z letters
  IdeaCard.tsx      # Card component for various idea types
  BusinessCard.tsx  # Card component for businesses
  ProductCard.tsx   # Card component for products
/context            # React Context for state management
  IdeasContext.tsx  # Context for managing all idea types and favorites
/api                # API layer for data access
  /date             # Date ideas API
    data.ts         # Date ideas dataset
    index.ts        # Date ideas helper functions
  /gift             # Gift ideas API
    data.ts         # Gift ideas dataset
    index.ts        # Gift ideas helper functions
  /business         # Business data API
    data.ts         # Business dataset
    index.ts        # Business helper functions
  /product          # Product data API
    data.ts         # Product dataset
    index.ts        # Product helper functions
  index.ts          # Main API export file
/constants          # App constants, themes, etc.
/hooks              # Custom React hooks
/services           # Services for affiliate link tracking
```

### Key Components
- **AlphabetGrid**: Grid of A-Z letters on category screens
- **IdeaCard**: Card component for each idea (date, gift, etc.)
- **BusinessCard**: Card component for each business
- **ProductCard**: Card component for each product with affiliate link
- **IdeasContext**: Context provider for state management of all idea types

## Technical Requirements

### Development
- React Native for cross-platform mobile development
- Expo Router for screen navigation
- React Context API for state management
- AsyncStorage for local data persistence
- Expo for simplified development and testing
- Affiliate link integration for monetization
- Modular API structure for data management

### Design
- Modern, clean UI with category-specific aesthetics
- Responsive design for various screen sizes
- Accessibility considerations

### API Structure

The application uses a modular API structure to organize and access data:

#### Main API Module
The main API module (`/api/index.ts`) exports all data and helper functions from each category:

```typescript
// Available imports
import { 
  // Date ideas
  dateIdeas, getAllDateIdeas, getDateIdeaById, getDateIdeasByLetter, getDateIdeasByCategory,
  
  // Gift ideas
  giftIdeas, getAllGiftIdeas, getGiftIdeaById, getGiftIdeasByLetter, getGiftIdeasByCategory, getGiftIdeasByOccasion,
  
  // Products
  products, getAllProducts, getProductById, getProductsByIdeaId,
  
  // Businesses
  businesses, getAllBusinesses, getBusinessById, getBusinessesByIdeaId
} from '@/api';
```

#### Date Ideas API
The Date Ideas API (`/api/date/index.ts`) provides functions to access date ideas:

```typescript
// Get all date ideas
const allDateIdeas = getAllDateIdeas();

// Get date ideas by letter
const letterADateIdeas = getDateIdeasByLetter('A');

// Get a specific date idea by ID
const dateIdea = getDateIdeaById('a1');

// Get date ideas by category
const outdoorDateIdeas = getDateIdeasByCategory('Outdoor');
```

#### Gift Ideas API
The Gift Ideas API (`/api/gift/index.ts`) provides functions to access gift ideas:

```typescript
// Get all gift ideas
const allGiftIdeas = getAllGiftIdeas();

// Get gift ideas by letter
const letterBGiftIdeas = getGiftIdeasByLetter('B');

// Get a specific gift idea by ID
const giftIdea = getGiftIdeaById('gift-1');

// Get gift ideas by category
const technologyGifts = getGiftIdeasByCategory('Technology');

// Get gift ideas by occasion
const birthdayGifts = getGiftIdeasByOccasion('Birthday');
```

#### Products API
The Products API (`/api/product/index.ts`) provides functions to access product data:

```typescript
// Get all products
const allProducts = getAllProducts();

// Get a specific product by ID
const product = getProductById('prod-1');

// Get products related to a specific idea
const relatedProducts = getProductsByIdeaId('gift-1');
```

#### Businesses API
The Businesses API (`/api/business/index.ts`) provides functions to access business data:

```typescript
// Get all businesses
const allBusinesses = getAllBusinesses();

// Get a specific business by ID
const business = getBusinessById('bus-a1-1');

// Get businesses related to a specific idea
const relatedBusinesses = getBusinessesByIdeaId('a1');
```

### Data Structures
#### Base Idea Structure
```typescript
interface BaseIdea {
  id: string;
  title: string;
  letter: string;
  description: string;
  cost: '$' | '$$' | '$$$';
  category: string[];
  image?: string;
}
```

#### Date Idea Structure
```typescript
interface DateIdea extends BaseIdea {
  duration: string;
  relatedBusinessIds: string[];
}
```

#### Gift Idea Structure
```typescript
interface GiftIdea extends BaseIdea {
  occasion: string[];
}
```

#### Business Structure
```typescript
interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  priceRange: '$' | '$$' | '$$$';
  rating: number;
  imageUrl?: string;
  hours?: {day: string; hours: string}[] | string;
  relatedIdeaIds: string[];
  tags: string[];
}
```

#### Product Structure
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceRange: '$' | '$$' | '$$$';
  rating: number;
  imageUrl?: string;
  affiliateLink: string;
  relatedGiftIds: string[];
  tags: string[];
}
```

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Run the development server: `npm start` or `yarn start`
4. Use Expo Go app to test on physical devices or use simulators/emulators 