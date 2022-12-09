import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../utils/http";
import "../../styles/reglogForm.css";
import MetamaskPDF from '../../assets/files/CreateMetamaskGuide.pdf';
import Swal from "sweetalert2";

const Register = ({user}) => {

    //SweetAlert2.0
    
    function successAlert(res) {
        Swal.fire({
            title: "Success",
            text: res.data,
            icon: "success",
            iconColor: 'var(--maroon)',
            confirmButtonColor: 'var(--maroon)',
            background: 'var(--white)'
        })
    }

    function errorAlert(err) {
        Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            iconColor: 'var(--maroon)',
            confirmButtonColor: 'var(--maroon)',
            background: 'var(--white)'
        })
    }

    //useState for user inputs
    let username;
    const [lastName, setLastName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [course, setCourse] = useState("");
    const [yearLevel, setYearLevel] = useState("");
    const [section, setSection] = useState("");
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const courseOptions = ["BSBA", "BSHM", "BSED", "BSIT"];
    const yearLevelOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
    const sectionOptions = ["A", "B", "C", "D"];

    //Show Errors
    const [showLastName, setShowLastName] = useState(false);
    const [showFirstName, setShowFirstName] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
    const [showYearLevel, setShowYearLevel] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showWalletAddress, setShowWalletAddress] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errMsgLN, setErrMsgLN] = useState("");
    const [errMsgFN, setErrMsgFN] = useState("");
    const [errMsgC, setErrMsgC] = useState("");
    const [errMsgY, setErrMsgY] = useState("");
    const [errMsgS, setErrMsgS] = useState("");
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
    },[])

    const getUsername = () => {
        let text = email;
        let i = text.indexOf("@");
        username = text.substr(0, i);
    };

    function checkBlank(isBlank) {
        isBlank = false;
        if (lastName === "") {
            setErrMsgLN("Please enter your last name");
            setShowLastName(true);
            isBlank = true;
        }
        if (firstName === "") {
            setErrMsgFN("Please enter your first name");
            setShowFirstName(true);
            isBlank = true;
        }
        if (course === "") {
            setErrMsgC("Please enter your course");
            setShowCourse(true);
            isBlank = true;
        }
        if (yearLevel === "") {
            setErrMsgY("Please enter your year level");
            setShowYearLevel(true);
            isBlank = true;
        }
        if (section === "") {
            setErrMsgS("Please enter your section");
            setShowSection(true);
            isBlank = true;
        }
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
        Swal.fire({
            title: 'Are you sure?',
            text: "Please confirm to register your account",
            icon: 'question',
            iconColor: 'var(--maroon)',
            showCancelButton: true,
            confirmButtonColor: 'var(--maroon)',
            cancelButtonColor: 'var(--gold)',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            background: 'var(--white)'
        }).then((result) => {
            if (result.isConfirmed) {
                if (!checkBlank()) {
                    getUsername();
                    var candidate = {
                        "electionName": "",
                        "position": "",
                        "partyList": "",
                        "votes": 0,
                        "isDeployed": false
                    };
        
                    http.post("/user", {
                        lastName,
                        firstName,
                        course,
                        yearLevel,
                        section,
                        isCandidate: false,
                        candidate,
                        email,
                        username,
                        walletAddress,
                        password,
                    }).then((res) => {
                        Swal.fire({
                            title: "Success",
                            text: "Registration successful!",
                            icon: "success",
                            iconColor: 'var(--maroon)',
                            confirmButtonColor: 'var(--maroon)',
                            background: 'var(--white)'
                        }).then(() => {
                            localStorage.setItem("token", res.data);
                            window.location = "/";
                        })
                        
                    }).catch((err) => {
                        setErrMsgE(err.response.data);
                        setShowEmail(true);
                        setPassword("");
                        setConfirmPassword("");
                    })
                    }
                }
        })
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

    const lastnameValidation = async () => {
        if (lastName === "") {
            setErrMsgLN("Please enter your last name");
            setShowLastName(true);
        } else {
            setShowLastName(false);
        }
    }

    const firstnameValidation = async () => {
        if (firstName === "") {
            setErrMsgFN("Please enter your first name");
            setShowFirstName(true);
        } else {
            setShowFirstName(false);
        }
    }

    const courseValidation = async () => {
        if (course === "") {
            setErrMsgC("Please select a course");
            setShowCourse(true);
        } else {
            setShowCourse(false);
        }
    }

    const yearLevelValidation = async () => {
        if (yearLevel === "") {
            setErrMsgY("Please select a year level");
            setShowYearLevel(true);
        } else {
            setShowYearLevel(false);
        }
    }

    const sectionValidation = async () => {
        if (section === "") {
            setErrMsgS("Please select a section");
            setShowSection(true);
        } else {
            setShowSection(false);
        }
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
                    <div className="col mb-3">
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            className='form-control'
                            placeholder="Dela Cruz"
                            type='text'
                            name='lastName'
                            onChange={(e) => {setLastName(e.target.value)}}
                            value={lastName}
                            onBlur={lastnameValidation}
                        />
                        {showLastName && <p className='spanErrors'>{errMsgLN}</p>}
                    </div>
                    <div className="col mb-3">
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            className='form-control'
                            placeholder="Juan"
                            type='text'
                            name='firstName'
                            onChange={(e) => {setfirstName(e.target.value)}}
                            value={firstName}
                            onBlur={firstnameValidation}
                        />
                        {showFirstName && <p className='spanErrors'>{errMsgFN}</p>}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col mb-3">
                        <label htmlFor='course'>Course</label>
                        <select value={course} onChange={(e) => setCourse(e.target.value)} className="form-select" name="course" aria-label="Default select example" onBlur={courseValidation}>
                            <option defaultValue="" value="">Select Course</option>
                            {courseOptions.map((val, key) =><option key={key}>{val}</option>)}
                        </select>
                        {showCourse && <p className='spanErrors'>{errMsgC}</p>}
                    </div>
                    <div className="col mb-3">
                        <label htmlFor='yearLevel'>Year Level</label>
                        <select value={yearLevel} onChange={(e) => setYearLevel(e.target.value)} className="form-select" name="yearLevel" aria-label="Default select example" onBlur={yearLevelValidation}>
                            <option defaultValue="" value="">Select Year Level</option>
                            {yearLevelOptions.map((val, key) =><option key={key}>{val}</option>)}
                        </select>
                        {showYearLevel && <p className='spanErrors'>{errMsgY}</p>}
                    </div>
                    <div className="col mb-3">
                        <label htmlFor='section'>Section</label>
                        <select value={section} onChange={(e) => setSection(e.target.value)} className="form-select" name="section" aria-label="Default select example" onBlur={sectionValidation}>
                            <option defaultValue="" value="">Select Section</option>
                            {sectionOptions.map((val, key) =><option key={key}>{val}</option>)}
                        </select>
                        {showSection && <p className='spanErrors'>{errMsgS}</p>}
                    </div>
                </div>
                
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
