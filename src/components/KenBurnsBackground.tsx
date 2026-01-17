import React from 'react';

interface KenBurnsBackgroundProps {
  imageSrc: string;
  alt?: string;
  reverse?: boolean;
  overlay?: 'dark' | 'top' | 'bottom' | 'none';
  className?: string;
}

const KenBurnsBackground: React.FC<KenBurnsBackgroundProps> = ({
  imageSrc,
  alt = 'Background',
  reverse = false,
  overlay = 'dark',
  className = '',
}) => {
  const overlayClasses = {
    dark: 'bg-gradient-to-b from-background/60 via-background/80 to-background',
    top: 'bg-gradient-to-b from-background/80 to-transparent',
    bottom: 'bg-gradient-to-t from-background via-background/50 to-transparent',
    none: '',
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover ${reverse ? 'animate-ken-burns-reverse' : 'animate-ken-burns'}`}
      />
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      )}
    </div>
  );
};

export default KenBurnsBackground;
