export interface PropertyListItem {
  id: string;
  title: string;
  image: string;
  rooms: number;
  floor: number;
  meters: number;
  price: number;
  location: string;
  category: string;
}

export interface PropertiesListResponse {
  success: boolean;
  message: string | null;
  data: PropertyListItem[];
}
