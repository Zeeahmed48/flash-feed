import { useCallback, useEffect, useState } from 'react';

import { getPreferredNewsArticles } from '@/services/newsapi';
import { getPreferedGuardianArticles } from '@/services/guardian';
import { getPreferedNytArticles } from '@/services/nytimes';
import { isEmptyArray, normalizeNewsItem } from '@/utils';
import type { NewsItem, NewsSource, PreferedFilters, Preferences } from '@/types';

const usePreferedNews = (preferences: Preferences | null) => {
    const [data, setData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const shouldIncludeSource = useCallback(
        (source: NewsSource) => {
            const sources = preferences?.selectedSources ?? [];

            return isEmptyArray(sources) || sources.includes(source);
        },
        [preferences?.selectedSources]
    );

    const fetchNewsFromSource = useCallback(
        async (source: NewsSource, filters: PreferedFilters) => {
            switch (source) {
                case 'newsapi':
                    return (await getPreferredNewsArticles(filters)).map(
                        (article) => normalizeNewsItem('newsapi', article)
                    );
                case 'guardian':
                    return (await getPreferedGuardianArticles(filters)).response.results.map(
                        (article) => normalizeNewsItem('guardian', article)
                    );
                case 'nyt':
                    return (await getPreferedNytArticles(filters)).response.docs.map(
                        (article) => normalizeNewsItem('nyt', article)
                    );
                default:
                    return [];
            }
        },
        []
    );

    const fetchPreferedNews = useCallback(async () => {
        if (preferences === null) return [];

        const {
            selectedCategories: categories,
            selectedAuthors: authors,
            selectedSources: sources
        } = preferences;

        try {
            const filters: PreferedFilters = { categories, authors };

            const newsPromises = sources
                .filter((source) => shouldIncludeSource(source))
                .map((source) => fetchNewsFromSource(source, filters));

            const results = await Promise.all(newsPromises);
            const allNews = results.flat();

            return allNews;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error('Something Went Wrong!');
        }
    }, [preferences, shouldIncludeSource, fetchNewsFromSource]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const allNews = await fetchPreferedNews();
                setData(allNews);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, [fetchPreferedNews]);

    return { loading, error, data };
};

export default usePreferedNews;