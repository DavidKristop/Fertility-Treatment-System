export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    confirmPassword: string;
}

export interface AuthResponse {
    token: string;
    user: UserProfile;
}

export interface UserProfile {
    id: number;
    email: string;
    role: string;
}

