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
/data               # Local data
  dateIdeas.ts      # Date ideas dataset
  giftIdeas.ts      # Gift ideas dataset
  businesses.ts     # Business data related to date ideas
  products.ts       # Product data related to gift ideas with affiliate links
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

### Design
- Modern, clean UI with category-specific aesthetics
- Responsive design for various screen sizes
- Accessibility considerations

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
  relatedProductIds: string[];
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
  relatedIdeaIds: string[];
  tags: string[];
}
```

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Run the development server: `npm start` or `yarn start`
4. Use Expo Go app to test on physical devices or use simulators/emulators 