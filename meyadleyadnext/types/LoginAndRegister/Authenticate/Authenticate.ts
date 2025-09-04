import { User } from "../../User/User";

export interface Authenticate {
    data: string;
    success: boolean;
    message: string
  }


  export interface GetCurrentUser {
    data: User;
    success: boolean;
    message: string
  }