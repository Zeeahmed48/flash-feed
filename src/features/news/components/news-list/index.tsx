import { type FC } from 'react';

import { EmptyResult } from '@/components/shared';
import NewsCard from '../news-card';
import type { NewsItem } from '@/types';

import './style.css';

type NewsListProps = {
    data: NewsItem[];
};

const NewsList: FC<NewsListProps> = ({ data }) => {
    if (data.length === 0) {
        return <EmptyResult message="No news available." />;
    }

    return (
        <div className="news-list">
            {data.map((singleNews) => (
                <NewsCard key={singleNews.id} {...singleNews} />
            ))}
        </div>
    );
};

export default NewsList;