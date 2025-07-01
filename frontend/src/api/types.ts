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
    fullName: string;
    userId: string;
  };
  message: string;
  success: boolean;
}

export interface UserProfile {
  id: number;
  email: string;
  role: string;
  username?: string; // Add this field
  fullName?: string; // Add this as fallback
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  // Other potential fields
}

// Add these interfaces to your existing types

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  payload?: T;
}
