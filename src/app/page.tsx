import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Menu from "@/components/sections/Menu";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <Menu />
    </main>
  );
}