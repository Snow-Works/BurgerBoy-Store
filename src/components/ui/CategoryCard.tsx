"use client"; // uses motion values, refs and pointer events

import { useRef } from "react";
import type { MouseEvent, PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import SmartImage from "@/components/ui/SmartImage";
import { fadeIn, fadeUp } from "@/lib/motion";
import type { Category } from "@/types/category";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
    category: Category;
    index: number; // used to stagger the reveal
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
    const itemRef = useRef<HTMLLIElement>(null);
    const reduceMotion = useReducedMotion();

    // Tilt toward the cursor (mouse only), smoothed with springs.
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const rotateX = useSpring(tiltX, { stiffness: 200, damping: 18, mass: 0.5 });
    const rotateY = useSpring(tiltY, { stiffness: 200, damping: 18, mass: 0.5 });

    const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
        // Measure the outer <li> (it never tilts), so the numbers stay stable.
        const rect = itemRef.current?.getBoundingClientRect();
        if (reduceMotion || event.pointerType !== "mouse" || !rect) return;
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        tiltY.set(px * 14);
        tiltX.set(py * -14);
    };

    const handlePointerLeave = () => {
        tiltX.set(0);
        tiltY.set(0);
    };

    // Until the store exists, "#..." links go nowhere, so don't let them jump the page.
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (category.href.startsWith("#")) event.preventDefault(); // TODO(store)
    };

    // Stagger: cards in a row start 0.08s apart, and each row 0.12s after the last.
    const delay = (index % 4) * 0.08 + Math.floor(index / 4) * 0.12;

    return (
        // Outer layer: the scroll reveal. Inner layer: hover lift + tilt. Separate layers, separate transforms.
        <motion.li
            ref={itemRef}
            className={styles.item}
            variants={reduceMotion ? fadeIn : fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            custom={delay}
        >
            <motion.a
                href={category.href}
                className={styles.card}
                style={{ rotateX, rotateY, transformPerspective: 800 }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onClick={handleClick}
            >
                <div className={styles.media}>
                    {/* alt="" because the label text below already names the card */}
                    <SmartImage
                        src={category.image}
                        alt=""
                        sizes="(min-width: 1024px) 200px, 45vw"
                        className={styles.image}
                        placeholderLabel={category.label}
                    />
                </div>

                {category.badge && <span className={styles.badge}>{category.badge}</span>}
                <span className={styles.label}>{category.label}</span>
            </motion.a>
        </motion.li>
    );
}