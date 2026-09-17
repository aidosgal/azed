import { AnimatedBackground } from "@/components/background/AnimatedBackground";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Pricing />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
