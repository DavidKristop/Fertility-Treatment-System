import { fetchWrapper } from '.'
import type { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ApiResponse,
  ProtocolResponse,
  ApiPaginationResponse,
  CreateProtocolRequest,
  ServiceResponse,
  DrugResponse,
} from './types'

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetchWrapper('auth/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result: AuthResponse = await response.json();

    if (!response.ok || !result.success) {
        const message = result.message || 'Login failed';
        const error = new Error(message);
        (error as any).response = result; // Gán để bắt được ở catch phía ngoài
        throw error;
    }

    localStorage.setItem('access_token', result.payload.accessToken);

    return result;
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await fetchWrapper('auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  // Xóa access_token khỏi localStorage sau khi logout
  localStorage.removeItem('access_token');

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

export const fetchProtocolsManager = async (page = 0, size = 10): Promise<ApiPaginationResponse<ProtocolResponse>> => {
  const response = await fetchWrapper(
    `protocols/manager?page=${page}&size=${size}`,
    { method: "GET" },
    true
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching protocols (status ${response.status}): ${response.statusText}`
    );
  }

  return response.json() as Promise<ApiPaginationResponse<ProtocolResponse>>;
}

export const fetchProtocolById = async (id: string): Promise<ProtocolResponse> => {
  const res = await fetchWrapper(
    `protocols/manager/${id}`,
    { method: "GET" },
    true
  );
  const body = (await res.json()) as ApiResponse<ProtocolResponse>;
  if (!body.success) {
    throw new Error(body.message);
  }
  return body.payload!;
}

export async function createProtocol(
  protocolData: CreateProtocolRequest
): Promise<ProtocolResponse> {
  // Gửi request tới endpoint POST /api/protocols
  const response = await fetchWrapper(
    `protocols`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(protocolData),
    },
    true // yêu cầu auth
  );

  // Kiểm tra HTTP status
  if (!response.ok) {
    throw new Error(
      `Error creating protocol (status ${response.status}): ${response.statusText}`
    );
  }

  // Parse JSON và unwrap ApiResponse
  const body = (await response.json()) as ApiResponse<ProtocolResponse>;
  if (!body.success) {
    throw new Error(body.message || "Failed to create protocol");
  }

  // Trả về payload chứa ProtocolResponse
  return body.payload!;
}

export const fetchServices = async (): Promise<ApiResponse<ServiceResponse[]>> => {
  const res = await fetchWrapper("services", {
    method: "GET",
  }, true);
  return res.json();
};

export const fetchDrugs = async (): Promise<ApiResponse<DrugResponse[]>> => {
  const res = await fetchWrapper("drugs", {
    method: "GET",
  }, true);
  return res.json();
};
