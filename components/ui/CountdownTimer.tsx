"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
    targetDate: Date;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="relative bg-zinc-900/80 border-2 border-brand-yellow/30 rounded-lg p-3 md:p-6 min-w-[70px] md:min-w-[120px] flex items-center justify-center shadow-[0_0_15px_rgba(255,193,7,0.1)] backdrop-blur-sm">
                <span className="text-3xl md:text-6xl font-black text-white font-display tracking-wider">
                    {value.toString().padStart(2, '0')}
                </span>
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-yellow" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-yellow" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-brand-yellow" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-yellow" />
            </div>
            <span className="text-xs md:text-sm text-brand-yellow font-bold mt-2 uppercase tracking-widest">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex justify-center items-center flex-wrap gap-y-4">
            <TimeUnit value={timeLeft.days} label="Dias" />
            <div className="text-2xl md:text-5xl font-bold text-zinc-600 mb-8">:</div>
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <div className="text-2xl md:text-5xl font-bold text-zinc-600 mb-8">:</div>
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <div className="text-2xl md:text-5xl font-bold text-zinc-600 mb-8">:</div>
            <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>
    );
}
