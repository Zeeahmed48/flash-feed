export const PATHS = {
    HOME: '/',
    FEED: '/feed'
} as const;

export const APP_NAVIGATIONS = [
    { path: PATHS.HOME, text: 'Top News' },
    { path: PATHS.FEED, text: 'Personal News Feed' }
] as const;