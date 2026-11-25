import { useEffect, useState } from "react";

// Tells us which section (by id) is currently in the middle of the screen.
// IMPORTANT: pass a stable array (created outside the component), otherwise
// the effect below would restart on every render.
export function useActiveSection(ids: string[]): string {
    const [activeId, setActiveId] = useState(ids[0] ?? "");

    useEffect(() => {
        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null); // skip sections that don't exist yet

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            // A thin band around the middle of the screen decides the "active" section.
            { rootMargin: "-45% 0px -50% 0px" },
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ids]);

    return activeId;
}