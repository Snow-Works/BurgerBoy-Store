"use client"; // uses scroll-linked motion values

import { motion, useReducedMotion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import SmartImage from "@/components/ui/SmartImage";
import { decorations } from "@/data/decorations";
import type { Decoration } from "@/types/decoration";
import styles from "./MenuDecorations.module.css";

interface DecorationItemProps {
    item: Decoration;
    progress: MotionValue<number>;
    still: boolean; // true = reduced motion, so no drifting
}

// One decoration per component, because a hook (useTransform) can't be called inside a loop.
function DecorationItem({ item, progress, still }: DecorationItemProps) {
    // progress 0 -> 1 becomes +drift -> -drift: the picture slides as the page scrolls.
    const y = useTransform(progress, [0, 1], [item.drift, -item.drift]);
    const maxWidth = Math.round(item.size * 17.28); // the size it has on a 1728px screen

    return (
        <motion.div
            className={styles.item}
            style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                width: `clamp(110px, ${item.size}vw, ${maxWidth}px)`,
                y: still ? 0 : y,
            }}
        >
            <SmartImage
                src={item.src}
                alt=""
                sizes="(min-width: 1024px) 400px, 25vw"
                className={styles.image}
                placeholderLabel={`Missing ${item.src}`}
            />
        </motion.div>
    );
}

interface MenuDecorationsProps {
    progress: MotionValue<number>;
}

export default function MenuDecorations({ progress }: MenuDecorationsProps) {
    const reduceMotion = useReducedMotion();

    return (
        <>
            {decorations.map((item) => (
                <DecorationItem
                    key={item.id}
                    item={item}
                    progress={progress}
                    still={Boolean(reduceMotion)}
                />
            ))}
        </>
    );
}