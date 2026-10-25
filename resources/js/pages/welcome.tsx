import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { dashboard, login, register } from '@/routes';

const LAUNCH_DATE = new Date('2026-12-15T09:00:00');

function useCountdown(target: Date) {
    const calc = () => {
        const diff = Math.max(0, target.getTime() - Date.now());
        return {
            days: Math.floor(diff / 86_400_000),
            hours: Math.floor(diff / 3_600_000) % 24,
            minutes: Math.floor(diff / 60_000) % 60,
            seconds: Math.floor(diff / 1_000) % 60,
        };
    };

    const [time, setTime] = useState(calc);

    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1_000);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return time;
}

function StatusDot({
    color,
    pulse = false,
}: {
    color: string;
    pulse?: boolean;
}) {
    return (
        <span className="relative inline-flex" style={{ width: 6, height: 6 }}>
            {pulse && (
                <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ background: color }}
                />
            )}
            <span
                className="relative inline-flex rounded-full"
                style={{ width: 6, height: 6, background: color }}
            />
        </span>
    );
}

export default function Welcome() {
    const { auth } = usePage().props;
    const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
    const [email, setEmail] = useState('');
    const [notified, setNotified] = useState(false);

    const units = [
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Minutes', value: minutes },
        { label: 'Seconds', value: seconds },
    ];

    const stats = [
        { label: 'Founded', value: '2019' },
        { label: 'Sectors', value: '4' },
        { label: 'Markets', value: '3' },
        { label: 'Team', value: '60+' },
    ];

    return (
        <>
            <Head title="Xerin Group — Coming Soon" />

            <div className="min-h-screen bg-gray-50">
                {/* Top bar */}
                <header className="border-b border-gray-200 bg-white">
                    <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                        <p className="text-sm font-bold text-gray-900">
                            Xerin Group
                        </p>
                        <nav className="flex items-center gap-3">
                            <span className="hidden items-center gap-1.5 text-xs font-semibold text-gray-900 sm:inline-flex">
                                <StatusDot color="#f59e0b" pulse />
                                In development
                            </span>
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="hidden rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 sm:inline-block"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-5xl px-4 py-6">
                    {/* Header band */}
                    <div className="mb-5 rounded-md bg-slate-800 p-6 text-white">
                        <p className="mb-1 text-[10px] tracking-wider text-slate-400 uppercase">
                            Xerin Group · Launch status
                        </p>
                        <h1 className="text-xl font-bold">
                            Something big is coming.
                        </h1>
                        <p className="mt-1 max-w-xl text-xs text-slate-400">
                            We are building the new digital home of Xerin Group
                            — faster, smarter and more secure. Leave your email
                            below and we will notify you the moment we go live.
                        </p>
                    </div>

                    {/* Countdown KPIs */}
                    <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                        {units.map((u) => (
                            <div
                                key={u.label}
                                className="rounded-md border border-gray-200 bg-white p-4"
                            >
                                <span className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
                                    {u.label}
                                </span>
                                <p className="mt-1 font-mono text-2xl font-bold text-gray-900 tabular-nums">
                                    {String(u.value).padStart(2, '0')}
                                </p>
                                <p className="mt-0.5 text-[10px] text-gray-400">
                                    until launch
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-5 lg:grid-cols-3">
                        {/* About */}
                        <div className="rounded-md border border-gray-200 bg-white p-5 lg:col-span-2">
                            <h3 className="mb-4 text-sm font-bold text-gray-900">
                                About Xerin Group
                            </h3>
                            <div className="space-y-3 text-xs leading-relaxed text-gray-600">
                                <p>
                                    Xerin Group is a diversified holding company
                                    operating across technology, logistics,
                                    financial services and real estate. We build
                                    and back businesses that move markets —
                                    quietly, deliberately and for the long term.
                                </p>
                                <p>
                                    This platform will become the single digital
                                    home of the group: company information,
                                    investor relations, careers and secure
                                    client services — all in one place, designed
                                    with the same discipline we bring to our
                                    work.
                                </p>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-4">
                                {stats.map((s) => (
                                    <div key={s.label}>
                                        <span className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
                                            {s.label}
                                        </span>
                                        <p className="mt-1 font-mono text-lg font-bold text-gray-900 tabular-nums">
                                            {s.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notify + quick links */}
                        <div className="space-y-5">
                            <div className="rounded-md border border-gray-200 bg-white p-5">
                                <h3 className="mb-1 text-sm font-bold text-gray-900">
                                    Get notified
                                </h3>
                                <p className="mb-4 text-xs text-gray-500">
                                    One email at launch. No spam, ever.
                                </p>
                                {notified ? (
                                    <div className="rounded-md border-l-2 border-emerald-500 bg-white p-3 text-xs text-gray-700">
                                        You are on the list. We will email{' '}
                                        <span className="font-semibold text-gray-900">
                                            {email}
                                        </span>{' '}
                                        when we launch.
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (!email.trim()) return;
                                            setNotified(true);
                                            toast.success(
                                                'You are on the list',
                                                {
                                                    description: `We will email ${email.trim()} the moment we launch.`,
                                                },
                                            );
                                        }}
                                        className="space-y-2"
                                    >
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="you@company.com"
                                            className="w-full rounded border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-slate-400 focus:ring-0 focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                                        >
                                            Notify me at launch
                                        </button>
                                    </form>
                                )}
                                <p className="mt-3 text-[10px] text-gray-400">
                                    Estimated launch ·{' '}
                                    {LAUNCH_DATE.toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>

                            <div className="rounded-md border border-gray-200 bg-white p-5">
                                <h3 className="mb-3 text-sm font-bold text-gray-900">
                                    Quick actions
                                </h3>
                                <div className="space-y-1.5">
                                    {(auth.user
                                        ? [
                                              {
                                                  label: 'Go to dashboard',
                                                  href: dashboard().url,
                                              },
                                          ]
                                        : [
                                              {
                                                  label: 'Sign in to your account',
                                                  href: login().url,
                                              },
                                              {
                                                  label: 'Request access',
                                                  href: register().url,
                                              },
                                          ]
                                    ).map((a) => (
                                        <Link
                                            key={a.label}
                                            href={a.href}
                                            className="flex items-center justify-between rounded bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                                        >
                                            {a.label}
                                            <svg
                                                className="h-3.5 w-3.5 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                />
                                            </svg>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 pb-6">
                        <p className="text-[10px] text-gray-400">
                            © {new Date().getFullYear()} Xerin Group. All rights
                            reserved.
                        </p>
                        <p className="inline-flex items-center gap-1.5 text-[10px] text-gray-400">
                            <StatusDot color="#059669" />
                            All systems operational
                        </p>
                    </footer>
                </main>
            </div>
        </>
    );
}
