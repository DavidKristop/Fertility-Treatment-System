import { fetchWrapper } from ".";
import type { ApiResponse, UserProfileResponse } from "./types";

export const getMyProfile = async ():Promise<ApiResponse<UserProfileResponse>>=>{
  const response = await fetchWrapper('profile/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }, true);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch profile');
  }

  return response.json();
};