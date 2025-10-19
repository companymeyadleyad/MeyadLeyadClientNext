// Utility function to create URL-friendly slugs from category names
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[\s\u0590-\u05FF]+/g, '-') // Replace Hebrew and spaces with hyphens
    .replace(/[^\u0590-\u05FFa-z0-9-]/g, '') // Remove non-Hebrew, non-alphanumeric characters
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

// Utility function to get category by slug
export const getCategoryBySlug = (slug: string, categories: any[]) => {
  // First try to match by slug field (this is the main method now)
  let category = categories.find(cat => cat.slug === slug);
  
  // If not found, try exact match with category id
  if (!category) {
    category = categories.find(cat => cat.id === slug);
  }
  
  // If still not found, try to match by slugified name (fallback)
  if (!category) {
    category = categories.find(cat => createSlug(cat.name) === slug);
  }
  
  // If still not found, try common mappings for mock data
  if (!category) {
    const slugMap: Record<string, string> = {
      "forsale": "3-rooms",
      "forrent": "4-rooms", 
      "forshabbat": "5-plus-rooms",
      "projects": "luxury",
      "sale": "3-rooms",
      "rent": "4-rooms",
      "shabbat": "5-plus-rooms",
      "luxury": "luxury",
      "דירות-למכירה": "3-rooms",
      "דירות-להשכרה": "4-rooms",
      "דירות-לשבת": "5-plus-rooms",
      "פרויקטים": "luxury"
    };
    
    const categoryId = slugMap[slug] || slug;
    category = categories.find(cat => cat.id === categoryId);
  }
  
  return category;
};
