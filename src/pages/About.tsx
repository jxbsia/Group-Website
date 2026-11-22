import { Mail, MapPin, ExternalLink } from 'lucide-react';
import AnimatedBlock from '@/components/AnimatedBlock';
import professorImage from '@/assets/professor.jpg';
import opticalSetup from '@/assets/about-optical-setup.jpg';
import aboutData from '@/data/about.json';

const About = () => {
  const { pi } = aboutData;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="about-portrait-hero relative isolate overflow-hidden vlt-gap-100 bg-background">
        <div className="about-portrait-backdrop" aria-hidden="true">
          <img src={opticalSetup} alt="" width={853} height={1233} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
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
            <div className="relative overflow-hidden">
              <AnimatedBlock delay={0.2} animation="slide-in-right">
                <div className="relative">
                  <img
                    src={professorImage}
                    alt={pi.name}
                    className="w-full aspect-[3/4] object-cover border border-white/10"
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
                <div className="prose prose-invert max-w-none space-y-6">
                  {pi.biography.split('\n\n').map((paragraph) => (
                    <p key={paragraph} className="text-muted-foreground leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimatedBlock>
            </div>

          </div>
        </div>
      </section>

      <section className="vlt-gap-100 bg-background" aria-label="Inside the lab">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedBlock animation="fade-in-up-sm">
            <figure className="mx-auto max-w-2xl">
              <div className="overflow-hidden border border-white/10 bg-black">
                <img
                  className="about-lab-photo mx-auto block h-auto w-full"
                  src={opticalSetup}
                  alt="Red laser light passing through an optical setup"
                  width={853}
                  height={1233}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border py-4">
                <span className="text-xs uppercase tracking-[0.2em] text-accent">Inside the lab</span>
                <span className="text-sm text-muted-foreground">Laser light in an optical setup.</span>
              </figcaption>
            </figure>
          </AnimatedBlock>
        </div>
      </section>

    </div>
  );
};

export default About;
