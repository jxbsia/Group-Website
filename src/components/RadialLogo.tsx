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
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontSize="110"
        fontFamily="Orbitron, sans-serif"
        fill="currentColor"
        className="text-primary"
      >
        ω
      </text>
    </svg>
  );
};

export default RadialLogo;