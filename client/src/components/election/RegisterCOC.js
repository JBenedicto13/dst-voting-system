import {React, useState, useEffect, useRef} from 'react';
import http from '../../utils/http';
import '../../styles/registercoc.css';
import '../../styles/dragdrop.css';
import Swal from 'sweetalert2';

const RegisterCOC = () => {
    //SweetAlert2.0

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

    const cylsList = [
        "BEED-2A","BEED-2B","BEED-3A","BEED-4A","BEED-4B",
        "BSIT-1A","BSIT-1B","BSIT-1C","BSIT-2A","BSIT-2B","BSIT-3A","BSIT-4A","BSIT-4B",
        "BSHM-1A","BSHM-1B","BSHM-1C","BSHM-1D","BSHM-2A","BSHM-2B","BSHM-2C","BSHM-2D","BSHM-3A","BSHM-3B","BSHM-4A","BSHM-4B","BSHM-4C","BSHM-4D","BSHM-4E",
        "BSBA-1A","BSBA-1B","BSBA-1C","BSBA-1D","BSBA-1E","BSBA-2A","BSBA-2B","BSBA-2C","BSBA-2D","BSBA-3A","BSBA-4A","BSBA-4B","BSBA-4C","BSBA-4D","BSBA-4E"
    ];

    const positionList = [
        "Governor", "Vice Governor", "BM on Finance"
    ];
    const politicalptList = [
        "Alpha Party", "Beta Party", "Charlie Party"
    ];

    const [cocState, setcocState] = useState(null);

    const [files, setfiles] = useState(null);
    const [dpfile, setdpfile] = useState(null);
    const inputRef = useRef();
    const dpRef = useRef();
    const [gendpname, setgendpname] = useState("");
    const [email, setemail] = useState("");
    const [walletAddress, setwalletAddress] = useState("");
    const [lastName, setlastName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [cyls, setcyls] = useState("");
    const [election, setelection] = useState("");
    const [position, setposition] = useState("");
    const [politicalpt, setpoliticalpt] = useState("");
    const [electionList, setElectionList] = useState([]);
    
    const loadElectionData = async () => {
        http.get("/election/load")
        .then((res) => {
          setElectionList(res.data);
        })
        .catch((err) => console.log(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Are you sure you want to submit?',
            text: "Please confirm your information",
            icon: 'question',
            iconColor: 'var(--maroon)',
            showCancelButton: true,
            confirmButtonColor: 'var(--maroon)',
            cancelButtonColor: 'var(--gold)',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            background: 'var(--white)'
        }).then((result) => {
            if (result.isConfirmed) {
                
                let walletName = walletAddress;
                let first = walletName.substring(0, 6);
                let last = walletName.substring(walletName.length - 4, walletName.length);

                let dpname = dpfile[0].name
                dpname = dpname.substring(dpname.lastIndexOf('.'));

                dpname = first + last + dpname;
                dpname = dpname.toLowerCase();

                handleUpload(dpname)

                http.post('/coc/add', {
                    email: email,
                    walletAddress: walletAddress,
                    lastName: lastName,
                    firstName: firstName,
                    cyls: cyls,
                    election: election,
                    position: position,
                    politicalParty: politicalpt,
                    dp: dpname
                })
                .then(() => {
                    handleUpload(dpname)
                })
                .catch((err)=>errorAlert(err))
            }
        })
    }

    const handleUpload = (gendpname) => {

        const formData = new FormData();
        formData.append('gendpname', gendpname)
        formData.append('dpname', dpRef.current.files[0]);
        for (let i = 0; i < inputRef.current.files.length; i++) {
            formData.append('filereqs', inputRef.current.files[i]);
        }

        http.post('/coc/dpupload', formData)
        .catch((err) => console.log(err))
        
        http.post('/coc/upload', formData)
        .then((res) => {
            Swal.fire({
                title: "Success",
                text: "Your application has been submitted, please wait for the admin approval",
                confirmButtonText: "Okay",
                confirmButtonColor: 'var(--maroon)',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            })
        })
        .catch((err) => console.log(err))
    }

    function getPageStatus() {
        http.post('/pagestates/find', {name: "Filing of COC"})
            .then((res) => setcocState(res.data.status))
    }

    useEffect(() => {
        loadElectionData()
        getPageStatus()
    }, [])

  return (
    <div className='registercoc'>
        <div className='registercoc-header'>
            {cocState ? <h1>Certificate of Candidacy</h1> : <h1>Filing of coc is no longer allowed</h1>}
        </div>
        {cocState ? <div className='registercoc-body'>
            <div className="accordion accordion-flush mb-3" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Qualifications for Candidates
                    </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                        <p>A candidate for any position in the Executive Board shall possess the following qualifications: </p>
                        <ul className="list-group">
                            <li className="list-group-item">
                                Currently enrolled in at least fifteen (15) academic units in any of the colleges of the University excluding Physical Education and NSTP, certification of which shall be provided from the particular college before his/her candidacy.
                            </li>
                            <li className="list-group-item">
                                Must be enrolled in at least (15) academic units in any of the colleges of the University for at least three (3) semesters immediately preceding the elections;
                            </li>
                            <li className="list-group-item">
                                Must not have been convicted for any administrative or criminal offense in any court of law. Likewise, no student with pending administrative or criminal charges may be elected to the University Student Council, an undertaking of which shall be made prior to his/her candidacy:
                            </li>
                            <li className="list-group-item">
                                Must have a general weighted average of at least 2.5 or its equivalent, 80 for the Laboratory High School;
                            </li>
                            <li className="list-group-item">
                                Must have an academic grade at least 2.50 per subject enrolled last semester preceding the application for candidacy, 80 for the Laboratory High School;
                            </li>
                            <li className="list-group-item">
                                Must have attended a leadership training/seminar thus a certificate must be provided:
                            </li>
                            <li className="list-group-item">
                                Must have no On-Job-Training (OJT) subject preceding the applied academic terms, and
                            </li>
                            <li className="list-group-item">
                                Must have a good moral character.
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Requirements for filing of Candidacy
                    </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                        <p>The candidates shall submit the following requirements: </p>
                        <ul className="list-group">
                            <li className="list-group-item">
                                Photocopy of the Certificate of Registration Form
                            </li>
                            <li className="list-group-item">
                                Photocopy of Validated School ID for the present semester
                            </li>
                            <li className="list-group-item">
                                Photocopy of Certificate of Attendance/Participation of any Leadership Seminar attended
                            </li>
                            <li className="list-group-item">
                                Recent 2x2 Photo
                            </li>
                            <li className="list-group-item">
                                Recommendation letter from the Dean
                            </li>
                            <li className="list-group-item">
                                Resignation letter of an incumbent officer of their respective organization.
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            
            <form id='uploadForm'>
                <div className='mb-3'>
                    <div className='form-floating mb-3'>
                        <div className='col'>
                            <label className='form-label'>Display Photo</label>
                            <input 
                                type='file' 
                                onChange={(event) => setdpfile(event.target.files)} 
                                hidden
                                ref={dpRef}
                                id='dpId'
                                name='dpName'
                            />
                        </div>
                        <div className='col dpphotoandlabel'>
                            <button onClick={(event) => {
                                event.preventDefault();
                                dpRef.current.click();
                            }} className='btn btn-danger'>Select Photo</button>
                            {dpfile && <label className='form-label'>{dpfile[0].name} selected</label>}
                        </div>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setwalletAddress(e.target.value)} value={walletAddress} type="text" className="form-control" id="walletAddress" placeholder="0xaaa...ccc"/>
                        <label htmlFor="walletAddress">Wallet Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={(e) => setemail(e.target.value)} value={email} type="email" className="form-control" id="email" placeholder="1234567890@dhvsu.edu.ph"/>
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className='input-group gap-5'>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setlastName(e.target.value)} value={lastName} type="text" className="form-control" id="lastName" placeholder="Dela Cruz"/>
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setfirstName(e.target.value)} value={firstName} type="text" className="form-control" id="firstName" placeholder="Juan"/>
                            <label htmlFor="firstName">First Name</label>
                        </div>
                    </div>
                    <div className="form-input mb-3">
                        <label htmlFor="cylsId" className="form-label">Course, Year Level and Section</label>
                        <select value={cyls} 
                            onChange={(e) => {
                                setcyls(e.target.value)
                            }} 
                            className="form-select" 
                            name="cylsName"
                            id="cylsId" 
                            aria-label="Default select example"
                        >
                            <option defaultValue="" value="">Select One</option>
                            {cylsList.map((val, key) =><option key={key} value={val}>{val}</option>)}
                        </select>
                    </div>
                </div>
                <hr></hr>
                <div className='input-group gap-5 mb-3'>
                    <div className="form-input mb-3">
                        <label htmlFor="electionNameId" className="form-label">Election Name</label>
                        <select value={election} 
                            onChange={(e) => {
                                setelection(e.target.value)
                            }} 
                            className="form-select" 
                            name="electionName"
                            id="electionNameId" 
                            aria-label="Default select example"
                        >
                            <option defaultValue="" value="">Select Election</option>
                            {electionList.map((val, key) =><option key={key} value={val.address}>{val.title}</option>)}
                        </select>
                    </div>
                    <div className="form-input mb-3">
                        <label htmlFor="positionId" className="form-label">Position</label>
                        <select value={position} 
                            onChange={(e) => {
                                setposition(e.target.value)
                            }} 
                            className="form-select" 
                            name="position"
                            id="positionId" 
                            aria-label="Default select example"
                        >
                            <option defaultValue="" value="">Select Position</option>
                            {positionList.map((val, key) =><option key={key} value={val}>{val}</option>)}
                        </select>
                    </div>
                    <div className="form-input mb-3">
                        <label htmlFor="poiliticalptId" className="form-label">Political Party</label>
                        <select value={politicalpt} 
                            onChange={(e) => {
                                setpoliticalpt(e.target.value)
                            }} 
                            className="form-select" 
                            name="poiliticalpt"
                            id="poiliticalptId" 
                            aria-label="Default select example"
                        >
                            <option defaultValue="" value="">Select Political Party</option>
                            {politicalptList.map((val, key) =><option key={key} value={val}>{val}</option>)}
                        </select>
                    </div>
                </div>
                
                <div className='reqDiv'>
                    <label className='form-label'>Attach your requirements here</label>
                    <input 
                        type='file' 
                        multiple 
                        onChange={(event) => setfiles(event.target.files)} 
                        hidden
                        ref={inputRef}
                        id='filereqsId'
                        name='filereqs'
                    />
                    <button onClick={(event) => {
                        event.preventDefault();
                        inputRef.current.click();
                    }} className='btn btn-danger'>Select Files</button>
                </div>
                
                {files && 
                    <div className='uploads'>
                        <ul className='uploadedList'>
                            {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
                        </ul>
                        <div className='actions'>
                            <button className='btn btn-danger' onClick={() => setfiles(null)}>Cancel</button>
                            <button className='btn btn-success' onClick={(e) => handleSubmit(e)}>Submit</button>
                        </div>
                    </div>
                }
            </form>
        </div> : <div className='registercoc-body'></div>}
    </div>
  )
}

export default RegisterCOC