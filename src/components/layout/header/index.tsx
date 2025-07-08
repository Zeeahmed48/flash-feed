import { useState, type FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

import Container from '@/components/layout/container';
import Sidebar from '@/components/layout/sidebar';
import { APP_NAVIGATIONS, PATHS } from '@/constants';
import { cn } from '@/utils';

import './style.css';

const Header: FC = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

    const toggleSideBar = () => {
        setIsSideBarOpen((prevState) => !prevState);
    };

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
                        <button onClick={toggleSideBar} className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden active:bg-gray-100">
                            <Menu />
                        </button>
                    </div>
                </div>
            </Container>

            <Sidebar isOpen={isSideBarOpen} />
        </header>
    );
};

export default Header;