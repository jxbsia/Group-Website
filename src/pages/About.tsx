import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, GraduationCap, Award, ExternalLink } from 'lucide-react';
import professorImage from '@/assets/professor-placeholder.jpg';
const About = () => {
  const education = [{
    degree: 'Ph.D. in Electrical Engineering',
    institution: 'Stanford University',
    year: '2015'
  }, {
    degree: 'M.S. in Photonics',
    institution: 'University of California, Berkeley',
    year: '2010'
  }, {
    degree: 'B.Eng. in Electrical Engineering',
    institution: 'National University of Singapore',
    year: '2008'
  }];
  const awards = [{
    title: 'Outstanding Young Researcher Award',
    organization: 'IEEE Photonics Society',
    year: '2023'
  }, {
    title: 'Early Career Research Excellence Award',
    organization: 'NTU Singapore',
    year: '2022'
  }, {
    title: 'Best Paper Award',
    organization: 'International Conference on Integrated Optics',
    year: '2021'
  }, {
    title: 'Young Investigator Award',
    organization: 'Optical Society of America',
    year: '2020'
  }];
  const researchInterests = ['Integrated Laser Technologies', 'Large-scale Photonic Integration', 'Silicon Photonics', 'Quantum Photonics', 'Optical Communications', 'Photonic Sensing Systems'];
  return <div className="min-h-screen py-12">
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
                  <img src={professorImage} alt="Professor Brian Sia Jia Xu" className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-secondary" />
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
                <p className="text-foreground leading-relaxed mb-4">Brian is a Singaporean electrical engineer who specializes in large-scale photonic integration and high-performance

semiconductor lasers. Specifically, by leveraging on the above, Brian interests include GPS-free navigation, THz-

GHz/MHz optoelectronic systems, gyroscopes, instantaneous chemical and biological interrogation and detection, wireless

RF communication based on cutting-edge laser platforms. He received his B.Eng. from Nanyang Technological

University in 2017, where he spent a year (2014-2015) at the University of Strathclyde, UK. Brian received his Ph.D. from

Nanyang Technological University in 2021 where he was elected as the Valedictorian of his graduating class. During

his graduate studies, he received scholarships to work at the Tokyo Institute of Technology, Japan and Intel Labs, Santa

Clara, US in 2018 and 2020 respectively. Upon graduation, Brian joined a prominent Singapore-based silicon photonic

startup as the Head of Optical and Product Engineering where he spearheaded commercial platform development. In

2022, Brian was one of the two annual recipients of the prestigious Ministry of Education-NTU CoE International Postdoctoral

Fellowship where he pursued his fellowship at the Massachusetts Institute of Technology, US, from 2022 to

2024. In the fall of 2024, Brian joined the School of Electrical and Electronic Engineering in Nanyang Technological

University as an assistant professor. To date, Brian has secured up to 4.9 million SGD of funding with 4.2 million as sole

PI. As of now, the IPs authored by Brian have been the subject of licensing fees from industry in excess of 900,000 SGD.

Brian has served as the conference chair at the Photonics@SG, 10th anniversary. He has been invited to numerous

invited talks. Instances include the SEMICON 2024 under the key national capabilities section, and gave the innaugural

Tech. Talk at the National Defense Science Organization (DSO) Quantum Sensing Center (QSC). He serves as the reviewer

for Advanced Optical Materials, Journal of Lightwave Technology, ACS Photonics, Optics Express/Letters, JOSA

B. Brian has been the corresponding author in internationally renowned journals such as Nature Communications. His

work has been featured in numerous media outlets (i.e., MIT News, Optics.org).</p>
                
                
              </CardContent>
            </Card>

            {/* Research Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair">Research Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {researchInterests.map((interest, index) => <Badge key={index} variant="secondary" className="text-sm">
                      {interest}
                    </Badge>)}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              
              
            </Card>

            {/* Awards */}
            
          </div>
        </div>
      </div>
    </div>;
};
export default About;