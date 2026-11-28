"use client"; // uses state, motion values and pointer events

import { Fragment, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent } from "react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "motion/react";
import Button from "@/components/ui/Button";
import Dots from "@/components/ui/Dots";
import SmartImage from "@/components/ui/SmartImage";
import Thumbnail from "@/components/ui/Thumbnail";
import MagneticButton from "@/components/motion/MagneticButton";
import { burgers } from "@/data/burgers";
import { siteConfig } from "@/data/siteConfig";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { formatPrice } from "@/lib/format";
import { dropIn, fadeIn, fadeUp, popIn, shadowGrow, staggerChildren } from "@/lib/motion";
import styles from "./Hero.module.css";

const TITLE_WORDS = ["Burger", "Club"];
// Thumbnails start after 0.95s, then one every 0.09s.
const thumbStagger = staggerChildren(0.09, 0.95);

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollToSection = useScrollToSection();
    const reduceMotion = useReducedMotion();

    const burger = burgers[activeIndex];

    // Reduced motion: every animation becomes a plain fade.
    const rise = reduceMotion ? fadeIn : fadeUp;
    const drop = reduceMotion ? fadeIn : dropIn;
    const grow = reduceMotion ? fadeIn : shadowGrow;
    const pop = reduceMotion ? fadeIn : popIn;

    // --- Cursor tilt ---------------------------------------------------------
    // mouseX / mouseY run from -0.5 (left/top edge) to +0.5 (right/bottom edge).
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.6 });
    const springY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.6 });
    // useTransform converts one range of numbers into another.
    const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
    const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
    const shiftX = useTransform(springX, [-0.5, 0.5], [-20, 20]);

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        // Mouse only: touch and pen never trigger the tilt.
        if (reduceMotion || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    const handlePointerLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };
    // -------------------------------------------------------------------------

    const handleScrollClick = (event: MouseEvent<HTMLElement>, href: string) => {
        event.preventDefault();
        scrollToSection(href);
    };

    const heroStyle = { "--slide-accent": burger.accent } as CSSProperties;

    return (
        <section
            id="home"
            className={styles.hero}
            style={heroStyle}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <div className={`container ${styles.grid}`}>
                <div className={styles.copy}>
                    <div className={styles.text}>
                        <h1 className={styles.heading}>
                            <motion.span
                                className={styles.eyebrow}
                                variants={rise}
                                initial="hidden"
                                animate="show"
                                custom={0.1}
                            >
                                The Ultimate
                            </motion.span>

                            <span className={styles.title}>
                                {TITLE_WORDS.map((word, index) => (
                                    <Fragment key={word}>
                                        {index > 0 && " "}
                                        <motion.span
                                            className={styles.word}
                                            variants={rise}
                                            initial="hidden"
                                            animate="show"
                                            custom={0.25 + index * 0.12} // each word starts a little later
                                        >
                                            {word}
                                        </motion.span>
                                    </Fragment>
                                ))}
                            </span>
                        </h1>

                        <motion.p
                            className={styles.tagline}
                            variants={rise}
                            initial="hidden"
                            animate="show"
                            custom={0.55}
                        >
                            {siteConfig.tagline}
                        </motion.p>
                    </div>

                    <motion.div
                        className={styles.actions}
                        variants={rise}
                        initial="hidden"
                        animate="show"
                        custom={0.7}
                    >
                        <MagneticButton>
                            <Button href="#menu" onClick={(event) => handleScrollClick(event, "#menu")}>
                                Order Now
                            </Button>
                        </MagneticButton>
                        {/* TODO: the Join the Club section arrives in a later step */}
                        <MagneticButton>
                            <Button
                                href="#join"
                                variant="outline"
                                onClick={(event) => handleScrollClick(event, "#join")}
                            >
                                Join the Club
                            </Button>
                        </MagneticButton>
                    </motion.div>

                    {/* This parent has its own variants; its children inherit "hidden"/"show" from it */}
                    <motion.div
                        className={styles.thumbs}
                        role="group"
                        aria-label="Choose a burger"
                        variants={thumbStagger}
                        initial="hidden"
                        animate="show"
                    >
                        {burgers.map((item, index) => (
                            <motion.div key={item.id} variants={pop}>
                                <Thumbnail
                                    src={item.thumbnail}
                                    label={`Show ${item.name}`}
                                    index={index}
                                    isActive={index === activeIndex}
                                    onSelect={() => setActiveIndex(index)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <div className={styles.stage}>
                    <div className={styles.burgerWrap}>
                        <div className={styles.glow} aria-hidden="true" />

                        <motion.div
                            className={styles.shadow}
                            aria-hidden="true"
                            variants={grow}
                            initial="hidden"
                            animate="show"
                            custom={0.5}
                        />

                        {/* Outer layer: the drop-in. Inner layer: float + cursor tilt. */}
                        <motion.div
                            className={styles.burgerImage}
                            variants={drop}
                            initial="hidden"
                            animate="show"
                            custom={0.3}
                        >
                            <motion.div
                                className={styles.alive}
                                style={{ rotateX, rotateY, x: shiftX, transformPerspective: 900 }}
                                animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, 1.2, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <SmartImage
                                    src={burger.image}
                                    alt={`${burger.name} burger`}
                                    sizes="(min-width: 1024px) 42vw, 80vw"
                                    priority
                                    className={styles.image}
                                    placeholderLabel={`Missing ${burger.image}`}
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        className={styles.info}
                        aria-live="polite"
                        variants={rise}
                        initial="hidden"
                        animate="show"
                        custom={1}
                    >
                        <span className="visually-hidden">{burger.name}, </span>
                        <p className={styles.caption}>{burger.caption}</p>
                        <p className={styles.price}>{formatPrice(burger.price)}</p>
                    </motion.div>
                </div>

                <motion.div
                    className={styles.dotsWrap}
                    variants={rise}
                    initial="hidden"
                    animate="show"
                    custom={1.3}
                >
                    <Dots
                        count={burgers.length}
                        activeIndex={activeIndex}
                        labels={burgers.map((item) => `Show ${item.name}`)}
                        groupLabel="Choose a burger"
                        onSelect={setActiveIndex}
                    />
                </motion.div>
            </div>
        </section>
    );
}