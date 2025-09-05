import { Level } from "..//Categories/Level";
import { CategoryStepModel } from "./CategoryStepModel";

export interface CategoryLevelsResponse {
    success: boolean;
    message: string | null;
    data: CategoryStepModel;
  }