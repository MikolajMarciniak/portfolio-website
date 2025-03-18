/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from "react";

export default function SpotlightCard({ children }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setPosition({ x, y });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full p-6 transition-all duration-300 rounded-xl flex flex-col items-left px-6 transition-transform duration-300 shadow-2xl"
      style={{
        background:
          isHovering && !isMobile
            ? `radial-gradient(circle 150px at ${position.x}px ${position.y}px, var(--projects-color), var(--skills-color))`
            : "var(--skills-color-transparent)",
      }}
    >
      {children}
    </div>
  );
}
