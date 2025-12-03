"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function TacticalMapBackground() {
    // Use lazy initializer to avoid hydration issues and lint warnings
    const [windowSize, setWindowSize] = useState(() => {
        if (typeof window !== 'undefined') {
            return { width: window.innerWidth, height: window.innerHeight };
        }
        return { width: 0, height: 0 };
    });

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transform mouse position to background movement (parallax effect)
    // Moving mouse right moves background left (negative value)
    const x = useTransform(springX, [0, windowSize.width], [20, -20]);
    const y = useTransform(springY, [0, windowSize.height], [20, -20]);

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute inset-[-5%] w-[110%] h-[110%]"
                style={{ x, y }}
            >
                {/* Texture Image Background */}
                <div
                    className="absolute inset-0 bg-[url('/texture.png')] bg-cover bg-center opacity-40 mix-blend-overlay"
                />
                <div
                    className="absolute inset-0 bg-[url('/texture.png')] bg-cover bg-center opacity-20"
                />
            </motion.div>

            {/* Vignette Overlay to keep focus on center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_95%)]" />
        </div>
    );
}
