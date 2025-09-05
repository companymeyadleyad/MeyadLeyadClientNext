import { User } from "../../User/User";

export interface LoginResponse {
    data: UserLoginResponse;
    success: boolean;
}
export interface UserLoginResponse{
  user: User;
  token: string;
}