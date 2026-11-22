import { ArrowUpRight } from 'lucide-react';
import AnimatedBlock from '@/components/AnimatedBlock';
import newsData from '@/data/news.json';
import type { NewsItem } from '@/types/content';

const news: NewsItem[] = newsData;

const News = () => (
  <div className="min-h-screen pt-20">
    <section className="vlt-gap-100 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimatedBlock>
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Updates</p>
        </AnimatedBlock>
        <AnimatedBlock delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-10">
            News &amp; Highlights<span className="text-accent">.</span>
          </h1>
        </AnimatedBlock>

        <ul className="divide-y divide-border border-y border-border">
          {news.map((item, index) => {
            const source = item.sourceUrl || (/^https?:\/\//i.test(item.link || '') ? item.link : undefined);
            const label = item.sourceLabel?.replace(' and photos', '').replace(' and figures', '') || 'View source';

            return (
              <li key={item.id}>
                <AnimatedBlock delay={Math.min(0.05 * index, 0.2)}>
                  <article className="grid items-start gap-4 px-2 py-6 sm:px-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8 lg:px-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-widest text-muted-foreground">
                        <span className="px-3 py-1 border border-border text-foreground">{item.category}</span>
                        <time dateTime={item.date}>{item.date}</time>
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground">{item.title}</h2>
                      {item.description && (
                        <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                      )}
                    </div>
                    {source && (
                      <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="justify-self-start self-center inline-flex min-h-11 items-center gap-2 text-sm uppercase tracking-widest text-accent hover:text-foreground transition-colors"
                      >
                        {label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </article>
                </AnimatedBlock>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  </div>
);

export default News;
