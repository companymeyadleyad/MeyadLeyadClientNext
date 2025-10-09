import { Category } from "@/types/Homepage/Apartment";

export const mockCategories: Category[] = [
  {
    id: "3-rooms",
    name: "דירות למכירה",
    apartments: [
      {
        id: "apt-1",
        title: "דירה מרווחת במרכז העיר",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 3,
        floor: 5,
        meters: 85,
        price: 1200000,
        location: "רב המנונא 6 בית שמש",
        category: "3-rooms"
      },
      {
        id: "apt-2",
        title: "דירה עם מרפסת גדולה",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 3,
        floor: 3,
        meters: 90,
        price: 1350000,
        location: "רב המנונא 6 בית שמש",
        category: "3-rooms"
      },
      {
        id: "apt-3",
        title: "דירה מעוצבת במיקום מרכזי",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 3,
        floor: 8,
        meters: 75,
        price: 1100000,
        location: "רב המנונא 6 בית שמש",
        category: "3-rooms"
      },
      {
        id: "apt-4",
        title: "דירה עם נוף לים",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 3,
        floor: 12,
        meters: 95,
        price: 1800000,
        location: "רב המנונא 6 בית שמש",
        category: "3-rooms"
      }
    ]
  },
  {
    id: "4-rooms",
    name: "דירות להשכרה",
    apartments: [
      {
        id: "apt-5",
        title: "דירה משפחתית מרווחת",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
        rooms: 4,
        floor: 2,
        meters: 120,
        price: 1600000,
        location: "רב המנונא 6 בית שמש",
        category: "4-rooms"
      },
      {
        id: "apt-6",
        title: "דירה עם גינה פרטית",
        image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 4,
        floor: 1,
        meters: 140,
        price: 1750000,
        location: "רב המנונא 6 בית שמש",
        category: "4-rooms"
      },
      {
        id: "apt-7",
        title: "דירה מעוצבת בסגנון מודרני",
        image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 4,
        floor: 6,
        meters: 110,
        price: 1550000,
        location: "גבעתיים",
        category: "4-rooms"
      },
      {
        id: "apt-8",
        title: "דירה עם מרפסת שמש",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 4,
        floor: 10,
        meters: 130,
        price: 1900000,
        location: "רב המנונא 6 בית שמש",
        category: "4-rooms"
      }
    ]
  },
  {
    id: "5-plus-rooms",
    name: "דירות לשבת",
    apartments: [
      {
        id: "apt-9",
        title: "דירה יוקרתית עם נוף פנורמי",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 5,
        floor: 15,
        meters: 180,
        price: 2800000,
        location: "רב המנונא 6 בית שמש",
        category: "5-plus-rooms"
      },
      {
        id: "apt-10",
        title: "דירה משפחתית עם 2 מפלסים",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 6,
        floor: 4,
        meters: 200,
        price: 2500000,
        location: "רב המנונא 6 בית שמש",
        category: "5-plus-rooms"
      },
      {
        id: "apt-11",
        title: "דירה עם גינה וחניה",
        image: "https://images.unsplash.com/photo-1570129477492-45c01edd7974?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 5,
        floor: 1,
        meters: 160,
        price: 2200000,
        location: "רב המנונא 6 בית שמש",
        category: "5-plus-rooms"
      }
    ]
  },
  {
    id: "luxury",
    name: "פרוייקטים",
    apartments: [
      {
        id: "apt-12",
        title: "נטהאוז עם נוף לים",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 4,
        floor: 20,
        meters: 250,
        price: 4500000,
        location: "תל אביב",
        category: "luxury"
      },
      {
        id: "apt-13",
        title: "דירה מעוצבת עם חלונות גדולים",
        image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 5,
        floor: 18,
        meters: 220,
        price: 3800000,
        location: "הרצליה",
        category: "luxury"
      },
      {
        id: "apt-14",
        title: "דירה עם מרפסת ענקית",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        rooms: 6,
        floor: 25,
        meters: 300,
        price: 5500000,
        location: "תל אביב",
        category: "luxury"
      }
    ]
  }
];
