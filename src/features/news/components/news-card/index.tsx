import type { FC, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { Badge, Card, Tooltip } from '@/components/ui';
import { formatDateString, toUpperCaseString } from '@/utils';
import { no_image_placeholder } from '@/constants';
import { type NewsItem } from '@/types';

import './style.css';

const getCategoryColor = (category: string): BadgeColor => {
  const colors = {
    Technology: 'blue',
    Business: 'green',
    Health: 'red',
    Science: 'purple',
    Sports: 'orange',
    Books: 'emerald',
    General: 'gray'
  };

  return colors[category as keyof typeof colors] as BadgeColor;
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
        <div className="news-badge">
          <Badge text={toUpperCaseString(category)} variant={getCategoryColor(category)} />
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
        <div className="news-footer">
          <div className="news-source">
            <div className="source-avatar">
              <span className="avatar-text">
                {source.charAt(0)}
              </span>
            </div>
            <span className="source-text">{source}</span>
          </div>
          <Tooltip text={author ?? ''}>
            <span className="news-author">
              {author}
            </span>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
