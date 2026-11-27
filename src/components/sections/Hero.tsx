"use client"; // uses state, motion values, timers and pointer events

import { Fragment, useState } from "react";
import type { CSSProperties, FocusEvent, MouseEvent, PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionStyle } from "motion/react";
import { Pause, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Dots from "@/components/ui/Dots";
import SmartImage from "@/components/ui/SmartImage";
import Thumbnail from "@/components/ui/Thumbnail";
import MagneticButton from "@/components/motion/MagneticButton";
import { burgers } from "@/data/burgers";
import { siteConfig } from "@/data/siteConfig";
import { useAutoplay } from "@/hooks/useAutoplay";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { formatPrice } from "@/lib/format";
import {
  burgerSwap,
  dropIn,
  fadeIn,
  fadeSwap,
  fadeUp,
  popIn,
  shadowGrow,
  staggerChildren,
  textSwap,
} from "@/lib/motion";
import styles from "./Hero.module.css";

const TITLE_WORDS = ["Burger", "Club"];
const thumbStagger = staggerChildren(0.09, 0.95);

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [userPaused, setUserPaused] = useState(false); // the pause button
  const [isHovering, setIsHovering] = useState(false); // mouse over the slider
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const scrollToSection = useScrollToSection();
  const reduceMotion = useReducedMotion();

  const burger = burgers[activeIndex];

  // Reduced motion: every animation becomes a plain fade.
  const rise = reduceMotion ? fadeIn : fadeUp;
  const drop = reduceMotion ? fadeIn : dropIn;
  const grow = reduceMotion ? fadeIn : shadowGrow;
  const pop = reduceMotion ? fadeIn : popIn;
  const swap = reduceMotion ? fadeSwap : burgerSwap;
  const textVariants = reduceMotion ? fadeSwap : textSwap;

  // --- Changing slides -------------------------------------------------------
  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setActiveIndex(index);
  };
  const select = (index: number) => {
    if (index !== activeIndex) goTo(index, index > activeIndex ? 1 : -1);
  };
  const next = () => goTo((activeIndex + 1) % burgers.length, 1);
  const previous = () => goTo((activeIndex - 1 + burgers.length) % burgers.length, -1);

  // --- Autoplay --------------------------------------------------------------
  const autoplayPaused = userPaused || isHovering || isKeyboardFocus || Boolean(reduceMotion);
  const progress = useAutoplay({
    onNext: next,
    paused: autoplayPaused,
    resetKey: activeIndex,
    duration: 5000,
    initialDelay: 1500, // wait for the entrance animation first
  });
  const showRing = !reduceMotion && !userPaused;

  // Hover pauses autoplay, but only for a real mouse (not touch).
  const hoverProps = {
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "mouse") setIsHovering(true);
    },
    onPointerLeave: () => setIsHovering(false),
  };

  // Keyboard focus pauses autoplay. :focus-visible is true for keyboard focus
  // but not after a mouse click, so clicking a thumbnail won't freeze autoplay.
  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.target.matches(":focus-visible")) setIsKeyboardFocus(true);
  };
  const handleBlur = () => setIsKeyboardFocus(false);

  // --- Cursor tilt (from Step 4A) --------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.6 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const shiftX = useTransform(springX, [-0.5, 0.5], [-20, 20]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  // ---------------------------------------------------------------------------

  const handleScrollClick = (event: MouseEvent<HTMLElement>, href: string) => {
    event.preventDefault();
    scrollToSection(href);
  };

  const heroStyle = { "--slide-accent": burger.accent } as CSSProperties;
  // Same accent variable, typed for Motion elements. Each keyed block below
  // keeps ITS OWN accent while it fades out, so colors never flip early.
  const accentStyle = { "--slide-accent": burger.accent } as MotionStyle;

  return (
    <section
      id="home"
      className={styles.hero}
      style={heroStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
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
                      custom={0.25 + index * 0.12}
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

          <motion.div
            className={styles.thumbs}
            role="group"
            aria-label="Choose a burger"
            variants={thumbStagger}
            initial="hidden"
            animate="show"
            {...hoverProps}
          >
            {burgers.map((item, index) => (
              <motion.div key={item.id} variants={pop}>
                <Thumbnail
                  src={item.thumbnail}
                  label={`Show ${item.name}`}
                  index={index}
                  isActive={index === activeIndex}
                  onSelect={() => select(index)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className={styles.stage} {...hoverProps}>
          <div className={styles.burgerWrap}>
            {/* The glow crossfades: the old one fades out while the new one fades in */}
            <AnimatePresence>
              <motion.div
                key={burger.id}
                className={styles.glow}
                style={accentStyle}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>

            <motion.div
              className={styles.shadow}
              aria-hidden="true"
              variants={grow}
              initial="hidden"
              animate="show"
              custom={0.5}
            />

            {/* Layer 1: the drop-in on load. Layer 2: float + cursor tilt. */}
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
                {/* Layer 3: the slide. A new key = exit animation, then the next one enters. */}
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={burger.id}
                    className={styles.slide}
                    custom={direction}
                    variants={swap}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.3}
                    dragSnapToOrigin
                    onDragEnd={(_, info) => {
                      // Swipe: far enough, or fast enough.
                      if (info.offset.x < -60 || info.velocity.x < -500) next();
                      else if (info.offset.x > 60 || info.velocity.x > 500) previous();
                    }}
                  >
                    <SmartImage
                      src={burger.image}
                      alt={`${burger.name} burger`}
                      sizes="(min-width: 1024px) 42vw, 80vw"
                      priority={activeIndex === 0}
                      className={styles.image}
                      placeholderLabel={`Missing ${burger.image}`}
                    />
                  </motion.div>
                </AnimatePresence>
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={burger.id}
                className={styles.infoInner}
                style={accentStyle}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <span className="visually-hidden">{burger.name}, </span>
                <p className={styles.caption}>{burger.caption}</p>
                <p className={styles.price}>{formatPrice(burger.price)}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          className={styles.dotsWrap}
          variants={rise}
          initial="hidden"
          animate="show"
          custom={1.3}
          {...hoverProps}
        >
          <div className={styles.controls}>
            <Dots
              count={burgers.length}
              activeIndex={activeIndex}
              labels={burgers.map((item) => `Show ${item.name}`)}
              groupLabel="Choose a burger"
              onSelect={select}
              progress={showRing ? progress : undefined}
            />
            {/* Autoplay needs a pause control. With reduced motion there is no autoplay. */}
            {!reduceMotion && (
              <button
                type="button"
                className={styles.pause}
                onClick={() => setUserPaused((paused) => !paused)}
                aria-label={userPaused ? "Resume automatic slideshow" : "Pause automatic slideshow"}
              >
                {userPaused ? (
                  <Play size={14} aria-hidden="true" />
                ) : (
                  <Pause size={14} aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}