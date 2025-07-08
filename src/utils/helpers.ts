import type { GuardianApiArticle, GuardianApiAuthor, NewsApiArticle, NewsItem, NewsSource, NytimesApiArticle } from '@/types';

export const normalizeFromNewsAPI = (article: NewsApiArticle): NewsItem => ({
    id: article.url,
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage,
    publishedAt: article.publishedAt,
    author: article.author ?? '',
    source: 'NewsApi',
    category: article?.category ?? ''
});

export const normalizeFromGuardianAPI = (article: GuardianApiArticle): NewsItem => {
    return {
        id: article.id,
        author: article.fields.byline,
        description: article.sectionName,
        title: article.webTitle,
        imageUrl: article.fields.thumbnail,
        publishedAt: article.webPublicationDate,
        source: 'Guardian',
        url: article.webUrl,
        category: article.sectionName
    };
};

const normalizeFromNYTAPI = (article: NytimesApiArticle): NewsItem => {
    return {
        id: article._id,
        description: article.abstract,
        imageUrl: article.multimedia?.default?.url,
        publishedAt: article.pub_date,
        source: 'NyTimes',
        title: article.abstract,
        category: article.section_name,
        url: article.uri,
        author: article?.byline?.original?.replace('By ', '') ?? ''
    };
};

export function normalizeNewsItem(
    source: NewsSource,
    article: NewsApiArticle | GuardianApiArticle | NytimesApiArticle
): NewsItem {
    switch (source) {
        case 'newsapi':
            return normalizeFromNewsAPI(article as NewsApiArticle);
        case 'guardian':
            return normalizeFromGuardianAPI(article as GuardianApiArticle);
        case 'nyt':
            return normalizeFromNYTAPI(article as NytimesApiArticle);
    }
}

export const transformNewsApiArticlesToAuthorOptions = (
    articles: NewsApiArticle[]
): Option[] => {
    const uniqueAuthors = new Set<string>();

    articles.forEach(({ author }) => {
        if (author) uniqueAuthors.add(author);
    });

    return Array.from(uniqueAuthors).map((author) => ({
        label: author,
        value: author
    }));
};

export const transformGuardianContributorsToOptions = (
    contributors: GuardianApiAuthor[]
): Option[] => {
    return contributors.map(({ id, webTitle }) => ({
        label: webTitle,
        value: id
    }));
};

export const toUpperCaseString = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEmptyArray = <T>(arr: T[]): boolean => {
    return arr.length === 0;
};

export const sanitizeParams = <T extends Record<string, unknown>>(
    params: T
): Partial<T> => {
    return Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(params).filter(([_, value]) => {
            return (Array.isArray(value) && value.length > 0) || (value !== null && value !== undefined && value !== '');
        })
    ) as Partial<T>;
};

export const getOneMonthAgo = (): string => {
    const date = new Date();

    date.setMonth(date.getMonth() - 1);

    return formatDate(date);
};

export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};


export const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = new Date(year, month, day).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return formattedDate;
};