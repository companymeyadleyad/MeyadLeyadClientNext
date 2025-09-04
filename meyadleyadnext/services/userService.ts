"use client";

import { getData, postData } from "./apiService";
import { LoginResponse } from "../types/LoginAndRegister/Login/LoginResponse";
import { LoginRequest } from "../types/LoginAndRegister/Login/LoginRequest";
import { RegisterRequest } from "../types/LoginAndRegister/Registration/RegisterRequest";
import { RegisterResponse } from "../types/LoginAndRegister/Registration/RegisterResponse";
import { Authenticate, GetCurrentUser } from "../types/LoginAndRegister/Authenticate/Authenticate";
import { User } from "@/types/User/User";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ""; // לדוגמה: "https://api.example.com"

export class UserService {
  async login(data: LoginRequest) {
    const endpoint = `${API_BASE}/User/login`;
    try {
      const response = await postData<LoginResponse>(endpoint, data);
      return response;
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, data: error };
    }
  }

  async register(data: RegisterRequest) {
    const endpoint = `${API_BASE}/User/registration`;
    try {
      const response = await postData<RegisterResponse>(endpoint, data);
      return response;
    } catch (error: any) {
      console.error("Register error:", error);
      return { success: false, error };
    }
  }

  async authenticate() {
    const endpoint = `${API_BASE}/User/authenticate`;
    try {
      const response = await getData<Authenticate>(endpoint);
      return response;
    } catch (error: any) {
      console.error("Authenticate error:", error);
      return { success: false, error };
    }
  }

  async getCurrentUser() {
    const endpoint = `${API_BASE}/User/getCurrentUser`;
    try {
      const response = await getData<GetCurrentUser>(endpoint);
      return response;
    } catch (error: any) {
      console.error("GetCurrentUser error:", error);
      return { success: false, error,data : null };
    }
  }
}
