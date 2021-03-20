import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './Containers/Chat/Chat';
//import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import store from './store/store';
import {loadUser} from './actions/userActions'

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <div className="main">
            <Router>
                <Navbar />
                <ProtectedRoute path="/" component={Chat} exact />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Router>
        </div>
    );
}

export default App;
