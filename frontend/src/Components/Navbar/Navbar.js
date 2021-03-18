import React from 'react';
import './navbar.css';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ logout }) => {
    return (
        <div>
            <header className="header">
                <div style={{ display: 'flex' }}>
                    <NavLink className="logo" to={'/'}>
                        Connect
                    </NavLink>

                    <ul className="leftMenu">
                        <li>
                            <NavLink to={'/login'}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/register'}>Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="name">Hi Riz</div>
                <ul className="menu">
                    <li>
                        <Link to="/" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </header>
        </div>
    );
};

export default Navbar;
