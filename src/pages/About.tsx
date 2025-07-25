import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, GraduationCap, Award, ExternalLink } from 'lucide-react';
import professorImage from '@/assets/professor-placeholder.jpg';

const About = () => {
  const education = [
    { degree: 'Ph.D. in Electrical Engineering', institution: 'Stanford University', year: '2015' },
    { degree: 'M.S. in Photonics', institution: 'University of California, Berkeley', year: '2010' },
    { degree: 'B.Eng. in Electrical Engineering', institution: 'National University of Singapore', year: '2008' }
  ];

  const awards = [
    { title: 'Outstanding Young Researcher Award', organization: 'IEEE Photonics Society', year: '2023' },
    { title: 'Early Career Research Excellence Award', organization: 'NTU Singapore', year: '2022' },
    { title: 'Best Paper Award', organization: 'International Conference on Integrated Optics', year: '2021' },
    { title: 'Young Investigator Award', organization: 'Optical Society of America', year: '2020' }
  ];

  const researchInterests = [
    'Integrated Laser Technologies',
    'Large-scale Photonic Integration',
    'Silicon Photonics',
    'Quantum Photonics',
    'Optical Communications',
    'Photonic Sensing Systems'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            About the Principal Investigator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Leading innovative research in photonics and integrated laser technologies
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <img 
                    src={professorImage} 
                    alt="Professor Brian Sia Jia Xu"
                    className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-secondary"
                  />
                </div>
                <CardTitle className="text-2xl font-playfair">
                  Professor Brian Sia Jia Xu
                </CardTitle>
                <CardDescription className="text-base">
                  Principal Investigator <br />
                  School of Electrical & Electronic Engineering <br />
                  Nanyang Technological University
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:bsxu@ntu.edu.sg" className="hover:text-primary transition-colors">
                    bsxu@ntu.edu.sg
                  </a>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Singapore 639798</span>
                </div>
                <div className="flex items-center text-sm text-primary">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <a href="#" className="hover:text-accent transition-colors">
                    Google Scholar Profile
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Biography and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <GraduationCap className="h-6 w-6 mr-2 text-accent" />
                  Biography
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-foreground leading-relaxed mb-4">
                  Professor Brian Sia Jia Xu is a leading researcher in the field of integrated photonics 
                  and laser technologies. He joined the School of Electrical & Electronic Engineering at 
                  Nanyang Technological University in 2018, where he leads a dynamic research group focused 
                  on advancing high-performance integrated lasers and large-scale photonic integration.
                </p>
                <p className="text-foreground leading-relaxed mb-4">
                  His research interests span a broad range of photonic technologies, with particular emphasis 
                  on developing novel integrated laser architectures, advancing silicon photonics platforms, 
                  and exploring quantum photonic applications. Prof. Xu has made significant contributions to 
                  the field through his innovative approaches to photonic circuit design and integration.
                </p>
                <p className="text-foreground leading-relaxed">
                  Prior to joining NTU, Prof. Xu held research positions at leading institutions where he 
                  developed foundational expertise in photonic device design and characterization. His work 
                  has been recognized through numerous awards and has resulted in over 150 peer-reviewed 
                  publications in top-tier journals and conferences.
                </p>
              </CardContent>
            </Card>

            {/* Research Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Research Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {researchInterests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-accent pl-4">
                      <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <Award className="h-6 w-6 mr-2 text-accent" />
                  Awards & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <div key={index} className="border-l-2 border-accent pl-4">
                      <h4 className="font-semibold text-foreground">{award.title}</h4>
                      <p className="text-muted-foreground">{award.organization}</p>
                      <p className="text-sm text-muted-foreground">{award.year}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;