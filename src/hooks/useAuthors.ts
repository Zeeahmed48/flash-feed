import { useEffect, useState } from 'react';

import { getTopHeadlines } from '@/services/newsapi';
import { getGuradianAuthors } from '@/services/guardian';
import {
    transformGuardianContributorsToOptions,
    transformNewsApiArticlesToAuthorOptions
} from '@/utils';

const fetchAuthorsFromNewsApi = async (): Promise<Option[]> => {
    const { articles } = await getTopHeadlines();

    return transformNewsApiArticlesToAuthorOptions(articles);
};

const fetchAuthorsFromGuardian = async (): Promise<Option[]> => {
    const {
        response: { results: contributors }
    } = await getGuradianAuthors();

    return transformGuardianContributorsToOptions(contributors);
};

const useAuthors = ({ skip }: { skip?: boolean }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<Option[]>([]);

    const fetchAuthors = async () => {
        try {

            const [newsApiAuthors, guardianAuthors] = await Promise.all([
                fetchAuthorsFromNewsApi(),
                fetchAuthorsFromGuardian()
            ]);

            const combinedAuthors = [...newsApiAuthors, ...guardianAuthors];

            return combinedAuthors;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error('Something Went Wrong!');
        }
    };

    useEffect(() => {
        if (skip) return;
        (async () => {
            try {
                setLoading(true);
                const normalizedArticles = await fetchAuthors();
                setData(normalizedArticles);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, [skip]);

    return {
        loading,
        error,
        data
    };
};

export default useAuthors;