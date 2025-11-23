"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
    "/participant-1.png",
    "/participant-2.png",
    "/participant-3.png",
    "/participant-4.png",
    "/participant-5.png",
    "/participant-6.png",
    "/participant-7.png",
    "/participant-8.png",
    "/participant-9.png",
];

export function ParticipantsCarousel() {
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % images.length);
        }, 6000); // Slower: 6 seconds
        return () => clearInterval(timer);
    }, []);

    const handleNext = () => {
        setStartIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setStartIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Get 5 consecutive images starting from startIndex
    const visibleImages = Array.from({ length: 5 }, (_, i) => {
        const index = (startIndex + i) % images.length;
        return { src: images[index], position: i };
    });

    // Scale factors: edges smallest, center largest
    const getScale = (position: number) => {
        if (position === 2) return 1.2; // Center
        if (position === 1 || position === 3) return 1.1; // Near center
        return 1.0; // Edges
    };

    const getZIndex = (position: number) => {
        if (position === 2) return 50; // Center
        if (position === 1 || position === 3) return 40; // Near center
        return 30; // Edges
    };

    return (
        <div className="relative w-full flex items-center justify-center gap-4 md:gap-6 py-8">
            {/* Left Arrow */}
            <button
                onClick={handlePrev}
                className="absolute left-0 md:left-4 z-[60] bg-brand-yellow/20 hover:bg-brand-yellow/40 backdrop-blur-sm border-2 border-brand-yellow/50 text-brand-yellow p-3 rounded-full transition-all hover:scale-110 group"
                aria-label="Previous"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-[-2px] transition-transform"
                >
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/* Carousel Container */}
            <div className="relative flex items-center justify-center gap-4 md:gap-6 overflow-hidden px-16">
                <AnimatePresence mode="popLayout">
                    {visibleImages.map(({ src, position }) => (
                        <motion.div
                            key={`${src}-${startIndex}`}
                            className="relative bg-zinc-900 shadow-2xl overflow-hidden"
                            style={{
                                width: `${120 * getScale(position)}px`,
                                height: `${160 * getScale(position)}px`,
                                zIndex: getZIndex(position),
                            }}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{
                                duration: 1.2,
                                ease: "easeInOut",
                                delay: position * 0.1 // Stagger animation
                            }}
                        >
                            <div className="relative w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                <Image
                                    src={src}
                                    alt="Participant"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Tactical Overlay Elements - only on center */}
                                {position === 2 && (
                                    <>
                                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-brand-yellow/70" />
                                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-brand-yellow/70" />
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button
                onClick={handleNext}
                className="absolute right-0 md:right-4 z-[60] bg-brand-yellow/20 hover:bg-brand-yellow/40 backdrop-blur-sm border-2 border-brand-yellow/50 text-brand-yellow p-3 rounded-full transition-all hover:scale-110 group"
                aria-label="Next"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-[2px] transition-transform"
                >
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}
