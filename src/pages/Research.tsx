import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import AnimatedBlock from '@/components/AnimatedBlock';
import { getIcon } from '@/utils/iconMap';
import researchData from '@/data/research.json';
import type { ResearchArea } from '@/types/content';

const Research = () => {
  const researchAreas: ResearchArea[] = researchData.areas;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="vlt-gap-100 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div>
            <AnimatedBlock>
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                Our Work
              </p>
            </AnimatedBlock>

            <AnimatedBlock delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-8">
                Research<br />Areas<span className="text-accent">.</span>
              </h1>
            </AnimatedBlock>

            <AnimatedBlock delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Our research spans multiple areas of photonics and integrated laser technologies,
                pushing the boundaries of what's possible in optical systems and applications.
              </p>
            </AnimatedBlock>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="vlt-gap-120 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24">
            {researchAreas.map((area, index) => {
              const IconComponent = getIcon(area.icon);
              const isEven = index % 2 === 0;

              return (
                <AnimatedBlock key={area.id} delay={0.1}>
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Content */}
                    <div className={!isEven ? 'lg:col-start-2' : ''}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-accent" />
                        </div>
                        <span className="text-sm uppercase tracking-widest text-muted-foreground">
                          0{index + 1}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                        {area.title}<span className="text-accent">.</span>
                      </h2>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {area.detailedDescription}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-sm uppercase tracking-widest text-accent mb-3">
                          Key Applications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {area.applications.map((app) => (
                            <span
                              key={app}
                              className="px-3 py-1 text-xs border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-foreground">
                          <strong className="text-accent">{area.publications}</strong> Publications
                        </span>
                        {area.funding && (
                          <span className="text-muted-foreground">
                            Funded by: {area.funding.split(' - ')[0]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Visual Card */}
                    <div className={!isEven ? 'lg:col-start-1' : ''}>
                      <div className="gilber-card p-8 lg:p-12 aspect-square flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 text-[200px] font-semibold text-accent/5 leading-none select-none">
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="relative z-10">
                          <h3 className="text-2xl font-semibold text-foreground mb-4">
                            {area.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {area.description}
                          </p>
                        </div>

                        <div className="relative z-10 flex flex-wrap gap-2">
                          {area.keyTechnologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs bg-background text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="vlt-gap-100 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedBlock>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Collaboration
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-8">
              {researchData.collaboration.title}<span className="text-accent">.</span>
            </h2>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              {researchData.collaboration.description}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${researchData.collaboration.contactEmail}`}
                className="gilber-btn gilber-btn-primary"
              >
                GET IN TOUCH
              </a>
              <Link
                to="/publications"
                className="gilber-btn gilber-btn-outline"
              >
                VIEW PUBLICATIONS
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </AnimatedBlock>
        </div>
      </section>
    </div>
  );
};

export default Research;
