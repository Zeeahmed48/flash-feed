import type { FC } from 'react';

import './style.css';
import { AlertCircle } from 'lucide-react';

const ErrorMessage: FC<{ message: string, description?: string }> = ({ message, description }) => (
    <div className="error-container">
        <AlertCircle className="error-icon" />
        <div>
            <h3 className="error-text">{message}</h3>
            {description && <p className="error-description">{description}</p>}
        </div>
    </div>
);

export default ErrorMessage;