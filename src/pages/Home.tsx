import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedBlock from '@/components/AnimatedBlock';
import KenBurnsBackground from '@/components/KenBurnsBackground';
import MagicBackground from '@/components/MagicBackground';
import ctaBackground from '@/assets/cta-background.jpg';
import ntuLogo from '@/assets/ntu-logo.png';
import astarLogo from '@/assets/astar-logo.png';
import moeLogo from '@/assets/moe-logo.png';
import dsoLogo from '@/assets/dso-logo.png';
import samsungLogo from '@/assets/samsung-logo.png';
import siaLogo from '@/assets/sia-logo.svg';
import homeData from '@/data/home.json';
import newsData from '@/data/news.json';
import type { NewsItem } from '@/types/content';

const Home = () => {
  const featuredNews: NewsItem[] = newsData.slice(0, 3);

  const logoMap: Record<string, string> = {
    'astar-logo.png': astarLogo,
    'dso-logo.png': dsoLogo,
    'ntu-logo.png': ntuLogo,
    'moe-logo.png': moeLogo,
    'samsung-logo.png': samsungLogo
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Magic Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <MagicBackground interval={4000} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <p className="text-lg uppercase tracking-[0.3em] text-accent font-medium mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)' }}>
                {homeData.hero.institution}
              </p>

              <AnimatedBlock delay={0.1}>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-[0.1em] mb-6" style={{ fontFamily: 'Moonspace, sans-serif' }}>
                  SIA LABORATORIES<span className="text-accent">.</span>
                </h1>
              </AnimatedBlock>

              <AnimatedBlock delay={0.2}>
                <p className="hero-subtitle mb-8">
                  {homeData.hero.subtitle}
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/research"
                    className="gilber-btn gilber-btn-primary"
                  >
                    EXPLORE RESEARCH
                  </Link>
                  <Link
                    to="/publications"
                    className="gilber-btn gilber-btn-outline"
                  >
                    VIEW PUBLICATIONS
                  </Link>
                </div>
              </AnimatedBlock>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-border relative overflow-hidden">
            <div className="absolute inset-0 bg-accent animate-pulse" />
          </div>
        </div>
      </section>

      {/* Research Highlights Section */}
      <section className="vlt-gap-120 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedBlock>
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-12">
              Areas<span className="text-accent">.</span>
            </h2>
          </AnimatedBlock>

          <ul className="space-y-4" style={{ fontFamily: 'CS Gilbert Mono, monospace' }}>
            {homeData.researchHighlights.map((highlight, index) => (
              <AnimatedBlock key={highlight.id} delay={0.2 + index * 0.05}>
                <li className="text-lg md:text-xl text-foreground flex items-start gap-4">
                  <span className="text-accent">—</span>
                  {highlight.title}
                </li>
              </AnimatedBlock>
            ))}
          </ul>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="vlt-gap-120 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <AnimatedBlock>
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                Updates
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                Latest News<span className="text-accent">.</span>
              </h2>
            </AnimatedBlock>

            <AnimatedBlock delay={0.1}>
              <Link
                to="/news"
                className="inline-flex items-center text-sm uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
              >
                VIEW ALL NEWS
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </AnimatedBlock>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNews.map((news, index) => (
              <AnimatedBlock key={news.id} delay={0.1 + index * 0.1}>
                <article className="news-card">
                  <div className="news-card-image bg-secondary">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <span className="text-6xl font-semibold opacity-20">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="news-card-content">
                    <p className="news-card-date">{news.date}</p>
                    <h3 className="news-card-title">{news.title}</h3>
                    <p className="news-card-excerpt">{news.excerpt}</p>
                  </div>
                </article>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Funders Section */}
      <section className="vlt-gap-100 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedBlock>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                Our Partners
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground">
                Funders<span className="text-accent">.</span>
              </h2>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <div className="flex justify-center items-center gap-6 lg:gap-12">
              {homeData.funders.map((funder, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center p-6 bg-white/5 rounded-2xl ${index === 2 ? 'scale-110' : ''}`}
                >
                  <img
                    src={logoMap[funder.logo]}
                    alt={funder.name}
                    className="partner-logo max-h-28 w-auto rounded-xl"
                  />
                </div>
              ))}
            </div>
          </AnimatedBlock>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative vlt-gap-120 overflow-hidden">
        <KenBurnsBackground
          imageSrc={ctaBackground}
          alt="CTA Background"
          overlay="dark"
          reverse
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedBlock>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-[0.2em]">
              Collaboration
            </h2>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <div className="flex justify-center mt-12">
              <Link
                to="/contact"
                className="gilber-btn gilber-btn-outline"
              >
                GET IN TOUCH
              </Link>
            </div>
          </AnimatedBlock>
        </div>
      </section>
    </div>
  );
};

export default Home;
