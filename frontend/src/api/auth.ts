
import { fetchWrapper } from '.'
import type { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ApiResponse,
  LogoutResponse,
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

    const result: AuthResponse = await response.json();

    localStorage.setItem('access_token', result.payload.accessToken);

    return result;
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

export const me = async (): Promise<AuthResponse['payload']> => {
  // 1) Gọi endpoint với authRequired = true
  const res = await fetchWrapper('auth/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }, /* authRequired: */ true)

  // 2) Nếu status không ok, ném lỗi để redirect về login
  if (!res.ok) {
    throw new Error('Unauthorized')
  }

  // 3) Parse JSON (chắc trả về AuthResponse)
  const data = (await res.json()) as AuthResponse
  if (!data.success) {
    throw new Error(data.message)
  }

  // 4) Trả về phần payload
  return data.payload
};

export const resendVerifyEmail = async (email: string): Promise<ApiResponse> => {
  const response = await fetchWrapper(`verify-email/send?email=${encodeURIComponent(email)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to resend verification email');
  }

  return response.json();
};

export const verifyEmail = async (token: string): Promise<ApiResponse> => {
  const response = await fetchWrapper(`verify-email/confirm?token=${encodeURIComponent(token)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Email verification failed');
  }

  return response.json();
};