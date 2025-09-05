import { PropertyDetailDto } from "./PropertyDetailDto";

export interface ImageListPostResponse {
  success: boolean;
  message: string;
  data: ImagePost[];
};

export interface ImagePost {
  imgId: number;
  postingId: number;
  pageNumber: number;
  indices: number[];
  imageData: Uint8Array; // Or use `number[]` if you prefer
}