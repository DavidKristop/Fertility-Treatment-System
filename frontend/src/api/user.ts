import { fetchWrapper } from '.'
import type { UserProfile, ManagedUserResponse } from './types'
import type { ApiPaginationResponse } from "./types";


export const getProfile = async (): Promise<UserProfile> => {
    const response = await fetchWrapper('user/profile', {
        method: 'GET',
    }, true);

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    return response.json();
};

export const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await fetchWrapper('user/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }, true);

    if (!response.ok) {
        throw new Error('Failed to update profile');
    }

    return response.json();
};

export const getUsers = async (
  role: string,
  email: string,
  page: number,
  size: number
): Promise<ApiPaginationResponse<ManagedUserResponse>> => {
  const params = new URLSearchParams();
  if (role) params.append("role", role);
  if (email) params.append("email", email);
  params.append("page", String(page));
  params.append("size", String(size));

  const response = await fetchWrapper(`admin?${params.toString()}`, {
    method: "GET",
  }, true);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data as ApiPaginationResponse<ManagedUserResponse>;
};

export const deactivateUser = async (userId: string) => {
  return fetchWrapper(`admin/${userId}/deactivate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }, true);
};

export const reactivateUser = async (userId: string) => {
  return fetchWrapper(`admin/${userId}/reactivate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }, true);
};

export const getUserById = async (id: string): Promise<ManagedUserResponse> => {
  const response = await fetchWrapper(`admin/user/${id}`, { method: "GET" }, true);

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return await response.json();
};