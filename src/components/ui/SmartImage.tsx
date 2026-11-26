"use client"; // it keeps state, so it must run in the browser

import { useState } from "react";
import Image from "next/image";
import styles from "./SmartImage.module.css";

interface SmartImageProps {
    src: string;
    alt: string; // use "" when the image is purely decorative
    sizes: string; // how wide the image will be on screen (helps the browser pick a file size)
    priority?: boolean; // true = load immediately (for the main hero image)
    className?: string; // applied to the <Image>, e.g. for object-fit
    placeholderLabel?: string;
}

// Images using `fill` stretch to their parent, so the PARENT must be position: relative.
export default function SmartImage({
    src,
    alt,
    sizes,
    priority = false,
    className,
    placeholderLabel = "Image coming soon",
}: SmartImageProps) {
    // We remember WHICH src failed, so a different src later gets a fresh chance.
    const [failedSrc, setFailedSrc] = useState<string | null>(null);

    if (failedSrc === src) {
        return (
            <div
                className={styles.placeholder}
                role="img"
                aria-label={alt || undefined}
                aria-hidden={alt === "" ? true : undefined}
            >
                {placeholderLabel}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={className}
            onError={() => setFailedSrc(src)}
        />
    );
}