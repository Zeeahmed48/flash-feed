import type { FC, SyntheticEvent } from 'react';

import { Card, Tooltip } from '@/components/ui';
import { no_image_placeholder } from '@/constants';
import { type NewsItem } from '@/types';

import './style.css';
import { Link } from 'react-router-dom';
import { formatDateString, toUpperCaseString } from '@/utils';

const getCategoryColor = (category: string) => {
  const colors = {
    technology: 'from-blue-500 to-cyan-500',
    business: 'from-green-500 to-emerald-500',
    health: 'from-red-500 to-pink-500',
    science: 'from-purple-500 to-indigo-500',
    sports: 'from-orange-500 to-yellow-500',
    environment: 'from-emerald-500 to-teal-500',
    general: 'from-gray-500 to-slate-500'
  };
  return colors[category as keyof typeof colors] || colors.general;
};

const NewsCard: FC<NewsItem> = ({
  author,
  description,
  imageUrl,
  source,
  title,
  publishedAt,
  url,
  category
}) => {
  const handleImageError = (
    event: SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    event.currentTarget.src = no_image_placeholder; // replace corrupt image with the placeholder image
  };

  return (
    <Card className="news-card relative">
      {category && (
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(category)} shadow-lg`}
          >
            {toUpperCaseString(category)}
          </span>
        </div>
      )}
      <img
        className="news-image"
        src={imageUrl ?? no_image_placeholder}
        alt={title}
        onError={handleImageError}
      />
      <div className="news-content">
        <div className="news-link-container">
          <Link to={url} target="_blank" className="news-link">
            {title}
          </Link>
        </div>
        <p className="news-description">{description}</p>
        <p className="news-date">{formatDateString(publishedAt)}</p>
        <div className="news-source">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {source.charAt(0)}
              </span>
            </div>
            <span className="text-xs font-medium text-gray-700">{source}</span>
          </div>
          <Tooltip text={author ?? ''}>
            <span className="max-w-28 inline-block text-xs text-gray-700 truncate">
              {author}
            </span>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
