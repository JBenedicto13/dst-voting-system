import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({user}) => {
    
    return (
        <nav className='navbar sticky-top navbar-expand-lg newclass'>
            <div className="conatiner-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-body">
                        <button type="button" class="btn-x" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <NavLink to='/' class="nav-link" aria-current="page">Home</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to='/election' class="nav-link" aria-current="page">Elections</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to='/about' class="nav-link" aria-current="page">About</NavLink>
                            </li>
                        {!user &&
                            <>
                                <li class="nav-item">
                                    <NavLink to='/login' class="nav-link" aria-current="page">Login</NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink to='/register' class="nav-link" aria-current="page">Register</NavLink>
                                </li>
                            </>
                        }
                        {user &&
                            <>
                                <li class="nav-item">
                                    <NavLink to='/profile' class="nav-link" aria-current="page">Profile</NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink to='/logout' class="nav-link" aria-current="page">Logout</NavLink>
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
