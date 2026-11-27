import { motion } from "motion/react";
import type { MotionValue } from "motion/react";
import styles from "./Dots.module.css";

interface DotsProps {
  count: number;
  activeIndex: number;
  labels: string[]; // one accessible name per dot
  groupLabel: string;
  onSelect: (index: number) => void;
  progress?: MotionValue<number>; // 0 to 1: fills a ring around the active dot
}

export default function Dots({
  count,
  activeIndex,
  labels,
  groupLabel,
  onSelect,
  progress,
}: DotsProps) {
  return (
    <div className={styles.dots} role="group" aria-label={groupLabel}>
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${isActive ? styles.active : ""}`}
            aria-label={labels[index]}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect(index)}
          >
            <span className={styles.mark} />
            {isActive && progress && (
              <svg className={styles.ring} viewBox="0 0 28 28" aria-hidden="true">
                <circle className={styles.ringTrack} cx="14" cy="14" r="12" />
                {/* pathLength draws only part of the circle's outline: 0 = none, 1 = full */}
                <motion.circle
                  className={styles.ringFill}
                  cx="14"
                  cy="14"
                  r="12"
                  style={{ pathLength: progress }}
                />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}