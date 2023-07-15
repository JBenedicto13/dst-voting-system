import {React, useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import './adminStyle/elections.css';
import { ethers } from 'ethers';
import http from "../../utils/http";
import Swal from 'sweetalert2';

const Elections = () => {

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

  const [cocState, setcocState] = useState(null);
  const [orgList, setorgList] = useState([]);
  const [contractOrg, setcontractOrg] = useState("");
  const [contractTitle, setContractTitle] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [contractABI, setContractABI] = useState("");
  let voted = 0;
  const [voters, setVoters] = useState(300);

  const [electionList, setElectionList] = useState([]);
  const [electionListCount, setElectionListCount] = useState(0);

  const [dataDisplay, setDataDisplay] = useState([]);

  const [signer, setSigner] = useState(null);

  const [btnStart, setbtnStart] = useState("");
  const [isStart, setIsStart] = useState(null);
  const [selectedId, setselectedId] = useState("");

//   function GetCurrentDate() {
//     let newDate = new Date()
//     let h = newDate.getHours();
//     let m = newDate.getMinutes();
//     let s = newDate.getSeconds();
//     let date = newDate.getDate();
//     let month = newDate.getMonth() + 1;
//     let year = newDate.getFullYear();

//     return(`${month}/${date}/${year}-${h}:${m}:${s}`);
// }

  const handleAdd = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure you want to add this election event?',
      icon: 'question',
      iconColor: 'var(--maroon)',
      showCancelButton: true,
      confirmButtonColor: 'var(--maroon)',
      cancelButtonColor: 'var(--gold)',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      background: 'var(--white)'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await http.post("/election/addEvent", {
          title: contractTitle,
          address: contractAddress,
          abi: contractABI,
          organization: contractOrg,
          positions: [],
          partylists: [],
          voted: voted,
          voters: voters,
          isStart: false
        }).then((res) => {
          successAlert(res)
          clearForm()
          loadElectionData()
          populateTempDataDisplay()
        }).catch((err) => errorAlert(err))
      }
    })
  }

  function clearForm() {
    setcontractOrg("");
    setContractTitle("");
    setContractAddress("");
    setContractABI("");
  }

  async function loadElectionData() {
    http.get("/election/load")
    .then((res) => {
      setElectionList(res.data);
      setElectionListCount(res.data.length);
    })
    .catch((err) => {
      console.log(err);
    })

    http.get("/user/view")
      .then((res) => {
        setVoters(res.data.length)
      })
      .catch((err) => console.log(err))
    
    http.get("/organizations/load")
     .then((res) => setorgList(res.data))
     .catch((err) => console.log(err))
  }

  async function updateTotalVoters() {

    http.get("/user/view")
      .then((res) => {
        setVoters(res.data.length)
        console.log(res.data.length)
      })
      .catch((err) => console.log(err))
  }

  var tempDataDisplay = [];

  function populateTempDataDisplay() {
    for (var i = 0; i < electionListCount; i++) {
      tempDataDisplay[i] = ({
        id: electionList[i]._id,
        title: electionList[i].title,
        address: electionList[i].address,
        abi: electionList[i].abi,
        voted,
        voters,
        isStart: electionList[i].isStart
      });
    }
    setDataDisplay(tempDataDisplay);
  }

  function updateEthers() {
    if (typeof window.ethereum != "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // var counter = electionListCount;
      // for (var i = 0; i < counter; i++) {
      //   const sContract = new ethers.Contract(tempDataDisplay[i].address, tempDataDisplay[i].abi, signer);
      //   const pContract = new ethers.Contract(tempDataDisplay[i].address, tempDataDisplay[i].abi, provider);

      //   setSignerContract((previousState) => [...previousState, sContract]);
      //   setProviderContract((previousState) => [...previousState, pContract]);
      // }
      setSigner(signer);
    }
  }

  async function updateStart(val) {
    setDataDisplay(val);
    var _id = selectedId;

    if (typeof window.ethereum != "undefined") {
      const sContract = new ethers.Contract(dataDisplay[_id].address, dataDisplay[_id].abi, signer);
      await sContract.startElection()
        .then((res) => {
          successAlert(res)
          startElection(_id)
          document.getElementById('btnCloseModal').click();
        })
        .catch((err) => console.log(err));
    }
  }

  function startElection(_id) {
    http.put(`/election/startElection/${dataDisplay[_id].id}`, {isStart: !(dataDisplay[_id].isStart)})
      .then((res) => {
        console.log(res)
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
            console.log(error);
        }
    })
  }

