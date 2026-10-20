import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurExperts from "@/components/OurExperts";
import Intro from "@/components/Intro";
import WhatWeDo from "@/components/WhatWeDo";
import HowWeWork from "@/components/HowWeWork";
import Footer from "@/components/Footer";
import ContactModalProvider from "@/components/ContactModalProvider";

export default function Home() {
  return (
    <ContactModalProvider>
      <Navbar />
      <Hero />
      <OurExperts />
      <Intro />
      <WhatWeDo />
      <HowWeWork />
      <Footer />
    </ContactModalProvider>
  );
}
