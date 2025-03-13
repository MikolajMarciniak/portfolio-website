import { useEffect } from "react";

const CursorShadowEffect = () => {
  useEffect(() => {
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      const offsetX = clientX / window.innerWidth - 0.5;
      const offsetY = clientY / window.innerHeight - 0.5;

      document.documentElement.style.setProperty(
        "--shadow-offset-x",
        `${-offsetX * 15}px`,
      );
      document.documentElement.style.setProperty(
        "--shadow-offset-y",
        `${-offsetY * 15}px`,
      );
    };

    const handleDeviceMove = (event) => {
      const tiltX = clamp(event.gamma, -40, 40) / 40;
      const tiltY = clamp(event.beta, -25, 25) / 25;

      document.documentElement.style.setProperty(
        "--shadow-offset-x",
        `${-tiltX * 7}px`,
      );
      document.documentElement.style.setProperty(
        "--shadow-offset-y",
        `${-tiltY * 7}px`,
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceMove);
    };
  }, []);

  return null;
};

export default CursorShadowEffect;
