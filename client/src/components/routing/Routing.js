import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import Logout from "../logout/Logout";
import PrivateRoute from "./PrivateRoute";

import About from "../about/About";
import Election from "../election/Election";
import Vote from "../election/Vote";

const Routing = ({user}) => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login user={user} />} />
            <Route path='/register' element={<Register />} />
            <Route element={<PrivateRoute user={user} />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/logout' element={<Logout />} />
            </Route>
            <Route path='/election' element={<Election />} />
            <Route path='/vote' element={<Vote />} />
            <Route path='/about' element={<About />} />
        </Routes>
    );
};

export default Routing;
