"use client"; // uses refs, motion values and pointer events

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

interface MagneticButtonProps {
    children: ReactNode;
    strength?: number; // 0 = no pull, 1 = the button sticks to the cursor
}

export default function MagneticButton({ children, strength = 0.3 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);
    const reduceMotion = useReducedMotion();

    // Motion values: numbers that animate WITHOUT re-rendering this component.
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    // A spring wrapper: the button follows x/y with a soft, bouncy delay.
    const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

    const handleEnter = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse") return;
        // Measure once on enter. (Measuring while it moves would make it jittery.)
        rectRef.current = ref.current?.getBoundingClientRect() ?? null;
    };

    const handleMove = (event: PointerEvent<HTMLDivElement>) => {
        const rect = rectRef.current;
        if (reduceMotion || event.pointerType !== "mouse" || !rect) return;
        // Distance from the button's center to the cursor, multiplied by strength.
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleLeave = () => {
        rectRef.current = null;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY, display: "inline-block" }}
            onPointerEnter={handleEnter}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
        >
            {children}
        </motion.div>
    );
}