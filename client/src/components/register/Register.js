import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../utils/http";
import "../../styles/reglogForm.css";
import MetamaskPDF from '../../assets/files/CreateMetamaskGuide.pdf';

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

    const getUsername = () => {
        let text = email;
        let i = text.indexOf("@");
        username = text.substr(0, i);
    };

    function checkBlank(isBlank) {
        isBlank = false;
        if (email === "") {
            setErrMsgE("Please enter your email");
            setShowEmail(true);
            isBlank = true;
        }
        if (walletAddress === "") {
            setErrMsgW("Please enter your wallet address");
            setShowWalletAddress(true);
            isBlank = true;
        }
        if (password === "") {
            setErrMsgP("Please enter a password");
            setShowPassword(true);
            isBlank = true;
        }
        if (confirmPassword === "") {
            setErrMsgCP("Please confirm your password");
            setShowConfirmPassword(true);
            isBlank = true;
        }
        return isBlank;
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if (!checkBlank()) {
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
                if (error.response && error.response.status === 400) {
                    setErrMsgE(error.response.data);
                    setShowEmail(true);
                    setPassword("");
                    setConfirmPassword("");
                }
            }
        }
    };

    /* Validations */
  var emailValidator = require('validator');
  //Regex
    function dhvsuEmailRegex(input) {
      let regex = /\d*(@dhvsu.edu.ph)/i;
      return regex.test(input);
    }
  
    function walletRegex(input) {
      let regex = /^0x[a-fA-F0-9]{40}$/g;
      return regex.test(input);
    }
  
    function passwordRegex(input) {
      let regex = /((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20})/g;
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
                
                try {
                    await http.post("/check/email", {
                        email,
                    })
                    .then(setShowEmail(false));
                } catch (error) {
                    console.log(error);
                    if (error.response && error.response.status === 400) {
                        setErrMsgE(error.response.data);
                        setShowEmail(true);
                    }
                }
            } else {
                setErrMsgE("Please enter a valid DHVSU Email Address");
                setShowEmail(true);
            }
        }
    }
  
    const walletAddressValidation = async () => {
        if (walletAddress === "") {
          setErrMsgW("Please enter your wallet address");
          setShowWalletAddress(true);
        } else {
          setShowWalletAddress(false);
          var walletValidity = walletRegex(walletAddress);
          if (walletValidity) {
                try {
                    await http.post("/check/wallet", {
                        walletAddress,
                    }).then(setShowWalletAddress(false));
                    
                } catch (error) {
                    console.log(error);
                    if (error.response && error.response.status === 400) {
                        setErrMsgW(error.response.data);
                        setShowWalletAddress(true);
                    }
                }
          }
          else {
            setErrMsgW("Please enter a valid wallet address");
            setShowWalletAddress(true);
          }
        }
      }
    
    const passwordValidation = async () => {
      if (password === "") {
        setErrMsgP("Please enter a password");
        setShowPassword(true);
      } else {
        if (passwordRegex(password)) {
          setShowPassword(false);
        } else {
          setErrMsgP("Password must contain at least one lowercase, one uppercase and a digit");
          setShowPassword(true);
        }
      }
    }
  
    const confirmPasswordValidation = async () => {
      if (confirmPassword === "") {
        setErrMsgCP("Please confirm your password");
        setShowConfirmPassword(true);
      } else {
        setShowConfirmPassword(false);
        //Confirm Password
        if (password === confirmPassword) {
          setShowConfirmPassword(false);
        } else {
          setErrMsgCP("Password doesn't match with Confirm Password");
          setShowConfirmPassword(true);
        }
      }
    }

    function validateForm() {
        if (showEmail) {
            return true;
        }
        if (showWalletAddress) {
            return true;
        }
        if (showPassword) {
            return true;
        }
        if (showConfirmPassword) {
            return true;
        }
        return false;
    }

  /* Validations */

    function openPdf() {
        window.open(MetamaskPDF);
    }
  
    return (
        <div className="register">
            <form className='frmRegister'>
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
                        onBlur={emailValidation}
                    />
                    {showEmail && <p className='spanErrors'>{errMsgE}</p>}
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
                        onBlur={walletAddressValidation}
                    />
                    <span onClick={()=>openPdf()} className="getWallet">How to get your wallet address?</span>
                    {showWalletAddress && <p className='spanErrors'>{errMsgW}</p>}
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
                <div className="row mb-3">
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input 
                        className='form-control'
                        placeholder="Confirm Password"
                        type='password' 
                        name='confirmPassword'
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                        value={confirmPassword}
                        onBlur={confirmPasswordValidation}
                    />
                    {showConfirmPassword && <p className='spanErrors'>{errMsgCP}</p>}
                </div>
                <div className="row mb-3">
                    <button onClick={handleSubmit} disabled={disableSubmit} className="btn btn-danger btnSubmit" type='submit'>Register</button>
                    <Link to="/login" className="reglogLink">Already registered? Login here.</Link>
                </div>
            </form>
        </div>
        
    );
};

export default Register;
