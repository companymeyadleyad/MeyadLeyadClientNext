"use client";

import axiosInstance from "../utils/axiosInterceptor";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""; 
// למשל ב־.env.local:
// NEXT_PUBLIC_API_URL=https://myapi.com/api

// GET
export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getData from ${endpoint}:`, error);
    throw error;
  }
};

// POST
export const postData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error in postData to ${endpoint}:`, error);
    throw error;
  }
};

// PUT
export const putData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error in putData to ${endpoint}:`, error);
    throw error;
  }
};

// DELETE
export const deleteData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axiosInstance.delete<T>(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error in deleteData from ${endpoint}:`, error);
    throw error;
  }
};
