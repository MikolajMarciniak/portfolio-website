import React, { useState, useEffect, useRef } from "react";

const LazyLoad = ({ children, enableFadeOut = true, fullWidth = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (enableFadeOut) {
          setIsVisible(false);
        }
      });
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, [enableFadeOut]);

  return (
    <div
      ref={domRef}
      className={`${fullWidth && "w-full"} fadeIn ${
        isVisible ? "visible" : ""
      } ${enableFadeOut && !isVisible ? "fadeOut" : ""}`}
    >
      {children}
    </div>
  );
};

export default LazyLoad;
