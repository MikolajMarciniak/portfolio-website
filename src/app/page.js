"use client";

import { useRef } from 'react';
import { useSpotlightEffect } from './hooks/useSpotlightEffect';
import LandingSection from './sections/Landing';
import AboutSection from './sections/About';
import ProjectsSection from './sections/Projects';
import ContactSection from './sections/Contact';

export default function Home() {
  const ref = useRef(null);
  const { position, opacity, shadowOffsetX, shadowOffsetY } = useSpotlightEffect(ref);

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
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, ${opacity * 0.5}), transparent 60%)`,
          opacity: opacity,
          transition: 'opacity 0.3s ease',
          filter: `blur(${opacity * 15}px)`,
          mixBlendMode: 'screen', // Use 'screen' to blend with background
          zIndex: 10, // Ensure the spotlight is above content
        }}
      />

      {/* Shadow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px 100px rgba(0, 0, 0, 0.9)`, // Increased size and opacity
          zIndex: 5, // Ensure shadows are below the spotlight but above other content
        }}
      />
    </main>
  );
}
