export interface SliderApartment {
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

export interface SliderCategory {
  id: string;
  name: string;
  slug: string;
  apartments: SliderApartment[];
}

export interface SlidersHomepageResponse {
  success: boolean;
  message: string | null;
  data: SliderCategory[];
}
