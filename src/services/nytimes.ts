import { createAxiosInstance, fetchData } from '@/lib';
import { NYTIMES_URL } from '@/constants';
import type { NewsParams, NytimesApiResponse, PreferedFilters } from '@/types';
import { isEmptyArray, sanitizeParams } from '@/utils/helpers';

const nyTimesApi = createAxiosInstance(NYTIMES_URL, {
    params: {
        'api-key': import.meta.env.VITE_NYTIMES_API_KEY
    }
});

const buildNyTimesParams = (params: NewsParams) => {
    return {
        q: params.keyword,
        fq: params.category ? `desk:"${params.category}"` : '',
        'begin_date': params?.from ? new Date(params?.from).getTime() : '',
        'end_date': params?.to ? new Date(params?.to).getTime() : ''
    };
};

export const getNytArticles = (params?: NewsParams) => {
    const apiParams = buildNyTimesParams(params ?? {});
    const sanitizedParams = sanitizeParams(apiParams);

    return fetchData<NytimesApiResponse>(nyTimesApi, '/search/v2/articlesearch.json', {
        params: {
            ...sanitizedParams
        }
    });
};

export const getPreferedNytArticles = (filters: PreferedFilters) => {
    const {
        categories = [],
        authors = []
    } = filters;

    const filterQueries = [];

    if (!isEmptyArray(authors)) {
        const authQuery = `byline:(${authors.map((author) => `"${author}"`).join(', ')})`;
        filterQueries.push(authQuery);
    }

    if (!isEmptyArray(categories)) {
        const catQuery = `desk:(${categories
            .map((category) => `"${category}"`)
            .join(', ')})`;
        filterQueries.push(catQuery);
    }

    return fetchData<NytimesApiResponse>(nyTimesApi, '/search/v2/articlesearch.json', {
        params: {
            ...(!isEmptyArray(filterQueries) && {
                fq: filterQueries.join(' OR ')
            })
        }
    });
};