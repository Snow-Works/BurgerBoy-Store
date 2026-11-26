"use client"; // uses state (the active burger) and click handlers

import { useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import Button from "@/components/ui/Button";
import Dots from "@/components/ui/Dots";
import SmartImage from "@/components/ui/SmartImage";
import Thumbnail from "@/components/ui/Thumbnail";
import { burgers } from "@/data/burgers";
import { siteConfig } from "@/data/siteConfig";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { formatPrice } from "@/lib/format";
import styles from "./Hero.module.css";

export default function Hero() {
    // The ONE piece of state: which burger is showing. Everything else derives from it.
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollToSection = useScrollToSection();

    const burger = burgers[activeIndex];

    const handleScrollClick = (event: MouseEvent<HTMLElement>, href: string) => {
        event.preventDefault();
        scrollToSection(href); // quietly does nothing if the section doesn't exist yet
    };

    // We hand the active accent color to CSS as a custom property (--slide-accent).
    // TypeScript doesn't know custom properties, so `as CSSProperties` tells it "trust me".
    const heroStyle = { "--slide-accent": burger.accent } as CSSProperties;

    return (
        <section id="home" className={styles.hero} style={heroStyle}>
            <div className={`container ${styles.grid}`}>
                <div className={styles.copy}>
                    <div className={styles.text}>
                        <h1 className={styles.heading}>
                            <span className={styles.eyebrow}>The Ultimate</span>
                            <span className={styles.title}>Burger Club</span>
                        </h1>
                        <p className={styles.tagline}>{siteConfig.tagline}</p>
                    </div>

                    <div className={styles.actions}>
                        <Button href="#menu" onClick={(event) => handleScrollClick(event, "#menu")}>
                            Order Now
                        </Button>
                        {/* TODO: the Join the Club section arrives in a later step */}
                        <Button
                            href="#join"
                            variant="outline"
                            onClick={(event) => handleScrollClick(event, "#join")}
                        >
                            Join the Club
                        </Button>
                    </div>

                    <div className={styles.thumbs} role="group" aria-label="Choose a burger">
                        {burgers.map((item, index) => (
                            <Thumbnail
                                key={item.id}
                                src={item.thumbnail}
                                label={`Show ${item.name}`}
                                index={index}
                                isActive={index === activeIndex}
                                onSelect={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.stage}>
                    <div className={styles.burgerWrap}>
                        <div className={styles.glow} aria-hidden="true" />
                        <div className={styles.shadow} aria-hidden="true" />
                        <div className={styles.burgerImage}>
                            <SmartImage
                                src={burger.image}
                                alt={`${burger.name} burger`}
                                sizes="(min-width: 1024px) 42vw, 80vw"
                                priority
                                className={styles.image}
                                placeholderLabel={`Missing ${burger.image}`}
                            />
                        </div>
                    </div>

                    <div className={styles.info} aria-live="polite">
                        <span className="visually-hidden">{burger.name}, </span>
                        <p className={styles.caption}>{burger.caption}</p>
                        <p className={styles.price}>{formatPrice(burger.price)}</p>
                    </div>
                </div>

                <div className={styles.dotsWrap}>
                    <Dots
                        count={burgers.length}
                        activeIndex={activeIndex}
                        labels={burgers.map((item) => `Show ${item.name}`)}
                        groupLabel="Choose a burger"
                        onSelect={setActiveIndex}
                    />
                </div>
            </div>
        </section>
    );
}