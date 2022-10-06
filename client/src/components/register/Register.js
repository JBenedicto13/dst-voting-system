import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../utils/http";
import "../../styles/reglogForm.css";
import validator from "validator";

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
                setShowEmail(error.response.data);
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
                setShowEmail(false);
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
            http
              .get("/check", {walletAddress})
              .then((response) => {
                console.log(response);
              })
              .catch((err) => console.log(err))
          } else {
            setErrMsgW("Please enter a valid wallet address");
            setShowWalletAddress(true);
          }
        }
      }

    // const walletAddressValidation = async () => {
    //   if (walletAddress === "") {
    //     setErrMsgW("Please enter your wallet address");
    //     setShowWalletAddress(true);
    //   } else {
    //     setShowWalletAddress(false);
    //     var walletValidity = walletRegex(walletAddress);
    //     if (walletValidity) {
    //       axios
    //         .get(`http://localhost:3001/checkAddress/${walletAddress}`)
    //         .then((response) => {
    //           if (response.data === "") {
    //             setShowEmail(false);
    //           } else {
    //             setErrMsgW("A user is already registered with the wallet address.");
    //             setShowWalletAddress(true);
    //           }
    //         })
    //         .catch((err) => console.log(err))
    //     } else {
    //       setErrMsgW("Please enter a valid wallet address");
    //       setShowWalletAddress(true);
    //     }
    //   }
    // }
  
    // const passwordValidation = async () => {
    //   if (password === "") {
    //     setErrMsgP("Please enter a password");
    //     setShowPassword(true);
    //   } else {
    //     if (passwordRegex(password)) {
    //       setShowPassword(false);
    //     } else {
    //       setErrMsgP("Password must contain at least one lowercase, one uppercase and a digit");
    //       setShowPassword(true);
    //     }
    //   }
    // }
  
    // const confirmPasswordValidation = async () => {
    //   if (confirmPassword === "") {
    //     setErrMsgCP("Please confirm your password");
    //     setShowConfirmPassword(true);
    //   } else {
    //     setShowConfirmPassword(false);
    //     //Confirm Password
    //     if (password === confirmPassword) {
    //       setShowConfirmPassword(false);
    //     } else {
    //       setErrMsgCP("Password doesn't match with Confirm Password");
    //       setShowConfirmPassword(true);
    //     }
    //   }
    // }
  /* Validations */

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
