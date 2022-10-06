import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http";
import "../../styles/reglogForm.css";

const Login = ({user}) => {
    let username;
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [password, setPassword] = useState("");

    //Show Errors
    const [showEmail, setShowEmail] = useState(false);
    const [showWalletAddress, setShowWalletAddress] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
   
    const [errMsgE, setErrMsgE] = useState("");
    const [errMsgW, setErrMsgW] = useState("");
    const [errMsgP, setErrMsgP] = useState("");

    const [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(-1);
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await http.post("/auth", {
                email,
                password
            });
            localStorage.setItem("token", data)
            window.location = "/";
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data)
            }
        }
    };
    return (
        <div className="login">
            <form className='frmLogin' onSubmit={handleSubmit}>
                <h1 className='head-title'>Login</h1>
                <div className="row mb-3">
                    <label htmlFor='Email'>Email</label>
                    <input
                        className='form-control'
                        placeholder="12345678@dhvsu.edu.ph"
                        type='email'
                        name='email'
                        onChange={(e) => {setEmail(e.target.value)}}
                        value={email}
                    />
                </div>
                <div className="row mb-3">
                    <label htmlFor='Password'>Password</label>
                    <input 
                        className='form-control'
                        placeholder="Password"
                        type='password' 
                        name='password'
                        onChange={(e) => {setPassword(e.target.value)}}
                        value={password}
                    />
                </div>
                {error && (
                    <div className='error_container'>
                        <span className='form_error'>{error}</span>
                    </div>
                )}
                <div className="row mb-3">
                    <button className="btn btn-danger btnSubmit" type='submit'>Login</button>
                    <Link to="/register" className="reglogLink">Not yet registered? Register here.</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
