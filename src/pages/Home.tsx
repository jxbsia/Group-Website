import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NewsCard from '@/components/NewsCard';
import { newsData } from '@/data/newsData';
import { ArrowRight, Microscope, Zap, CircuitBoard, ChevronDown } from 'lucide-react';
import gargantuaBackground from '@/assets/gargantua-background.jpg';
import steelTexture from '@/assets/steel-texture.jpg';
import ntuLogo from '@/assets/ntu-logo.png';
import astarLogo from '@/assets/astar-logo.png';
import moeLogo from '@/assets/moe-logo.png';
import dsoLogo from '@/assets/dso-logo.png';
const Home = () => {
  const featuredNews = newsData.slice(0, 3);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${gargantuaBackground})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background"></div>
        </div>
        
        <div className="relative z-10 text-center text-primary max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <div className="text-sm tracking-[0.3em] text-muted-foreground mb-4 uppercase">
              Nanyang Technological University
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight font-orbitron text-white">
              SIA LABORATORIES
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-12 text-muted-foreground max-w-4xl mx-auto">Ultra-Coherence, Large-Scale Photonics</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
              <Link to="/research">RESEARCH</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-3 text-base">
              <Link to="/publications">
                PUBLICATIONS
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* Main Research Directions */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-500 group">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold tracking-wide uppercase">
                  ULTRA-COHERENCE
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Advancing ultra-coherent laser systems for precision applications in quantum computing, 
                  sensing, and high-resolution spectroscopy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-500 group">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <CircuitBoard className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold tracking-wide uppercase">
                  LARGE-SCALE INTEGRATION
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Developing scalable photonic integration platforms that enable complex 
                  optical circuits with thousands of components on a single chip.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-500 group">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <Microscope className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold tracking-wide uppercase">
                  PHOTONIC INNOVATION
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Pioneering novel photonic materials and devices that push the boundaries 
                  of optical communication and information processing.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-sm tracking-[0.3em] text-muted-foreground mb-4 uppercase">
                Updates
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
                LATEST NEWS
              </h2>
              <p className="text-muted-foreground">
                Stay updated with our recent achievements and developments
              </p>
            </div>
            <Button variant="outline" asChild className="border-primary/30 text-primary hover:bg-primary/10 hidden md:flex">
              <Link to="/news">
                VIEW ALL <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNews.map((news, index) => <NewsCard key={news.id} news={news} featured={index === 0} />)}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Button variant="outline" asChild className="border-primary/30 text-primary hover:bg-primary/10">
              <Link to="/news">
                VIEW ALL NEWS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Funders */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16 tracking-tight">
            OUR FUNDERS
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center justify-items-center">
            <div className="w-96 h-80 flex items-center justify-center p-12">
              <img src={dsoLogo} alt="DSO National Laboratories" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="w-96 h-80 flex items-center justify-center p-12">
              <img src={astarLogo} alt="Agency for Science, Technology and Research Singapore" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="w-96 h-80 flex items-center justify-center p-12">
              <img src={ntuLogo} alt="Nanyang Technological University Singapore" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="w-96 h-80 flex items-center justify-center p-12">
              <img src={moeLogo} alt="Ministry of Education Singapore" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="text-sm tracking-[0.3em] text-muted-foreground mb-4 uppercase">
            Collaboration
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 tracking-tight">
            JOIN OUR MISSION
          </h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Interested in cutting-edge photonics research? Explore collaboration opportunities, 
            open positions, and ways to engage with our research community.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base">
              <Link to="/team">MEET OUR TEAM</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-3 text-base">
              <Link to="/contact">CONTACT US</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;