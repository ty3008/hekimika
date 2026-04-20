import { useState, useEffect } from 'react';
import api from '../utils/api';

interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useApi<T>(endpoint: string, defaultData?: T): UseApiResult<T> {
    const [data, setData] = useState<T | null>(defaultData ?? null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        api.get<T>(endpoint)
            .then((res) => {
                if (!cancelled) setData(res.data);
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err?.response?.data?.error || 'Request failed');
                    if (defaultData !== undefined) setData(defaultData);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [endpoint, trigger]);

    return { data, loading, error, refetch: () => setTrigger((t) => t + 1) };
}
