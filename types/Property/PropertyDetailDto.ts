export interface PropertyDetailDto {
  propertyId: number;
  price: number;
  address: string;
  numberOfRoomsName: string;
  propertySizeInMeters: number;
  floor: number;
  isThereParcking: boolean;
  isThereSafeRoom: boolean;
  isThereWarehouse: boolean;
  isMediation: boolean;
  isThereSukaPorch: boolean;
  isThereOptions: boolean;
  isThereLandscape: boolean;
  isTherElevator: boolean;
  isFurnished: boolean;
  isThereAirCondition: boolean;
  fullName: string;
  phone: string;
  // Legacy fields for backward compatibility
  cityName?: string;
  streetName?: string;
  imageColumnSpan?: number;
  imageUrl?: string | null;
  additionalImages?: string[];
};