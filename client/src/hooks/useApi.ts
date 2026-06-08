import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

interface UseApiOptions {
    /** Auto-refresh interval in milliseconds. If set, the hook re-fetches on this cadence. */
    pollInterval?: number;
}

interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useApi<T>(
    endpoint: string,
    defaultData?: T,
    options?: UseApiOptions
): UseApiResult<T> {
    const [data, setData] = useState<T | null>(defaultData ?? null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0);

    const refetch = useCallback(() => setTrigger((t) => t + 1), []);

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

    // Auto-polling: re-fetch on a fixed cadence so any admin's
    // adds or deletes are reflected for all visitors automatically.
    useEffect(() => {
        if (!options?.pollInterval) return;
        const interval = setInterval(() => {
            setTrigger((t) => t + 1);
        }, options.pollInterval);
        return () => clearInterval(interval);
    }, [options?.pollInterval]);

    return { data, loading, error, refetch };
}
