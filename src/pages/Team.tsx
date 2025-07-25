import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, GraduationCap, Users, UserCheck } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  role: 'phd' | 'postdoc' | 'staff' | 'masters';
  email: string;
  researchInterests: string[];
  startYear: string;
  image?: string;
}

interface AlumniMember {
  id: string;
  name: string;
  previousPosition: string;
  currentPosition: string;
  graduationYear: string;
  currentInstitution?: string;
}

const Team = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      position: 'Postdoctoral Research Fellow',
      role: 'postdoc',
      email: 'sarah.chen@ntu.edu.sg',
      researchInterests: ['Silicon Photonics', 'Integrated Lasers', 'Optical Communications'],
      startYear: '2023'
    },
    {
      id: '2',
      name: 'Alex Wang',
      position: 'PhD Student',
      role: 'phd',
      email: 'alex.wang@ntu.edu.sg',
      researchInterests: ['Quantum Photonics', 'Photonic Integration', 'Nonlinear Optics'],
      startYear: '2022'
    },
    {
      id: '3',
      name: 'Dr. Maria Rodriguez',
      position: 'Research Scientist',
      role: 'staff',
      email: 'maria.rodriguez@ntu.edu.sg',
      researchInterests: ['Laser Physics', 'Photonic Devices', 'Optical Sensing'],
      startYear: '2021'
    },
    {
      id: '4',
      name: 'James Liu',
      position: 'PhD Student',
      role: 'phd',
      email: 'james.liu@ntu.edu.sg',
      researchInterests: ['Photonic Circuits', 'Integrated Optics', 'Device Modeling'],
      startYear: '2021'
    },
    {
      id: '5',
      name: 'Emily Zhang',
      position: 'Master\'s Student',
      role: 'masters',
      email: 'emily.zhang@ntu.edu.sg',
      researchInterests: ['Optical Communications', 'Signal Processing'],
      startYear: '2024'
    },
    {
      id: '6',
      name: 'David Kumar',
      position: 'PhD Student',
      role: 'phd',
      email: 'david.kumar@ntu.edu.sg',
      researchInterests: ['Photonic Integration', 'Laser Design', 'Manufacturing'],
      startYear: '2020'
    }
  ];

  const alumni: AlumniMember[] = [
    {
      id: '1',
      name: 'Dr. Michael Thompson',
      previousPosition: 'PhD Student (2018-2022)',
      currentPosition: 'Research Scientist',
      currentInstitution: 'IMEC, Belgium',
      graduationYear: '2022'
    },
    {
      id: '2',
      name: 'Dr. Lisa Kim',
      previousPosition: 'Postdoc (2019-2023)',
      currentPosition: 'Assistant Professor',
      currentInstitution: 'KAIST, South Korea',
      graduationYear: '2023'
    },
    {
      id: '3',
      name: 'Dr. Robert Singh',
      previousPosition: 'PhD Student (2017-2021)',
      currentPosition: 'Senior Engineer',
      currentInstitution: 'Intel Corporation',
      graduationYear: '2021'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Members' },
    { value: 'phd', label: 'PhD Students' },
    { value: 'postdoc', label: 'Postdocs' },
    { value: 'staff', label: 'Research Staff' },
    { value: 'masters', label: 'Master\'s Students' }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'phd': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'postdoc': return 'bg-green-100 text-green-800 border-green-200';
      case 'staff': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'masters': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredMembers = selectedFilter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.role === selectedFilter);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Our Research Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the talented researchers advancing the frontiers of photonics and integrated laser technologies
          </p>
        </div>

        {/* Current Team Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-accent mr-2" />
              <h2 className="text-3xl font-playfair font-bold text-primary">Current Team</h2>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(option.value)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-playfair">{member.name}</CardTitle>
                  <CardDescription className="text-sm">{member.position}</CardDescription>
                  <Badge 
                    variant="outline" 
                    className={`w-fit mx-auto mt-2 text-xs ${getRoleColor(member.role)}`}
                  >
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Research Interests</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.researchInterests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Since {member.startYear}</span>
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center hover:text-primary transition-colors"
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Alumni Section */}
        <section>
          <div className="flex items-center mb-8">
            <UserCheck className="h-6 w-6 text-accent mr-2" />
            <h2 className="text-3xl font-playfair font-bold text-primary">Alumni</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumni.map((alum) => (
              <Card key={alum.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-playfair">{alum.name}</CardTitle>
                  <CardDescription className="text-sm">{alum.previousPosition}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <h4 className="font-semibold text-sm text-primary">Current Position</h4>
                    <p className="text-sm text-foreground">{alum.currentPosition}</p>
                    {alum.currentInstitution && (
                      <p className="text-xs text-muted-foreground">{alum.currentInstitution}</p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Graduated: {alum.graduationYear}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Us Section */}
        <section className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-playfair font-bold text-primary mb-4">
                Join Our Research Group
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We are always looking for motivated researchers to join our team. 
                If you're interested in photonics research and want to contribute to cutting-edge discoveries, 
                we'd love to hear from you.
              </p>
              <Button size="lg" asChild>
                <a href="mailto:bsxu@ntu.edu.sg">
                  Contact Us About Opportunities
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Team;