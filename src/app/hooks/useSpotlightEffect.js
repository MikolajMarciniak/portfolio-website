import { useEffect, useState } from 'react';

export const useSpotlightEffect = (ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [shrinkFactor, setShrinkFactor] = useState(1);

  const updateShadowOffsets = (viewportWidth, viewportHeight, scrollY) => {
    // Calculate shrinkFactor with a max of 1 and a min of 0.5
    const shrinkFactor = Math.max(0.5, 1 - (scrollY / viewportHeight));

    const shadowOffsetX = -(((position.x - window.scrollX) / viewportWidth) - 0.5) * viewportWidth * 0.02 * shrinkFactor;
    const shadowOffsetY = -(((position.y - window.scrollY) / viewportHeight) - 0.5) * viewportHeight * 0.02 * shrinkFactor;

    if (ref.current) {
      ref.current.style.setProperty('--shadow-offset-x', `${shadowOffsetX}px`);
      ref.current.style.setProperty('--shadow-offset-y', `${shadowOffsetY}px`);
    }
    setShrinkFactor(shrinkFactor);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure this runs on client-side

    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Update shadow offsets on mouse move
      updateShadowOffsets(viewportWidth, viewportHeight, scrollY);
    };

    const handleScroll = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      setPosition({
        x: position.x,
        y: position.y - scrollY,
      });
      // Update shadow offsets on scroll
      updateShadowOffsets(viewportWidth, viewportHeight, scrollY);
    };

    const handleMouseEnter = () => setOpacity(0.75);
    const handleMouseLeave = () => setOpacity(0);

    const div = ref.current;

    // Add event listeners
    div.addEventListener('mousemove', handleMouseMove);
    div.addEventListener('mouseenter', handleMouseEnter);
    div.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    // Initialize shadow offsets
    updateShadowOffsets(window.innerWidth, window.innerHeight, window.scrollY);

    return () => {
      // Cleanup event listeners
      div.removeEventListener('mousemove', handleMouseMove);
      div.removeEventListener('mouseenter', handleMouseEnter);
      div.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, position]);

  return { position, opacity, shrinkFactor };
};
