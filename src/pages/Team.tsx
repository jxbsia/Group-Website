import React from 'react';
import { Mail, GraduationCap } from 'lucide-react';
import AnimatedBlock from '@/components/AnimatedBlock';
import teamData from '@/data/team.json';
import type { TeamMember } from '@/types/content';

const Team = () => {
  const teamMembers: TeamMember[] = teamData.members;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="vlt-gap-100 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <AnimatedBlock>
                <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                  Our People
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-8">
                  Research<br />Team<span className="text-accent">.</span>
                </h1>
              </AnimatedBlock>

              <AnimatedBlock delay={0.2}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Meet the talented researchers advancing the frontiers of photonics
                  and integrated laser technologies.
                </p>
              </AnimatedBlock>
            </div>

          </div>
        </div>
      </section>

      {/* Current Team Section */}
      <section className="vlt-gap-100 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <AnimatedBlock key={member.id} delay={0.1 + (index % 6) * 0.05}>
                <div className="gilber-card group h-full">
                  <div className="p-8">
                    {/* Avatar Placeholder */}
                    <div className="w-20 h-20 bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <GraduationCap className="h-10 w-10 text-accent" />
                    </div>

                    {/* Member Info */}
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {member.position}
                    </p>

                    {/* Role Badge */}
                    <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest text-accent border border-accent mb-6">
                      {member.role}
                    </span>

                    {/* Research Interests */}
                    <div className="mb-6">
                      <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        Research Interests
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.researchInterests.slice(0, 3).map((interest) => (
                          <span
                            key={interest}
                            className="px-2 py-1 text-xs bg-secondary text-muted-foreground"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                      <span>Since {member.startYear}</span>
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center hover:text-accent transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section className="vlt-gap-100 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedBlock>
            <div className="mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                Where Are They Now
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Alumni<span className="text-accent">.</span>
              </h2>
            </div>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1}>
            <div className="gilber-card p-8 text-center">
              <p className="text-lg text-muted-foreground">
                Not Yet ...
              </p>
            </div>
          </AnimatedBlock>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="vlt-gap-100 bg-card">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedBlock>
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Opportunities
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-8">
              {teamData.joinUs.title}<span className="text-accent">.</span>
            </h2>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              {teamData.joinUs.description}
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.3}>
            <a
              href={`mailto:${teamData.joinUs.contactEmail}`}
              className="gilber-btn gilber-btn-primary"
            >
              CONTACT US ABOUT OPPORTUNITIES
            </a>
          </AnimatedBlock>
        </div>
      </section>
    </div>
  );
};

export default Team;
