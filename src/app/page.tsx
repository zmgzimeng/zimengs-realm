import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import GridOverlay from '@/components/gridOverlay';
import Starfield from '@/components/starfield';

export default function Home() {
  return (
    <div className="relative bg-[var(--color-bg)] text-white min-h-screen w-full overflow-x-hidden">
      <Starfield />
      <GridOverlay />

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Hero />
        
        {/* About Section */}
        <section id="about" className="min-h-screen pt-24 pb-12">
          <h2 className="font-display text-4xl"># ABOUT - COMING SOON</h2>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen pt-24 pb-12">
          <h2 className="font-display text-4xl"># SELECTED WORKS - COMING SOON</h2>
        </section>
      </main>
    </div>
  );
}
