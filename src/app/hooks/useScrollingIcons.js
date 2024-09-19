import { useEffect, useRef } from "react";

export const useScrollingIcons = (ref) => {
  const scrollDirection = useRef("left");
  const speed = useRef(60); // Default slow speed
  const position = useRef(0); // Current position of icons
  const previousScrollY = useRef(0);
  const requestId = useRef(null);
  const containerWidth = useRef(0); // Store the total width of the icon container
  const damping = useRef(0.9); // Gradual direction reversal factor

  const updatePosition = () => {
    if (!ref.current) return;

    const directionMultiplier = scrollDirection.current === "normal" ? 1 : -1;

    // Gradual reversal effect for direction
    if (directionMultiplier === -1 && speed.current > 60) {
      speed.current *= damping.current; // Slow down gradually
    }

    position.current += directionMultiplier * (speed.current / 60);

    // Wrapping the icons when they go off-screen
    if (position.current >= containerWidth.current) {
      position.current = 0; // Wrap from left to right
    } else if (position.current <= -containerWidth.current) {
      position.current = 0; // Wrap from right to left
    }

    // Apply transform to move the icons
    ref.current.style.transform = `translateX(${position.current}px)`;

    // Repeat this function using requestAnimationFrame
    requestId.current = requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > previousScrollY.current) {
        scrollDirection.current = "normal"; // Move right
      } else if (currentScrollY < previousScrollY.current) {
        scrollDirection.current = "reverse"; // Move left, but with gradual effect
      }

      // Update speed based on scroll rate
      if (currentScrollY === previousScrollY.current) {
        speed.current = 60; // Default slow speed when not scrolling
      } else if (currentScrollY > previousScrollY.current) {
        speed.current = Math.max(30, 60 - currentScrollY / 100); // Speed up when scrolling down
      } else {
        // Gradual slow-down when scrolling up
        speed.current = Math.min(
          70,
          60 + (previousScrollY.current - currentScrollY) / 100
        );
      }

      previousScrollY.current = currentScrollY;
    };

    const setContainerWidth = () => {
      if (ref.current) {
        // Get the total width of the icons container (for wrapping)
        containerWidth.current = ref.current.scrollWidth / 2; // Assuming we want to wrap
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", setContainerWidth); // Recalculate width on resize

    // Calculate container width initially
    setContainerWidth();

    // Start updating position using requestAnimationFrame
    requestId.current = requestAnimationFrame(updatePosition);

    // Cleanup event listener and cancel animation frame on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setContainerWidth);
      cancelAnimationFrame(requestId.current);
    };
  }, []); // Empty dependency array

  return;
};
