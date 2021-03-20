import React from 'react';
import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toastSuccess } from '../../util/Notification/toast';
import { logout } from '../../actions/userActions';

const Navbar = () => {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        toastSuccess('Logged out successfully!');
    };

    return (
        <div>
            <header className="header">
                <div style={{ display: 'flex' }}>
                    <NavLink className="logo" to={'/'}>
                        Connect
                    </NavLink>
                    {isAuthenticated || loading ? (
                        <></>
                    ) : (
                        <ul className="leftMenu">
                            <li>
                                <NavLink to={'/login'}>Login</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/register'}>Sign Up</NavLink>
                            </li>
                        </ul>
                    )}
                </div>
                {user && !loading && <div className="name">hi {user.name}</div>}
                <ul className="menu">
                    <li>
                        <Link to="/" onClick={logoutHandler}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </header>
        </div>
    );
};

export default Navbar;
