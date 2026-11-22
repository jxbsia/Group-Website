import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-photonics.jpg';
import ntuLogo from '@/assets/ntu-logo.png';
import astarLogo from '@/assets/astar-logo.png';
import moeLogo from '@/assets/moe-logo.png';
import dsoLogo from '@/assets/dso-logo.png';
import samsungLogo from '@/assets/samsung-logo.png';
import fstdLogo from '@/assets/fstd-logo.png';
import homeData from '@/data/home.json';
import newsData from '@/data/news.json';
import type { NewsItem } from '@/types/content';

const funderLogos: Record<string, string> = {
  'astar-logo.png': astarLogo,
  'dso-logo.png': dsoLogo,
  'ntu-logo.png': ntuLogo,
  'moe-logo.png': moeLogo,
  'samsung-logo.png': samsungLogo,
  'fstd-logo.png': fstdLogo,
};

const Home = () => {
  const featuredNews: NewsItem[] = newsData.slice(0, 3);

  return (
    <div className="cinematic-home">
      <section className="cinematic-hero" aria-labelledby="home-title">
        <img className="cinematic-hero-image" src={heroImage} alt="" fetchPriority="high" />
        <div className="cinematic-hero-shade" aria-hidden="true" />
        <div className="cinematic-wrap cinematic-hero-inner">
          <div className="cinematic-hero-copy">
            <p className="cinematic-kicker">{homeData.hero.institution} <span aria-hidden="true">/</span> Singapore</p>
            <h1 id="home-title">SIA Laboratories</h1>
            <p className="cinematic-hero-subtitle">High-performance integrated<br className="hidden sm:block" /> photonic platforms.</p>
            <div className="cinematic-actions">
              <Link className="cinematic-button cinematic-button-solid" to="/research">
                Explore research <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="cinematic-button" to="/publications">
                Publications <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="cinematic-hero-base">
            <span>Integrated photonics research at NTU</span>
            <a href="#research-at-sia" aria-label="Scroll to research areas">
              <span>Scroll to explore</span> <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="cinematic-section cinematic-wrap" id="research-at-sia" aria-labelledby="home-research">
        <div className="cinematic-section-head">
          <div>
            <p className="cinematic-kicker">01 <span aria-hidden="true">/</span> Research</p>
            <h2 id="home-research">Photonic systems<br />built on a chip.</h2>
          </div>
          <p>We develop lasers and integrated photonic circuits for sensing, navigation, and radio-frequency systems.</p>
        </div>

        <div className="cinematic-research-layout">
          <figure className="cinematic-research-figure">
            <img src="/research/Wafer_pic.png" alt="Illustration of a wafer populated with photonic integrated circuits" loading="lazy" />
            <figcaption>FIG. 01 <span aria-hidden="true">/</span> Wafer-scale integration</figcaption>
          </figure>
          <div>
            <ol className="cinematic-research-list">
              {homeData.researchHighlights.map((highlight, index) => (
                <li key={highlight.id}>
                  <span className="cinematic-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{highlight.id === '2' ? 'High-performance lasers' : highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link className="cinematic-text-link" to="/research">See all research <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="cinematic-section cinematic-news" aria-labelledby="home-news">
        <div className="cinematic-wrap">
          <div className="cinematic-section-head">
            <div>
              <p className="cinematic-kicker">02 <span aria-hidden="true">/</span> Updates</p>
              <h2 id="home-news">Latest news.</h2>
            </div>
            <Link className="cinematic-text-link" to="/news">View all news <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="cinematic-news-grid">
            {featuredNews.map((news) => (
              <article key={news.id} className="cinematic-news-item">
                <div className="cinematic-news-image">
                  {news.thumbnail && <img src={news.thumbnail} alt={news.title} loading="lazy" />}
                </div>
                <p className="cinematic-kicker">{news.date}</p>
                <h3>{news.title}</h3>
                <p>{news.description || news.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cinematic-section cinematic-wrap" aria-labelledby="home-funders">
        <div className="cinematic-section-head">
          <div>
            <p className="cinematic-kicker">03 <span aria-hidden="true">/</span> Our partners</p>
            <h2 id="home-funders">Funders.</h2>
          </div>
        </div>
        <div className="cinematic-funders">
          {homeData.funders.map((funder) => (
            <figure key={funder.name}>
              <img src={funderLogos[funder.logo]} alt={funder.name} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
