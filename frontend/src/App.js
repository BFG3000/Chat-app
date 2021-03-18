import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './Containers/Chat/Chat';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Navbar from './Components/Navbar/Navbar';

function App() {
    return (
        <div className="main">
            <Router>
                <Navbar />
                <Route path="/" component={Home} exact />
                <Route path="/chat" component={Chat} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
            </Router>
        </div>
    );
}

export default App;
