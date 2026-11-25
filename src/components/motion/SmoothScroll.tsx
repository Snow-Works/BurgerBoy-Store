"use client"; //Lenis and hooks need the browser, so this is a client component.

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";


interface SmoothScrollProps {
    children: ReactNode; // ReactNode = "anything react can render"
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const reduceMotion = useReducedMotion();

    //People who asked their OS for less motion get normal scrolling.
    if (reduceMotion) return <>{children}</>;

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
        {children}
        </ReactLenis>
    );
}
