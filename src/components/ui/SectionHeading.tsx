"use client"; // uses Motion's whileInView

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeIn, fadeUp } from "@/lib/motion";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
    children: ReactNode;
    id?: string;
}

export default function SectionHeading({ children, id }: SectionHeadingProps) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.h2
            id={id}
            className={styles.heading}
            variants={reduceMotion ? fadeIn : fadeUp}
            initial="hidden"
            whileInView="show" // plays when the heading scrolls into view
            viewport={{ once: true, amount: 0.6 }} // only once, when 60% is visible
        >
            {children}
        </motion.h2>
    );
}