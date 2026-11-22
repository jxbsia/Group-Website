import { useEffect, useRef, useState, type ReactNode } from 'react';

type SpectrumLayerProps = {
  children: ReactNode;
  paused: boolean;
  placement: 'hero' | 'collaboration';
};

export default function SpectrumLayer({ children, paused, placement }: SpectrumLayerProps) {
  const layer = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!layer.current) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(layer.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={layer}
      className={`spectrum-layer spectrum-layer-${placement}`}
      data-running={visible && !paused}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
