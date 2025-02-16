import React, { useState, useEffect } from "react";
import "../styles/about.css";

const LazyImage = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

const IconLoop = ({
  icons,
  first = undefined,
  last = undefined,
  scrollDirection,
}) => (
  <div
    data-first={first}
    data-last={last}
    className={`scroll flex h-56 w-full items-center justify-around gap-8 whitespace-nowrap ${
      scrollDirection === "reverse" ? "reverse" : ""
    }`}
  >
    {icons.map((icon, index) => (
      <a
        key={icon.name}
        className="icon"
        href={icon.documentation}
        target="_blank"
        rel="noopener noreferrer"
        data-tip={icon.fullname}
      >
        <LazyImage
          src={`/icons/tech/${icon.name}.svg`}
          alt={icon.fullname}
          className="h-56 w-56"
        />
      </a>
    ))}
  </div>
);

const ScrollingIcons = ({ icons }) => {
  const [scrollDirection, setScrollDirection] = useState("forward");

  useEffect(() => {
    icons.forEach((icon) => {
      const img = new Image();
      img.src = `/icons/tech/${icon.name}.svg`;
    });

    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setScrollDirection(scrollTop > lastScrollTop ? "forward" : "reverse");
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [icons]);

  return (
    <div>
      <div className="relative h-60 w-full">
        <div className="gradient-edges"></div>
        <div className="scroll-container relative grid h-full w-full items-center">
          <IconLoop
            icons={icons.slice(0, 5)}
            first={true}
            scrollDirection={scrollDirection}
          />
          <IconLoop
            icons={icons.slice(5, 10)}
            scrollDirection={scrollDirection}
          />
          <IconLoop
            icons={icons.slice(10, 15)}
            last={true}
            scrollDirection={scrollDirection}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollingIcons;
