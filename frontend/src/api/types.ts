export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
  phone: string;
  address: string;
  dateOfBirth: string; // Định dạng YYYY-MM-DD từ input type="date"
  confirmPassword: string;
}

export interface AuthResponse {
  payload: {
    accessToken: string;
    email: string;
    role: string;
    userId: string;
  };
  message: string;
  success: boolean;
}

export interface UserProfile {
  id: number;
  email: string;
  role: string;
}