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

import SmartContract from "../election/SmartContract";
import AdminLogin from "../admin/AdminLogin";
import AddAdmin from "../admin/AddAdmin";
import AdminLogout from "../admin/AdminLogout";
import AdminElections from "../admin/Elections";
import AdminVoters from "../admin/Voters";
import AdminCandidates from "../admin/Candidates";
import Accounts from "../admin/Accounts";
import RegisterCOC from "../election/RegisterCOC";

const Routing = ({user, admin}) => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login user={user} />} />
            <Route path='/register' element={<Register user={user} />} />
            <Route element={<PrivateRoute user={user} />}>
                <Route path='/logout' element={<Logout />} />
            </Route>
            <Route path='/election' element={<Election />}/>
            <Route element={<PrivateRoute user={user} />}>
                <Route path='/vote/:address' element={<Vote user={user} />} />
                <Route path='/register/coc' element={<RegisterCOC user={user} />} />
            </Route>
            <Route path='/about' element={<About />} />

            <Route path='/admin/login' element={<AdminLogin admin={admin}/>}/>
            
            <Route element={<PrivateAdmin admin={admin} />}>
                <Route path='admin' element={<AdminElections />}/>
                <Route path='admin/addadmin' element={<AddAdmin/>}/>
                <Route path='admin/smartcontract' element={<SmartContract />}/>
                <Route path='admin/logout' element={<AdminLogout />}/>
                <Route path='admin/elections' element={<AdminElections />}/>
                <Route path='admin/voters' element={<AdminVoters />} />
                <Route path='admin/candidates' element={<AdminCandidates />} />
                <Route path='admin/accounts' element={<Accounts />} />
            </Route>

        </Routes>
    );
};

export default Routing;
