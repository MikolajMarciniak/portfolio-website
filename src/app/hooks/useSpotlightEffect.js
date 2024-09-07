import { useEffect, useState } from 'react';

export const useSpotlightEffect = (ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current || isFocused) return;
      const div = ref.current;
      const rect = div.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
      setIsFocused(true);
      setOpacity(1);
    };

    const handleBlur = () => {
      setIsFocused(false);
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
  }, [ref, isFocused]);

  // Calculate shadow offset
  const shadowOffsetX = (position.x - ref.current?.offsetWidth / 2) * 0.1;
  const shadowOffsetY = (position.y - ref.current?.offsetHeight / 2) * 0.1;

  return { position, opacity, shadowOffsetX, shadowOffsetY };
};
