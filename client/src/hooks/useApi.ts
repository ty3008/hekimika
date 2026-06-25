import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

interface UseApiOptions {
    /** Auto-refresh interval in milliseconds. If set, the hook re-fetches on this cadence. */
    pollInterval?: number;
    /** Number of times to retry on failure. Defaults to 2. */
    retries?: number;
}

interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
        const maxRetries = options?.retries ?? 2;

        const fetchWithRetry = async (attempt: number): Promise<void> => {
            try {
                setLoading(true);
                setError(null);
                const res = await api.get<T>(endpoint);
                if (!cancelled) setData(res.data);
            } catch (err: any) {
                if (cancelled) return;

                // Retry on network errors or 5xx server errors (e.g. Render cold start)
                const isRetryable = !err?.response || err?.response?.status >= 500;
                if (isRetryable && attempt < maxRetries) {
                    // Exponential backoff: 1.5s, 3s, ...
                    const delay = 1500 * Math.pow(2, attempt - 1);
                    console.warn(`[useApi] ${endpoint} — attempt ${attempt} failed, retrying in ${delay}ms...`);
                    await sleep(delay);
                    if (!cancelled) return fetchWithRetry(attempt + 1);
                } else {
                    setError(err?.response?.data?.error || 'Request failed');
                    if (defaultData !== undefined) setData(defaultData);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchWithRetry(1);

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
