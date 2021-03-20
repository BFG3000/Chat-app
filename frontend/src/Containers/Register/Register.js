import React, { useState, useEffect } from 'react';
import './register.css';
import { toastError } from '../../util/Notification/toast';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../actions/userActions';

const Register = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/logo192.png');

    const dispatch = useDispatch();

    const { isAuthenticated, lrError, loading } = useSelector((state) => state.auth);

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

    const registerHandler = (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            password,
            avatar,
        };
        dispatch(registerUser(data));
    };

    const onChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };
    return (
        <div className="main_login">
            <div className="col-10 col-lg-5">
                <h1 className="text-center login-title">Register</h1>
                <div className="account-wall">
                    <img className="profile-img" src="./logo192.png" alt="logo" />
                    <form className="form-signin" encType="multipart/form-data" onSubmit={registerHandler}>
                        <input
                            type="name"
                            className="form-control"
                            value={name}
                            name="name"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            name="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img src={avatarPreview} className="rounded-circle" alt="notFound" />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input type="file" name="avatar" className="custom-file-input" accept="image/*" onChange={onChange} />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn-lg btn-primary btn-block"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                        <span className="clearfix"></span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
