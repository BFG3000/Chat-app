import React,{useState} from 'react';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="main_login">
                <div className="col-md-4 ">
                    <h1 className="text-center login-title">Sign in to continue</h1>
                    <div className="account-wall">
                        <img
                            className="profile-img"
                            src="./logo192.png"
                            alt="logo"
                        />
                        <form className="form-signin">
                            <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autofocus />
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button className="btn-lg btn-primary btn-block" type="submit">
                                Sign in
                            </button>
                            <span className="clearfix"></span>
                        </form>
                    </div>
                    <a href="/" className="text-center new-account">
                        Create an account{' '}
                    </a>
                </div>
            
        </div>
    );
};

export default Login;
