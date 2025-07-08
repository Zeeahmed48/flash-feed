import type { FC } from 'react';

import { cn } from '@/utils';

import './style.css';

const Card: FC<CardProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div className={cn('card', className)} {...restProps}>
      {children}
    </div>
  );
};

export default Card;
