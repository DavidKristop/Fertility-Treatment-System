
import { fetchWrapper } from '.'
import type { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ApiResponse,
  LogoutResponse
} from './types'

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetchWrapper('auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};

export const logout = async (data: LogoutResponse): Promise<AuthResponse> => {
    const response = await fetchWrapper('auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }

    return response.json();
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetchWrapper('auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return response.json();
};

export const loginWithGoogle = async (credential: string): Promise<AuthResponse> => {
    const response = await fetchWrapper('auth/google/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
    });

    if (!response.ok) {
        throw new Error('Google login failed');
    }

    return response.json();
};

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<ApiResponse> => {
    const response = await fetchWrapper('auth/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Forgot password request failed');
    }

    return response.json();
};

export const validateResetToken = async (token: string): Promise<ApiResponse<boolean>> => {
    const response = await fetchWrapper(`auth/validate-reset-token?token=${encodeURIComponent(token)}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Token validation failed');
    }

    return response.json();
};

export const resetPassword = async (data: ResetPasswordRequest): Promise<ApiResponse> => {
    const response = await fetchWrapper('auth/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
    }

    return response.json();
};