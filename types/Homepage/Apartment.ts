export interface Apartment {
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

export interface Category {
  id: string;
  name: string;
  apartments: Apartment[];
}

export interface HomepageData {
  categories: Category[];
}
