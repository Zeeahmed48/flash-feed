import { useCallback, useState } from 'react';

import type { GlobalNewsFilters, NewsSource } from '@/types';

const useFilters = () => {
  const [filters, setFilters] = useState<GlobalNewsFilters>({
    keyword: '',
    source: '' as NewsSource,
    category: '',
    from: '',
    to: ''
  });

  const updateFilters = useCallback(
    (updatedFilters: Partial<GlobalNewsFilters>) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...updatedFilters }));
    },
    []
  );

  return {
    filters,
    updateFilters
  };
};

export default useFilters;
