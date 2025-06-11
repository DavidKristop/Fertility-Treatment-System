const API_URL = import.meta.env.VITE_API_URL;

export const fetchWrapper = (
    url: RequestInfo | URL,
    init?: RequestInit,
    authRequired?: boolean,
) => {
    const apiUrl = `${API_URL}/api/${url}`;
    
    if (!authRequired) {
        return fetch(apiUrl, init);
    }

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Unauthorized access');
    }

    return fetch(apiUrl, {
        ...init,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...init?.headers,
        },
    });
};

export * as auth from './auth';
export * as user from './user';