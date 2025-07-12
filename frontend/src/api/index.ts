const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchWrapper = async (
    url: RequestInfo | URL,
    init?: RequestInit,
    authRequired?: boolean,
): Promise<Response> => {
    const apiUrl = `${API_URL}/api/${url}`;

    // Nếu không cần auth -> gọi API bình thường
    if (!authRequired) {
        return fetch(apiUrl, init);
    }

    let token = localStorage.getItem('access_token');
    if (!token) {
        try {
            const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                token = data.payload.accessToken;
                if (token) {
                    localStorage.setItem('access_token', token);
                }
            } else {
                throw new Error('No access token and refresh failed');
            }
        } catch (err) {
            throw new Error('No access token and refresh failed');
        }
    }

    // Gửi request lần đầu
    let response = await fetch(apiUrl, {
        ...init,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...init?.headers,
        },
    });

    // Nếu hết hạn access token -> thử gọi refresh
    if (response.status === 401) {
        try {
            const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
                method: 'POST',
                credentials: 'include', // rất quan trọng: gửi kèm refreshToken cookie
            });

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                const newToken = data.payload.accessToken;

                // Lưu access token mới
                localStorage.setItem('access_token', newToken);

                // Gọi lại request ban đầu với token mới
                response = await fetch(apiUrl, {
                    ...init,
                    headers: {
                        'Authorization': `Bearer ${newToken}`,
                        'Content-Type': 'application/json',
                        ...init?.headers,
                    },
                });
            } else {
                localStorage.removeItem('access_token');
                throw new Error('Token expired. Please login again.');
            }
        } catch (err) {
            localStorage.removeItem('access_token');
            throw new Error('Token expired. Please login again.');
        }
    }

    return response;
};

export * as auth from './auth';
export * as user from './user';
