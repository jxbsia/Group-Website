import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, CircuitBoard, Microscope, Cpu, Wifi, Eye, ExternalLink, Users } from 'lucide-react';

interface ResearchArea {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: React.ComponentType<any>;
  applications: string[];
  keyTechnologies: string[];
  funding?: string;
  collaborators?: string[];
  publications?: number;
}

const Research = () => {
  const researchAreas: ResearchArea[] = [
    {
      id: '1',
      title: 'High-Performance Integrated Lasers',
      description: 'Developing next-generation integrated laser technologies with unprecedented efficiency and performance.',
      detailedDescription: 'Our research focuses on creating advanced integrated laser systems that combine high power output with exceptional efficiency. We work on novel cavity designs, gain media optimization, and thermal management solutions to push the boundaries of what\'s possible in integrated photonics.',
      icon: Zap,
      applications: ['Optical Communications', 'LiDAR Systems', 'Medical Devices', 'Industrial Processing'],
      keyTechnologies: ['Silicon Photonics', 'III-V Integration', 'Hybrid Platforms', 'Thermal Management'],
      funding: 'NRF Investigator Award (S$2.5M)',
      collaborators: ['IMEC Belgium', 'MIT Lincoln Laboratory', 'Huawei Technologies'],
      publications: 45
    },
    {
      id: '2',
      title: 'Large-Scale Photonic Integration',
      description: 'Advancing techniques for creating complex, highly-functional photonic circuits on single platforms.',
      detailedDescription: 'We develop scalable manufacturing processes and design methodologies for large-scale photonic integrated circuits. Our work enables the creation of complex photonic systems with hundreds of components on a single chip.',
      icon: CircuitBoard,
      applications: ['Data Centers', 'Quantum Computing', 'Signal Processing', 'Optical Interconnects'],
      keyTechnologies: ['Wafer-Scale Integration', 'Multi-layer Architectures', 'Advanced Lithography', 'Design Automation'],
      funding: 'A*STAR RIE2025 Programme (S$3.2M)',
      collaborators: ['GlobalFoundries', 'TSMC', 'University of California Santa Barbara'],
      publications: 38
    },
    {
      id: '3',
      title: 'Silicon Photonics Platforms',
      description: 'Creating versatile silicon-based platforms for diverse photonic applications.',
      detailedDescription: 'Our silicon photonics research leverages CMOS-compatible processes to create cost-effective, scalable photonic solutions. We focus on developing novel device architectures and integration strategies.',
      icon: Cpu,
      applications: ['Telecom Infrastructure', 'Datacom Systems', 'Sensors', 'Optical Computing'],
      keyTechnologies: ['CMOS Integration', 'Grating Couplers', 'Waveguide Design', 'Packaging Solutions'],
      funding: 'Industry Collaboration (S$1.8M)',
      collaborators: ['Intel Corporation', 'Cisco Systems', 'STMicroelectronics'],
      publications: 32
    },
    {
      id: '4',
      title: 'Quantum Photonic Systems',
      description: 'Exploring quantum applications of integrated photonic technologies.',
      detailedDescription: 'We investigate quantum properties of light in integrated photonic systems, developing components for quantum communication, computing, and sensing applications.',
      icon: Microscope,
      applications: ['Quantum Communication', 'Quantum Computing', 'Quantum Sensing', 'Quantum Cryptography'],
      keyTechnologies: ['Single Photon Sources', 'Quantum Interferometry', 'Entanglement Generation', 'Quantum State Control'],
      funding: 'Quantum Engineering Programme (S$2.1M)',
      collaborators: ['Centre for Quantum Technologies', 'University of Bristol', 'Xanadu'],
      publications: 28
    },
    {
      id: '5',
      title: 'Optical Communications',
      description: 'Advancing optical communication systems through innovative photonic solutions.',
      detailedDescription: 'Our research addresses the growing demands of optical communication networks by developing high-speed, low-power photonic components and systems.',
      icon: Wifi,
      applications: ['5G Networks', 'Fiber-Optic Systems', 'Satellite Communications', 'Underwater Networks'],
      keyTechnologies: ['High-Speed Modulators', 'Coherent Detection', 'Wavelength Division Multiplexing', 'Signal Processing'],
      funding: 'Telecom Innovation Fund (S$1.5M)',
      collaborators: ['Singtel', 'Nokia Bell Labs', 'University of Sydney'],
      publications: 41
    },
    {
      id: '6',
      title: 'Photonic Sensing Systems',
      description: 'Developing advanced sensing solutions using integrated photonic technologies.',
      detailedDescription: 'We create innovative photonic sensors for environmental monitoring, biomedical applications, and industrial process control, leveraging the sensitivity and selectivity of optical sensing.',
      icon: Eye,
      applications: ['Environmental Monitoring', 'Biomedical Diagnostics', 'Industrial Sensing', 'Food Safety'],
      keyTechnologies: ['Optical Biosensors', 'Spectroscopic Systems', 'Interferometric Sensors', 'Surface Plasmonics'],
      funding: 'Healthcare Innovation Grant (S$1.9M)',
      collaborators: ['Singapore General Hospital', 'A*STAR IMRE', 'Bosch Research'],
      publications: 35
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Research Areas
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our research spans multiple areas of photonics and integrated laser technologies, 
            pushing the boundaries of what's possible in optical systems and applications.
          </p>
        </div>

        {/* Research Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-muted-foreground">Publications</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">$12M+</div>
              <div className="text-sm text-muted-foreground">Research Funding</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Collaborators</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-sm text-muted-foreground">Patent Applications</div>
            </CardContent>
          </Card>
        </div>

        {/* Research Areas */}
        <div className="space-y-12">
          {researchAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <Card key={area.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className={`grid lg:grid-cols-3 gap-0 ${index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'}`}>
                  {/* Content */}
                  <div className={`lg:col-span-2 p-8 ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-playfair text-primary">
                            {area.title}
                          </CardTitle>
                          <CardDescription className="text-base mt-1">
                            {area.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0 space-y-6">
                      <p className="text-foreground leading-relaxed">
                        {area.detailedDescription}
                      </p>

                      <div>
                        <h4 className="font-semibold text-primary mb-3">Key Applications</h4>
                        <div className="flex flex-wrap gap-2">
                          {area.applications.map((app, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-primary mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {area.keyTechnologies.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {area.funding && (
                        <div className="bg-accent/10 p-4 rounded-lg">
                          <h4 className="font-semibold text-primary mb-2">Current Funding</h4>
                          <p className="text-sm text-foreground">{area.funding}</p>
                        </div>
                      )}
                    </CardContent>
                  </div>

                  {/* Stats and Info Panel */}
                  <div className={`bg-secondary/30 p-8 flex flex-col justify-center ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{area.publications}</div>
                        <div className="text-sm text-muted-foreground">Publications</div>
                      </div>

                      {area.collaborators && (
                        <div>
                          <h4 className="font-semibold text-primary mb-3 flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Key Collaborators
                          </h4>
                          <div className="space-y-2">
                            {area.collaborators.slice(0, 3).map((collab, idx) => (
                              <div key={idx} className="text-sm text-foreground bg-white/60 p-2 rounded">
                                {collab}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Related Publications
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-playfair font-bold text-primary mb-4">
                Interested in Collaboration?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're always open to new collaborations and partnerships. 
                Whether you're from academia or industry, let's explore how we can work together 
                to advance photonic technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="mailto:bsxu@ntu.edu.sg">
                    Contact for Collaboration
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/publications">
                    View Our Publications
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Research;