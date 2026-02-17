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
    index = 0
  ) => {
    const payload = encodeURIComponent(JSON.stringify(images));
    return `/news/photo?images=${payload}&index=${index}&title=${encodeURIComponent(
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
                  : [item.thumbnail || '/placeholder.svg']);
              const primaryImage = imageList[0];
              const primaryDestination =
                !isExternalLink(hasLink ? item.link : primaryImage) &&
                isImagePath(hasLink ? item.link : primaryImage)
                  ? buildPhotoViewerUrl(
                      imageList,
                      item.title,
                      item.description,
                      0
                    )
                  : hasLink
                  ? item.link
                  : primaryImage;

              return (
                <AnimatedBlock key={item.id} delay={0.05 * idx}>
                  <article className="p-6 lg:p-8 grid lg:grid-cols-[minmax(240px,320px)_1fr_auto] gap-6 hover:bg-card/60 transition-colors">
                    <div className="space-y-3">
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
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Hide additional thumbnails on list view; full set opens in viewer */}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                        <span className="px-3 py-1 border border-border text-foreground">
                          {item.category}
                        </span>
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {hasLink &&
                      renderLink(
                        !isExternalLink(item.link) && isImagePath(item.link)
                          ? buildPhotoViewerUrl(
                              imageList,
                              item.title,
                              item.description
                            )
                          : item.link,
                        "self-center inline-flex items-center gap-2 text-sm uppercase tracking-widest text-accent hover:text-foreground transition-colors",
                        <>
                          View
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
