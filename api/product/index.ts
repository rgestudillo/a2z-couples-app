import { Product } from '@/model/Product';
import products from './data';

// Helper function to get products related to a specific gift idea
export function getProductsByIdeaId(ideaId: string): Product[] {
    return products.filter(product => product.relatedGiftIds.includes(ideaId));
}

// More specifically named helper function
export function getProductsByGiftId(giftId: string): Product[] {
    return products.filter(product => product.relatedGiftIds.includes(giftId));
}

// Find a product by ID
export function getProductById(id: string): Product | undefined {
    return products.find(product => product.id === id);
}

// Get all products
export function getAllProducts(): Product[] {
    return products;
}

export default products; 