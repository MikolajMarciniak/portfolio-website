import { useEffect, useState, useRef } from 'react';

export const useSpotlightEffect = (ref) => {
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const slowPhase = useRef(true);
  const scrollPosition = useRef({ y: 0 });
  const spotlightSize = useRef({ opacity: 0.6, radius: 11, expanding:true, scrollFactor:1 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const spotlightPosition = useRef({ x: 0, y: 0 });
  const lastFrameTime = useRef(0);

  const updateSpotlightPositionRefs = (spotlightX, spotlightY) => {
    if (ref.current) {
      ref.current.style.setProperty('--spotlight-x', `${spotlightX}px`);
      ref.current.style.setProperty('--spotlight-y', `${spotlightY}px`);
    }
  };

  const updateSpotlightSizeRefs = () => {
    if (ref.current) {
      ref.current.style.setProperty('--spotlight-radius', `${spotlightSize.current.radius*spotlightSize.current.scrollFactor}%`);
      ref.current.style.setProperty('--spotlight-opacity', `${spotlightSize.current.opacity}`);
    }
  };

  const updateShadowRefs = (shadowX, shadowY) => {
    if (ref.current) {
      ref.current.style.setProperty('--shadow-offset-x', `${shadowX}px`);
      ref.current.style.setProperty('--shadow-offset-y', `${shadowY}px`);
    }
  };

  const expandSpotlight = (min=9, max=13, speed=0.02, cancel=false) => {
    if (spotlightSize.current.expanding) {
      spotlightSize.current.radius += speed;
      if (spotlightSize.current.radius >= max) {
        spotlightSize.current.expanding = false;
      }
    } else {
      spotlightSize.current.radius -= speed;
      if (spotlightSize.current.radius <= min) {
        spotlightSize.current.expanding = true;
        if(cancel){
          return;
        }; 
      }  
  }
  updateSpotlightSizeRefs();
    requestAnimationFrame(() => expandSpotlight(min, max, speed, cancel))
}
  
  const updateShadows = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const shadowX =
      -(((spotlightPosition.current.x - window.scrollX) / viewportWidth) - 0.5) *
      viewportWidth *
      0.03 *
      (spotlightSize.current.radius/10);
    const shadowY =
      -(((spotlightPosition.current.y - window.scrollY) / viewportHeight) - 0.5) *
      viewportHeight *
      0.03 *
      (spotlightSize.current.radius/10);

    updateShadowRefs(shadowX, shadowY);
  };

  const calculateSpeed = () => {
    const distanceX = Math.abs(targetPosition.current.x - spotlightPosition.current.x);
    const distanceY = Math.abs(targetPosition.current.y - spotlightPosition.current.y);
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    if (slowPhase.current && (distanceX < 100 && distanceY < 100)) {
      slowPhase.current = false;
    }
    const baseSpeed = slowPhase.current ? 0.005 : 0.1;
    let dynamicSpeed = baseSpeed * Math.max(0.5, distance / 100);

    return Math.min(dynamicSpeed, 0.5);
  };

  const smoothMoveSpotlight = () => {
    if (!initialAnimationDone) return;

    const now = performance.now();
    if (now - lastFrameTime.current < 1000 / 60) {
      requestAnimationFrame(smoothMoveSpotlight);
      return;
    }

    const speed = calculateSpeed();

    spotlightPosition.current.x += (targetPosition.current.x - spotlightPosition.current.x) * speed;
    spotlightPosition.current.y += (targetPosition.current.y - spotlightPosition.current.y) * speed;

    spotlightPosition.current.x = Math.max(0, Math.min(spotlightPosition.current.x, ref.current.clientWidth));
    spotlightPosition.current.y = Math.max(0, Math.min(spotlightPosition.current.y, ref.current.clientHeight));

    updateSpotlightPositionRefs(spotlightPosition.current.x, spotlightPosition.current.y);

    updateShadows();

    if (
      Math.abs(targetPosition.current.x - spotlightPosition.current.x) > 10 ||
      Math.abs(targetPosition.current.y - spotlightPosition.current.y) > 10
    ) {
      requestAnimationFrame(smoothMoveSpotlight);
    }
    lastFrameTime.current = now;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!ref.current) return;

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      targetPosition.current.x = Math.max(0, Math.min(e.clientX - rect.left, ref.current.clientWidth));
      targetPosition.current.y = Math.max(0, Math.min(e.clientY - rect.top, ref.current.clientHeight));
      scrollPosition.current.y = window.scrollY;
      requestAnimationFrame(smoothMoveSpotlight);
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollChange = currentScroll - scrollPosition.current.y;
      const newSpotlightY = targetPosition.current.y + scrollChange;
      spotlightSize.current.scrollFactor = Math.max(0.5, 1 - currentScroll / window.innerHeight);
      scrollPosition.current.y = currentScroll;

      targetPosition.current.y = newSpotlightY;

      requestAnimationFrame(smoothMoveSpotlight);
    };

    const handleClick= () => {
      requestAnimationFrame(() => expandSpotlight(undefined, 15, 0.4, true))
    }

    const div = ref.current;
    div.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    return () => {
      div.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, [ref, initialAnimationDone]);

  useEffect(() => {
    if (!ref?.current) return;
    if (initialAnimationDone) return;

    targetPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    spotlightPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    updateSpotlightPositionRefs(spotlightPosition.current.x, spotlightPosition.current.y);
    updateSpotlightSizeRefs(spotlightSize.current.radius, spotlightSize.current.opacity);

    const animationTimer = setTimeout(() => {
      setInitialAnimationDone(true);
      requestAnimationFrame(smoothMoveSpotlight);
      requestAnimationFrame(() => expandSpotlight())
    }, 1000);

    return () => {
      clearTimeout(animationTimer);
    };

  }, [ref, initialAnimationDone]);

  return { initialAnimationDone };
};
// import { useEffect, useState, useRef } from 'react';

