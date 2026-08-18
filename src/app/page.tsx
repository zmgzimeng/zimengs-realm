import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Affiliations from '@/components/Affiliations';
import GridOverlay from '@/components/GridOverlay';
import Starfield from '@/components/Starfield';
import Divider from '@/components/Divider';

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
