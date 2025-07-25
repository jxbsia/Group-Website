import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  link?: string;
  thumbnail?: string;
}

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, featured = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? 'border-accent' : ''}`}>
      {news.thumbnail && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={news.thumbnail} 
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {news.category}
          </Badge>
          <div className="flex items-center text-muted-foreground text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(news.date)}
          </div>
        </div>
        <CardTitle className={`${featured ? 'text-lg' : 'text-base'} font-playfair leading-tight`}>
          {news.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-sm leading-relaxed">
          {news.description}
        </CardDescription>
        {news.link && (
          <a 
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-3 text-primary hover:text-accent transition-colors text-sm font-medium"
          >
            Read more <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;