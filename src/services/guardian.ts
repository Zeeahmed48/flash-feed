import { createAxiosInstance, fetchData } from '@/lib';
import { GUARDIAN_URL } from '@/constants';
import type { GuardianApiAuthorsResponse, GuardianApiResponse, NewsParams, PreferedFilters } from '@/types';
import { isEmptyArray, sanitizeParams } from '@/utils/helpers';

const guardianApi = createAxiosInstance(GUARDIAN_URL, {
    params: {
        'api-key': import.meta.env.VITE_GUARDIAN_API_KEY,
        'show-fields': 'thumbnail,byline,bodyText'
    }
});

const buildGuardianParams = (params: NewsParams) => {
    return {
        q: params.keyword,
        tag: params.category,
        'from-date': params.from,
        'to-date': params.to
    };
};

export const getGuardianArticles = (params?: NewsParams) => {
    const apiParams = buildGuardianParams(params ?? {});
    const sanitizedParams = sanitizeParams(apiParams);

    return fetchData<GuardianApiResponse>(guardianApi, '/search', {
        params: {
            'page-size': 10,
            ...sanitizedParams
        }
    });
};

export const getGuradianAuthors = async () => {
    return fetchData<GuardianApiAuthorsResponse>(guardianApi, '/tags', {
        params: {
            type: 'contributor'
        }
    });
};

export const getPreferedGuardianArticles = (filters: PreferedFilters) => {

    const { authors, categories } = filters;
    const apiParams = {
        ...(!isEmptyArray(filters.authors) && { tag: authors.join(',') }),
        ...(!isEmptyArray(filters.categories) && { section: categories.join('/') })
    };
    const sanitizedParams = sanitizeParams(apiParams);

    return fetchData<GuardianApiResponse>(guardianApi, '/search', {
        params: {
            'page-size': 10,
            ...sanitizedParams
        }
    });
};