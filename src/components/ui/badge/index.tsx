import { type FC } from 'react';

import { cn } from '@/utils';

import './style.css';

const Badge: FC<{ text: string, variant: BadgeColor }> = ({ text, variant = 'gray' }) => {
    return (
        <span
            className={cn('badge', variant)}
        >
            {text}
        </span>
    );
};

export default Badge;