import { City } from "..//Cities/City";

export interface Category {
    categoryNumber: number;
    categoryName: string;
    cities?: City[];
  }