import { React, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../admin/adminStyle/voters.css';
import http from "../../utils/http";
import Swal from 'sweetalert2';
import { ethers } from 'ethers';
import ElectionSrc from '../../artifacts/contracts/Election.sol/Election.json';
import { id } from 'ethers/lib/utils';

const ElectionContract = "0xe42473F1e11418c7D9C6E302E082008D9103D813";

const Candidates = () => {
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

    const [candidateId, setcandidateId] = useState("");
    let username;
    let password;
    const [lastName, setLastName] = useState("");
    const [firstName, setfirstName] = useState("");
    const [course, setCourse] = useState("");
    const [yearLevel, setYearLevel] = useState("");
    const [section, setSection] = useState("");
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");

    const [electionNameOptions, setelectionNameOptions] = useState([]);
    const [positionOptions, setpositionOptions] = useState([]);
    const [partyListOptions, setpartyListOptions] = useState([]);

    const [electionName, setelectionName] = useState("");
    const [runningPosistion, setrunningPosistion] = useState("");
    const [partyList, setpartyList] = useState("");
    const [candidateEmail, setcandidateEmail] = useState("");
    

    const [userList, setuserList] = useState([]);
    const [candidatesList, setcandidatesList] = useState([]);
    const [deploymentData, setdeploymentData] = useState([]);

    //Show Errors
    const [showLastName, setShowLastName] = useState(false);
    const [showFirstName, setShowFirstName] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
    const [showYearLevel, setShowYearLevel] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showWalletAddress, setShowWalletAddress] = useState(false);
    const [showElectionName, setshowElectionName] = useState(false);
    const [showRunningPosition, setshowRunningPosition] = useState(false);
    const [showPartylist, setshowPartylist] = useState(false);

    const [errMsgLN, setErrMsgLN] = useState("");
    const [errMsgFN, setErrMsgFN] = useState("");
    const [errMsgC, setErrMsgC] = useState("");
    const [errMsgY, setErrMsgY] = useState("");
    const [errMsgS, setErrMsgS] = useState("");
    const [errMsgE, setErrMsgE] = useState("");
    const [errMsgW, setErrMsgW] = useState("");
    const [errMsgP, setErrMsgP] = useState("");
    const [errMsgCP, setErrMsgCP] = useState("");
    const [errMsgEN, seterrMsgEN] = useState("");
    const [errMsgRP, seterrMsgRP] = useState("");
    const [errMsgPT, seterrMsgPT] = useState("");

    const [disableSubmit, setDisableSubmit] = useState(true);

    async function loadElectionData() {
        http.get("/election/load")
        .then((res) => {
            setelectionNameOptions(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    async function loadPositionData(id) {
        try {
            setpositionOptions(electionNameOptions[id-1].positions);
        } catch (error){
            console.log("No Election Selected!");
        }
    }

    async function loadPartylistData(id) {
        try {
            setpartyListOptions(electionNameOptions[id-1].partylists);
        } catch (error){
            console.log("No Election Selected!");
        }
    }
    

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

    function candidateCheckBlank(isBlank) {
        isBlank = false;
        if (electionName === "") {
            seterrMsgEN("Please select an election");
            setshowElectionName(true);
            isBlank = true;
        }
        if (runningPosistion === "") {
            seterrMsgRP("Please select a position");
            setshowRunningPosition(true);
            isBlank = true;
        }
        if (partyList === "") {
            seterrMsgPT("Please select a partylist");
            setshowPartylist(true);
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

    const electionNameValidation = async () => {
        if (electionName === "") {
            seterrMsgEN("Please select an election");
            setshowElectionName(true);
        } else {
            setshowElectionName(false);
        }
    }

    const runningPositionValidation = async () => {
        if (runningPosistion === "") {
            seterrMsgRP("Please select a position");
            setshowRunningPosition(true);
        } else {
            setshowRunningPosition(false);
        }
    }

    const partyListValidation = async () => {
        if (partyList === "") {
            seterrMsgPT("Please select a partylist");
            setshowPartylist(true);
        } else {
            setshowPartylist(false);
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
        setelectionName("");
        setrunningPosistion("");
        setpartyList("");
    }

    const saveData = async(e) => {
        e.preventDefault();
        if (!checkBlank()) {
            getUsernamePassword();
            try {
                const {data} = await http.post("/user/addVoter", {
                    lastName,
                    firstName,
                    course,
                    yearLevel,
                    section,
                    email,
                    username,
                    walletAddress,
                    password,
                });
                alert(data);
                clearForm();
                loadUserData();
                document.getElementById('btnCloseModal').click();
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    console.log(error);
                }
            }
        }
        
    }

    const loadUserData = async() => {
        await http.get("/user/viewNonCandidate")
        .then((res) => setuserList(res.data))
        .catch ((err) => {
            if (err.response && err.response.status === 400) {
                errorAlert(err);
            }
        })
    }

    const loadCandidatesData = async() => {
        await http.get("/user/viewCandidate")
        .then((res) =>  setcandidatesList(res.data))
        .catch ((err) => {
            if (err.response && err.response.status === 400) {
                errorAlert(err);
            }
        })
    }

    const getDeploymentData = async(name) => {
        if (name === "") {
            name = "Nothing Selected";
        }
        await http.post("/user/forDeployment", {electionName: name})
        .then((res) =>  setdeploymentData(res.data))
        .catch ((err) => {
            if (err.response && err.response.status === 400) {
                errorAlert(err);
            }
        })
    }
    //setdeploymentData

    const removeCandidate = (id) => {
        Swal.fire({
            title: 'Are you sure you want to remove this candidate?',
            text: "You won't be able to revert this!",
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
                http.post("/user/removeCandidate", {id})
                .then((res) => successAlert(res.data))
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        errorAlert(err);
                    }
                })
                window.location.reload();
            }
        })
    }

    const handleMakeCandidate = () => {
        if (!candidateCheckBlank()) {
            Swal.fire({
                title: 'Are you sure you want to delete this candidate?',
                text: "You won't be able to revert this!",
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
                    http.post('/user/makeCandidate', {
                        id: candidateId,
                        email: candidateEmail,
                        electionName, 
                        position: runningPosistion, 
                        partyList, 
                        votes: 0
                    })
                    .then((res)=>{
                        successAlert(res)
                        clearForm()
                        document.getElementById('btnCloseModalCandidate').click()
                        window.location.reload();
                    })
                    .catch((err)=>errorAlert(err))
                }
            })
        }
    }

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [signerContract, setSignerContract] = useState(null);
    const [providerContract, setProviderContract] = useState(null);
    const [candidateCount, setcandidateCount] = useState(0);

    const updateEthers = async (_address, _abi) => {
        const _walletAddress = [];
        const _position = [];

        deploymentData.map((val, key) => {
            _walletAddress.push(val.walletAddress)
            _position.push(val.candidate[0].position)
        });

        if (typeof window.ethereum != "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // const signerContract = new ethers.Contract(ElectionContract, ElectionSrc.abi, signer);
            // const providerContract = new ethers.Contract(ElectionContract, ElectionSrc.abi, provider);
            const signerContract = new ethers.Contract(_address, _abi, signer);
            const providerContract = new ethers.Contract(_address, _abi, provider);

            const count = await signerContract.candidateCount();
            const decimal = parseInt(count, 16);
      
            setcandidateCount(decimal+1);
            setProvider(provider);
            setSigner(signer);
            setProviderContract(providerContract);
            setSignerContract(signerContract);
            addCandidatesToSC(_walletAddress, _position, signerContract);
        }
    }

    const addCandidatesToSC = async (_walletAddress, _position, _signerContract) => {
        await _signerContract.addCandidates(_walletAddress, _position)
        .then((res) => {
            successAlert(res)
        })
        .catch((err) => errorAlert(err))

        let counter = candidateCount;

        deploymentData.map(async (val, key) => {
            counter++;
            await http.post('/user/deployCandidate',{
                id: counter,
                walletAddress: val.walletAddress,
                electionName: val.candidate[0].electionName,
                position: val.candidate[0].position,
                partyList: val.candidate[0].partyList,
                votes: val.candidate[0].votes
            })
            .then((res) => {
                successAlert(res)
            })
            .catch((err) => errorAlert(err))
        })
    }

    const handleDeployCandidates = (title) => {
        var _abi, _address;
        http.post('/election/loadbytitle', {
            title: title,
        })
        .then((res) => {
            _abi = res.data[0].abi;
            _address = res.data[0].address;
        })
        .then(()=>{
            updateEthers(_address, _abi);
        })
        .catch((err) => errorAlert(err))
    }

    useEffect(() => {
        loadUserData()
        loadCandidatesData()
        loadElectionData()
        
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
                        <th>Username</th>
                        <th>Email</th>
                        <th>Wallet Address</th>
                        <th className='colActions'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {userList.map((val, key) => {
                            return (
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{val.lastName}</td>
                                <td>{val.firstName}</td>
                                <td>{val.username}</td>
                                <td>{val.email}</td>
                                <td>{val.walletAddress}</td>
                                <td className='tdActions'>
                                    <button onClick={()=>{
                                        setcandidateEmail(val.email)
                                        setcandidateId(key+1)
                                        }} 
                                        className='btn btn-danger btnDelete' 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#makeCandidateModal">MAKE CANDIDATE</button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='tblVoters'>
                <h2>CANDIDATES READY FOR DEPLOYMENT</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Username</th>
                        <th>Wallet Address</th>
                        <th>Election Name</th>
                        <th>Position</th>
                        <th>Party List</th>
                        <th className='colActions'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {candidatesList.filter(currentCandidate => currentCandidate.candidate[0].isDeployed === false)
                        .map((val, key) => {
                            return (
                            <tr key={key}>
                                <td>{val.id}</td>
                                <td>{val.lastName}</td>
                                <td>{val.firstName}</td>
                                <td>{val.username}</td>
                                <td>{val.walletAddress}</td>
                                <td>{val.candidate[0].electionName}</td>
                                <td>{val.candidate[0].position}</td>
                                <td>{val.candidate[0].partyList}</td>
                                <td className='tdActions'><button onClick={() => removeCandidate(val._id)} className='btn btn-danger btnDelete'>REMOVE</button></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='tfootVoterList'>
                    <button type='button' className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#deployModal">DEPLOY</button>
                </div>
            </div>
            <div className='tblVoters'>
                <h2>DEPLOYED CANDIDATES</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Username</th>
                        <th>Wallet Address</th>
                        <th>Election Name</th>
                        <th>Position</th>
                        <th>Party List</th>
                        <th>Votes</th>
                    </tr>
                    </thead>
                    <tbody>
                        {candidatesList.filter(currentCandidate => currentCandidate.candidate[0].isDeployed === true)
                        .map((val, key) => {
                            return (
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{val.lastName}</td>
                                <td>{val.firstName}</td>
                                <td>{val.username}</td>
                                <td>{val.walletAddress}</td>
                                <td>{val.candidate[0].electionName}</td>
                                <td>{val.candidate[0].position}</td>
                                <td>{val.candidate[0].partyList}</td>
                                <td>{val.candidate[0].votes}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Make Candidate Modal */}
        <div className="modal fade" id="makeCandidateModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="makeCandidateModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title fs-5" id="makeCandidateModalLabel">FILL UP CANDIDATE DATA</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body mx-3">
                    <form>
                        <div className="col mb-3">
                            <label htmlFor='electionName'>Election Name</label>
                            <select value={electionName} 
                                onChange={(e) => {
                                    setelectionName(e.target.value)
                                    loadPositionData(e.target.selectedIndex)
                                    loadPartylistData(e.target.selectedIndex)
                                }} 
                                className="form-select" name="electionName" aria-label="Default select example" onBlur={electionNameValidation}>
                                <option defaultValue="" value="">Select Election Name</option>
                                {electionNameOptions.map((val, key) =><option key={key}>{val.title}</option>)}
                            </select>
                            {showElectionName && <p className='spanErrors'>{errMsgEN}</p>}
                        </div>
                        <div className="col mb-3">
                            <label htmlFor='runningPosition'>Position</label>
                            <select value={runningPosistion} onChange={(e) => setrunningPosistion(e.target.value)} className="form-select" name="runningPosition" aria-label="Default select example" onBlur={runningPositionValidation}>
                                <option defaultValue="" value="">Select Position</option>
                                {positionOptions.map((val, key) =><option key={key}>{val.posTitle}</option>)}
                            </select>
                            {showRunningPosition && <p className='spanErrors'>{errMsgRP}</p>}
                        </div>
                        <div className="col mb-3">
                            <label htmlFor='partyList'>Party List</label>
                            <select value={partyList} onChange={(e) => setpartyList(e.target.value)} className="form-select" name="partyList" aria-label="Default select example" onBlur={partyListValidation}>
                                <option defaultValue="" value="">Select Party List</option>
                                {partyListOptions.map((val, key) =><option key={key}>{val.partylistTitle}</option>)}
                            </select>
                            {showPartylist && <p className='spanErrors'>{errMsgPT}</p>}
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button id='btnCloseModalCandidate' type="button" className="btn btn-danger" data-bs-dismiss="modal">CLOSE</button>
                    <button type="button"className="btn btn-warning btnAdd" onClick={() => handleMakeCandidate()}>SAVE</button>
                </div>
                </div>
            </div>
        </div>

        {/* Select Election Candidates to Deploy */}
        <div className="modal fade" id="deployModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deployModalModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title fs-5" id="deployModalModalLabel">DEPLOY CANDIDATES</h2>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body mx-3">
                    <form>
                        <div className="col mb-3">
                            <label htmlFor='electionName'>Election Name</label>
                            <select value={electionName} 
                                onChange={(e) => {
                                    setelectionName(e.target.value)
                                    getDeploymentData(e.target.value)
                                }} 
                                className="form-select" name="electionName" aria-label="Default select example" onBlur={electionNameValidation}>
                                <option defaultValue="" value="">Select Election Name</option>
                                {electionNameOptions.map((val, key) =><option key={key}>{val.title}</option>)}
                            </select>
                            {showElectionName && <p className='spanErrors'>{errMsgEN}</p>}
                        </div>
                        <div className='col mb-3'>
                            <table>
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Position</th>
                                    <th>Party List</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {deploymentData.map((val, key) => {
                                        return (
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{val.username}</td>
                                            <td>{val.candidate[0].position}</td>
                                            <td>{val.candidate[0].partyList}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button id='btnCloseModalCandidate' type="button" className="btn btn-danger" data-bs-dismiss="modal">CLOSE</button>
                    <button type="button"className="btn btn-warning btnAdd" onClick={() => handleDeployCandidates(electionName)}>DEPLOY</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Candidates