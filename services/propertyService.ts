import { postData, getData, deleteData } from "./apiService";
import { AddPropertyModel } from "../types/Property/AddPropertyModel";
import {
  CityStreetAddressDto,
  CityStreetAddressResponse,
} from "../types/Property/CityStreetAddressDto";
import { ImageListPostResponse } from "../types/Property/ImageListPostResponse";
import { PropertyDetailDto } from "../types/Property/PropertyDetailDto";
import { PropertyDetailDtoResponse } from "../types/Property/PropertyDetailDtoResponse";
import { PropertyGroupDto } from "../types/Property/PropertyGroupDto";
import { getMockPropertyById } from "../data/mockPropertyDetails";

export class PropertyService {
  addProperty = async (property: AddPropertyModel): Promise<boolean | null> => {
    const endpoint = `/Properties/add-property`;
    try {
      const response = await postData<boolean>(endpoint, property);
      return response;
    } catch (error: unknown) {
      console.error("Error fetching categories:", error);
      return null;
    }
  };

  getAddressDetails = async (
    val: string
  ): Promise<CityStreetAddressDto[] | null> => {
    const endpoint = `/Properties/address-details?&val=${encodeURIComponent(
      val
    )}`;
    try {
      const response = await getData<CityStreetAddressResponse>(endpoint);
      return response?.data || [];
    } catch (error: unknown) {
      console.error("Error fetching address details:", error);
      return null;
    }
  };
  
  getPropertiesList = async (): Promise<PropertyGroupDto[] | null> => {
    const endpoint = `/Properties/get-properties-list`;
    try {
      const response = await getData<{ data: PropertyGroupDto[] }>(endpoint);
      return response?.data || [];
    } catch (error: unknown) {
      console.error("Error fetching grouped properties:", error);
      return null;
    }
  };

  saveImage = async (
    postingId: number,
    pageNumber: number,
    indices: number[],
    imageData: string // will send as base64 string!
  ): Promise<boolean | null> => {
    debugger;
    const endpoint = `/Properties/save-image-post`;
    try {
      const payload = {
        postingId,
        pageNumber,
        indices,
        imageData: imageData, // send as base64 string
      };
  
      const response = await postData<boolean>(endpoint, payload);
      return response;
    } catch (error: unknown) {
      console.error("Error saving image:", error);
      return null;
    }
  };

  getImages = async (): Promise<{ imgId: number; pageNumber: number; indices: number[]; imageData: string; }[] | null> => {
    const endpoint = `/Properties/get-images-post`;
    try {
      const response = await getData<ImageListPostResponse>(endpoint);
      debugger;
      if (!response || !response.data) return [];
  
      return response.data.map((img) => ({
        imgId: img.imgId,
        pageNumber: img.pageNumber,
        indices: img.indices,
        imageData: 'data:image/png;base64,' + img.imageData // rebuild the base64 for <img src>
      }));
    } catch (error: unknown) {
      console.error("Error loading images:", error);
      return null;
    }
  };

  deleteImage = async (imgId: number): Promise<boolean | null> => {
    const endpoint = `/Properties/delete-image-post/${imgId}`;
    try {
      const response = await deleteData<boolean>(endpoint);
      return response;
    } catch (error: unknown) {
      console.error("Error deleting image:", error);
      return null;
    }
  };

  uploadExel = async (file: File): Promise<boolean | null> => {
    const endpoint = `/Properties/upload-excel`;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await postData<boolean>(endpoint,formData);
      return response;
    } catch (error: unknown) {
      console.error("Error deleting image:", error);
      return null;
    }
  };

  getPropertyById = async (id: string): Promise<PropertyDetailDto | null> => {
    // Use mock data for now
    return getMockPropertyById(id);
    
    // Original API call (commented out for now)
    // const endpoint = `/Properties/get-property-details/${id}`;
    // try {
    //   const response = await getData<PropertyDetailDtoResponse>(endpoint);
    //   return response?.data?.[0] || null;
    // } catch (error: unknown) {
    //   console.error("Error fetching property details:", error);
    //   return null;
    // }
  };
}

const propertyService = new PropertyService();

export const getPropertyById = async (id: string) => {
  return await propertyService.getPropertyById(id);
};