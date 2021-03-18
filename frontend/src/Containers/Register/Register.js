import React, { useState } from 'react';
import './register.css';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');

    const loading = false;

    const registerHandler = () => {};
    const onChange = () => {};
    return (
        <div className="main_login">
            <div className="col-10 col-lg-5">
                <h1 className="text-center login-title">Register</h1>
                <div className="account-wall">
                    <img className="profile-img" src="./logo192.png" alt="logo" />
                    <form className="form-signin" encType="multipart/form-data" onSubmit={registerHandler}>
                        <input type="name" className="form-control" value={name} name="name" placeholder="Name" onChange={onChange} />

                        <input type="email" className="form-control" value={email} name="email" placeholder="Email" onChange={onChange} />

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            name="password"
                            placeholder="Password"
                            onChange={onChange}
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
