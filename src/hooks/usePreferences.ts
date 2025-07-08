import type { Preferences } from '@/types';
import { useEffect, useState } from 'react';

const usePreferences = () => {
    const [preferences, setPreferences] = useState<Preferences | null>(null);
    const [arePreferencesLoaded, setArePreferencesLoaded] =
        useState<boolean>(false);

    useEffect(() => {
        const userPreferences = localStorage.getItem('userPreferences');

        if (userPreferences !== null) {
            setPreferences(JSON.parse(userPreferences));
        }

        setArePreferencesLoaded(true);
    }, []);

    const savePreferences = (userPreferences: Preferences) => {
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        setPreferences(userPreferences);
    };

    const resetPreferences = () => {
        localStorage.removeItem('userPreferences');
        setPreferences(null);
    };

    return {
        isLoaded: arePreferencesLoaded,
        preferences,
        savePreferences,
        resetPreferences
    };
};

export default usePreferences;