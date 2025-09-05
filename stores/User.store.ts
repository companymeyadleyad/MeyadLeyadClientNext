"use client";

import { makeAutoObservable } from "mobx";
import { User } from "../types/User/User";

class UserStore {
  user: User | null = null;
  isLoggedIn = false;
  token: string | null = null;
  authHydrated = false; 

  constructor() {
    makeAutoObservable(this);

    // טוען טוקן אם יש ב־localStorage (רק בצד לקוח)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        this.token = token;
        this.isLoggedIn = true;
      }
    }
  }

  setUser(user: User | null) {
    this.user = user;
    this.isLoggedIn = true;
  }

  setToken(token: string) {
    this.token = token;
    this.isLoggedIn = true;

    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  }

  isTokenExists(): boolean {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("authToken");
    return token !== null && token !== "";
  }
  setAuthHydrated(v: boolean) {
      this.authHydrated = v;
    }
  clearUser() {
    this.user = null;
    this.token = null;
    this.isLoggedIn = false;

    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  }
}

export const userStore = new UserStore();
