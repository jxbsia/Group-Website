import React from 'react';

interface RadialLogoProps {
  className?: string;
  size?: number;
}

const RadialLogo: React.FC<RadialLogoProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Create radial segments */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i * 18) - 90; // Start from top and distribute evenly
        const outerRadius = 45;
        const innerRadius = 20;
        const segmentWidth = 3;
        
        // Calculate positions for rectangular segments
        const x1 = 50 + Math.cos((angle - segmentWidth) * Math.PI / 180) * innerRadius;
        const y1 = 50 + Math.sin((angle - segmentWidth) * Math.PI / 180) * innerRadius;
        const x2 = 50 + Math.cos((angle + segmentWidth) * Math.PI / 180) * innerRadius;
        const y2 = 50 + Math.sin((angle + segmentWidth) * Math.PI / 180) * innerRadius;
        const x3 = 50 + Math.cos((angle + segmentWidth) * Math.PI / 180) * outerRadius;
        const y3 = 50 + Math.sin((angle + segmentWidth) * Math.PI / 180) * outerRadius;
        const x4 = 50 + Math.cos((angle - segmentWidth) * Math.PI / 180) * outerRadius;
        const y4 = 50 + Math.sin((angle - segmentWidth) * Math.PI / 180) * outerRadius;
        
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`}
            fill="currentColor"
            className="text-primary"
          />
        );
      })}
      
      {/* Center circle */}
      <circle
        cx="50"
        cy="50"
        r="18"
        fill="currentColor"
        className="text-primary"
      />
    </svg>
  );
};

export default RadialLogo;