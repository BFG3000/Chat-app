import React, { useState, useEffect } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { toastError } from '../../util/Notification/toast';
import { loginUser, clearErrors } from '../../actions/userActions';
import { Link } from 'react-router-dom';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { isAuthenticated, lrError } = useSelector((state) => state.auth);

    useEffect(() => {
        //if already logged in go to home page
        if (isAuthenticated) {
            history.push('/');
        }
        if (lrError) {
            toastError(lrError);
            dispatch(clearErrors());
        }
    }, [dispatch, history, isAuthenticated, lrError]);

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser({email, password}));
    };


    return (
        <div className="main_login">
            <div className="col-md-4 ">
                <h1 className="text-center login-title">Sign in to continue</h1>
                <div className="account-wall">
                    <img className="profile-img" src="./logo192.png" alt="logo" />
                    <form className="form-signin" onSubmit={loginHandler}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="btn-lg btn-primary btn-block" type="submit">
                            Sign in
                        </button>
                        <span className="clearfix"></span>
                    </form>
                </div>
                <Link to="/register" className="text-center new-account">
                    Create an account{' '}
                </Link>
            </div>
        </div>
    );
};

export default Login;
