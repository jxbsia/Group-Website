import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock, Building, ExternalLink, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our research group. We welcome inquiries about collaboration, 
            research opportunities, and partnerships.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Principal Investigator Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-primary">
                  Principal Investigator
                </CardTitle>
                <CardDescription>
                  For research collaboration and academic inquiries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Professor Brian Sia Jia Xu</h3>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-3" />
                    <a href="mailto:bsxu@ntu.edu.sg" className="hover:text-primary transition-colors">
                      bsxu@ntu.edu.sg
                    </a>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-3" />
                    <span>+65 6790 4XXX</span>
                  </div>
                  
                  <div className="flex items-start text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-3 mt-1" />
                    <div>
                      <div>School of Electrical & Electronic Engineering</div>
                      <div>Nanyang Technological University</div>
                      <div>50 Nanyang Avenue, Singapore 639798</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      NTU Faculty Profile
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Office Location */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <Building className="h-5 w-5 mr-2 text-accent" />
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Research Lab & Office</p>
                  <p className="text-muted-foreground">
                    Block S2.1, Level 3, Room S2.1-B3-XX<br />
                    School of Electrical & Electronic Engineering<br />
                    Nanyang Technological University<br />
                    Singapore 639798
                  </p>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-3" />
                  <span>Office Hours: Monday - Friday, 9:00 AM - 6:00 PM</span>
                </div>

                <div className="pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href="https://maps.google.com/?q=Nanyang+Technological+University+Singapore" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Research Inquiries */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Research Opportunities</CardTitle>
                <CardDescription>
                  Interested in joining our research group?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-primary">PhD Positions</h4>
                    <p className="text-sm text-muted-foreground">
                      We regularly accept PhD students with strong backgrounds in electrical engineering, 
                      physics, or related fields.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-primary">Postdoctoral Positions</h4>
                    <p className="text-sm text-muted-foreground">
                      Postdoc opportunities are available for researchers with expertise in photonics 
                      and integrated systems.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-primary">Visiting Researchers</h4>
                    <p className="text-sm text-muted-foreground">
                      We welcome visiting researchers and sabbatical visitors for collaborative projects.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/team">
                      View Current Team →
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-primary">
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="affiliation">Institution/Organization</Label>
                    <Input id="affiliation" placeholder="Your institution or company" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Brief subject of your inquiry" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mt-6 bg-secondary/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-3">Response Time</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We typically respond to inquiries within 2-3 business days. For urgent matters, 
                  please email Professor Xu directly.
                </p>
                
                <h3 className="font-semibold text-primary mb-3">Collaboration Inquiries</h3>
                <p className="text-sm text-muted-foreground">
                  For research collaboration proposals, please include relevant background information 
                  and preliminary ideas in your message. We're always interested in exploring new 
                  partnerships that advance photonic technologies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;