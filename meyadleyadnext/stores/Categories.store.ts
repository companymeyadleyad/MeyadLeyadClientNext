"use client";

import { makeAutoObservable } from "mobx";
import { CategoriesService } from "../services/categoriesService";
import { Category } from "@/types/Categories/Category";
import { Level } from "@/types/Categories/Level";

class CategoriesStore {
  categories: Category[] = [];
  levels: Level[] = [];
  categoryNumberSelected = 0;
  categoriesFetched = false;
  isLoading = false;
  fetchPromise: Promise<void> | null = null;
  isSupportMediation = false;

  private svc: CategoriesService;

  constructor() {
    // autoBind מבטיח שהמתודות יהיו bound ל-this גם אם נעביר אותן כ-references
    makeAutoObservable(this, {}, { autoBind: true });
    this.svc = new CategoriesService();
  }

  setCategories(categories: Category[]) {
    this.categories = categories ?? [];
    this.categoriesFetched = true;
  }

  setCategoryNumberSelected(categoryNumber: number) {
    this.categoryNumberSelected = categoryNumber;
  }

  setLevels(levels: Level[]) {
    this.levels = levels ?? [];
  }

  setIsSupportMediation(isSupportMediation: boolean) {
    this.isSupportMediation = isSupportMediation;
  }

  async fetchCategories() {
    // אם כבר נטען — לא טוענים שוב
    if (this.categoriesFetched) return;

    // אם כבר יש בקשה בתהליך — מחזירים אותה
    if (this.isLoading && this.fetchPromise) return this.fetchPromise;

    this.isLoading = true;

    this.fetchPromise = (async () => {
      try {
        const response = await this.svc.getCategories();
        if (response) {
          this.setCategories(response);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        this.isLoading = false;
        this.fetchPromise = null;
      }
    })();

    return this.fetchPromise;
  }

  async fetchCategoryLevels(categoryNumber: number) {
    try {
      const response = await this.svc.getCategoryLevels(categoryNumber);
      if (response) {
        this.setLevels(response.stepCategoriesModel);
        this.setIsSupportMediation(response.isSupportMediation);
        this.setCategoryNumberSelected(categoryNumber);
      } else {
        console.error("Failed to fetch category levels");
      }
    } catch (error) {
      console.error("Error fetching category levels:", error);
    }
  }

  reset() {
    this.categories = [];
    this.levels = [];
    this.categoryNumberSelected = 0;
    this.categoriesFetched = false;
    this.isLoading = false;
    this.fetchPromise = null;
    this.isSupportMediation = false;
  }
}

export const categoriesStore = new CategoriesStore();
