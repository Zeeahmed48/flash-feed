import { type FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { cn } from '@/utils';
import { APP_NAVIGATIONS, PATHS } from '@/constants';

import './style.css';

const Sidebar: FC<{ isOpen: boolean }> = ({ isOpen }) => {

    return (
        <aside
            className={cn('sidebar', {
                open: isOpen
            })}
        >
            <div className="sidebar-content">
                <Link to={PATHS.HOME}>
                    <img className="app-logo" src="/logo.svg" alt="app logo" />
                    <p className='app-title'>Flash Feed</p>
                </Link>
                <div className="navigation-list">
                    {APP_NAVIGATIONS.map((navigation) => {
                        return (
                            <NavLink
                                key={navigation.path}
                                to={navigation.path}
                                className={({ isActive }) => {
                                    return cn('link-item', { active: isActive });
                                }}
                            >
                                {navigation.text}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
