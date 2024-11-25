import {useCallback, useState} from 'react';

export const useAsyncError = (): ((e: unknown) => void) => {
    const [, setError] = useState<() => void>();

    return useCallback((e: unknown) => {
        setError(() => {
            throw e;
        });
    }, [setError]);
};