'use client';

import React from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

interface LoadingStateProps {
    size?: number;
    fullScreen?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ size = 40, fullScreen = false }) => {
    const containerClass = fullScreen
        ? "flex justify-center items-center h-screen"
        : "flex justify-center py-20";

    return (
        <div className={containerClass}>
            <Loader2 className="animate-spin text-primary" size={size} />
        </div>
    );
};

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction
}) => {
    return (
        <div className="text-center py-20 bg-surface rounded-2xl border border-white/5">
            <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                <Icon size={40} className="text-muted" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-muted">{description}</p>
            {actionLabel && onAction && (
                <button onClick={onAction} className="mt-4 text-primary font-bold hover:underline">
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

interface NotFoundStateProps {
    message?: string;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({ message = "Страница не найдена" }) => {
    return (
        <div className="p-20 text-center text-white">
            {message}
        </div>
    );
};
