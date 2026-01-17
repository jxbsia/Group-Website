import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import AnimatedBlock from '@/components/AnimatedBlock';
import professorImage from '@/assets/professor.jpg';
import aboutData from '@/data/about.json';

const About = () => {
  const { pi } = aboutData;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="vlt-gap-100 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Experience Block */}
            <div>
              <AnimatedBlock>
                <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                  Principal Investigator
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-8">
                  {pi.name.split(' ')[0]}<br />
                  {pi.name.split(' ').slice(1).join(' ')}<span className="text-accent">.</span>
                </h1>
              </AnimatedBlock>

              <AnimatedBlock delay={0.2}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {pi.title}, {pi.affiliation}
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={0.3}>
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <a
                    href={`mailto:${pi.email}`}
                    className="flex items-center hover:text-accent transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {pi.email}
                  </a>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {pi.location}
                  </span>
                </div>
              </AnimatedBlock>

              <AnimatedBlock delay={0.4}>
                <div className="mt-8">
                  <a
                    href={pi.googleScholarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gilber-btn gilber-btn-outline text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    GOOGLE SCHOLAR
                  </a>
                </div>
              </AnimatedBlock>
            </div>

            {/* Right: Image with Experience Number */}
            <div className="relative">
              <AnimatedBlock delay={0.2} animation="slide-in-right">
                <div className="relative">
                  <img
                    src={professorImage}
                    alt={pi.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
              </AnimatedBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="vlt-gap-100 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-16">
            {/* Left: Biography */}
            <div>
              <AnimatedBlock>
                <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                  Biography
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
                  Research Journey<span className="text-accent">.</span>
                </h2>
              </AnimatedBlock>

              <AnimatedBlock delay={0.1}>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {pi.biography}
                  </p>
                </div>
              </AnimatedBlock>
            </div>

          </div>
        </div>
      </section>

      {/* Research Interests Section */}
      <section className="vlt-gap-100 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedBlock>
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                Focus Areas
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Research Interests<span className="text-accent">.</span>
              </h2>
            </div>
          </AnimatedBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pi.researchInterests.map((interest, index) => (
              <AnimatedBlock key={interest} delay={0.1 + index * 0.05}>
                <div className="gilber-card p-6 text-center hover:border-accent transition-colors">
                  <span className="text-4xl font-semibold text-accent opacity-30 mb-4 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-medium text-foreground">
                    {interest}
                  </h3>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
