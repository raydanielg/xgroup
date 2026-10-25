import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

type Options = {
    type?: FlashToast['type'];
    match?: string;
    message?: string;
};

export function useStatusToast(
    status: string | undefined,
    { type = 'success', match, message }: Options = {},
): void {
    useEffect(() => {
        if (status && (!match || status === match)) {
            toast[type](message ?? status);
        }
    }, [status, type, match, message]);
}
