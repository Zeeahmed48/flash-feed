import { memo, useMemo, type FC } from 'react';

import { NewsList, Filters } from '@/features/news';
import Container from '@/components/layout/container';
import { ErrorMessage, Loader } from '@/components/shared';
import { useFilters, useNews } from '@/hooks';

import './style.css';

const Home: FC = memo(() => {
  const { filters, updateFilters } = useFilters();
  const { data: articles, loading, error } = useNews(filters);

  const shouldShowNews = useMemo(() => {
    return !loading && !error;
  }, [loading, error]);

  return (
    <section className="home-page">
      <Container>
        <Filters values={filters} onChange={updateFilters} />
      </Container>
      <Container className="home-container">
        {error ? <div className='self-start mt-8 w-full'><ErrorMessage message='Error Loading Articles' description={error} /></div> : null}
        {loading ? <Loader /> : null}
        {shouldShowNews ? <NewsList data={articles} /> : null}
      </Container>
    </section>
  );
});

export default Home;
