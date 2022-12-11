import {React, useState} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwtDecode from 'jwt-decode';

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Routing from "./components/routing/Routing";
import setAuthToken from "./utils/setAuthToken";
import setAuthTokenAdmin from "./utils/setAuthTokenAdmin";



let logUser;
if (localStorage.getItem("token")) {
    const jwt = localStorage.getItem("token");
    setAuthToken(jwt);
    logUser = jwtDecode(jwt);
}

let logAdmin;
if (localStorage.getItem("admin-token")) {
    const jwt = localStorage.getItem("admin-token");
    setAuthTokenAdmin(jwt);
    logAdmin = jwtDecode(jwt);
}

const App = () => {

    const [user, setUser] = useState(logUser);
    const [admin, setAdmin] = useState(logAdmin);

    if (user) {
        sessionStorage.setItem("user-email", user.email);
    }
    if (admin) {
        sessionStorage.setItem("admin-email", admin.email);
    }
    console.log("Admin: ", admin);
    console.log("User: ", user);

    return (
        <Router>
            <div className='app'>
                {admin?<></>:<Navbar user={user}/>}
                <div className='main'>
                    <Routing user={user} admin={admin} />
                </div>
            </div>
        </Router>
    );
};

export default App;
