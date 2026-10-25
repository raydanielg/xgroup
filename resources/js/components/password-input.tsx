import { LockPasswordIcon, ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { ComponentProps, Ref } from 'react';
import { useState } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';

export default function PasswordInput({
    className,
    ref,
    ...props
}: Omit<ComponentProps<'input'>, 'type'> & { ref?: Ref<HTMLInputElement> }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputGroup className={className}>
            <InputGroupAddon>
                <HugeiconsIcon icon={LockPasswordIcon} />
            </InputGroupAddon>
            <InputGroupInput
                type={showPassword ? 'text' : 'password'}
                ref={ref}
                {...props}
            />
            <InputGroupAddon align="inline-end">
                <InputGroupButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                >
                    <HugeiconsIcon
                        icon={showPassword ? ViewOffIcon : ViewIcon}
                    />
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
}
