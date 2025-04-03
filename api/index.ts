// Export everything from each API module
export * from './date';
export * from './gift';
export * from './product';
export * from './business';

// Export the individual modules
import dateIdeas from './date';
import giftIdeas from './gift';
import products from './product';
import businesses from './business';

export {
    dateIdeas,
    giftIdeas,
    products,
    businesses
};

// Export default as an object with all data
export default {
    dateIdeas,
    giftIdeas,
    products,
    businesses
}; 