import { PropertyListItem, PropertiesListResponse } from "../types/Property/PropertiesListResponse";

// Server-side categories service for use in server components
export class ServerCategoriesService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  }

  async getPropertiesListByCategory(categorySlug: string): Promise<PropertyListItem[] | null> {
    const endpoint = `${this.baseUrl}/Categories/get-properties-list-by-category?CategorySlug=${categorySlug}`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control for better performance
        next: { revalidate: 3600 } // Revalidate every hour
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PropertiesListResponse = await response.json();
      
      if (data.success && data.data) {
        return data.data;
      }
      
      return null;
    } catch (error: unknown) {
      console.error("Error fetching properties list by category:", error);
      return null;
    }
  }
}

// Export singleton instance
export const serverCategoriesService = new ServerCategoriesService();
