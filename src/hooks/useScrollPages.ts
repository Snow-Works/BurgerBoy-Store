import { useCallback, useEffect, useState } from "react";
import type { RefObject } from "react";

// For a horizontal scroller: how many "pages" it has, which one we're on,
// and a function to jump to a page (used by the dots).
export function useScrollPages(ref: RefObject<HTMLElement | null>) {
    const [pages, setPages] = useState(1);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let ticking = false;

        const measure = () => {
            ticking = false;
            const maxScroll = element.scrollWidth - element.clientWidth;
            const count =
                maxScroll <= 1 ? 1 : Math.ceil(element.scrollWidth / element.clientWidth);
            const ratio = maxScroll <= 1 ? 0 : element.scrollLeft / maxScroll;
            setPages(count);
            setActivePage(Math.round(ratio * (count - 1)));
        };

        // Limit the work to once per frame while scrolling.
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(measure);
        };

        // ResizeObserver runs `measure` once straight away and again whenever the size changes.
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        element.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            observer.disconnect();
            element.removeEventListener("scroll", onScroll);
        };
    }, [ref]);

    const scrollToPage = useCallback(
        (page: number) => {
            const element = ref.current;
            if (!element) return;
            const maxScroll = element.scrollWidth - element.clientWidth;
            const left = pages > 1 ? (maxScroll * page) / (pages - 1) : 0;
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            element.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
        },
        [pages, ref],
    );

    return { pages, activePage, scrollToPage };
}