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
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
   
    const [errMsgE, setErrMsgE] = useState("");
    const [errMsgP, setErrMsgP] = useState("");
    const [errMsg, setErrMsg] = useState("");
    
    const [error, setError] = useState(null);
    const [disableSubmit, setDisableSubmit] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(-1);
        }
        if (validateForm() === false) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    })

    function checkBlank(isBlank) {
        isBlank = false;
        if (email === "") {
            setErrMsgE("Please enter your email");
            setShowEmail(true);
            isBlank = true;
        }
        if (password === "") {
            setErrMsgP("Please enter a password");
            setShowPassword(true);
            isBlank = true;
        }
        return isBlank;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!checkBlank()) {
            try {
                const {data} = await http.post("/auth", {
                    email,
                    password
                });
                localStorage.setItem("token", data)
                window.location = "/";
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setShowPassword(true);
                    setErrMsgP(error.response.data)
                }
            }
        } else {

        }
    };


/* Validations */
  var emailValidator = require('validator');
    //Regex
    function dhvsuEmailRegex(input) {
      let regex = /\d*(@dhvsu.edu.ph)/i;
      return regex.test(input);
    }
    const emailValidation = async () => {
        if (email === "") {
            setErrMsgE("Please enter your email");
            setShowEmail(true);
        } else {
            var emailValidity = emailValidator.isEmail(email);
            var dhvsuValidity = dhvsuEmailRegex(email);
            if (emailValidity && dhvsuValidity) {
                setShowEmail(false);
            } else {
                setErrMsgE("Please enter a valid DHVSU Email Address");
                setShowEmail(true);
            }
        }
    }

    const passwordValidation = async () => {
      if (password === "") {
        setErrMsgP("Please enter a password");
        setShowPassword(true);
      } else {
        setShowPassword(false);
      }
    }
  
    function validateForm() {
        if (showEmail) {
            return true;
        }
        if (showPassword) {
            return true;
        }
        return false;
    }

/* Validations */

/* Web3 */
    const { ethers } = require("ethers");
    const [walletButton, setWalletButton] = useState("Connect Wallet");
    const [bal, setBal] = useState(null);

    const requestAccount = async (e) => {
        e.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            setWalletButton("Wallet Connected");
            console.log(account);
        } else {
            console.log('Please install Metamask');
        }
    }


/* Web3 */

    return (
        <div className="login">
            <form className='frmLogin'>
                
                <h1 className='head-title'>Login</h1>
                {/* <div className="row mb-3 mt-3">
                    <button onClick={() => handleSwitchNetwork("mumbai")} type="button" class="btn btn-outline-warning">Swicth to Mumbai</button>
                </div> */}
                <div className="row mb-3 mt-3">
                    {/* <button className="btn btn-warning" onClick={signMessage}>{walletButton}</button> */}
                    <button className="btn btn-danger" onClick={requestAccount}>{walletButton}</button>
                    {showError && <p className='spanErrors'>{errMsg}</p>}
                    <p>{bal}</p>
                </div>
                <h2>OR</h2>
                <div className="row mb-3">
                    <label htmlFor='Email'>Email</label>
                    <input
                        className='form-control'
                        placeholder="12345678@dhvsu.edu.ph"
                        type='email'
                        name='email'
                        onChange={(e) => {setEmail(e.target.value)}}
                        value={email}
                        onBlur={emailValidation}
                    />
                    {showEmail && <p className='spanErrors'>{errMsgE}</p>}
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
                        onBlur={passwordValidation}
                    />
                    {showPassword && <p className='spanErrors'>{errMsgP}</p>}
                </div>
                {error && (
                    <div className='error_container'>
                        <span className='form_error'>{error}</span>
                    </div>
                )}
                <div className="row mb-3">
                    <button onClick={handleSubmit} disabled={disableSubmit} className="btn btn-danger btnSubmit" type='submit'>Login</button>
                    <Link to="/register" className="reglogLink">Not yet registered? Register here.</Link>
                </div>
            </form>


            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Launch static backdrop modal
            </button>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Incorrect Network</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Please switch to Mumbai Testnet</p>
                    </div>
                    <div class="modal-footer">
                        <button onClick={() => handleSwitchNetwork("mumbai")} type="button" class="btn btn-primary" data-bs-dismiss="modal">Switch Network</button>
                    </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Login;

