import type { Variants } from "motion/react";
import { exit } from "process";

// A smooth "fast start, gentle stop" curve used across the site.
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// For people who prefer reduced motion: a quick fade, no movement.
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.3 } },
};

// `custom` is passed in from the component: here it is the delay in seconds.
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: EASE_OUT, delay },
    }),
};

// The burger drops in and bounces: a low `damping` value makes the spring overshoot.
export const dropIn: Variants = {
    hidden: { opacity: 0, y: -160, scale: 0.92 },
    show: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay,
            type: "spring" as const,
            stiffness: 120,
            damping: 10,
            mass: 1,
            opacity: { duration: 0.35, delay }, // fade in fast while it falls
        },
    }),
};

// The ground shadow grows as the burger lands.
export const shadowGrow: Variants = {
    hidden: { opacity: 0, scale: 0.4 },
    show: (delay: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.9, ease: EASE_OUT, delay },
    }),
};

// A little springy "pop" for each thumbnail.
export const popIn: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.8 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
};

// A parent variant that makes its children start one after another.
export const staggerChildren = (stagger: number = 0.08, delay: number = 0): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});



// swapping between slides 
// custom is the direction: 1 = going to the next slide, -1 = going back.
export const burgerSwap: Variants = {
    enter: (direction: number) => ({ opacity: 0, scale: 0.7, rotate: direction * 70 }),
    center: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring" as const,
            stiffness: 160,
            damping: 14,
            opacity: { duration: 0.25 }, // a spring could overshoot opacity, so fade plainly
        },
    },

    exit: (direction: number) => ({
        opacity: 0,
        scale: 0.7,
        rotate: direction * -70,
        transition: { duration: 0.28, ease: EASE_OUT },
    }),
};


// caption and price: slide up and fade.
export const textSwap: Variants = {
    enter: { opacity: 0, y: 14 },
    center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT }},
    exit: { opacity: 0, y: -14, transition: { duration: 0.2 } },
};


// Reduced motion: a plain crossfade.
export const fadeSwap: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};