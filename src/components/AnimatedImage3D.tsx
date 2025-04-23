
import React, { useRef } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

const AnimatedImage3D = ({ src, alt = "Preview", className = "" }: Props) => {
  const imageRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 10; // Tilt up/down max 10deg
    const rotateY = (x / (rect.width / 2)) * 10; // Tilt left/right max 10deg
    el.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };

  // Reset on leave
  const handleMouseLeave = () => {
    const el = imageRef.current;
    if (el) el.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={imageRef}
      className={`transition-transform duration-200 will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{perspective: 500}}
    >
      <img
        src={src}
        alt={alt}
        className="object-contain w-full h-full select-none pointer-events-none rounded"
        draggable={false}
      />
    </div>
  );
};

export default AnimatedImage3D;
