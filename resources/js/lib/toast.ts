import { toast } from 'sonner';

function collectMessages(value: unknown, messages: string[]): void {
    if (typeof value === 'string' && value.length > 0) {
        messages.push(value);
    } else if (Array.isArray(value)) {
        value.forEach((item) => collectMessages(item, messages));
    } else if (value && typeof value === 'object') {
        Object.values(value).forEach((item) => collectMessages(item, messages));
    }
}

export function toastFormErrors(errors: Record<string, unknown>): void {
    const messages: string[] = [];

    Object.values(errors).forEach((error) => collectMessages(error, messages));

    if (messages[0]) {
        toast.error(messages[0]);
    }
}
