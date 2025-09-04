"use client";

import { getData } from "./apiService";
import type { Category } from "@/types/Categories/Category";
import type { CategoriesResponse } from "@/types/Categories/CategoriesResponse";
import type { CategoryLevelsResponse } from "@/types/Categories/CategoryLevelsResponse";
import type { CategoryStepModel } from "@/types/Categories/CategoryStepModel";

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
}
