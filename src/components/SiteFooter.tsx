import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp } from 'lucide-react';
import SignalField from '@/components/SignalField';

const links = [
  { path: '/about', label: 'About' },
  { path: '/team', label: 'Team' },
  { path: '/research', label: 'Research' },
  { path: '/publications', label: 'Publications' },
  { path: '/contact', label: 'Contact' },
];

export default function SiteFooter() {
  return (
    <footer className="signal-footer" aria-labelledby="collaboration-title">
      <SignalField />
      <div className="cinematic-wrap signal-footer-inner">
        <div className="signal-footer-cta">
          <p className="cinematic-kicker">SIA Laboratories <span aria-hidden="true">/</span> Collaboration</p>
          <h2 id="collaboration-title">Collaborate with us.</h2>
          <Link to="/contact" className="cinematic-button cinematic-button-solid">
            Get in touch <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="signal-footer-base">
          <p>© {new Date().getFullYear()} SIA Laboratories <span aria-hidden="true">·</span> NTU Singapore</p>
          <nav aria-label="Footer">{links.map(link => <Link key={link.path} to={link.path}>{link.label}</Link>)}</nav>
          <a href="#top" className="signal-top">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
