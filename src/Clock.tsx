import { useEffect, useRef, useState } from "react";

export default function Clock({ isOdd }: { isOdd: boolean }) {
  const [angle, setAngle] = useState(0);
  const direction = isOdd ? -1 : 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev + direction * 6);
    }, 100);
    return () => clearInterval(interval);
  }, [isOdd]);

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2" fill="white" />
      <line
        x1="50"
        y1="50"
        x2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
        y2={50 - 40 * Math.cos((angle * Math.PI) / 180)}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
}
