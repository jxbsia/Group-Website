import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBlock from '@/components/AnimatedBlock';
import newsData from '@/data/news.json';
import type { NewsItem } from '@/types/content';

const News = () => {
  const news: NewsItem[] = newsData;

  const isExternalLink = (url?: string) => !!url && /^https?:\/\//i.test(url);
  const isImagePath = (url?: string) =>
    !!url &&
    /\.(png|jpe?g|gif|webp|svg)$/i.test((url.split('?')[0] || '').toLowerCase());
  const buildPhotoViewerUrl = (
    images: string[],
    title: string,
    description?: string,
    itemId?: string
  ) => {
    const payload = encodeURIComponent(JSON.stringify(images));
    return `/news/photo?images=${payload}&index=0&item=${encodeURIComponent(itemId ?? '')}&title=${encodeURIComponent(
      title
    )}${description ? `&description=${encodeURIComponent(description)}` : ''}`;
  };

  const renderLink = (
    destination: string | undefined,
    className: string | undefined,
    children: React.ReactNode
  ) => {
    if (!destination) return children;

    if (destination.startsWith('/news/photo')) {
      return (
        <Link to={destination} className={className}>
          {children}
        </Link>
      );
    }

    const external = isExternalLink(destination);
    return (
      <a
        href={destination}
        className={className}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  };

  const formatDate = (iso: string) => {
    if (!iso) return '';
    const match = iso.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
    if (match) {
      const [, y, m, d] = match;
      return d ? `${y}-${m}-${d}` : `${y}-${m}`;
    }
    return iso;
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="vlt-gap-100 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <AnimatedBlock>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Updates
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-10">
              News & Highlights<span className="text-accent">.</span>
            </h1>
          </AnimatedBlock>

          <div className="divide-y divide-border border border-border">
            {news.map((item, idx) => {
              const hasLink = item.link && item.link !== '#';
              const imageList =
                (item.images && item.images.length > 0
                  ? item.images
                  : (item.thumbnail ? [item.thumbnail] : []));
              const primaryImage = imageList[0];
              const primaryDestination =
                primaryImage && isImagePath(primaryImage)
                  ? buildPhotoViewerUrl(
                      imageList,
                      item.title,
                      item.description,
                      item.id
                    )
                  : hasLink
                  ? item.link
                  : primaryImage;

              return (
                <AnimatedBlock key={item.id} delay={0.05 * idx}>
                  <article className={`p-6 lg:p-8 grid gap-6 hover:bg-card/60 transition-colors ${primaryImage ? 'lg:grid-cols-[minmax(240px,320px)_1fr_auto]' : 'lg:grid-cols-[1fr_auto]'}`}>
                    {primaryImage && <div className="space-y-3">
                      <div
                        className="relative w-full bg-secondary overflow-hidden rounded-lg"
                        style={{ aspectRatio: '16 / 9' }}
                      >
                        {renderLink(
                          primaryDestination,
                          'block h-full',
                          <img
                            src={primaryImage}
                            alt={item.title}
                            className={`w-full h-full ${item.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                            loading="lazy"
                          />
                        )}
                      </div>

                      {item.photoCredit && (
                        <p className="text-xs text-muted-foreground">
                          {item.photoCredit}
                          {item.photoLicenseUrl && <> <a className="underline" href={item.photoLicenseUrl} target="_blank" rel="noopener noreferrer">License</a></>}
                        </p>
                      )}
                    </div>}

                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-widest text-muted-foreground">
                        <span className="px-3 py-1 border border-border text-foreground">
                          {item.category}
                        </span>
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {item.title}
                      </h2>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      {item.sourceUrl && primaryImage && (
                        <a className="inline-flex text-sm text-accent underline hover:text-foreground" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                          {item.sourceLabel || 'Source'}
                        </a>
                      )}
                    </div>

                    {hasLink &&
                      renderLink(
                        !isExternalLink(item.link) && isImagePath(item.link)
                          ? buildPhotoViewerUrl(
                              imageList,
                              item.title,
                              item.description,
                              item.id
                            )
                          : item.link,
                        "self-center inline-flex items-center gap-2 text-sm uppercase tracking-widest text-accent hover:text-foreground transition-colors",
                        <>
                          {primaryImage ? (item.imageFit === 'contain' ? 'View figure' : 'View photos') : (item.sourceLabel || 'View')}
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                  </article>
                </AnimatedBlock>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
