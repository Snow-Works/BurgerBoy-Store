import { useEffect, useRef, useState } from "react";
import { useMotionValue } from "motion/react";
import type { MotionValue } from "motion/react";

interface UseAutoplayOptions {
    onNext: () => void; // called when the countdown finishes
    paused: boolean;
    resetKey: number | string; // when this changes, the countdown restarts
    duration?: number; // ms per slide
    initialDelay?: number; // ms to wait on first load (lets the entrance animation finish)
}

// Returns a motion value from 0 to 1: how far through the current slide we are.
// The progress ring reads it, and when it reaches 1 we go to the next slide.
export function useAutoplay({
    onNext,
    paused,
    resetKey,
    duration = 5000,
    initialDelay = 0,
}: UseAutoplayOptions): MotionValue<number> {
    const progress = useMotionValue(0);
    const onNextRef = useRef(onNext);
    const elapsedRef = useRef(-initialDelay); // negative = still in the initial delay
    const lastKeyRef = useRef(resetKey);
    const [tabHidden, setTabHidden] = useState(false);

    // Always call the latest onNext, without restarting the countdown when it changes.
    useEffect(() => {
        onNextRef.current = onNext;
    });

    // Pause while the browser tab is hidden.
    useEffect(() => {
        const onVisibilityChange = () => setTabHidden(document.hidden);
        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    }, []);

    useEffect(() => {
        // A new slide was chosen: start counting from zero again.
        if (lastKeyRef.current !== resetKey) {
            lastKeyRef.current = resetKey;
            elapsedRef.current = 0;
            progress.set(0);
        }

        // While paused we do nothing, but `elapsedRef` keeps the time already spent,
        // so resuming continues where we stopped.
        if (paused || tabHidden) return;

        let frame = 0;
        let last = performance.now();

        const tick = (now: number) => {
            // Cap each step so one laggy frame cannot skip ahead.
            elapsedRef.current += Math.min(now - last, 100);
            last = now;

            const ratio = Math.min(Math.max(elapsedRef.current, 0) / duration, 1);
            progress.set(ratio);

            if (ratio >= 1) {
                onNextRef.current(); // the slide changes, resetKey changes, this effect restarts
                return;
            }
            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [paused, tabHidden, resetKey, duration, progress]);

    return progress;
}