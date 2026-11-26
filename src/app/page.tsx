import Hero from "@/components/sections/Hero";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />

      <section aria-label="Marquee" className={styles.placeholder}>
        <p className={styles.note}>Marquee placeholder (Step 5)</p>
      </section>

      <section id="menu" className={styles.placeholder}>
        <p className={styles.note}>Menu placeholder (Step 5)</p>
      </section>
    </main>
  );
}