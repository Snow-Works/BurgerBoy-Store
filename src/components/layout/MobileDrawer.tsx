"use client"; // uses effects, refs and the Motion animation library

import { useEffect, useRef } from "react";
import type { MouseEvent, RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";
import type { NavLink } from "@/types/nav";
import styles from "./MobileDrawer.module.css";

const FOCUSABLE = "a[href], button:not([disabled])";

interface MobileDrawerProps {
    isOpen: boolean;
    links: NavLink[];
    activeId: string;
    onClose: () => void;
    onNavigate: (event: MouseEvent<HTMLElement>, href: string) => void;
    returnFocusRef: RefObject<HTMLButtonElement | null>; // where focus goes back to
}

export default function MobileDrawer({
    isOpen,
    links,
    activeId,
    onClose,
    onNavigate,
    returnFocusRef,
}: MobileDrawerProps) {
    const reduceMotion = useReducedMotion();
    const lenis = useLenis();
    const panelRef = useRef<HTMLDivElement>(null);

    //  Lock the page scroll while the drawer is open.
    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        lenis?.stop();
        return () => {
            document.body.style.overflow = previousOverflow;
            lenis?.start();
        };
    }, [isOpen, lenis]);

    //  Focus handling: focus the first control, trap Tab, close on Escape,
    //    and return focus to the hamburger button when closed.
    useEffect(() => {
        if (!isOpen) return;

        const panel = panelRef.current;
        const getItems = () =>
            Array.from(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

        getItems()[0]?.focus({ preventScroll: true });

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            if (event.key !== "Tab") return;

            const items = getItems();
            if (items.length === 0) return;
            const first = items[0];
            const last = items[items.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener("keydown", onKeyDown);
        const returnTarget = returnFocusRef.current;

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            returnTarget?.focus({ preventScroll: true });
        };
    }, [isOpen, onClose, returnFocusRef]);

    // Animation settings. With reduced motion, everything happens instantly.
    const panelTransition: Transition = {
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
    };

    // Variants are named states. The parent "show" state staggers its children.
    const listVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: reduceMotion ? 0 : 0.07,
                delayChildren: reduceMotion ? 0 : 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: reduceMotion ? 0 : 36 },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        // AnimatePresence lets the "exit" animations play before React removes the drawer.
        <AnimatePresence>
            {isOpen && (
                <div key="drawer" className={styles.root}>
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3 }}
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    <motion.div
                        id="mobile-drawer"
                        ref={panelRef}
                        className={styles.panel}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site menu"
                        data-lenis-prevent // tells Lenis not to hijack scrolling inside the panel
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={panelTransition}
                    >
                        <div className={styles.top}>
                            <span className={styles.brand}>{siteConfig.name}</span>
                            <button
                                type="button"
                                className={styles.close}
                                onClick={onClose}
                                aria-label="Close menu"
                            >
                                <X aria-hidden="true" size={26} />
                            </button>
                        </div>

                        <motion.div
                            className={styles.content}
                            variants={listVariants}
                            initial="hidden"
                            animate="show"
                        >
                            <nav aria-label="Mobile">
                                <ul className={styles.list}>
                                    {links.map((link) => {
                                        const isActive = activeId === link.href.replace("#", "");
                                        return (
                                            <motion.li key={link.href} variants={itemVariants}>
                                                <a
                                                    href={link.href}
                                                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                                                    aria-current={isActive ? "true" : undefined}
                                                    onClick={(event) => onNavigate(event, link.href)}
                                                >
                                                    {link.label}
                                                </a>
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            </nav>

                            <motion.div className={styles.footer} variants={itemVariants}>
                                <Button href="#menu" onClick={(event) => onNavigate(event, "#menu")}>
                                    Order Now
                                </Button>
                                <p className={styles.tagline}>{siteConfig.tagline}</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}