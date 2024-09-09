import { useEffect, useState } from 'react';

export const useSpotlightEffect = (ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [shrinkFactor, setShrinkFactor] = useState(1);

  const updateShadowOffsets = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const shrinkFactor = Math.max(0.5, 1 - (scrollY / viewportHeight));

    const shadowOffsetX = -(((position.x - window.scrollX) / viewportWidth) - 0.5) * viewportWidth * 0.02 * shrinkFactor;
    const shadowOffsetY = -(((position.y - window.scrollY) / viewportHeight) - 0.5) * viewportHeight * 0.05 * shrinkFactor;

    if (ref.current) {
      ref.current.style.setProperty('--shadow-offset-x', `${shadowOffsetX}px`);
      ref.current.style.setProperty('--shadow-offset-y', `${shadowOffsetY}px`);
    }
    setShrinkFactor(shrinkFactor);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!ref.current) return;

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const posX = e.clientX - rect.left
      const posY = e.clientY - rect.top
      
      setPosition({
        x: posX,
        y: posY,
      });

      setScrollPosition({
        y: window.scrollY,
      })

      console.log(posY)
      updateShadowOffsets();
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollChange = scrollY-scrollPosition.y 
      const posY = position.y + scrollChange 
      
      setScrollPosition({y: scrollY})
      
      setPosition({
        x: position.x,
        y: posY,
      });


      updateShadowOffsets();
    };

    const handleMouseEnter = () => setOpacity(0.75);
    const handleMouseLeave = () => setOpacity(0);

    const div = ref.current;

    div.addEventListener('mousemove', handleMouseMove);
    div.addEventListener('mouseenter', handleMouseEnter);
    div.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    updateShadowOffsets();

    return () => {
      div.removeEventListener('mousemove', handleMouseMove);
      div.removeEventListener('mouseenter', handleMouseEnter);
      div.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, position]);

  return { position, opacity, shrinkFactor };
};
