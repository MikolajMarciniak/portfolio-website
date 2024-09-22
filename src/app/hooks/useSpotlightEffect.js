import { useEffect, useState, useRef } from "react";

export const useSpotlightEffect = (ref) => {
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const dimensions = useRef({ width: 0, height: 0 });
  const slowPhase = useRef(true);
  const scrollPosition = useRef({ y: 0 });
  const spotlightSize = useRef({
    radius: 14,
    min: 13,
    max: 15,
    speed: 0.05,
    expanding: true,
    isClicked: false,
    scrollFactor: 1,
  });
  const targetPosition = useRef({ x: 0, y: 0 });
  const spotlightPosition = useRef({ x: 0, y: 0 });
  const lastExpandFrameTime = useRef(0);
  const lastMoveFrameTime = useRef(0);
  const animationFrameId = useRef(null);
  const isAnimating = useRef(false);

  const handleResize = () => {
    if (!ref.current) return;
    dimensions.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const updateAllStyles = () => {
    if (!ref.current) return;

    ref.current.style.setProperty(
      "--spotlight-x",
      `${spotlightPosition.current.x}px`
    );
    ref.current.style.setProperty(
      "--spotlight-y",
      `${spotlightPosition.current.y}px`
    );
    ref.current.style.setProperty(
      "--spotlight-radius",
      `${spotlightSize.current.radius * spotlightSize.current.scrollFactor}%`
    );

    const shadowX =
      -(spotlightPosition.current.x / dimensions.current.width - 0.5) *
      dimensions.current.width *
      0.02 *
      (spotlightSize.current.radius / 10);
    const shadowY =
      -(
        (spotlightPosition.current.y - window.scrollY) /
          dimensions.current.height -
        0.5
      ) *
      dimensions.current.height *
      0.02 *
      (spotlightSize.current.radius / 10);

    ref.current.style.setProperty("--shadow-offset-x", `${shadowX}px`);
    ref.current.style.setProperty("--shadow-offset-y", `${shadowY}px`);
  };

  const expandSpotlight = (isImmediate) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const speed = isImmediate ? 0.3 : spotlightSize.current.speed;
    isImmediate ? (spotlightSize.current.max = 17) : 15;

    const animate = () => {
      const now = performance.now();

      if (now - lastExpandFrameTime.current < 1000 / 30) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      if (spotlightSize.current.expanding) {
        spotlightSize.current.radius += speed;
        if (spotlightSize.current.radius >= spotlightSize.current.max) {
          spotlightSize.current.radius = spotlightSize.current.max;
          spotlightSize.current.expanding = false;
        }
      } else {
        spotlightSize.current.radius -= speed;
        if (spotlightSize.current.radius <= spotlightSize.current.min) {
          spotlightSize.current.radius = spotlightSize.current.min;
          spotlightSize.current.expanding = true;
          if (isImmediate) {
            return;
          }
        }
      }

      updateAllStyles();

      lastExpandFrameTime.current = now;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const calculateSpeed = (diffX, diffY) => {
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (slowPhase.current && distance < 200) {
      slowPhase.current = false;
    }

    const baseSpeed = slowPhase.current ? 0.4 : 0.9;
    const proximityFactor = Math.max(0.5, 200 / Math.max(distance, 1));

    const dynamicSpeed = baseSpeed * 0.5 * proximityFactor;

    return Math.min(dynamicSpeed, 0.5);
  };

  const smoothMoveSpotlight = () => {
    if (!initialAnimationDone) return;

    const now = performance.now();
    if (now - lastMoveFrameTime.current < 1000 / 30) {
      requestAnimationFrame(smoothMoveSpotlight);
      return;
    }

    const diffX = targetPosition.current.x - spotlightPosition.current.x;
    const diffY = targetPosition.current.y - spotlightPosition.current.y;

    if (Math.abs(diffX) < 20 && Math.abs(diffY) < 20) return;

    const speed = calculateSpeed(diffX, diffY);

    spotlightPosition.current.x += diffX * speed;
    spotlightPosition.current.y += diffY * speed;

    spotlightPosition.current.x = Math.max(
      0,
      Math.min(spotlightPosition.current.x, ref.current.clientWidth)
    );
    spotlightPosition.current.y = Math.max(
      0,
      Math.min(spotlightPosition.current.y, ref.current.clientHeight)
    );

    updateAllStyles();

    if (Math.abs(diffX) > 20 || Math.abs(diffY) > 20) {
      requestAnimationFrame(smoothMoveSpotlight);
    }

    lastMoveFrameTime.current = now;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ref.current) return;

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      targetPosition.current.x = Math.max(
        0,
        Math.min(e.clientX - rect.left, ref.current.clientWidth)
      );
      targetPosition.current.y = Math.max(
        0,
        Math.min(e.clientY - rect.top, ref.current.clientHeight)
      );
      scrollPosition.current.y = window.scrollY;
      requestAnimationFrame(smoothMoveSpotlight);
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollChange = currentScroll - scrollPosition.current.y;
      const newSpotlightY = targetPosition.current.y + scrollChange;
      spotlightSize.current.scrollFactor = Math.max(
        0.5,
        1 - currentScroll / dimensions.current.height
      );
      scrollPosition.current.y = currentScroll;

      targetPosition.current.y = newSpotlightY;

      requestAnimationFrame(smoothMoveSpotlight);
    };

    const handleClick = () => {
      if (slowPhase.current) {
        return;
      }
      if (!spotlightSize.current.isClicked) {
        spotlightSize.current.isClicked = true;
        spotlightSize.current.expanding = true;
        isAnimating.current = false;
        cancelAnimationFrame(animationFrameId.current);
        expandSpotlight(true);
        spotlightSize.current.isClicked = false;
        isAnimating.current = false;
        expandSpotlight(false);
      }
    };

    const div = ref.current;
    div.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
      div.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, initialAnimationDone]);

  useEffect(() => {
    if (!ref?.current) return;
    if (initialAnimationDone) return;

    handleResize();
    const width = window.innerWidth;
    const height = window.innerHeight;

    targetPosition.current = {
      x: width / 2,
      y: height / 2,
    };
    spotlightPosition.current = {
      x: width / 2,
      y: height / 2,
    };

    updateAllStyles();

    const animationTimer = setTimeout(() => {
      setInitialAnimationDone(true);
      requestAnimationFrame(smoothMoveSpotlight);
      expandSpotlight(false);
    }, 500);

    return () => {
      clearTimeout(animationTimer);
    };
  }, [initialAnimationDone]);

  return { initialAnimationDone };
};
