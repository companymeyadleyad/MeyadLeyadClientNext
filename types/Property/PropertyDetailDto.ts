export interface PropertyDetailDto {
  cityName: string;
  streetName: string;
  numberOfRoomsName: string;
  floor: number;
  propertySizeInMeters: number;
  isThereOptions: boolean;
  isThereParcking: boolean;
  price: number;
  fullName: string;
  phone: string;
  isMediation: boolean;
  imageColumnSpan: number;
  imageUrl: string | null;
  additionalImages?: string[];
};