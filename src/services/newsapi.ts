import { createAxiosInstance, fetchData } from '@/lib';
import { NEWS_API_URL } from '@/constants';
import type { NewsApiArticle, NewsApiResponse, NewsParams, PreferedFilters } from '@/types';
import { isEmptyArray, sanitizeParams } from '@/utils/helpers';

const newsApi = createAxiosInstance(NEWS_API_URL, {
    headers: { Authorization: import.meta.env.VITE_NEWS_API_KEY }
});

const buildNewsApiParams = (params: NewsParams) => {
    return {
        q: params.keyword,
        category: params.category
    };
};

export const getTopHeadlines = (params?: NewsParams) => {
    const apiParams = buildNewsApiParams(params ?? {});
    const sanitizedParams = sanitizeParams(apiParams);

    return fetchData<NewsApiResponse>(newsApi, '/top-headlines', {
        params: {
            country: 'us',
            ...sanitizedParams
        }
    });
};


export const getPreferredNewsArticles = async (filters: PreferedFilters) => {
    const { categories, authors } = filters ?? {};

    let allArticles: NewsApiArticle[] = [];
    const promises: Promise<NewsApiResponse>[] = [];

    for (const category of categories) {
        promises.push(getTopHeadlines({ category }));
    }

    if (!isEmptyArray(categories)) {
        allArticles = (await Promise.all(promises)).flat().map(({ articles }) => [...articles]).flat();
    }

    if (!isEmptyArray(authors)) {
        const authorBasedArticles = (await getTopHeadlines()).articles.filter((article) => {
            if (!article.author) return false;

            return authors.some((author) =>
                article.author?.toLowerCase().includes(author.toLowerCase())
            );
        });

        allArticles = [...allArticles, ...authorBasedArticles];
    }

    if (isEmptyArray(categories) && isEmptyArray(authors)) {
        allArticles = (await getTopHeadlines()).articles;
    }

    return allArticles;
};

