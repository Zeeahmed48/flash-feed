import type { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Container from '@/components/layout/container';
import { APP_NAVIGATIONS, PATHS } from '@/constants';
import { cn } from '@/utils';

import './style.css';

const Header: FC = () => {
    return (
        <header className="header">
            <Container>
                <div className="header-container">
                    <div className="header-navigations">
                        <Link to={PATHS.HOME}>
                            <img className="logo" src="/logo.svg" alt="site logo" />
                        </Link>
                        <nav>
                            {APP_NAVIGATIONS.map((navigation) => {
                                return (
                                    <NavLink
                                        key={navigation.path}
                                        to={navigation.path}
                                        className={({ isActive }) => {
                                            return cn('nav-link', { active: isActive });
                                        }}
                                    >
                                        {navigation.text}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;