// export const useSpotlightEffect = (ref) => {
//   const [initialAnimationDone, setInitialAnimationDone] = useState(false);
//   const slowPhase = useRef(true);
//   const scrollPosition = useRef({ y: 0 });
//   const spotlightSize = useRef({ opacity: 0.6, radius: 1 });
//   const targetPosition = useRef({ x: 0, y: 0 });
//   const spotlightPosition = useRef({ x: 0, y: 0 });
//   const lastFrameTime = useRef(0);

//   const updateSpotlightPositionRefs = (spotlightX, spotlightY) => {
//     if (ref.current) {
//       ref.current.style.setProperty('--spotlight-x', `${spotlightX}px`);
//       ref.current.style.setProperty('--spotlight-y', `${spotlightY}px`);
//     }
//   };

//   const updateSpotlightSizeRefs = () => {
//     if (ref.current) {
//       ref.current.style.setProperty('--spotlight-radius', `${10 * spotlightSize.current.radius}%`);
//       ref.current.style.setProperty('--spotlight-opacity', `${spotlightSize.current.opacity}`);
//     }
//   };

//   const updateShadowRefs = (shadowX, shadowY) => {
//     if (ref.current) {
//       ref.current.style.setProperty('--shadow-offset-x', `${shadowX}px`);
//       ref.current.style.setProperty('--shadow-offset-y', `${shadowY}px`);
//     }
//   };

//   const updateShadows = () => {
//     const viewportWidth = window.innerWidth;
//     const viewportHeight = window.innerHeight;

//     const shadowX =
//       -(((spotlightPosition.current.x - window.scrollX) / viewportWidth) - 0.5) *
//       viewportWidth *
//       0.03 *
//       spotlightSize.current.radius;
//     const shadowY =
//       -(((spotlightPosition.current.y - window.scrollY) / viewportHeight) - 0.5) *
//       viewportHeight *
//       0.03 *
//       spotlightSize.current.radius;

//     updateShadowRefs(shadowX, shadowY);
//   };

