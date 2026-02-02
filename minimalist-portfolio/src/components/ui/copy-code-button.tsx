"use client";

import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../../lib/utils";

interface CopyCodeProps {
    code?: string;
    className?: string;
}

export function CopyCode({ code = "hello@minimalist.com", className }: CopyCodeProps) {
    const [copied, setCopied] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [progress, setProgress] = useState(0);
    const duration = 2000; // Faster duration for better UX

    useEffect(() => {
        if (copied) {
            // Delay showing confirmation to allow blur-out animation
            const showTimer = setTimeout(() => {
                setShowConfirmation(true);
            }, 300);

            setProgress(0);
            const startTime = Date.now();

            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const newProgress = Math.min((elapsed / duration) * 100, 100);
                setProgress(newProgress);

                if (elapsed >= duration) {
                    clearInterval(interval);
                    setShowConfirmation(false);
                    setTimeout(() => {
                        setCopied(false);
                        setProgress(0);
                    }, 300);
                }
            }, 16);

            return () => {
                clearInterval(interval);
                clearTimeout(showTimer);
            };
        }
    }, [copied]);

    const handleCopy = async () => {
        try {
            if (code) {
                await navigator.clipboard.writeText(code);
            }
        } catch (err) {
            // Fallback for when Clipboard API is blocked
            const textArea = document.createElement('textarea');
            if (code) textArea.value = code;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            textArea.style.top = '-9999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
        setCopied(true);
    };

    return (
        <div className={cn("relative overflow-hidden flex items-center justify-between bg-white border border-gray-200 shadow-sm rounded-full", className)}>
            {/* Progress background */}
            <div
                className="absolute left-0 top-0 bottom-0 bg-brand/5 pointer-events-none"
                style={{
                    width: `${progress}%`,
                    opacity: copied ? 1 : 0,
                    transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />

            {/* Original content - code and button */}
            <div
                className="relative flex items-center justify-between pl-4 pr-1 gap-4 w-full"
                style={{
                    opacity: copied ? 0 : 1,
                    filter: copied ? 'blur(12px)' : 'blur(0px)',
                    transform: copied ? 'scale(0.92)' : 'scale(1)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: copied ? 'none' : 'auto',
                    zIndex: copied ? 0 : 20,
                }}
            >
                <span className="text-lg font-body text-text-secondary select-all whitespace-nowrap">
                    {code}
                </span>
                <button
                    onClick={handleCopy}
                    className="bg-brand hover:bg-brand-secondary text-white font-medium text-sm px-6 py-2.5 rounded-full shadow-md transition-all duration-300 active:scale-95 cursor-pointer select-none"
                    type="button"
                >
                    Скопировать
                </button>
            </div>

            {/* Confirmation content - Code Copied! */}
            <div
                className="absolute inset-0 flex items-center justify-center gap-3"
                style={{
                    opacity: showConfirmation ? 1 : 0,
                    filter: showConfirmation ? 'blur(0px)' : 'blur(12px)',
                    transform: showConfirmation ? 'scale(1)' : 'scale(1.08)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            >
                <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                </div>
                <span className="text-lg font-medium text-text-primary">
                    Скопировано!
                </span>
            </div>
        </div>
    );
}
