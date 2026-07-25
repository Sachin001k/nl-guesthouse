import Hero from "@/app/components/Hero";
import EventTypes from "@/app/components/EventTypes";
import Gallery from "@/app/components/Gallery";
import Testimonials from "@/app/components/Testimonials";
import ContactSection from "@/app/components/ContactSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <EventTypes />
      <Gallery />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
