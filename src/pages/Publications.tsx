import React from 'react';
import publicationsData from '@/data/publications.json';
import type { Publication } from '@/types/content';

const Publications = () => {
  const publications: Publication[] = publicationsData.publications;

  return (
    <div className="min-h-screen pt-20">
      <section className="vlt-gap-100 bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h1 className="font-gilbert-mono text-3xl md:text-4xl font-semibold text-white mb-10">
            Publications
          </h1>
          <div className="border-y border-white/10">
            <ol className="divide-y divide-white/10 font-gilbert-mono text-white">
              {publications.map((pub) => (
                <li key={pub.id} className="py-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                      {pub.year}
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold leading-tight">
                      {pub.url ? (
                        <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-accent transition-colors">
                          {pub.title}
                        </a>
                      ) : (
                        <span className="text-white">{pub.title}</span>
                      )}
                    </h2>
                    <p className="text-sm text-white">
                      {pub.authors.join(', ')}
                    </p>
                    {pub.journal.trim() !== '' && (
                      <p className="text-sm italic text-white/80">
                        {pub.journal}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {publications.length === 0 && (
            <div className="text-center py-16">
              <p className="font-gilbert-mono text-white">
                No publications found.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Publications;
