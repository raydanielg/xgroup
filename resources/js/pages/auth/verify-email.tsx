// Components
import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useStatusToast } from '@/hooks/use-status-toast';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    useStatusToast(status, {
        match: 'verification-link-sent',
        message:
            'A new verification link has been sent to the email address you provided during registration.',
    });

    return (
        <>
            <Head title="Email verification" />

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            Resend verification email
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm"
                        >
                            Log out
                        </TextLink>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Email verification',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
};
