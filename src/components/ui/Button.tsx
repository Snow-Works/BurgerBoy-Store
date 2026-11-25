import type { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";

// Union types: these props accept ONLY these exact strings.
type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md";

interface ButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string; // if given, we render a link; otherwise a real <button>
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    className?: string;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
    className,
}: ButtonProps) {
    const classes = [styles.button, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(" ");

    if (href) {
        return (
            <a href={href} className={classes} onClick={onClick}>
                {children}
            </a>
        );
    }

    return (
        <button type="button" className={classes} onClick={onClick}>
            {children}
        </button>
    );
}