import { useEffect, useState, useRef } from "react";

const LazyLoad = ({ children }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Component is now visible");
          setIsVisible(true);
        } else {
          console.log("Component is no longer visible");
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Adjust as needed
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return <div ref={ref}>{isVisible && children}</div>;
};

export default LazyLoad;
