import { type FC, type ChangeEvent, useState } from 'react';

import { DatePicker, Input, Select } from '@/components/ui';
import { useDebounce } from '@/hooks';
import { CATEGORIES, SOURCES } from '@/constants';
import type { GlobalNewsFilters } from '@/types';

import './style.css';

interface FilterProps {
  values: GlobalNewsFilters;
  onChange: (filters: GlobalNewsFilters) => void;
}

const Filters: FC<FilterProps> = ({ values, onChange }) => {
  const [localSearch, setLocalSearch] = useState<string>(values.keyword);

  const debouncedSearch = useDebounce<ChangeEvent<HTMLInputElement>>(
    (updatedKeywords) => handleChange('keyword')(updatedKeywords),
    1500
  );

  const handleChange =
    (field: keyof typeof values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ ...values, [field]: e.target.value });
    };

  return (
    <div className="filters-container">
      <div className="filter-input-container">
        <Input
          type="text"
          placeholder="Search keyword..."
          value={localSearch}
          onChange={(e) => {
            const text = e.target.value;
            setLocalSearch(text);
            debouncedSearch(e);
          }}
        />
      </div>

      <div className="dropdowns-container">
        <Select
          placeholder="All Sources"
          options={[...SOURCES]}
          value={values.source}
          onChange={handleChange('source')}
        />
        <Select
          placeholder="All Categories"
          options={[...CATEGORIES]}
          value={values.category}
          onChange={handleChange('category')}
        />
        <DatePicker value={values.from || ''} onChange={handleChange('from')} />
        <DatePicker value={values.to || ''} onChange={handleChange('to')} />
      </div>
    </div>
  );
};

export default Filters;
