import apiService from "../../shared/services/api-service";
import { apiEndpoints } from "../../shared/constants/api-endpoints";
import { SignupData, SignupResponse, LoginData, LoginResponse } from "../interfaces/auth-interface";
import { ApiResponse } from "../../shared/interfaces/api-response-interface";

class AuthService {
  async signup(data: SignupData): Promise<ApiResponse<SignupResponse>> {
    return await apiService.post<ApiResponse<SignupResponse>>(apiEndpoints.auth.signup, data);
  }

  async login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
    return await apiService.post<ApiResponse<LoginResponse>>(apiEndpoints.auth.login, data);
  }
}
const authService = new AuthService();
export default authService;
