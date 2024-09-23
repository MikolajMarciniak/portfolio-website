import { useEffect, useRef } from "react";

export const useScrollingIcons = (ref) => {
  const scrollDirection = useRef("left");
  const speed = useRef(60);
  const position = useRef(0);
  const previousScrollY = useRef(0);
  const requestId = useRef(null);
  const containerWidth = useRef(0);
  const damping = useRef(0.9);

  const updatePosition = () => {
    if (!ref.current) return;

    const directionMultiplier = scrollDirection.current === "normal" ? 1 : -1;

    if (directionMultiplier === -1 && speed.current > 60) {
      speed.current *= damping.current;
    }

    position.current += directionMultiplier * (speed.current / 60);

    if (position.current >= containerWidth.current) {
      position.current = 0;
    } else if (position.current <= -containerWidth.current) {
      position.current = 0;
    }

    ref.current.style.transform = `translateX(${position.current}px)`;

    requestId.current = requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > previousScrollY.current) {
        scrollDirection.current = "normal";
      } else if (currentScrollY < previousScrollY.current) {
        scrollDirection.current = "reverse";
      }

      if (currentScrollY === previousScrollY.current) {
        speed.current = 60;
      } else if (currentScrollY > previousScrollY.current) {
        speed.current = Math.max(30, 60 - currentScrollY / 100);
      } else {
        speed.current = Math.min(
          70,
          60 + (previousScrollY.current - currentScrollY) / 100
        );
      }

      previousScrollY.current = currentScrollY;
    };

    const setContainerWidth = () => {
      if (ref.current) {
        containerWidth.current = ref.current.scrollWidth / 2;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", setContainerWidth);

    setContainerWidth();
    requestId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setContainerWidth);
      cancelAnimationFrame(requestId.current);
    };
  }, []);

  return;
};
