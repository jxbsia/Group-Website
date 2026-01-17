import React from 'react';
import heroBackground from '@/assets/hero-background.jpg';

interface MagicBackgroundProps {
  className?: string;
}

const MagicBackground: React.FC<MagicBackgroundProps> = ({
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Dark background base */}
      <div className="absolute inset-0 bg-black" />

      {/* Static image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
};

export default MagicBackground;
