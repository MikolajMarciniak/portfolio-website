import { useEffect } from "react";

const CursorShadowEffect = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      const offsetX = clientX / window.innerWidth - 0.5;
      const offsetY = clientY / window.innerHeight - 0.5;

      document.documentElement.style.setProperty(
        "--shadow-offset-x",
        `${-offsetX * 10}px`,
      );
      document.documentElement.style.setProperty(
        "--shadow-offset-y",
        `${-offsetY * 10}px`,
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

export default CursorShadowEffect;
