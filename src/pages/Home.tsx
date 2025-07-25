import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NewsCard from '@/components/NewsCard';
import { newsData } from '@/data/newsData';
import { ArrowRight, Microscope, Zap, CircuitBoard } from 'lucide-react';
import heroImage from '@/assets/hero-photonics.jpg';

const Home = () => {
  const featuredNews = newsData.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
            Photonics Research Group
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4 text-blue-100">
            Professor Brian Sia Jia Xu
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8 text-blue-50">
            Advancing high-performance integrated lasers and large-scale photonic integration
            at Nanyang Technological University, Singapore
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-blue-50">
              <Link to="/research">
                Explore Our Research <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link to="/publications">
                View Publications
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-16 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
              Research Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our group focuses on cutting-edge photonic technologies that push the boundaries 
              of integrated laser systems and large-scale photonic integration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-playfair">High-Performance Lasers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Developing next-generation integrated laser technologies with unprecedented 
                  efficiency and performance characteristics for advanced applications.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CircuitBoard className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-playfair">Photonic Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Advancing large-scale photonic integration techniques to create complex, 
                  highly-functional photonic circuits on single platforms.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Microscope className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-playfair">Innovation & Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  Translating fundamental research into practical solutions that advance 
                  telecommunications, sensing, and quantum photonic applications.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-2">
                Latest News
              </h2>
              <p className="text-muted-foreground">
                Stay updated with our recent achievements and developments
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/news">
                View All News <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.map((news, index) => (
              <NewsCard key={news.id} news={news} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
            Join Our Research Community
          </h2>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">
            Interested in cutting-edge photonics research? Explore collaboration opportunities, 
            open positions, and ways to engage with our research group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-blue-50">
              <Link to="/team">Meet Our Team</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;