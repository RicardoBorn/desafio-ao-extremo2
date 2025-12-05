"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getParticipants, type Participant } from "@/lib/rankingStorage";

export function ParticipantsCarousel() {
    const [startIndex, setStartIndex] = useState(0);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const data = await getParticipants();
            setParticipants(data);
            setIsLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        if (participants.length === 0) return;

        const timer = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % participants.length);
        }, 6000); // Slower: 6 seconds
        return () => clearInterval(timer);
    }, [participants.length]);

    const handleNext = () => {
        if (participants.length === 0) return;
        setStartIndex((prev) => (prev + 1) % participants.length);
    };

    const handlePrev = () => {
        if (participants.length === 0) return;
        setStartIndex((prev) => (prev - 1 + participants.length) % participants.length);
    };

    // Convert channel name/handle to YouTube URL
    const getYouTubeUrl = (channel: string): string => {
        if (!channel) return "#";

        // If already starts with @, use it directly
        if (channel.startsWith("@")) {
            return `https://youtube.com/${channel}`;
        }

        // Otherwise, add @ prefix
        return `https://youtube.com/@${channel.replace(/\s+/g, "")}`;
    };

    if (isLoading || participants.length === 0) {
        return null; // Don't show carousel if loading or no participants
    }

    // Get 5 consecutive images starting from startIndex
    // Handle case where we have fewer than 5 participants by repeating
    const visibleImages = Array.from({ length: 5 }, (_, i) => {
        const index = (startIndex + i) % participants.length;
        return {
            src: participants[index].imageUrl,
            channel: participants[index].channel,
            name: participants[index].name,
            id: participants[index].id,
            position: i
        };
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
                    {visibleImages.map(({ src, channel, name, id, position }) => (
                        <motion.div
                            key={`${id}-${startIndex}-${position}`}
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
                            <a
                                href={getYouTubeUrl(channel)}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visitar canal de ${name} no YouTube`}
                                className="block w-full h-full group"
                            >
                                <div className="relative w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105">
                                    <Image
                                        src={src}
                                        alt={`${name} - Participante`}
                                        fill
                                        className="object-cover object-top"
                                        sizes="200px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Tactical Overlay Elements - only on center */}
                                    {position === 2 && (
                                        <>
                                            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-brand-yellow/70 group-hover:border-brand-yellow transition-colors" />
                                            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-brand-yellow/70 group-hover:border-brand-yellow transition-colors" />
                                        </>
                                    )}

                                    {/* YouTube Icon Overlay on Hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-red-600 rounded-full p-3 shadow-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="white"
                                            >
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
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
