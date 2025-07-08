import { useCallback, useEffect, useMemo, useState } from 'react';

import { getTopHeadlines } from '@/services/newsapi';
import { getGuardianArticles } from '@/services/guardian';
import { getNytArticles } from '@/services/nytimes';

import { normalizeNewsItem } from '@/utils/helpers';
import type { NewsItem, NewsParams, NewsSource } from '@/types/news';

const useNews = (params?: NewsParams) => {
  const { source: selectedSource } = params ?? {};

  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const isSourceUsed = useCallback(
    (source: NewsSource) => {
      return !selectedSource || selectedSource === source;
    },
    [selectedSource]
  );

  const isDateSelected = useMemo(() => !!(params?.from ?? params?.to), [params]);

  const fetchNews = useCallback(async (): Promise<NewsItem[]> => {
    try {
      const allNews: NewsItem[] = [];

      if (isSourceUsed('newsapi') && !isDateSelected) {
        const newsapiArticles = (await getTopHeadlines(params)).articles.map(
          (article) => normalizeNewsItem('newsapi', article)
        );

        allNews.push(...newsapiArticles);
      }

      if (isSourceUsed('guardian')) {
        const guardianArticles = (
          await getGuardianArticles(params)
        ).response.results.map((article) =>
          normalizeNewsItem('guardian', article)
        );

        allNews.push(...guardianArticles);
      }

      if (isSourceUsed('nyt')) {
        const nytArticles = (await getNytArticles(params)).response.docs.map(
          (article) => normalizeNewsItem('nyt', article)
        );

        allNews.push(...nytArticles);
      }

      return allNews;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Something Went Wrong!');
    }
  }, [params, isDateSelected, isSourceUsed]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const normalizedArticles = await fetchNews();
        setData(normalizedArticles);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchNews]);

  return { data, loading, error };
};

export default useNews;
