import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthGlassLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative flex min-h-dvh items-center justify-center overflow-hidden p-4 sm:p-6 lg:justify-end lg:pe-20 xl:pe-28">
            <img
                src="/images/login-bg.jpg"
                alt=""
                className="absolute inset-0 h-full w-full animate-[slow-zoom_28s_ease-in-out_infinite_alternate] object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/60" />

            <Link
                href={home()}
                className="absolute start-6 top-6 z-10 flex animate-in items-center gap-3 fill-mode-both text-white drop-shadow-md fade-in slide-in-from-top-4 duration-700 sm:start-10 sm:top-8"
            >
                <AppLogoIcon className="size-9 fill-current" />
                <span className="text-lg font-semibold tracking-wide">
                    {name}
                </span>
            </Link>

            <div className="light relative z-10 w-full max-w-md animate-in rounded-md border border-gray-200 bg-white p-8 text-gray-900 shadow-sm duration-500 fill-mode-both fade-in slide-in-from-bottom-6 zoom-in-[0.98] sm:p-10">
                <div className="mb-7 space-y-1.5 text-center">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-xs text-gray-500">{description}</p>
                    )}
                </div>
                {children}
            </div>

            <p className="absolute start-6 bottom-5 z-10 animate-in text-xs text-white/60 fill-mode-both fade-in delay-300 duration-1000 sm:start-10">
                © {new Date().getFullYear()} {name}. All rights reserved.
            </p>
        </div>
    );
}
