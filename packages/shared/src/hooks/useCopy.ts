/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useEffect, useState } from 'react';

const DEFAULT_RESET_AFTER_MS = 2000;

type CopyStatus = 'success' | 'error' | 'idle';

export const useCopy = (resetAfterMS = DEFAULT_RESET_AFTER_MS) => {
    const [status, setStatus] = useState<CopyStatus>('idle');

    const copy = useCallback(async (text: string) => {
        setStatus('idle');
        try {
            await navigator.clipboard.writeText(text);
            setStatus('success');
        } catch {
            setStatus('error');
        }
    }, []);

    useEffect(() => {
        if (status === 'idle') {
            return;
        }

        const timeout = setTimeout(() => setStatus('idle'), resetAfterMS);

        return () => clearTimeout(timeout);
    }, [status, resetAfterMS]);

    return { copy, status };
};
