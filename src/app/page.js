"use client";

import { useRef } from 'react';
import { useSpotlightEffect } from './hooks/useSpotlightEffect';
import LandingSection from './sections/Landing';
import AboutSection from './sections/About';
import ProjectsSection from './sections/Projects';
import ContactSection from './sections/Contact';

export default function Home() {
  const ref = useRef(null);
  const { position, opacity } = useSpotlightEffect(ref);

  return (
    <main ref={ref} className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Render all sections */}
      <LandingSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />

      {/* Spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, ${opacity * 0.5}), transparent 5%)`,
          opacity: opacity,
          transition: 'opacity 0.3s ease',
          filter: `blur(${opacity * 15}px)`,
          mixBlendMode: 'screen',
          zIndex: 10,
        }}
      />

      {/* Shadow effect */}
      <div
        className="absolute inset-0 pointer-events-none shadow"
        style={{
          zIndex: 5,
        }}
      />
    </main>
  );
}
