import { Business } from '@/model/Business';
import businesses from './data';

// Helper function to get businesses related to a specific idea
export function getBusinessesByIdeaId(ideaId: string): Business[] {
    return businesses.filter(business => business.relatedIdeaIds.includes(ideaId));
}

// Helper function to get a specific business by ID
export function getBusinessById(id: string): Business | undefined {
    return businesses.find(business => business.id === id);
}

// Get all businesses
export function getAllBusinesses(): Business[] {
    return businesses;
}

export default businesses; 