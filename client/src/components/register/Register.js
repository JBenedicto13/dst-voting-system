import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../utils/http";
import "../../styles/reglogForm.css";
import MetamaskCpPDF from '../../assets/files/MetaMaskAccntSetupPhone.pdf';
import MetamaskDesktopPDF from '../../assets/files/MetaMask-SetupDesktop.pdf';
import Swal from "sweetalert2";
import {isMobile} from 'react-device-detect';
import emailjs from 'emailjs-com';
import {BiShow, BiHide} from 'react-icons/bi';

const Register = ({user}) => {

    const [isShow, setisShow] = useState(false);

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
    const [expirationDate, setexpirationDate] = useState("");

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
    const [systemName, setsystemName] = useState("DST Voting System");
    const [sixdigitcode, setsixdigitcode] = useState("");
    const [isEmailConfirm, setisEmailConfirm] = useState(false);

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
    },[user, navigate])

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
                var code = generateConfirmationCode();
                var expDate = generateExpDate();
                setexpirationDate(expDate);
                setsixdigitcode(code);

                var email_data = {
                    "receiver_email": email,
                    "system_name": systemName,
                    "receiver_name": firstName,
                    "confirmation_code": code
                }

                console.log(email_data);
                sendEmail(email_data)
                }
        })
    };

    function handleRegister(isEmailConfirm) {
        if (isEmailConfirm == true) {
            document.getElementById("btn-close").click();
            setsixdigitcode("");
            
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
                    expirationDate
                }).then((res) => {
                    Swal.fire({
                        title: "Success",
                        text: "Registration successful!",
                        icon: "success",
                        iconColor: 'var(--maroon)',
                        confirmButtonColor: 'var(--maroon)',
                        background: 'var(--white)'
                    }).then(() => {
                        http.post("/organizations/members/add", {
                            orgName: "DHVSU Sto. Tomas Student Council",
                            email: email,
                        })
                        .then(() => {
                            var orgName = "";

                            switch(course) {
                                case "BSBA": 
                                    orgName = "College of Business Administration";
                                break;

                                case "BSHM":
                                    orgName = "College of Hospitality and Management";
                                break;

                                case "BSED":
                                    orgName = "College of Education";
                                break;

                                default: 
                                    orgName = "College of Computing Studies";
                            }

                            http.post("/organizations/members/add", {
                                orgName: orgName,
                                email: email,
                            }).then((res) => console.log(res));

                            localStorage.setItem("token", res.data);
                            window.location = "/";
                        })
                    })
                    
                }).catch((err) => {
                    setErrMsgE(err.response.data);
                    setShowEmail(true);
                    setPassword("");
                    setConfirmPassword("");
                })
                }
        } else {
            Swal.fire({
                title: "Invalid Code",
                text: "Please enter a valid code",
                icon: "error",
                iconColor: 'var(--maroon)',
                confirmButtonColor: 'var(--maroon)',
                cancelButtonColor: 'var(--gold)',
                confirmButtonText: 'Okay',
                background: 'var(--white)'
            })
        }
    }

    function sendEmail(emailParams) {
    
        emailjs.send('dstvotingsystememail', 'emailconfirmationcode', emailParams, 'XmxVG5Jkr4p0dtGuZ')
          .then((result) => {
              if(result.text) {
                document.getElementById("openCCModal").click();
                setTimeout(() => {
                    setsixdigitcode("");
                }, 300000) //5m
              }
          })
          .catch((error) => {
              console.log(error.text);
          });
    }

    const handleCC = async (e) => {
        e.preventDefault();
        var code = (e.target.confirmation_code.value);

        if (sixdigitcode === code) {
            handleRegister(true);
        } else if (sixdigitcode === "") {
            Swal.fire({
                title: "Code Expired",
                text: "The code has expired, please try again",
                icon: "error",
                iconColor: 'var(--maroon)',
                confirmButtonColor: 'var(--maroon)',
            })
            handleRegister(false);
        }
        else {
            handleRegister(false);
        }
    }

    function generateConfirmationCode() {
        // Generate a random number between 0 and 1
        let randomNumber = Math.random();
        // Convert the number to a string and extract the first 6 digits
        let confirmationCode = randomNumber.toString().substring(2, 8);
        return confirmationCode;
    }

    function generateExpDate() {
        // Get the current date
        var currentDate = new Date();
        var increment = 0;

        switch (yearLevel) {
            case "1st Year": {
                increment = 1
            }
            case "1st Year": {
                increment = 2
            }
            case "1st Year": {
                increment = 3
            }
            default: {
                increment = 4
            }
        }
        
        var expirationDate = new Date(currentDate.getFullYear() + increment, currentDate.getMonth(), currentDate.getDate());

        return expirationDate
    }

    /* Validations */
  var emailValidator = require('validator');
  //Regex
    function dhvsuEmailRegex(input) {
      let regex = /^\d{10}(@dhvsu.edu.ph)/i;
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
          setErrMsgP("Password must contain at least 8 characters, one lowercase, one uppercase and a digit");
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
        if (isMobile) {
            window.open(MetamaskCpPDF);
        } else {
            window.open(MetamaskDesktopPDF);
        }
    }
  
    return (
        <div className="register">
            <button className="fade" id="openCCModal" data-bs-toggle="modal" data-bs-target="#confirmationModal">Open</button>
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
                    <div className="passDiv">
                    <input 
                        className='form-control'
                        id="password"
                        placeholder="Password"
                        type='password' 
                        name='password'
                        onChange={(e) => {setPassword(e.target.value)}}
                        value={password}
                        onBlur={passwordValidation}
                    />
                    <span onClick={() => {
                        
                        if (isShow == true) {
                            setisShow(false)
                        } else {
                            setisShow(true)
                        }

                        const type = document.getElementById("password").getAttribute("type") === "password" ? "text" : "password";
                        document.getElementById("password").setAttribute("type", type);
                        const type1 = document.getElementById("confirmpassword").getAttribute("type") === "password" ? "text" : "password";
                        document.getElementById("confirmpassword").setAttribute("type", type);

                    }}>{ isShow ? <BiHide /> : <BiShow />}</span>
                    </div>
                    {showPassword && <p className='spanErrors'>{errMsgP}</p>}
                </div>
                <div className="row mb-3">
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <div className="passDiv">
                    <input 
                        className='form-control'
                        id="confirmpassword"
                        placeholder="Confirm Password"
                        type='password' 
                        name='confirmPassword'
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                        value={confirmPassword}
                        onBlur={confirmPasswordValidation}
                    />
                    <span onClick={() => {
                        
                        if (isShow == true) {
                            setisShow(false)
                        } else {
                            setisShow(true)
                        }

                        const type = document.getElementById("password").getAttribute("type") === "password" ? "text" : "password";
                        document.getElementById("password").setAttribute("type", type);
                        const type1 = document.getElementById("confirmpassword").getAttribute("type") === "password" ? "text" : "password";
                        document.getElementById("confirmpassword").setAttribute("type", type);

                    }}>{ isShow ? <BiHide /> : <BiShow />}</span>
                    </div>
                    {showConfirmPassword && <p className='spanErrors'>{errMsgCP}</p>}
                </div>
                <div className="row mb-3">
                    <button onClick={handleSubmit} disabled={disableSubmit} className="btn btn-danger btnSubmit" type='submit'>Register</button>
                    <Link to="/login" className="reglogLink">Already registered? Login here.</Link>
                </div>
            </form>

            {/* Confirmation Code Modal */}
            <div className="modal fade" id="confirmationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="confirmationModalLabel">Confirm your account</h1>
                    <button type="button" className="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form id="frmCC" 
                        onSubmit={handleCC}>
                        <div className="mb-3">
                            <h5>A 6-Digit Confirmation Code was sent to your email.</h5>
                        </div>
                        <div className="mb-3">
                            <input id="inpCC" className="form-control" type="number" name="confirmation_code"></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Confirm</button>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        
    );
};

export default Register;