const [posTitle, setposTitle] = useState("");
const [posTitleErr, setposTitleErr] = useState("");
const [numberErr, setnumberErr] = useState("");
const [positions, setpositions] = useState([]);
let address = '';
const [numberinPos, setnumberinPos] = useState(0);
const [partylistTitle, setpartylistTitle] = useState("");
const [partylistTitleErr, setpartylistTitleErr] = useState("");
const [partylists, setpartylists] = useState([]);

async function loadPositionData(address) {
  http.post("/election/loadPositions", {address})
  .then((res) => {
    setpositions(res.data.positions);
  })
  .catch((err) => {
    console.log(err);
  })
}

const handleAddPosition = async (e) => {
  e.preventDefault();
    if (posTitle === "") {
      setposTitleErr("Please add a title");
    }
    if (numberinPos <= 0) {
      setnumberErr("Please select how many in this position");
    }
    else {
      setnumberErr("");
      setposTitleErr("");

      Swal.fire({
        title: 'Are you sure you want to add this position?',
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
          http.post("/election/addPosition", {
            address,
            posTitle,
            number: numberinPos
          })
          .then((res) => {
            successAlert(res)
            setposTitle("")
            loadPositionData(address)
          })
          .catch((err) => errorAlert(err))
        }
      })
    }
  }

  const handleDeletePosition = async (val) => {
    Swal.fire({
        title: 'Are you sure you want to delete this position?',
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
        http.post(("/election/deletePosition"), {
          address,
          posTitle: val.posTitle,
          number: val.number
        })
        .then((res) => {
          successAlert(res)
          loadPositionData(address)
        })
        .catch((err) => errorAlert(err))
      }
    })
  }

  //Partylist

  async function loadPartylistData(address) {
    http.post("/election/loadPartylists", {address})
    .then((res) => {
      setpartylists(res.data.partylists);
    })
    .catch((err) => {
      console.log(err);
    })

  }

  const handleAddPartylist = async (e) => {
    e.preventDefault();
      if (partylistTitle === "") {
        setpartylistTitleErr("Please add a title");
      }
      else {
        setpartylistTitleErr("");
  
        Swal.fire({
          title: 'Are you sure you want to add this partylist?',
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
            http.post("/election/addPartylist", {
              address,
              partylistTitle,
            })
            .then((res) => {
              successAlert(res)
              setpartylistTitle("")
              loadPartylistData(address)
            })
            .catch((err) => errorAlert(err))
          }
        })
      }
    }

    const handleDeletePartylist = async (val) => {
      Swal.fire({
          title: 'Are you sure you want to delete this partylist?',
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
          http.post(("/election/deletePartylist"), {
            address,
            partylistTitle: val.partylistTitle,
          })
          .then((res) => {
            successAlert(res)
            loadPartylistData(address)
          })
          .catch((err) => errorAlert(err))
        }
      })
    }

  // const getVoteCount = async () => {
  //   updateTotalVoters();
    // console.log(providerContract[0]);
    // await providerContract[0].showWinning("Governor")
    //   .then((res) => console.log(parseInt(res.winningVoteCount, 16)))
  // }

  const changestatus = async () => {
    await http.post('/pagestates/changeStatus', {
      name: "Filing of COC", 
      status: cocState
    })
      .then((res) => {successAlert(res); window.location.reload()})
      .catch((err) => errorAlert(err))
  }

  function getPageStatus() {
    http.post('/pagestates/find', {name: "Filing of COC"})
        .then((res) => setcocState(res.data.status))
        .catch((err) => errorAlert(err))
  }

  useEffect(() => {
    loadElectionData()
    populateTempDataDisplay()
    updateEthers()
    getPageStatus()
  }, [electionListCount])

  return (
    <div className='elections'>
        <Sidebar />
        <div className='elections-main-container'>
          <div className='elections-container-top'>
            <h2>Election Events</h2>
            <div className='tables'>

              <div className='tableDiv'>
                <table className='dataCard'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Vote Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {electionList.map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val.title}</td>
                          {orgList
                          .filter((org) => org.orgName === val.organization)
                          .map((orgItem, key) => {
                            return (
                              <td key={key}>{val.voted}/{orgItem.members.length}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <h3 className='tableLabel'>Awaiting</h3>
              </div>

              <div className='tableDiv'>
                <table className='dataCard'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Vote Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {electionList.map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val.title}</td>
                          {orgList
                          .filter((org) => org.orgName === val.organization)
                          .map((orgItem, key) => {
                            return (
                              <td key={key}>{val.voted}/{orgItem.members.length}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <h3 className='tableLabel'>In Progress</h3>
              </div>

              <div className='tableDiv'>
                <table className='dataCard'>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Vote Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {electionList.map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{val.title}</td>
                          {orgList
                          .filter((org) => org.orgName === val.organization)
                          .map((orgItem, key) => {
                            return (
                              <td key={key}>{val.voted}/{orgItem.members.length}</td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <h3 className='tableLabel'>Completed</h3>
              </div>

            </div>
          </div>

          <div className='elections-container'>
            <h2>Elections</h2>
            <div className='elections-tables'>
                <table className='dataCard'>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>Voted</th>
                      <th>Voters</th>
                      <th>Start/Stop</th>
                      <th colSpan='2'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {electionList.map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{key+1}</td>
                          <td>{val.title}</td>
                          <td>{val.voted}</td>
                          {orgList
                          .filter((org) => org.orgName === val.organization)
                          .map((orgItem, key) => {
                            return (
                              <td key={key}>{orgItem.members.length}</td>
                            )
                          })}
                          
                          <td><button
                            onClick={(e)=>{
                              setbtnStart(e.target.innerText)
                              setIsStart(val.isStart)
                              setselectedId(key)
                            }} 
                            className='btn btn-warning'
                            data-bs-toggle="modal" 
                            data-bs-target="#startstopModal"
                            >{val.isStart ? "STOP" : "START"}</button>
                          </td>
                          <td><button
                            onClick={()=>{
                              changestatus()
                            }}
                            className='btn btn-warning'>{!cocState ? "Open filing of COC": "Close filing of COC"}</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
            </div>
          </div>

          <div className='elections-container-bottom'>
            <h2>Add Election Event</h2>
            <div className='addElectionEvent'>
                <form className='frmAddElectionEvent'>
                  <div className='row'>
                    <div className="mb-3">
                        <label htmlFor='org'>Organization</label>
                        <select value={contractOrg} onChange={(e) => setcontractOrg(e.target.value)} className="form-select" name="org" aria-label="Default select example">
                            <option defaultValue="" value="">Select Organization</option>
                            {orgList.map((val, key) =><option key={key}>{val.orgName}</option>)}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="inpTitle">Title</label>
                        <input
                          onChange={(e) => setContractTitle(e.target.value)}
                          value={contractTitle}
                          placeholder='Student Council Election'
                          className='form-control' type='drop-down' name='inpTitle' id='inpTitle' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="inpSCA">Smart Contract Address</label>
                        <input 
                          onChange={(e) => setContractAddress(e.target.value)}
                          value={contractAddress}
                          placeholder='0xAB12 . . . CD34'
                          className='form-control' type='text' name='inpSCA' id='inpSCA' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor="inpABI">ABI</label>
                        <input 
                          onChange={(e) => setContractABI(e.target.value)}
                          value={contractABI}
                          placeholder='[{...},{...}]'
                          className='form-control' type='text' name='inpABI' id='inpABI' />
                    </div>
                    <div className='mb-3'>
                      <a href='https://thirdweb.com/0x7C562AF4d61Eaa06F3CFB37435c4Bc18b7641a7e/Election' target='_blank' rel='noreferrer'>Deploy Smart Contract and get Contract Address and ABI here.</a>
                    </div>
                  </div>
                  <div className='row btnRow'>
                    <button onClick={handleAdd} className='btn btn-warning btnAdd'>Add</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="startstopModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="startstopLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="startstopLabel">{btnStart} ELECTION</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to {btnStart} this election?
              </div>
              <div className="modal-footer">
                <button
                  id='btnCloseModal'
                  type="button"
                  className="btn btn-danger" 
                  data-bs-dismiss="modal"
                  onClick={()=>{
                    setbtnStart("")
                    setIsStart("")
                    setselectedId("")
                  }}
                >NO</button>
                <button type="button" className="btn btn-warning"  onClick={()=>updateStart(isStart)}>YES</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Positions Modal */}
        <div className="modal fade" id="editPositionsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editPositionsModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="editPositionsModalLabel">EDIT POSITIONS</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body edit-position-body">
                <div className='divAddPosition'>
                  <h3>Add New Position</h3>
                  <form className='frmAddPositions'>
                    <div className='mb-3'>
                      <div className='mb-3'>
                        <label className='form-label'>Position Title</label>
                        <input value={posTitle} onChange={(e)=>setposTitle(e.target.value)} className='form-control' type='text' placeholder='Governor'></input>
                        <span className='errortext'>{posTitleErr ? posTitleErr : ""}</span>
                      </div>
                      <div className='mb-3 row'>
                        <label className='form-label'>How many ?</label>
                          <div className='mb-3 col'>
                            <input className='form-check-input' onChange={(e) => setnumberinPos(e.target.value)} type="radio" value="1" name="numberRadio" id='radio1'/>
                            <label className="form-check-label" htmlFor="radio1">
                              1
                            </label>
                          </div>
                          <div className='mb-3 col'>
                            <input className='form-check-input' onChange={(e) => setnumberinPos(e.target.value)} type="radio" value="2" name="numberRadio" id='radio2' />
                            <label className="form-check-label" htmlFor="radio2">
                              2
                            </label>
                          </div>
                          <span className='errortext'>{numberErr ? numberErr : ""}</span>
                      </div>
                    </div>
                    <button onClick={handleAddPosition} className='btn btn-success'>Add</button>
                  </form>
                </div>
                <div className='divPositionList'>
                  <h3>Positions</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((val, key) => {
                        return (
                          <tr key={key}>
                            <td>{val.posTitle}</td>
                            <td>{val.number}</td>
                            <td>
                              <button 
                                onClick={() => {
                                  handleDeletePosition(val)
                                }}
                                className='btn btn-danger'>Delete</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Edit Partylists Modal */}
        <div className="modal fade" id="editpartylistsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editpartylistsModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="editpartylistsModalLabel">EDIT POSITIONS</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body edit-position-body">
                <div className='divAddPosition'>
                  <h3>Add New Partylist</h3>
                  <form className='frmAddPositions'>
                    <div className='mb-3'>
                      <div className='mb-3'>
                        <label className='form-label'>Partylist Title</label>
                        <input value={partylistTitle} onChange={(e)=>setpartylistTitle(e.target.value)} className='form-control' type='text' placeholder='Partylist Name'></input>
                        <span className='errortext'>{partylistTitleErr ? partylistTitleErr : ""}</span>
                      </div>
                    </div>
                    <button onClick={handleAddPartylist} className='btn btn-success'>Add</button>
                  </form>
                </div>
                <div className='divPositionList'>
                  <h3>Partylists</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partylists.map((val, key) => {
                        return (
                          <tr key={key}>
                            <td>{val.partylistTitle}</td>
                            <td>
                              <button 
                                onClick={() => {
                                  handleDeletePartylist(val)
                                }}
                                className='btn btn-danger'>Delete</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Elections