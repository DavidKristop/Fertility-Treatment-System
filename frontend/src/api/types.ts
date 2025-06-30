export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
  phone: string;
  address: string;
  dateOfBirth: string; // Định dạng YYYY-MM-DD từ input type="date"
  confirmPassword: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  phone: string;
  address: string;
  dateOfBirth: string; // Định dạng YYYY-MM-DD
  createdAt: string; // ISO 8601 date string
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
  username?: string; // Add this field
  fullName?: string; // Add this as fallback
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  // Other potential fields
}
