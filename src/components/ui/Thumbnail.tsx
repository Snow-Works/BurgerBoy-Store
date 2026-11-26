import SmartImage from "@/components/ui/SmartImage";
import styles from "./Thumbnail.module.css";

interface ThumbnailProps {
    src: string;
    label: string; // the accessible name, e.g. "Show Classic Cheese"
    index: number;
    isActive: boolean;
    onSelect: () => void; // a function the parent gives us to call on click
}

export default function Thumbnail({ src, label, index, isActive, onSelect }: ThumbnailProps) {
    return (
        <button
            type="button"
            className={`${styles.thumb} ${isActive ? styles.active : ""}`}
            aria-label={label}
            aria-pressed={isActive} // tells screen readers this is a toggle button
            onClick={onSelect}
        >
            {/* alt="" because the button already has an aria-label: the image is decorative here */}
            <SmartImage
                src={src}
                alt=""
                sizes="120px"
                className={styles.image}
                placeholderLabel={String(index + 1)}
            />
        </button>
    );
}