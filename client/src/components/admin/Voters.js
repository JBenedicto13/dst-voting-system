import { React, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../admin/adminStyle/voters.css';
import http from "../../utils/http";
import Swal from 'sweetalert2';

const Voters = () => {

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

    let username;
    let password;
    const [lastName, setLastName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [course, setCourse] = useState("");
    const [yearLevel, setYearLevel] = useState("");
    const [section, setSection] = useState("");
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");

    const courseOptions = ["BSBA", "BSHM", "BSED", "BSIT"];
    const yearLevelOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
    const sectionOptions = ["A", "B", "C", "D"];

    const [name, setname] = useState("");
    const [mobile, setmobile] = useState("");
    const [userList, setuserList] = useState([]);

    //Show Errors
    const [showLastName, setShowLastName] = useState(false);
    const [showFirstName, setShowFirstName] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
    const [showYearLevel, setShowYearLevel] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showWalletAddress, setShowWalletAddress] = useState(false);

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

    const [updatedUserData, setupdatedUserData] = useState({});

    const getUsernamePassword = () => {
        let text = email;
        let i = text.indexOf("@");
        username = text.substr(0, i);
        password = username;
        console.log(password);
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
        return isBlank;
    }

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

    function validateForm() {
        if (showEmail) {
            return true;
        }
        if (showWalletAddress) {
            return true;
        }
        return false;
    }

/* Validations */

    function clearForm() {
        setLastName("");
        setfirstName("");
        setCourse("");
        setYearLevel("");
        setSection("");
        setEmail("");
        setWalletAddress("");
        username = "";
        password = "";
    }

    const saveData = async(e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure you want to add this voter?',
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
                    getUsernamePassword();
                    var candidate = {
                        "electionName": "",
                        "position": "",
                        "partyList": "",
                        "votes": 0,
                        "isDeployed": false
                    };
        
                    http.post("/user/addVoter", {
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
                        password : password,
                    }).then((res) => {
                        successAlert(res)
                        clearForm()
                        loadUserData()
                        document.getElementById('btnCloseModal').click();
                    }).catch((err) => errorAlert(err))
                    
                }
            }
        })

        
    }

    const loadUserData = async() => {
        try {
            const {data} = await http.get("/user/view");
            setuserList(data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error);
            }
        }
    }

    const deleteUser = (id) => {

        Swal.fire({
            title: 'Are you sure you want to delete this voter?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonText: 'Yes',
            iconColor: 'var(--maroon)',
            showCancelButton: true,
            confirmButtonColor: 'var(--maroon)',
            cancelButtonColor: 'var(--gold)',
            cancelButtonText: 'Cancel',
            background: 'var(--white)'
        }).then((result) => {
            if (result.isConfirmed) {
                http.delete(`/user/deleteVoter/${id}`)
                .then((res) => successAlert(res))
                .then(() => loadUserData())
                .catch((err) => errorAlert(err))
                
            }
        })
    }

    const updateUser = (val) => {
        setupdatedUserData(val);
    }

    const updateChange = (e) => {
        const { name, value } = e.target; //not literally the name state variable
        setupdatedUserData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    const saveUpdatedUser = () => {
        http.put(`/user/editVoter/${updatedUserData._id}`, updatedUserData)
            .then((res) => alert(res.data))
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    console.log(error);
                }
            })
        document.getElementById('btnCloseModal').click();
        loadUserData();
    }

    useEffect(() => {
        loadUserData()
        
        if (validateForm() === false) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [])

  return (
    <div className='voters'>
        <Sidebar />
        <div className='voters-main-container'>
            <div className='tblVoters'>
                <h2>Voters List</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Course</th>
                        <th>Year Level</th>
                        <th>Section</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Wallet Address</th>
                        <th colSpan="2" className='colActions'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {userList.map((val, key) => {
                            return (
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{val.lastName}</td>
                                <td>{val.firstName}</td>
                                <td>{val.course}</td>
                                <td>{val.yearLevel}</td>
                                <td>{val.section}</td>
                                <td>{val.username}</td>
                                <td>{val.email}</td>
                                <td>{val.walletAddress}</td>
                                <td className='tdActions'><button onClick={() => deleteUser(val._id)} className='btn btn-danger btnDelete'>DELETE</button></td>
                                <td className='tdActions'>
                                    <button onClick={() => updateUser(val)} type="button" className="btn btn-warning btnEdit" data-bs-toggle="modal" data-bs-target="#editModal">
                                        EDIT
                                    </button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='tfootVoterList'>
                    <button type='button' className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#addModal">ADD VOTER</button>
                </div>
            </div>
        </div>

        {/* ADD MODAL */}

        <div className="modal fade" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title fs-5" id="addModalLabel">ADD NEW VOTER</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body mx-3">
                    <form>
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
                            {showWalletAddress && <p className='spanErrors'>{errMsgW}</p>}
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button id='btnCloseModal' type="button" className="btn btn-danger" data-bs-dismiss="modal">CLOSE</button>
                    <button type="button"className="btn btn-warning btnAdd" onClick={saveData} disabled={disableSubmit}>ADD VOTER</button>
                </div>
                </div>
            </div>
        </div>

        {/* EDIT MODAL */}

        <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title fs-5" id="editModalLabel">EDIT USER DATA</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body mx-3">
                    <form>
                        <div className="row mb-3">
                            <div className="col mb-3">
                                <label htmlFor='lastName'>Last Name</label>
                                <input
                                    className='form-control'
                                    placeholder="Dela Cruz"
                                    type='text'
                                    name='lastName'
                                    onChange={updateChange}
                                    value={updatedUserData.lastName ? updatedUserData.lastName : ""}
                                />
                            </div>
                            <div className="col mb-3">
                                <label htmlFor='firstName'>First Name</label>
                                <input
                                    className='form-control'
                                    placeholder="Juan"
                                    type='text'
                                    name='firstName'
                                    onChange={updateChange}
                                    value={updatedUserData.firstName ? updatedUserData.firstName : ""}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col mb-3">
                                <label htmlFor='course'>Course</label>
                                <select value={updatedUserData.course} onChange={updateChange} className="form-select" name="course" aria-label="Default select example">
                                    <option defaultValue="" value="">Select Course</option>
                                    {courseOptions.map((val, key) =><option key={key}>{val}</option>)}
                                </select>
                            </div>
                            <div className="col mb-3">
                                <label htmlFor='yearLevel'>Year Level</label>
                                <select value={updatedUserData.yearLevel} onChange={updateChange} className="form-select" name="yearLevel" aria-label="Default select example">
                                    <option defaultValue="" value="">Select Year Level</option>
                                    {yearLevelOptions.map((val, key) =><option key={key}>{val}</option>)}
                                </select>
                            </div>
                            <div className="col mb-3">
                                <label htmlFor='section'>Section</label>
                                <select value={updatedUserData.section} onChange={updateChange} className="form-select" name="section" aria-label="Default select example">
                                    <option defaultValue="" value="">Select Section</option>
                                    {sectionOptions.map((val, key) =><option key={key}>{val}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor='Email'>Email</label>
                            <input
                                className='form-control'
                                placeholder="12345678@dhvsu.edu.ph"
                                type='email'
                                name='email'
                                onChange={updateChange}
                                value={updatedUserData.email ? updatedUserData.email : ""}
                            />
                        </div>
                        <div className="row mb-3">
                            <label htmlFor='walletAddress'>Wallet Address</label>
                            <input
                                className='form-control'
                                placeholder="0x..."
                                type='text'
                                name='walletAddress'
                                onChange={updateChange}
                                value={updatedUserData.walletAddress ? updatedUserData.walletAddress : ""}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button id='btnCloseModal' type="button" className="btn btn-danger" data-bs-dismiss="modal">CLOSE</button>
                    <button type="button"className="btn btn-warning btnAdd" onClick={() => saveUpdatedUser()}>SAVE</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Voters