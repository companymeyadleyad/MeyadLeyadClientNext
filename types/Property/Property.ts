export interface PropertyListProps {
  category: "for-sale" | "for-rent" | "for-shabbat";
}
  

//
export interface ApartmentCard {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
  shortDescription: string;
}

export interface ApartmentDetails extends ApartmentCard {
  size: string;
  rooms: number;
  floor: number;
  totalFloors: number;
  balcony: boolean;
  parking: boolean;
  description: string;
  images: string[];
  contact: {
      name: string;
      phone: string;
      email: string;
  };
}