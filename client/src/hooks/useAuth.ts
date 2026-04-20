import { useState, useEffect } from 'react';
import api from '../utils/api';

interface Admin {
    id: string;
    email: string;
    name: string;
}

interface UseAuthResult {
    admin: Admin | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

export function useAuth(): UseAuthResult {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('hekimika_token'));
    const [loading, setLoading] = useState(!!token);

    // Restore session on mount
    useEffect(() => {
        if (!token) { setLoading(false); return; }
        api.get<Admin>('/auth/me')
            .then((res) => setAdmin(res.data))
            .catch(() => {
                localStorage.removeItem('hekimika_token');
                setToken(null);
            })
            .finally(() => setLoading(false));
    }, [token]);

    const login = async (email: string, password: string): Promise<void> => {
        const res = await api.post<{ token: string; admin: Admin }>('/auth/login', { email, password });
        localStorage.setItem('hekimika_token', res.data.token);
        setToken(res.data.token);
        setAdmin(res.data.admin);
    };

    const logout = () => {
        localStorage.removeItem('hekimika_token');
        setToken(null);
        setAdmin(null);
    };

    return { admin, token, loading, login, logout, isAuthenticated: !!admin };
}
