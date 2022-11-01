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

let isBackend;
if (localStorage.isBackend) {
    const val = localStorage.getItem("isBackend");
    if (val) {
        localStorage.setItem("isBackend", false);
    }
    isBackend = val;
    console.log(isBackend);
}

const App = () => {
    
    const [user, setUser] = useState(logUser);
    const [backend, setBackend] = useState(isBackend);
    console.log(backend);
    
    console.log(user);

    return (
        <Router>
            <div className='app'>
                {backend ? <></> : <Navbar user={user}/>}
                <div className='main'>
                    <Routing user={user} backend={backend} />
                </div>
            </div>
        </Router>
    );
};

export default App;
