import { memo, useMemo, type FC } from 'react';
import { X } from 'lucide-react';

import Container from '@/components/layout/container';
import { ErrorMessage, Loader } from '@/components/shared';
import { Preferences } from '@/features/feed';
import { NewsList } from '@/features/news';
import { useAuthors, usePreferedNews, usePreferences } from '@/hooks';
import { CATEGORIES, SOURCES } from '@/constants';

import './style.css';

const Feed: FC = memo(() => {
    const { preferences, isLoaded, savePreferences, resetPreferences } =
        usePreferences();
    const {
        data: authors,
        loading: areAuthorsLoading,
        error: authorError
    } = useAuthors({
        skip: !isLoaded || preferences !== null
    });
    const {
        loading,
        data: preferedNews,
        error: newsError
    } = usePreferedNews(preferences);

    const shouldShowLoader = useMemo(() => {
        return !isLoaded || loading || areAuthorsLoading;
    }, [isLoaded, loading, areAuthorsLoading]);

    const shouldShowPreferences = useMemo(() => {
        return isLoaded && preferences === null && !areAuthorsLoading;
    }, [isLoaded, preferences, areAuthorsLoading]);

    const shouldShowNews = useMemo(() => {
        return (
            !loading && isLoaded && !authorError && !newsError && preferences !== null
        );
    }, [loading, isLoaded, authorError, newsError, preferences]);

    return (
        <section className="feed-page">
            <Container className="feed-container">
                {authorError ? (
                    <ErrorMessage
                        message="Error Loading Authors"
                        description={authorError}
                    />
                ) : null}
                {newsError ? (
                    <ErrorMessage message="Error Loading News" description={newsError} />
                ) : null}
                {shouldShowLoader ? <Loader /> : null}
                {shouldShowPreferences ? (
                    <Preferences
                        onSavePreferences={savePreferences}
                        authors={authors}
                        sources={[...SOURCES]}
                        categories={[...CATEGORIES]}
                    />
                ) : null}
                {shouldShowNews ? (
                    <>
                        <button onClick={resetPreferences} className="reset-btn">
                            Reset Preferences
                            <X />
                        </button>
                        <NewsList data={preferedNews} />
                    </>
                ) : null}
            </Container>
        </section>
    );
});

export default Feed;
