import {React, useState} from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({user}) => {
    
    return (
        <nav className='navbar sticky-top navbar-expand-lg newclass'>
            <div className="conatiner-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-body">
                        {<button type="button" className="btn-x" data-bs-dismiss="offcanvas" aria-label="Close">X</button>}
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/election' className="nav-link" aria-current="page">Elections</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/about' className="nav-link" aria-current="page">About</NavLink>
                            </li>
                        {!user &&
                            <>
                                <li className="nav-item">
                                    <NavLink to='/login' className="nav-link" aria-current="page">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/register' className="nav-link" aria-current="page">Register</NavLink>
                                </li>
                            </>
                        }
                        {user &&
                            <>
                                <li className="nav-item">
                                    <NavLink to='/profile' className="nav-link" aria-current="page">Profile</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/logout' className="nav-link" aria-current="page">Logout</NavLink>
                                </li>
                            </>
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
