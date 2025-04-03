import { Product } from '@/model/Product';
import products from './data';

// Helper function to get products related to a specific idea
export function getProductsByIdeaId(ideaId: string): Product[] {
    return products.filter(product => product.relatedIdeaIds.includes(ideaId));
}

// Helper function to get a specific product by ID
export function getProductById(id: string): Product | undefined {
    return products.find(product => product.id === id);
}

// Get all products
export function getAllProducts(): Product[] {
    return products;
}

export default products; 