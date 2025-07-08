import type { NewsSource } from './news';

export type Preferences = {
    selectedCategories: string[];
    selectedSources: NewsSource[];
    selectedAuthors: string[];
};

export type PreferencesProps = {
    authors: Option[];
    sources: Option[];
    categories: Option[];
    onSavePreferences: (preferences: Preferences) => void;
};

export type PreferedFilters = { categories: string[]; authors: string[] };
