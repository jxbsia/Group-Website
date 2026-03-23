import React from 'react';
import { Mail } from 'lucide-react';
import AnimatedBlock from '@/components/AnimatedBlock';
import teamData from '@/data/team.json';
import type { TeamMember } from '@/types/content';
import placeholderPortrait from '@/assets/professor-placeholder.jpg';

const Team = () => {
  const adminMember: TeamMember = teamData.members[0];
  const teamMembers: TeamMember[] = teamData.members.slice(1);

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
          {/* Administrator - centered top row */}
          <div className="flex justify-center mb-8">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <AnimatedBlock delay={0.1}>
                <div className="gilber-card group h-full overflow-hidden flex flex-col">
                  <div className="relative">
                    <div className="w-full bg-secondary" style={{ aspectRatio: '3 / 4' }}>
                      {adminMember.image ? (
                        <img
                          src={adminMember.image}
                          onError={(e) => { e.currentTarget.src = placeholderPortrait; }}
                          alt={adminMember.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>
                  </div>
                  <div className="p-8 space-y-4 flex-1 flex flex-col">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        {adminMember.position}
                      </p>
                      <h3 className="text-xl font-semibold text-foreground">
                        {adminMember.name}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground pt-4 border-t border-border">
                      <a
                        href={`mailto:${adminMember.email}`}
                        className="flex items-center gap-2 hover:text-accent transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        {adminMember.email}
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedBlock>
            </div>
          </div>

          {/* Team Grid */}
          {[
            teamMembers.slice(0, 3),
            teamMembers.slice(3, 6),
            teamMembers.slice(6, 9),
            teamMembers.slice(9, 12),
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 last:mb-0">
              {row.map((member, index) => {
                const hasStartYear = /^\d{4}$/.test(member.startYear);

                return (
                  <AnimatedBlock key={member.id} delay={0.1 + (index % 6) * 0.05}>
                    <div className="gilber-card group h-full overflow-hidden flex flex-col">
                      <div className="relative">
                        <div className="w-full bg-secondary" style={{ aspectRatio: '3 / 4' }}>
                          {member.image ? (
                            <img
                              src={member.image}
                              onError={(e) => { e.currentTarget.src = placeholderPortrait; }}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full" />
                          )}
                        </div>
                      </div>

                      <div className="p-8 space-y-4 flex-1 flex flex-col">
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            {member.position}
                          </p>
                          <h3 className="text-xl font-semibold text-foreground">
                            {member.name}
                          </h3>
                          {member.role && (
                            <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest text-accent border border-accent">
                              {member.role}
                            </span>
                          )}
                        </div>

                        <div className="space-y-3 flex-1">
                          <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                            Research Interests
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {member.researchInterests.map((interest) => (
                              <span
                                key={interest}
                                className="px-2 py-1 text-xs bg-secondary text-muted-foreground"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                          <a
                            href={member.email ? `mailto:${member.email}` : undefined}
                            className={`flex items-center gap-2 hover:text-accent transition-colors ${member.email ? '' : 'cursor-not-allowed opacity-70'}`}
                            aria-disabled={!member.email}
                          >
                            <Mail className="h-4 w-4" />
                            {member.email || 'Email pending'}
                          </a>
                          <span>
                            {hasStartYear ? `Since ${member.startYear}` : 'Start year pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AnimatedBlock>
                );
              })}
            </div>
          ))}
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
