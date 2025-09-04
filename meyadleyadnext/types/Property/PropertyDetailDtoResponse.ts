import { PropertyDetailDto } from "./PropertyDetailDto";

export interface PropertyDetailDtoResponse {
  success: boolean;
  message: string;
  data: PropertyDetailDto[];
};

