import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExternalLink, Search, BookOpen, TrendingUp, Quote } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  type: 'journal' | 'conference' | 'book-chapter';
  citations: number;
  doi?: string;
  url?: string;
  abstract?: string;
}

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Sample publications data
  const publications: Publication[] = [
    {
      id: '1',
      title: 'High-Performance Silicon Photonic Integrated Circuits for Optical Communications',
      authors: ['B.S.J. Xu', 'S. Chen', 'A. Wang', 'M. Rodriguez'],
      journal: 'Nature Photonics',
      year: 2024,
      type: 'journal',
      citations: 156,
      doi: '10.1038/s41566-024-xxxxx',
      abstract: 'We demonstrate a breakthrough in silicon photonic integration achieving unprecedented performance metrics for optical communication applications.'
    },
    {
      id: '2',
      title: 'Large-Scale Photonic Integration: Challenges and Opportunities',
      authors: ['B.S.J. Xu', 'J. Liu', 'D. Kumar'],
      journal: 'Proceedings of IEEE',
      year: 2024,
      type: 'journal',
      citations: 89,
      doi: '10.1109/JPROC.2024.xxxxx',
      abstract: 'A comprehensive review of current challenges and future opportunities in large-scale photonic integration technologies.'
    },
    {
      id: '3',
      title: 'Advanced Laser Integration Techniques for Next-Generation Photonic Systems',
      authors: ['A. Wang', 'B.S.J. Xu', 'S. Chen'],
      journal: 'Conference on Lasers and Electro-Optics (CLEO)',
      year: 2024,
      type: 'conference',
      citations: 34,
      abstract: 'Novel approaches to integrating high-performance lasers in complex photonic systems with improved efficiency and reliability.'
    },
    {
      id: '4',
      title: 'Quantum Photonic Integration on Silicon Platforms',
      authors: ['J. Liu', 'B.S.J. Xu', 'E. Zhang'],
      journal: 'Physical Review Applied',
      year: 2023,
      type: 'journal',
      citations: 78,
      doi: '10.1103/PhysRevApplied.20.xxxxx',
      abstract: 'Demonstration of quantum photonic components integrated on silicon platforms for scalable quantum information processing.'
    },
    {
      id: '5',
      title: 'Photonic Neural Networks: Architecture and Applications',
      authors: ['M. Rodriguez', 'B.S.J. Xu', 'D. Kumar'],
      journal: 'Optics Express',
      year: 2023,
      type: 'journal',
      citations: 112,
      doi: '10.1364/OE.500.xxxxx',
      abstract: 'Investigation of photonic neural network architectures for high-speed machine learning applications.'
    },
    {
      id: '6',
      title: 'Integrated Photonics for 5G and Beyond',
      authors: ['B.S.J. Xu', 'S. Chen', 'J. Liu'],
      journal: 'IEEE Communications Magazine',
      year: 2023,
      type: 'journal',
      citations: 94,
      doi: '10.1109/MCOM.2023.xxxxx',
      abstract: 'Overview of photonic technologies enabling next-generation wireless communication systems.'
    }
  ];

  const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'journal', label: 'Journal Articles' },
    { value: 'conference', label: 'Conference Papers' },
    { value: 'book-chapter', label: 'Book Chapters' }
  ];

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesYear = selectedYear === null || pub.year === selectedYear;
    const matchesType = selectedType === 'all' || pub.type === selectedType;
    
    return matchesSearch && matchesYear && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'conference': return 'bg-green-100 text-green-800 border-green-200';
      case 'book-chapter': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'journal': return BookOpen;
      case 'conference': return TrendingUp;
      case 'book-chapter': return Quote;
      default: return BookOpen;
    }
  };

  const totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0);
  const hIndex = calculateHIndex(publications.map(p => p.citations));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Publications
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our research contributions to the field of photonics and integrated laser technologies
          </p>
        </div>

        {/* Publication Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{publications.length}</div>
              <div className="text-sm text-muted-foreground">Total Publications</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{totalCitations}</div>
              <div className="text-sm text-muted-foreground">Total Citations</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{hIndex}</div>
              <div className="text-sm text-muted-foreground">H-Index</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round(totalCitations / publications.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Citations</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search publications by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              {types.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.value)}
                  className="text-xs"
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedYear === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedYear(null)}
              className="text-xs"
            >
              All Years
            </Button>
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedYear(year)}
                className="text-xs"
              >
                {year}
              </Button>
            ))}
          </div>
        </div>

        {/* Google Scholar Integration Notice */}
        <Card className="mb-8 bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-primary mb-2">Complete Publication List</h3>
                <p className="text-sm text-muted-foreground">
                  For the most up-to-date and complete list of publications, please visit our Google Scholar profile.
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Google Scholar
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map((pub) => {
            const TypeIcon = getTypeIcon(pub.type);
            return (
              <Card key={pub.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                        <TypeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getTypeColor(pub.type)}`}
                        >
                          {pub.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {pub.year} • {pub.citations} citations
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-playfair leading-tight hover:text-primary transition-colors cursor-pointer">
                    {pub.title}
                  </CardTitle>
                  
                  <CardDescription className="text-sm">
                    <span className="font-medium">{pub.authors.join(', ')}</span>
                    <br />
                    <span className="italic">{pub.journal}</span>
                  </CardDescription>
                </CardHeader>

                {pub.abstract && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {pub.abstract}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      {pub.doi && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            DOI
                          </a>
                        </Button>
                      )}
                      {pub.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={pub.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Full Text
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No publications found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to calculate H-index
function calculateHIndex(citations: number[]): number {
  const sortedCitations = citations.sort((a, b) => b - a);
  let hIndex = 0;
  
  for (let i = 0; i < sortedCitations.length; i++) {
    if (sortedCitations[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      break;
    }
  }
  
  return hIndex;
}

export default Publications;