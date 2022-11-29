import { React, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../admin/adminStyle/voters.css';
import http from "../../utils/http";

const Voters = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [mobile, setmobile] = useState("");
    const [userList, setuserList] = useState([]);

    const [updatedUserData, setupdatedUserData] = useState({});

    function clearForm() {
        setname("");
        setemail("");
        setmobile("");
    }

    const saveData = async(e) => {
        e.preventDefault();
        try {
            const {data} = await http.post("/election/testAdd", {
                name, email, mobile
            });
            alert(data);
            clearForm();
            loadUserData();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error);
            }
        }
    }

    const loadUserData = async() => {
        try {
            const {data} = await http.get("/election/testView");
            setuserList(data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error);
            }
        }
    }

    const deleteUser = (id) => {
        http.delete(`/election/testDelete/${id}`)
            .then((res) => console.log(res))
            .then(loadUserData())
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    console.log(error);
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
        http.put(`/election/testEdit/${updatedUserData._id}`, updatedUserData)
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
    }, [])

  return (
    <div className='voters'>
        <Sidebar />
        <div className='voters-main-container'>
            <div className='votersForm'>
                <h2>Add a Voter</h2>
                <form>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>Name</label>
                        <input type='text' name='name' className='form-control' value={name} onChange={(e) => setname(e.target.value)} placeholder='Name'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='text' name='email' className='form-control' value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='mobile' className='form-label'>Mobile</label>
                        <input type='text' name='mobile' className='form-control' value={mobile} onChange={(e) => setmobile(e.target.value)} placeholder='Mobile'></input>
                    </div>
                    <div className='mb-3'>
                        <button type='button' onClick={saveData} className='btn btn-warning btnAdd'>ADD</button>
                    </div>
                </form>
            </div>
            
            <div className='tblVoters'>
                <h2>Voters List</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th colSpan="2" className='colActions'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {userList.map((val, key) => {
                            return (
                            <tr key={key}>
                                <td>{val._id}</td>
                                <td>{val.name}</td>
                                <td>{val.email}</td>
                                <td>{val.mobile}</td>
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
            </div>

        </div>

        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title fs-5" id="editModalLabel">Edit User Data</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className='mb-3'>
                            <label htmlFor='name' className='form-label'>Name</label>
                            <input type='text' name='name' className='form-control' value={updatedUserData.name ? updatedUserData.name : ""} onChange={updateChange} placeholder='Name'></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input type='text' name='email' className='form-control' value={updatedUserData.email ? updatedUserData.email : ""} onChange={updateChange} placeholder='Email'></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='mobile' className='form-label'>Mobile</label>
                            <input type='text' name='mobile' className='form-control' value={updatedUserData.mobile ? updatedUserData.mobile : ""} onChange={updateChange} placeholder='Mobile'></input>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button id='btnCloseModal' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => saveUpdatedUser()}>Save changes</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Voters