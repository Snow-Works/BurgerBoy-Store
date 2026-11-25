import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

interface ScrollState {
    isScrolled: boolean; // scrolled a little: the navbar gets its blurred bar
    isFarDown: boolean; // scrolled far: hiding the navbar now makes sense
    direction: ScrollDirection;
}

const INITIAL_STATE: ScrollState = {
    isScrolled: false,
    isFarDown: false,
    direction: "up",
};

export function useScrollDirection(
    scrolledAfter = 40, // px
    farAfter = 240, // px
    minDelta = 8, // ignore tiny wiggles
): ScrollState {
    const [state, setState] = useState<ScrollState>(INITIAL_STATE);

    useEffect(() => {
        let lastY = window.scrollY;
        let direction: ScrollDirection = "up";
        let ticking = false;

        const update = () => {
            ticking = false;
            const y = window.scrollY;

            if (Math.abs(y - lastY) > minDelta) {
                direction = y > lastY ? "down" : "up";
                lastY = y;
            }

            const isScrolled = y > scrolledAfter;
            const isFarDown = y > farAfter;

            // Only create a new state object when something really changed,
            // so React does not re-render on every scroll pixel.
            setState((prev) =>
                prev.isScrolled === isScrolled &&
                    prev.isFarDown === isFarDown &&
                    prev.direction === direction
                    ? prev
                    : { isScrolled, isFarDown, direction },
            );
        };

        // requestAnimationFrame limits the work to once per frame.
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        // Cleanup: remove the listener when the component goes away.
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrolledAfter, farAfter, minDelta]);

    return state;
}
