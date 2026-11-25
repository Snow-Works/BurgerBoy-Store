import { useCallback } from "react";
import { useLenis } from "lenis/react";

// Returns a function that smoothly scrolls to a section, e.g. scrollTo("#menu").
export function useScrollToSection() {
    const lenis = useLenis(); // undefined when smooth scrolling is off (reduced motion)

    return useCallback(
        (href: string) => {
            const target = document.getElementById(href.replace("#", ""));
            if (!target) return; // the section doesn't exist yet (About, Shop)

            if (lenis) {
                // force: true works even if Lenis was paused by the open drawer
                lenis.scrollTo(target, { force: true });
            } else {
                target.scrollIntoView({ behavior: "auto" });
            }
            window.history.replaceState(null, "", href); // keep the URL hash in sync
        },
        [lenis],
    );
}