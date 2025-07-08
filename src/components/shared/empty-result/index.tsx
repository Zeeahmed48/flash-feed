import type { FC } from 'react';

import './style.css';

type EmptyResultProps = { message: string };

const EmptyResult: FC<EmptyResultProps> = ({ message }) => (
    <div className="empty-result-container">
        <p className="empty-result-text">{message}</p>
    </div>
);

export default EmptyResult;