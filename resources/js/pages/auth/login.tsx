import {
    Login03Icon,
    Mail01Icon,
    UserAdd01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useStatusToast } from '@/hooks/use-status-toast';
import { toastFormErrors } from '@/lib/toast';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    useStatusToast(status);

    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                onError={toastFormErrors}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <InputGroup>
                                <InputGroupAddon>
                                    <HugeiconsIcon icon={Mail01Icon} />
                                </InputGroupAddon>
                                <InputGroupInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                />
                            </InputGroup>
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label
                                    htmlFor="remember"
                                    className="font-normal"
                                >
                                    Remember me
                                </Label>
                            </div>
                            {canResetPassword && (
                                <TextLink
                                    href={request()}
                                    className="text-xs text-slate-600 hover:text-slate-800"
                                    tabIndex={5}
                                >
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="mt-1 w-full rounded bg-slate-800 text-white hover:bg-slate-700"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing ? (
                                <Spinner />
                            ) : (
                                <HugeiconsIcon
                                    icon={Login03Icon}
                                    data-icon="inline-start"
                                />
                            )}
                            Sign In
                        </Button>
                    </>
                )}
            </Form>

            <div className="mt-5">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded border-gray-200 text-gray-700 hover:bg-gray-100"
                    asChild
                >
                    <Link href={register()} tabIndex={6}>
                        <HugeiconsIcon
                            icon={UserAdd01Icon}
                            data-icon="inline-start"
                        />
                        Create an account
                    </Link>
                </Button>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Welcome Back',
    description: 'Sign in to continue to your account',
};
