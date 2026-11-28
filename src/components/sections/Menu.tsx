"use client"; // uses refs, scroll tracking and the carousel hook

import { useRef } from "react";
import { useScroll } from "motion/react";
import CategoryCard from "@/components/ui/CategoryCard";
import Dots from "@/components/ui/Dots";
import SectionHeading from "@/components/ui/SectionHeading";
import MenuDecorations from "@/components/sections/MenuDecorations";
import { categories } from "@/data/categories";
import { useScrollPages } from "@/hooks/useScrollPages";
import styles from "./Menu.module.css";

export default function Menu() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // 0 when the section's top enters the bottom of the screen, 1 when its bottom leaves the top.
    // The background decorations use it to drift as you scroll (Step 5C).
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // The mobile carousel: how many pages, which one is showing, and how to jump to one.
    const { pages, activePage, scrollToPage } = useScrollPages(listRef);

    return (
        <section
            id="menu"
            ref={sectionRef}
            className={styles.menu}
            aria-labelledby="menu-title"
        >
            <div className={styles.decor} aria-hidden="true">
                <MenuDecorations progress={scrollYProgress} />
            </div>

            <div className={`container ${styles.content}`}>
                <SectionHeading id="menu-title">Menu</SectionHeading>

                <ul ref={listRef} className={styles.list} role="list">
                    {categories.map((category, index) => (
                        <CategoryCard key={category.id} category={category} index={index} />
                    ))}
                </ul>

                {/* Dots only make sense for the mobile carousel */}
                <div className={styles.dots}>
                    <Dots
                        count={pages}
                        activeIndex={activePage}
                        labels={Array.from({ length: pages }, (_, index) => `Show menu page ${index + 1}`)}
                        groupLabel="Menu pages"
                        onSelect={scrollToPage}
                    />
                </div>
            </div>
        </section>
    );
}