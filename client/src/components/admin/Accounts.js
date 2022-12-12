import { React, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../admin/adminStyle/voters.css';
import http from "../../utils/http";
import Swal from 'sweetalert2';

const Accounts = () => {

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
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");

    const courseOptions = ["BSBA", "BSHM", "BSED", "BSIT"];
    const yearLevelOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
    const sectionOptions = ["A", "B", "C", "D"];
    const [adminlist, setadminlist] = useState([]);

    //Show Errors
    const [showLastName, setShowLastName] = useState(false);
    const [showFirstName, setShowFirstName] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showWalletAddress, setShowWalletAddress] = useState(false);

    const [errMsgLN, setErrMsgLN] = useState("");
    const [errMsgFN, setErrMsgFN] = useState("");
    const [errMsgE, setErrMsgE] = useState("");
    const [errMsgW, setErrMsgW] = useState("");

    const [disableSubmit, setDisableSubmit] = useState(true);

    const [updatedAdminData, setupdatedAdminData] = useState({});

    const getUsernamePassword = () => {
        let text = email;
        let i = text.indexOf("@");
        username = text.substr(0, i);
        password = username;
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

    const emailValidation = async () => {
        if (email === "") {
            setErrMsgE("Please enter your email");
            setShowEmail(true);
        } else {
            var emailValidity = emailValidator.isEmail(email);
            if (emailValidity) {
                
                try {
                    await http.post("/admin/email", {
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
                setErrMsgE("Please enter a valid Email Address");
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
                    await http.post("/admin/wallet", {
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
        setEmail("");
        setWalletAddress("");
        username = "";
        password = "";
    }

    const saveData = async(e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure you want to add this new admin?',
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
                    
                    http.post("/admin/register", {
                        lastName,
                        firstName,
                        email,
                        username,
                        walletAddress,
                        password : password,
                        role: "Admin"
                    })
                    .then(() => {
                        Swal.fire({
                            title: 'Succes!',
                            icon: 'success',
                            iconColor: 'var(--maroon)',
                            background: 'var(--white)',
                            confirmButtonColor: "var(--maroon)",
                            confirmButtonText: "OK"
                        })
                        document.getElementById('btnCloseModal').click();
                        loadAdminData();
                    })
                    .catch((err) => errorAlert(err))
                }
            }
        }) 
    }

    const loadAdminData = async() => {
        try {
            const {data} = await http.get("/admin/view");
            setadminlist(data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error);
            }
        }
    }

    const deleteUser = (id) => {

        Swal.fire({
            title: 'Are you sure you want to delete this admin?',
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
                http.delete(`/admin/delete/${id}`)
                .then((res) => successAlert(res))
                .then(() => loadAdminData())
                .catch((err) => errorAlert(err))
                
            }
        })
    }

    const updateUser = (val) => {
        setupdatedAdminData(val);
    }

    const updateChange = (e) => {
        const { name, value } = e.target; //not literally the name state variable
        setupdatedAdminData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    const saveUpdatedAdmin = () => {
        http.put(`/admin/edit/${updatedAdminData._id}`, updatedAdminData)
            .then((res) => {
                successAlert(res).then(() => {
                    document.getElementById('btnCloseModal').click();
                    loadAdminData();
                })
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    console.log(error);
                }
            })
    }

    useEffect(() => {
        loadAdminData()
        
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
                <h2>Accounts List</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Email</th>
                        <th>Wallet Address</th>
                        <th>Role</th>
                        <th colSpan="2" className='colActions'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {adminlist
                        .filter(admin => admin.role === "Admin")
                        .map((val, key) => {
                            return (
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{val.lastName}</td>
                                <td>{val.firstName}</td>
                                <td>{val.email}</td>
                                <td>{val.walletAddress}</td>
                                <td>{val.role}</td>
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
                    <button type='button' className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#addModal">ADD ADMIN</button>
                </div>
            </div>
        </div>

        {/* ADD MODAL */}

        <div className="modal fade" id="addModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title fs-5" id="addModalLabel">ADD NEW ADMIN</h2>
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
                    <button type="button"className="btn btn-warning btnAdd" onClick={saveData} disabled={disableSubmit}>ADD ADMIN</button>
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
                                    value={updatedAdminData.lastName ? updatedAdminData.lastName : ""}
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
                                    value={updatedAdminData.firstName ? updatedAdminData.firstName : ""}
                                />
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
                                value={updatedAdminData.email ? updatedAdminData.email : ""}
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
                                value={updatedAdminData.walletAddress ? updatedAdminData.walletAddress : ""}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button id='btnCloseModal' type="button" className="btn btn-danger" data-bs-dismiss="modal">CLOSE</button>
                    <button type="button"className="btn btn-warning btnAdd" onClick={() => saveUpdatedAdmin()}>SAVE</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Accounts