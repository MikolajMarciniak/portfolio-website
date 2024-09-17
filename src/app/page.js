"use client";

import { useRef } from 'react';
import { useSpotlightEffect } from './hooks/useSpotlightEffect';
import LandingSection from './sections/Landing';
import AboutSection from './sections/About';
import ProjectsSection from './sections/Projects';
import ContactSection from './sections/Contact';

export default function Home() {
  const ref = useRef(null);
  const { initialAnimationDone } = useSpotlightEffect(ref);

  // Apply class based on whether the initial animation is done
  const spotlightClass = initialAnimationDone ? '' : 'animation';

  return (
    <main ref={ref} className="min-h-screen flex flex-col relative overflow-hidden">
      <LandingSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <div
        className={`spotlight ${spotlightClass}`}
      />
    </main>
  );
}
