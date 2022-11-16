import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../home/Home";
import Logout from "../logout/Logout";
import PrivateRoute from "./PrivateRoute";
import PrivateAdmin from "./PrivateAdmin";

import About from "../about/About";
import Election from "../election/Election";
import Vote from "../election/Vote";

import Dashboard from "../admin/dashboard";
import SmartContract from "../election/SmartContract";
import AdminLogin from "../admin/AdminLogin";
import AddAdmin from "../admin/AddAdmin";


const Routing = ({user, admin}) => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login user={user} />} />
            <Route path='/register' element={<Register />} />
            <Route element={<PrivateRoute user={user} />}>
                <Route path='/logout' element={<Logout />} />
            </Route>
            <Route path='/election' element={<Election />}/>
            <Route element={<PrivateRoute user={user} />}>
                <Route path='/vote' element={<Vote />} />
            </Route>
            <Route path='/about' element={<About />} />

            <Route path='/admin-login' element={<AdminLogin admin={admin}/>}/>
            
            <Route element={<PrivateAdmin admin={admin} />}>
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/addadmin' element={<AddAdmin/>}/>
                <Route path='/smartcontract' element={<SmartContract />}/>
            </Route>
            
        </Routes>
    );
};

export default Routing;
