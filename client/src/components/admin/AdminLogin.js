import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/http";
import "../../styles/reglogForm.css";

const AdminLogin = ({admin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Show Errors
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
   
    const [errMsgE, setErrMsgE] = useState("");
    const [errMsgP, setErrMsgP] = useState("");
    
    const [error, setError] = useState(null);
    const [disableSubmit, setDisableSubmit] = useState(true);

    let navigate = useNavigate();

    useEffect(() => {
        if (admin) {
            navigate("/admin/dashboard");
        }
        if (validateForm() === false) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [admin, navigate, validateForm])

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
                const {data} = await http.post("/auth/admin", {
                    email,
                    password
                });
                localStorage.setItem("admin-token", data)
                window.location = "/admin/dashboard";
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

    const emailValidation = async () => {
        if (email === "") {
            setErrMsgE("Please enter your email");
            setShowEmail(true);
        } else {
            var emailValidity = emailValidator.isEmail(email);

            if (emailValidity) {
                setShowEmail(false);
            } else {
                setErrMsgE("Please enter a valid Email Address");
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

    return (
        <div className="login">
            <form className='frmLogin'>
                
                <h1 className='head-title'>Admin Login</h1>
                
                <div className="row mb-3">
                    <label htmlFor='Email'>Email</label>
                    <input
                        className='form-control'
                        placeholder="juandelacruz@gmail.com"
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
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
