import {React, useState, useEffect} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from 'jwt-decode';

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Routing from "./components/routing/Routing";
import setAuthToken from "./utils/setAuthToken";

let logUser;
if (localStorage.token) {
    const jwt = localStorage.getItem("token");
    setAuthToken(jwt);
    logUser = jwtDecode(jwt);
}

const App = () => {
    const [user, setUser] = useState(logUser);
    
    console.log(user);

    return (
        <Router>
            <div className='app'>
                 <Navbar user={user}/>
                <div className='main'>
                    <Routing user={user} />
                </div>
            </div>
        </Router>
    );
};

export default App;
