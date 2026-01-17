import React, { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  title: string;
  value: number;
  showValue?: boolean;
  className?: string;
  delay?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  title,
  value,
  showValue = true,
  className = '',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        const duration = 1000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(interval);
          } else {
            setDisplayValue(Math.round(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, value, delay]);

  return (
    <div ref={ref} className={`progress-wrapper ${className}`}>
      <div className="progress-header">
        <span className="progress-title">{title}</span>
        {showValue && (
          <span className="progress-value">{displayValue}%</span>
        )}
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: isVisible ? `${value}%` : '0%',
            transitionDelay: `${delay}s`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
