import { PropertyDetailDto } from "./PropertyDetailDto";

export interface PropertyGroupDto {
  categoryId: number;
  categoryName: string;
  properties: PropertyDetailDto[];
}