import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Marquee />

      <section id="menu" className={styles.placeholder}>
        <p className={styles.note}>Menu placeholder (Step 5B)</p>
      </section>
    </main>
  );
}