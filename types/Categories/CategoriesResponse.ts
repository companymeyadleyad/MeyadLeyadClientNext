import { Category } from "./Category";

export interface CategoriesResponse {
    success: boolean;
    message: string | null;
    data: Category[];
  }