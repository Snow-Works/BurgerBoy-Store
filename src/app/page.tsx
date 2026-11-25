import styles from "./page.module.css";
import { siteConfig } from "@/data/siteConfig";
import { burgers } from "@/data/burgers";
import { categories } from "@/data/categories";

// Server component: it runs on the server and ships plain HTML.
export default function HomePage() {
  return (
    <main id="main">
      <section id="home" className={styles.placeholder}>
        <h1 className={styles.title}>{siteConfig.name}</h1>
        <p className={styles.note}>
          Hero placeholder (Step 3)
          <br />
          {burgers.length} burgers, {categories.length} categories loaded from data files
        </p>
      </section>

      <section aria-label="Marquee" className={styles.placeholder}>
        <p className={styles.note}>Marquee placeholder (Step 5)</p>
      </section>

      <section id="menu" className={styles.placeholder}>
        <p className={styles.note}>Menu placeholder (Step 5)</p>
      </section>
    </main>
  );
}