import styles from "./Dots.module.css";

interface DotsProps {
  count: number;
  activeIndex: number;
  labels: string[]; // one accessible name per dot
  groupLabel: string;
  onSelect: (index: number) => void;
}

export default function Dots({ count, activeIndex, labels, groupLabel, onSelect }: DotsProps) {
  return (
    <div className={styles.dots} role="group" aria-label={groupLabel}>
      {/* Array.from({ length: 4 }, ...) builds [0, 1, 2, 3]; we only need the index */}
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
          </button>
        );
      })}
    </div>
  );
}