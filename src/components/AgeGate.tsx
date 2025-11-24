'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';

const STORAGE_KEY = 'hp_age_verified_expires_at';
const VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

interface AgeGateProps {
    children: React.ReactNode;
}

const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return true;
    const expiresAtNumber = Number(expiresAt);
    if (Number.isNaN(expiresAtNumber)) return true;
    return expiresAtNumber < Date.now();
};

export function AgeGate({ children }: AgeGateProps) {
    const [isVerified, setIsVerified] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedExpiresAt = window?.localStorage?.getItem(STORAGE_KEY) ?? null;
        if (!isExpired(storedExpiresAt)) {
            setIsVerified(true);
        }
        setIsReady(true);
    }, []);

    const handleConfirm = () => {
        const expiresAt = Date.now() + VERIFICATION_TTL_MS;
        window.localStorage.setItem(STORAGE_KEY, String(expiresAt));
        setIsVerified(true);
    };

    const handleReject = () => {
        window.location.href = 'https://www.google.com';
    };

    // Prevent hydration mismatch by rendering children only, 
    // but overlay handles its own visibility state
    return (
        <>
            {children}

            {isReady && !isVerified && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in duration-300"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-surface border border-white/10 shadow-[0_0_50px_rgba(225,29,72,0.15)] animate-in zoom-in-95 duration-300">
                        {/* Decorative gradient blob */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative p-8 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mb-6 shadow-inner border border-white/5">
                                <ShieldAlert className="w-8 h-8 text-primary" />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-3">
                                Вам уже исполнилось 18 лет?
                            </h2>

                            <p className="text-muted mb-8 leading-relaxed">
                                Сайт содержит материалы о табачной продукции.
                                Для доступа к контенту необходимо подтвердить совершеннолетие.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <button
                                    onClick={handleConfirm}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all active:scale-[0.98]"
                                >
                                    <Check size={20} />
                                    Мне есть 18
                                </button>

                                <button
                                    onClick={handleReject}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-surface-light border border-white/10 text-muted hover:text-white hover:bg-white/5 transition-colors active:scale-[0.98]"
                                >
                                    <X size={20} />
                                    Мне нет 18
                                </button>
                            </div>

                            <p className="mt-6 text-xs text-muted/50">
                                Мы используем файлы cookie для сохранения вашего выбора.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AgeGate;
