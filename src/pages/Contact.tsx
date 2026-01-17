import React from 'react';
import { Mail, Phone, MapPin, Clock, ExternalLink, Send } from 'lucide-react';
import AnimatedBlock from '@/components/AnimatedBlock';
import KenBurnsBackground from '@/components/KenBurnsBackground';
import gargantuaBackground from '@/assets/gargantua-background.jpg';
import contactData from '@/data/contact.json';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Ken Burns */}
      <section className="relative vlt-gap-120 overflow-hidden">
        <KenBurnsBackground
          imageSrc={gargantuaBackground}
          alt="Contact Background"
          overlay="dark"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <AnimatedBlock>
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                Get in Touch
              </p>
            </AnimatedBlock>

            <AnimatedBlock delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-8">
                Contact Us<span className="text-accent">.</span>
              </h1>
            </AnimatedBlock>

            <AnimatedBlock delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We welcome inquiries about collaboration, research opportunities, and partnerships.
                Get in touch with our research group.
              </p>
            </AnimatedBlock>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="vlt-gap-120 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact Information */}
            <div className="space-y-12">
              {/* Principal Investigator */}
              <AnimatedBlock>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                    {contactData.pi.title}
                  </p>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">
                    {contactData.pi.name}
                  </h2>

                  <div className="space-y-4">
                    <a
                      href={`mailto:${contactData.pi.email}`}
                      className="flex items-center text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-4" />
                      {contactData.pi.email}
                    </a>

                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-5 w-5 mr-4" />
                      {contactData.pi.phone}
                    </div>

                    <a
                      href={contactData.pi.facultyProfileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 mr-4" />
                      Faculty Profile
                    </a>
                  </div>
                </div>
              </AnimatedBlock>

              {/* Office Location */}
              <AnimatedBlock delay={0.1}>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                    Office Location
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start text-muted-foreground">
                      <MapPin className="h-5 w-5 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-foreground font-medium">
                          {contactData.office.building}, {contactData.office.level}
                        </p>
                        <p>{contactData.office.room}</p>
                        <p>{contactData.address.department}</p>
                        <p>{contactData.address.university}</p>
                        <p>{contactData.address.city} {contactData.address.postalCode}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-5 w-5 mr-4" />
                      {contactData.office.officeHours}
                    </div>

                    <a
                      href={contactData.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gilber-btn gilber-btn-outline text-sm inline-flex mt-4"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      VIEW ON MAP
                    </a>
                  </div>
                </div>
              </AnimatedBlock>

              {/* Research Opportunities */}
              <AnimatedBlock delay={0.2}>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                    Research Opportunities
                  </p>

                  <div className="space-y-6">
                    {contactData.opportunities.map((opp, index) => (
                      <div key={index} className="gilber-card p-6">
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {opp.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {opp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedBlock>
            </div>

            {/* Right: Contact Form */}
            <div>
              <AnimatedBlock delay={0.1}>
                <div className="gilber-card p-8 lg:p-12">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Send a Message<span className="text-accent">.</span>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-8">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          placeholder="First Name *"
                          required
                          className="gilber-input"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Last Name *"
                          required
                          className="gilber-input"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email Address *"
                        required
                        className="gilber-input"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Institution / Organization"
                        className="gilber-input"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Subject *"
                        required
                        className="gilber-input"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder="Your Message *"
                        rows={6}
                        required
                        className="gilber-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      className="gilber-btn gilber-btn-primary w-full"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      SEND MESSAGE
                    </button>
                  </form>
                </div>
              </AnimatedBlock>

              {/* Additional Info */}
              <AnimatedBlock delay={0.2}>
                <div className="mt-8 p-6 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Response Time
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {contactData.additionalInfo.responseTime}
                  </p>

                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Collaboration Inquiries
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {contactData.additionalInfo.collaborationNote}
                  </p>
                </div>
              </AnimatedBlock>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
