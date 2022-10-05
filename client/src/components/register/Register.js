import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../utils/http";
import "../../styles/reglogForm.css";

const Register = ({user}) => {

    //useState for user inputs
    let username;
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //Show Errors
    const [showEmail, setShowEmail] = useState(false);
    const [showWalletAddress, setShowWalletAddress] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errMsgE, setErrMsgE] = useState("");
    const [errMsgW, setErrMsgW] = useState("");
    const [errMsgP, setErrMsgP] = useState("");
    const [errMsgCP, setErrMsgCP] = useState("");

    const [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(-1);
        }
    })

    const getUsername = () => {
        let text = email;
        let i = text.indexOf("@");
        username = text.substr(0, i);
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        getUsername();

        try {
            const {data} = await http.post("/user", {
                email,
                username,
                walletAddress,
                password,
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
        <div className="register">
            <form className='frmRegister' onSubmit={handleSubmit}>
                <h1 className='head-title'>Register</h1>
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
                    <label htmlFor='walletAddress'>Wallet Address</label>
                    <input
                        className='form-control'
                        placeholder="0x..."
                        type='text'
                        name='walletAddress'
                        onChange={(e) => {setWalletAddress(e.target.value)}}
                        value={walletAddress}
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
                <div className="row mb-3">
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input 
                        className='form-control'
                        placeholder="Confirm Password"
                        type='password' 
                        name='confirmPassword'
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                        value={confirmPassword}
                    />
                </div>
                {error && (
                    <div className='error_container'>
                        <span className='form_error'>{error}</span>
                    </div>
                )}
                <div className="row mb-3">
                    <button className="btn btn-danger btnSubmit" type='submit'>Register</button>
                    <p className="reglogLink">Already registered? Login here.</p>
                </div>
            </form>
        </div>
        
    );
};

export default Register;
