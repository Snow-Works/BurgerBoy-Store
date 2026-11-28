import styles from "./Marquee.module.css";

const PHRASES = ["Fresh", "Juicy", "Loaded", "Join the Club"];
// Each group repeats the phrases so it is always wider than a big screen.
const ITEMS = [...PHRASES, ...PHRASES];

// No "use client" needed: the movement is pure CSS, so this is a server component.
export default function Marquee() {
    return (
        // Decorative text, so screen readers skip it.
        <div className={styles.marquee} aria-hidden="true">
            <div className={styles.track}>
                {/* Two identical groups. The track slides left by exactly one group's width, then repeats. */}
                {[0, 1].map((group) => (
                    <ul key={group} className={styles.group}>
                        {ITEMS.map((phrase, index) => (
                            <li key={`${phrase}-${index}`} className={styles.item}>
                                {phrase}
                                <span className={styles.separator} />
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}