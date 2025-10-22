import { PropertyDetailDto } from "../types/Property/PropertyDetailDto";

// Server-side property service for use in server components
export class ServerPropertyService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  }

  async getPropertyById(id: string): Promise<PropertyDetailDto | null> {
    const endpoint = `${this.baseUrl}/Properties/get-property-details?PropertyId=${id}`;
    
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

      const data = await response.json();
      
      if (data.success && data.data) {
        return data.data;
      }
      
      return null;
    } catch (error: unknown) {
      console.error("Error fetching property details:", error);
      // Return mock data as fallback
      return this.getMockPropertyById(id);
    }
  }

  private getMockPropertyById(id: string): PropertyDetailDto | null {
    // Import mock data dynamically to avoid client-side code in server
    const mockData: Record<string, PropertyDetailDto> = {
      "apt-1": {
        propertyId: 20001,
        price: 1200000,
        address: "בית שמש רב המנונא",
        numberOfRoomsName: "3",
        propertySizeInMeters: 85,
        floor: 5,
        isThereParcking: true,
        isThereSafeRoom: true,
        isThereWarehouse: false,
        isMediation: true,
        isThereSukaPorch: true,
        isThereOptions: true,
        isThereLandscape: false,
        isTherElevator: true,
        isFurnished: false,
        isThereAirCondition: true,
        fullName: "שושן אברגל",
        phone: "050-1234567",
        cityName: "בית שמש",
        streetName: "רב המנונא",
        imageColumnSpan: 1,
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        additionalImages: []
      },
      "apt-2": {
        propertyId: 20002,
        price: 1350000,
        address: "בית שמש רב המנונא",
        numberOfRoomsName: "3",
        propertySizeInMeters: 90,
        floor: 3,
        isThereParcking: true,
        isThereSafeRoom: false,
        isThereWarehouse: true,
        isMediation: false,
        isThereSukaPorch: false,
        isThereOptions: false,
        isThereLandscape: true,
        isTherElevator: false,
        isFurnished: true,
        isThereAirCondition: false,
        fullName: "דוד כהן",
        phone: "052-9876543",
        cityName: "בית שמש",
        streetName: "רב המנונא",
        imageColumnSpan: 1,
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
        additionalImages: []
      }
    };

    return mockData[id] || null;
  }
}

// Export singleton instance
export const serverPropertyService = new ServerPropertyService();
