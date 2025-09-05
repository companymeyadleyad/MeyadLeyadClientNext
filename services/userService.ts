"use client";

import { getData, postData } from "./apiService";
import { LoginResponse } from "../types/LoginAndRegister/Login/LoginResponse";
import { LoginRequest } from "../types/LoginAndRegister/Login/LoginRequest";
import { RegisterRequest } from "../types/LoginAndRegister/Registration/RegisterRequest";
import { RegisterResponse } from "../types/LoginAndRegister/Registration/RegisterResponse";
import { Authenticate, GetCurrentUser } from "../types/LoginAndRegister/Authenticate/Authenticate";
import { User } from "@/types/User/User";

export class UserService {
  async login(data: LoginRequest) {
    const endpoint = "/User/login";
    try {
      const response = await postData<LoginResponse>(endpoint, data);
      return response;
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, data: error };
    }
  }

  async register(data: RegisterRequest) {
    const endpoint = "/User/registration";
    try {
      const response = await postData<RegisterResponse>(endpoint, data);
      return response;
    } catch (error: any) {
      console.error("Register error:", error);
      return { success: false, error };
    }
  }

  async authenticate() {
    const endpoint = "/User/authenticate";
    try {
      const response = await getData<Authenticate>(endpoint);
      return response;
    } catch (error: any) {
      console.error("Authenticate error:", error);
      return { success: false, error };
    }
  }

  async getCurrentUser() {
    const endpoint = "/User/getCurrentUser";
    try {
      const response = await getData<GetCurrentUser>(endpoint);
      return response;
    } catch (error: any) {
      console.error("GetCurrentUser error:", error);
      return { success: false, error,data : null };
    }
  }
}
