"use client";

import { useEffect, useState } from "react";

export function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date("2026-01-25T00:00:00");

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-4 md:gap-8 text-center justify-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center group">
                    <div className="relative flex h-24 w-24 md:h-32 md:w-32 items-center justify-center bg-brand-gray border border-zinc-800 transform skew-x-[-10deg] transition-all group-hover:border-brand-yellow group-hover:shadow-[0_0_20px_rgba(255,193,7,0.2)]">
                        <div className="absolute top-0 right-0 w-3 h-3 bg-brand-yellow/20 group-hover:bg-brand-yellow" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 bg-brand-yellow/20 group-hover:bg-brand-yellow" />

                        <span className="text-5xl md:text-7xl font-display font-bold text-white transform skew-x-[10deg]">
                            {value.toString().padStart(2, "0")}
                        </span>
                    </div>
                    <span className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-brand-yellow transition-colors">
                        {unit === "days" ? "DIAS" : unit === "hours" ? "HORAS" : unit === "minutes" ? "MIN" : "SEG"}
                    </span>
                </div>
            ))}
        </div>
    );
}
