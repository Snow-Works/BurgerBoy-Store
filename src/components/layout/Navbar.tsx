"use client"; // uses state, effects and browser scroll events

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Button from "@/components/ui/Button";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { navLinks } from "@/data/navLinks";
import { siteConfig } from "@/data/siteConfig";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import styles from "./Navbar.module.css";

// Built once, outside the component, so the array never changes between renders.
const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const { isScrolled, isFarDown, direction } = useScrollDirection();
    const activeId = useActiveSection(sectionIds);
    const scrollToSection = useScrollToSection();

    // useCallback keeps the same function between renders (the drawer relies on that).
    const closeDrawer = useCallback(() => setDrawerOpen(false), []);

    // If the window becomes desktop-wide while the drawer is open, close it.
    useEffect(() => {
        const query = window.matchMedia("(min-width: 1024px)");
        const onChange = (event: MediaQueryListEvent) => {
            if (event.matches) setDrawerOpen(false);
        };
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    const handleNavigate = useCallback(
        (event: MouseEvent<HTMLElement>, href: string) => {
            event.preventDefault();
            setDrawerOpen(false);
            // Small delay: lets the drawer finish releasing the page scroll first.
            window.setTimeout(() => scrollToSection(href), 60);
        },
        [scrollToSection],
    );

    const hidden = direction === "down" && isFarDown && !drawerOpen;

    const headerClass = [
        styles.header,
        isScrolled && styles.scrolled,
        hidden && styles.hidden,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <header className={headerClass}>
                {/* Decorative background bar. It scales and fades in when scrolled. */}
                <div className={styles.bar} aria-hidden="true" />

                <div className={`container ${styles.inner}`}>
                    <a
                        href="#home"
                        className={styles.logo}
                        aria-label={`${siteConfig.name} home`}
                        onClick={(event) => handleNavigate(event, "#home")}
                    >
                        {siteConfig.name}
                    </a>

                    <nav className={styles.nav} aria-label="Primary">
                        <ul className={styles.links}>
                            {navLinks.map((link) => {
                                const isActive = activeId === link.href.replace("#", "");
                                return (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className={`${styles.link} ${isActive ? styles.active : ""}`}
                                            aria-current={isActive ? "true" : undefined}
                                            onClick={(event) => handleNavigate(event, link.href)}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className={styles.actions}>
                        <div className={styles.order}>
                            <Button
                                href="#menu"
                                size="sm"
                                onClick={(event) => handleNavigate(event, "#menu")}
                            >
                                Order Now
                            </Button>
                        </div>

                        <button
                            ref={menuButtonRef}
                            type="button"
                            className={styles.menuButton}
                            aria-label="Open menu"
                            aria-expanded={drawerOpen}
                            aria-controls="mobile-drawer"
                            onClick={() => setDrawerOpen(true)}
                        >
                            <span className={styles.line} />
                            <span className={styles.line} />
                            <span className={styles.line} />
                        </button>
                    </div>
                </div>
            </header>

            {/* A sibling of <header>, not a child: a transformed parent would break position: fixed. */}
            <MobileDrawer
                isOpen={drawerOpen}
                links={navLinks}
                activeId={activeId}
                onClose={closeDrawer}
                onNavigate={handleNavigate}
                returnFocusRef={menuButtonRef}
            />
        </>
    );
}