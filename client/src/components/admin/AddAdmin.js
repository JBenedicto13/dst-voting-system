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
            const {data} = await http.post("/user", {
                lastName,
                firstName,
                email,
                walletAddress,
                password,
            });
            localStorage.setItem("admin-token", data);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error);
            }
        }
    };
  return (
    <div className='addadmin'>
        <form className='frmAddAdmin'>
            <div className='mb-3' onChange={(e) => setFirstName(e.target.value)}>
                <label htmlFor='lastName' className='form-label'>Last Name</label>
                <input type='text' className='form-control' name='lastName' id='lastName'/>
            </div>
            <div className='mb-3' onChange={(e) => setLastName(e.target.value)}>
                <label htmlFor='firstName' className='form-label'>First Name</label>
                <input type='text' className='form-control' name='firstName' id='firstName'/>
            </div>
            <div className='mb-3' onChange={(e) => setEmail(e.target.value)}>
                <label htmlFor='email' className='form-label'>Email</label>
                <input type='email' className='form-control' name='email' id='email'/>
            </div>
            <div className='mb-3' onChange={(e) => setWalletAddress(e.target.value)}>
                <label htmlFor='walletAddress' className='form-label'>Wallet Address</label>
                <input type='text' className='form-control' name='walletAddress' id='walletAddress'/>
            </div>
            <div className='mb-3' onChange={(e) => setPassword(e.target.value)}>
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='text' className='form-control' name='password' id='password'/>
            </div>
            <button className='btn btn-danger btnAddAccount' onClick={handleSubmit}>Add Account</button>
        </form>
    </div>
  )
}

export default AddAdmin