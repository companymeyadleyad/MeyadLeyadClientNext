"use client";

import { getData } from "./apiService";
import type { Category } from "@/types/Categories/Category";
import type { CategoriesResponse } from "@/types/Categories/CategoriesResponse";
import type { CategoryLevelsResponse } from "@/types/Categories/CategoryLevelsResponse";
import type { CategoryStepModel } from "@/types/Categories/CategoryStepModel";
import type { SliderCategory, SlidersHomepageResponse } from "@/types/Homepage/SliderApartment";
import type { PropertyListItem, PropertiesListResponse } from "@/types/Property/PropertiesListResponse";

export class CategoriesService {
  async getCategories(): Promise<Category[] | null> {
    const endpoint = "/Categories/get-categories";
    try {
      const res = await getData<CategoriesResponse>(endpoint);
      return res?.data ?? null;
    } catch (err) {
      console.error("Error fetching categories:", err);
      return null;
    }
  }

  async getCategoryLevels(categoryNumber: number): Promise<CategoryStepModel | null> {
    const endpoint = `/Categories/get-levels-by-category/${categoryNumber}`;
    try {
      const res = await getData<CategoryLevelsResponse>(endpoint);
      return res?.data ?? null;
    } catch (err) {
      console.error("Error fetching category levels:", err);
      return null;
    }
  }

  async getSlidersHomepage(): Promise<SliderCategory[] | null> {
    const endpoint = "/Categories/get-sliders-homepage";
    try {
      const res = await getData<SlidersHomepageResponse>(endpoint);
      return res?.data ?? null;
    } catch (err) {
      console.error("Error fetching sliders homepage:", err);
      return null;
    }
  }

  async getPropertiesListByCategory(categorySlug: string): Promise<PropertyListItem[] | null> {
    const endpoint = `/Categories/get-properties-list-by-category?CategorySlug=${categorySlug}`;
    try {
      const res = await getData<PropertiesListResponse>(endpoint);
      return res?.data ?? null;
    } catch (err) {
      console.error("Error fetching properties list by category:", err);
      return null;
    }
  }
}
