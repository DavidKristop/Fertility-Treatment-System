import { fetchWrapper } from '.';
import type { UserProfile } from './types';

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