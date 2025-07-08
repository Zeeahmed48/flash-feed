import type { FC } from 'react';

import './style.css';

const Footer: FC = () => {
    return (
        <footer className="footer">
            <p className='text'>© {new Date().getFullYear()} NewsAgg. All rights reserved.</p>
        </footer>
    );
};

export default Footer;