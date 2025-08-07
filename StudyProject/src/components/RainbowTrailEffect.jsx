import { useEffect } from "react";
import '../App.css'

const RainbowTrailEffect = () => {
  useEffect(() => {
    const trail = [];
    const maxDots = 50;
    let hue = 0;

    const createDot = (x, y) => {
      const dot = document.createElement("div");
      dot.className = "rainbow-dot";
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
      dot.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 70%)`;

      document.body.appendChild(dot);
      trail.push(dot);

      if (trail.length > maxDots) {
        const oldDot = trail.shift();
        oldDot.remove();
      }

      hue = (hue + 12) % 360;

      setTimeout(() => {
        dot.style.opacity = "0";
        dot.style.transform = "scale(0.2)";
      }, 10);
    };

    const handleMouseMove = (e) => {
      createDot(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null; // it's purely visual, nothing to render
};

export default RainbowTrailEffect;
