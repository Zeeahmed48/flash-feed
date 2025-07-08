
import type { FC } from 'react';

import { cn } from '@/utils';

import './style.css';

const Container: FC<ContainerProps> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <div className={cn('page-container', className)} {...rest}>
            {children}
        </div>
    );
};

export default Container;