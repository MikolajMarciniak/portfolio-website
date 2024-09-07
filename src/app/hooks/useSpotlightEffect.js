import { useEffect, useState } from 'react';

export const useSpotlightEffect = (ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Check if window is defined

    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleFocus = () => {
      setOpacity(1);
    };

    const handleBlur = () => {
      setOpacity(0);
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    const div = ref.current;

    div.addEventListener('mousemove', handleMouseMove);
    div.addEventListener('focus', handleFocus);
    div.addEventListener('blur', handleBlur);
    div.addEventListener('mouseenter', handleMouseEnter);
    div.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      div.removeEventListener('mousemove', handleMouseMove);
      div.removeEventListener('focus', handleFocus);
      div.removeEventListener('blur', handleBlur);
      div.removeEventListener('mouseenter', handleMouseEnter);
      div.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  // Use client-side window dimensions
  useEffect(() => {
    if (typeof window === 'undefined') return; // Check if window is defined

    const updateShadowOffsets = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const shadowOffsetX = -(((position.x - window.scrollX) / viewportWidth) - 0.5) * viewportWidth * 0.02;
      const shadowOffsetY = -(((position.y - window.scrollY) / viewportHeight) - 0.5) * viewportHeight * 0.02;
      
    

      // Update CSS variables
      if (ref.current) {
        ref.current.style.setProperty('--shadow-offset-x', `${shadowOffsetX}px`);
        ref.current.style.setProperty('--shadow-offset-y', `${shadowOffsetY}px`);
      }
    };

    updateShadowOffsets();
    window.addEventListener('resize', updateShadowOffsets);

    return () => {
      window.removeEventListener('resize', updateShadowOffsets);
    };
  }, [position]);

  return { position, opacity,  };
};
