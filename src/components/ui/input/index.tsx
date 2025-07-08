import type { FC } from 'react';

import { cn } from '@/utils';

import './style.css';

const Input: FC<InputProps> = ({ className, ...props }) => {

    return (
        <div className={cn('input-container', className)}>
            <input className={cn('input')} {...props} />
        </div>
    );
};

export default Input;
