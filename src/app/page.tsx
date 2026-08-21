import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Works from '@/components/Works';
import Teams from '@/components/Teams';
import About from '@/components/About';
import Footer from '@/components/Footer';
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

        <Works />
        <Divider className="my-8" />

        <Teams />
        <Divider className="my-8" />

        <About />
        <Footer />
      </main>
    </div>
  );
}
