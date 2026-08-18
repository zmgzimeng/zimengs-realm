import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import About from '@/components/about';
import Projects from '@/components/projects';
import Affiliations from '@/components/affiliations';
import GridOverlay from '@/components/gridOverlay';
import Starfield from '@/components/starfield';
import Divider from '@/components/divider';

export default function Home() {
  return (
    <div className="relative bg-[var(--color-bg)] text-white min-h-screen w-full overflow-x-hidden">
      <Starfield />
      <GridOverlay />

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Hero />
        <Divider className="my-8" />

        <About />
        <Divider className="my-8" />

        <Projects />
        <Divider className="my-8" />

        <Affiliations />
      </main>
    </div>
  );
}
