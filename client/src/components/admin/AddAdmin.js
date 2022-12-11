import React, { useState } from 'react';
import '../../styles/admin/addadmin.css';
import http from "../../utils/http";

const AddAdmin = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await http.post("/admin", {
                lastName,
                firstName,
                email,
                walletAddress,
                password,
            }).then((data) => {
                localStorage.setItem("admin-token", data);
                document.getElementById('btnCancel').click();
                alert("Account added successfully");
                clearForm();
            })
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error);
            }
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
    }

    function clearForm() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setWalletAddress("");
        setPassword("");
    }

  return (
    <div className='addadmin'>
        <form className='frmAddAdmin'>
            <div className='mb-3'>
                <label htmlFor='lastName' className='form-label'>Last Name</label>
                <input type='text' className='form-control' name='lastName' id='lastName' onChange={(e) => setLastName(e.target.value)} value={lastName}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='firstName' className='form-label'>First Name</label>
                <input type='text' className='form-control' name='firstName' id='firstName' onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input type='email' className='form-control' name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='walletAddress' className='form-label'>Wallet Address</label>
                <input type='text' className='form-control' name='walletAddress' id='walletAddress' onChange={(e) => setWalletAddress(e.target.value)} value={walletAddress}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='text' className='form-control' name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <button className='btn btn-danger btnAddAccount' onClick={handleClick} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Account</button>
        </form>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Account Confirmation</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>Are you sure you want to add this new admin account?</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" id="btnCancel" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Confirm</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddAdmin