import React, { useState, useEffect, useRef } from "react";
import "../styles/about.css";

const LazyImage = ({ src, alt, className }) => {
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing after the image has loaded
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img ref={imgRef} src={inView ? src : ""} alt={alt} className={className} />
  );
};

const IconLoop = ({ icons, first = undefined, last = undefined }) => (
  <div
    data-first={first}
    data-last={last}
    className="scroll flex h-60 w-full items-center justify-around gap-8 whitespace-nowrap px-4"
  >
    {icons.map((icon) => (
      <a
        key={icon.name}
        href={icon.documentation}
        target="_blank"
        rel="noopener noreferrer"
        className="tooltip"
        data-tip={icon.fullname}
      >
        <LazyImage
          src={`/icons/${icon.name}.svg`}
          alt={icon.fullname}
          className="h-60 w-60"
        />
      </a>
    ))}
  </div>
);

const ScrollingIcons = ({ icons }) => (
  <div>
    <div className="relative h-60 w-full overflow-hidden">
      <div className="gradient-edges"></div>
      <div className="scroll-container relative grid h-full w-full">
        <IconLoop icons={icons.slice(0, 5)} first={true} />
        <IconLoop icons={icons.slice(5, 10)} />
        <IconLoop icons={icons.slice(10, 15)} last={true} />
      </div>
    </div>
  </div>
);

export default ScrollingIcons;
