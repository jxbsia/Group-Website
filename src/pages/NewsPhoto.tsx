import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import AnimatedBlock from '@/components/AnimatedBlock';

const NewsPhoto = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const imagesParam = searchParams.get('images');
  const srcFallback = searchParams.get('src');
  const title = searchParams.get('title') || 'News photo';
  const description = searchParams.get('description');
  const requestedIndex = Number(searchParams.get('index') ?? '0');

  const images = useMemo(() => {
    if (imagesParam) {
      try {
        const parsed = JSON.parse(imagesParam);
        if (Array.isArray(parsed)) {
          return parsed as string[];
        }
      } catch {
        // ignore JSON parse errors and fallback
      }
    }
    return srcFallback ? [srcFallback] : [];
  }, [imagesParam, srcFallback]);

  const safeIndex = useMemo(() => {
    if (!images.length) return 0;
    const idx = Number.isFinite(requestedIndex) ? requestedIndex : 0;
    return Math.min(Math.max(idx, 0), images.length - 1);
  }, [images.length, requestedIndex]);

  const [current, setCurrent] = useState(safeIndex);

  useEffect(() => {
    setCurrent(safeIndex);
  }, [safeIndex]);

  useEffect(() => {
    if (!images.length) {
      navigate('/news', { replace: true });
    }
  }, [images.length, navigate]);

  if (!images.length) {
    return null;
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/news');
    }
  };

  const goPrev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const goNext = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="min-h-screen pt-20 bg-background">
      <section className="vlt-gap-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:bg-accent/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return
            </button>
          </div>

          <AnimatedBlock>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              {images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 border border-border rounded-full p-2 text-foreground hover:bg-accent/20 transition-colors"
                    aria-label="上一张"
                  >
                    <ArrowLeftCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 border border-border rounded-full p-2 text-foreground hover:bg-accent/20 transition-colors"
                    aria-label="下一张"
                  >
                    <ArrowRightCircle className="w-5 h-5" />
                  </button>
                </>
              )}
              <img
                src={images[current]}
                alt={`${title} - ${current + 1}`}
                className="w-full h-full object-contain bg-muted"
              />
            </div>
          </AnimatedBlock>

          {images.length > 1 && (
            <AnimatedBlock delay={0.05}>
              <div className="flex flex-wrap gap-3">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    onClick={() => setCurrent(idx)}
                    className={`border rounded-lg overflow-hidden bg-secondary transition-all ${
                      idx === current
                        ? 'border-accent shadow'
                        : 'border-border hover:border-accent/60'
                    }`}
                    style={{ width: '96px', aspectRatio: '4 / 3' }}
                    aria-label={`第 ${idx + 1} 张`}
                  >
                    <img
                      src={img}
                      alt={`${title} - 缩略图 ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </AnimatedBlock>
          )}

          <AnimatedBlock delay={0.1}>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                NEWS
              </p>
              <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
              {description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}
              {images.length > 1 && (
                <p className="text-xs text-muted-foreground">
                  {current + 1} / {images.length}
                </p>
              )}
            </div>
          </AnimatedBlock>
        </div>
      </section>
    </div>
  );
};

export default NewsPhoto;
