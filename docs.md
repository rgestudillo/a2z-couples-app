# A2Z - Couples Dating Ideas App

## Overview
A2Z is a React Native mobile application that provides couples with dating ideas organized alphabetically from A to Z. The app aims to inspire couples with creative date ideas and activities to keep their relationship fresh and exciting. It also includes business recommendations related to date ideas to help couples find the perfect places to bring their date ideas to life.

## Core Features

### MVP (Minimum Viable Product)
- **Alphabetical Browsing**: Browse date ideas organized by the letters A-Z
- **Letter Categories**: Tap on any letter to see all date ideas starting with that letter
- **Idea Details**: Each dating idea includes a title, description, estimated cost, duration, and category
- **Business Recommendations**: View businesses related to each date idea
- **Business Details**: See detailed information about businesses including ratings, contact info, and hours
- **Favorites**: Users can save their favorite date ideas
- **Simple UI/UX**: Clean, intuitive interface designed for couples
- **Cross-platform**: Works on both iOS and Android devices

### Future Enhancements
- **User Accounts**: Allow couples to create shared accounts
- **Date Planner**: Calendar integration for planning dates
- **Completed Dates**: Track completed date ideas
- **Custom Ideas**: Allow users to add their own date ideas
- **Notifications**: Reminders for planned dates
- **Location-based Suggestions**: Filter ideas based on location or weather
- **Challenges**: Complete A-Z date challenges with rewards/achievements
- **Business Reviews**: Allow users to rate and review businesses
- **Save Favorite Businesses**: Let users bookmark businesses they want to visit

## App Architecture

### Navigation Flow
1. **Home Screen**: Displays A-Z alphabet grid and featured ideas
2. **Letter Screen**: Shows all date ideas for the selected letter
3. **Detail Screen**: Displays full details of the selected date idea with related businesses
4. **Business Screen**: Shows all businesses with search functionality
5. **Business Detail Screen**: Displays detailed information about a specific business
6. **Favorites Screen**: Shows saved favorite date ideas

### Project Structure
```
/app                # Expo Router screens and navigation
  /(tabs)           # Tab-based navigation screens (Home, Letters, Businesses, Favorites)
  /letter           # Letter-specific screens
  /idea             # Idea detail screen
  /business         # Business detail screen
/assets             # Images, fonts, static resources
/components         # Reusable UI components
  /ui               # Basic UI components
  AlphabetGrid.tsx  # Grid of A-Z letters
  IdeaCard.tsx      # Card component for date ideas
  BusinessCard.tsx  # Card component for businesses
/context            # React Context for state management
  DateIdeasContext.tsx # Context for managing date ideas and favorites
/data               # Local data
  dateIdeas.ts      # Date ideas dataset
  businesses.ts     # Business data related to date ideas
/constants          # App constants, themes, etc.
/hooks              # Custom React hooks
```

### Key Components
- **AlphabetGrid**: Grid of A-Z letters on the home screen
- **IdeaCard**: Card component for each date idea
- **BusinessCard**: Card component for each business
- **DateIdeasContext**: Context provider for state management

## Technical Requirements

### Development
- React Native for cross-platform mobile development
- Expo Router for screen navigation
- React Context API for state management
- AsyncStorage for local data persistence
- Expo for simplified development and testing

### Design
- Modern, clean UI with a romantic/fun aesthetic
- Responsive design for various screen sizes
- Accessibility considerations

### Data Structures
#### Date Ideas Structure
```typescript
interface DateIdea {
  id: string;
  title: string;
  letter: string;
  description: string;
  cost: '$' | '$$' | '$$$';
  duration: string;
  category: string[];
  image?: string;
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

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Run the development server: `npm start` or `yarn start`
4. Use Expo Go app to test on physical devices or use simulators/emulators 