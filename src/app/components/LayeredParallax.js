"use client";

import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

export default function LayeredParallax({ foreground, midground, background }) {
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const handleMouseMove = (e) => {
    const { clientX: x, clientY: y } = e;

    const container = e.currentTarget;
    const {
      left,
      top,
      width: containerWidth,
      height: containerHeight,
    } = container.getBoundingClientRect();

    const offsetX =
      (-(x - (left + containerWidth / 2)) / containerWidth) * -100;
    const offsetY =
      (-(y - (top + containerHeight / 2)) / containerHeight) * -100;

    set.start({ x: offsetX, y: offsetY });
  };

  return (
    <div
      className="relative aspect-square max-w-[50%] max-h-[50%] min-w-[40%] min-h-[40%] w-full h-full border-2 border-white overflow-hidden rounded-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => set.start({ x: 0, y: 0 })}
    >
      <img
        src={background}
        alt="Background"
        className="absolute  aspect-square top-0 left-0 w-full h-full object-cover rounded-full"
      />

      <animated.img
        src={midground}
        alt="Midground"
        className="absolute aspect-square bottom-[-5%] left-[5%] w-[100%] h-[100%] object-cover"
        style={{
          transform: props.x.to(
            (x) => `translate(${x * 0.1}%, ${props.y.get() * 0.1}%)`,
          ),
        }}
      />

      <animated.div
        className="absolute aspect-square top-0 left-0 w-full h-full"
        style={{
          transform: props.x.to(
            (x) => `translate(${x * 0.2}%, ${props.y.get() * 0.2}%)`,
          ),
        }}
      >
        <animated.img
          src={foreground}
          alt="Foreground"
          className="w-full aspect-square h-full object-cover rounded-full"
          style={{
            transform: "rotate(-6deg)",
          }}
        />
      </animated.div>
    </div>
  );
}
