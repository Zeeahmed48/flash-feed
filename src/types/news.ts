export type NewsSource = 'newsapi' | 'guardian' | 'nyt';

export type NewsItem = {
    id: string;
    title: string;
    description: string;
    url: string;
    imageUrl: string | null;
    publishedAt: string;
    author?: string;
    source: string;
    category?: string;
}

export type NewsApiArticle = {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    category?: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: NewsApiArticle[];
}

export interface GuardianApiArticle {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
    fields: {
        thumbnail: string;
        byline: string;
    };

}

export interface GuardianApiResponse {
    response: {
        status: string;
        total: number;
        results: GuardianApiArticle[];
    };
}


export type GuardianApiAuthor = {
    id: string;
    type: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    bio: string;
};

export type GuardianApiAuthorsResponse = {
    response: {
        status: string;
        total: number;
        results: GuardianApiAuthor[];
    };
};

export interface NytimesApiArticle {
    abstract: string;
    web_url: string;
    byline: { original: string; };
    snippet: string;
    lead_paragraph: string;
    print_section: string;
    print_page: string;
    source: string;
    pub_date: string;
    document_type: boolean;
    news_desk: string;
    section_name: string;
    type_of_material: string;
    _id: string;
    word_count: string;
    uri: string;
    multimedia: {
        default: {
            url: string;
        }
    };
}

export interface NytimesApiResponse {
    status: string;
    response: {
        docs: NytimesApiArticle[];
    };
}

export interface GlobalNewsFilters {
    keyword: string;
    source: NewsSource;
    category: string;
    from: string;
    to: string;
}

export type NewsParams = Partial<GlobalNewsFilters>;