//   const calculateSpeed = () => {
//     const distanceX = Math.abs(targetPosition.current.x - spotlightPosition.current.x);
//     const distanceY = Math.abs(targetPosition.current.y - spotlightPosition.current.y);
//     const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
//     if (slowPhase.current && (distanceX)<100 && ((distanceY)<100)){
//       slowPhase.current = false;
//     }
//     const baseSpeed = slowPhase.current ? 0.001 : 0.1;
//     const dynamicSpeed = baseSpeed * Math.max(0.5, distance / 100);

//     return Math.min(dynamicSpeed, 0.5);
//   };

//   const smoothMoveSpotlight = () => {
//     if (!initialAnimationDone) return;

//     const now = performance.now();
//     if (now - lastFrameTime.current < 1000 / 60) {
//       requestAnimationFrame(smoothMoveSpotlight);
//       return;
//     }

//     const speed = calculateSpeed();

//     spotlightPosition.current.x += (targetPosition.current.x - spotlightPosition.current.x) * speed;
//     spotlightPosition.current.y += (targetPosition.current.y - spotlightPosition.current.y) * speed;
    
//     spotlightPosition.current.x = Math.max(0, Math.min(spotlightPosition.current.x, ref.current.clientWidth));
//     spotlightPosition.current.y = Math.max(0, Math.min(spotlightPosition.current.y, ref.current.clientHeight));

//     updateSpotlightPositionRefs(spotlightPosition.current.x, spotlightPosition.current.y);

//     updateShadows();

//     if (
//       Math.abs(targetPosition.current.x - spotlightPosition.current.x) > 10 ||
//       Math.abs(targetPosition.current.y - spotlightPosition.current.y) > 10
//     ) {
//       requestAnimationFrame(smoothMoveSpotlight);    
//     }
//     lastFrameTime.current = now;
//   };

//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     if (!ref.current) return;

//     const handleMouseMove = (e) => {
//       const rect = ref.current.getBoundingClientRect();
//       targetPosition.current.x = Math.max(0, Math.min(e.clientX - rect.left, ref.current.clientWidth));
//       targetPosition.current.y = Math.max(0, Math.min(e.clientY - rect.top, ref.current.clientHeight));
//       scrollPosition.current.y = window.scrollY;
//       requestAnimationFrame(smoothMoveSpotlight);  
//     };

//     const handleScroll = () => {
//       const currentScroll = window.scrollY;
//       const scrollChange = currentScroll - scrollPosition.current.y;
//       const newSpotlightY = targetPosition.current.y + scrollChange;
//       spotlightSize.current.radius = Math.max(0.5, 1 - currentScroll / window.innerHeight);
//       updateSpotlightSizeRefs();
//       scrollPosition.current.y = currentScroll;

//       targetPosition.current.y = newSpotlightY;

//       requestAnimationFrame(smoothMoveSpotlight);
//     };

//     const div = ref.current;
//     div.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       div.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [ref, initialAnimationDone]);

//   useEffect(() => {
//     if (!ref?.current) return;
//     if (initialAnimationDone) return;

//     targetPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
//     spotlightPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

//     updateSpotlightPositionRefs(spotlightPosition.current.x, spotlightPosition.current.y);
//     updateSpotlightSizeRefs(spotlightSize.current.radius, spotlightSize.current.opacity);

//     const animationTimer = setTimeout(() => {
//       setInitialAnimationDone(true);
//       requestAnimationFrame(smoothMoveSpotlight);
//     }, 1500);

//     return () => {
//       clearTimeout(animationTimer);
//     };

//   }, [ref, initialAnimationDone]);

//   // useEffect(() => {
//   //   if (!ref?.current) return;
//   //   if (!slowPhase.current) return;

//   //   const phaseTimer = setTimeout(() => {
//   //     slowPhase.current = false;
//   //   }, 5000);

//   //   return () => {
//   //     clearTimeout(phaseTimer);
//   //   };

//   // }, [ref]);

//   return { initialAnimationDone };
// };
