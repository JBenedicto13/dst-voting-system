import {React, useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import './adminStyle/elections.css';
import { ethers } from 'ethers';
import http from "../../utils/http";

const Elections = () => {

  const [contractTitle, setContractTitle] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [contractABI, setContractABI] = useState("");
  const [voted, setVoted] = useState(0);
  const [voters, setVoters] = useState(300);

  const [electionList, setElectionList] = useState([]);
  const [electionListCount, setElectionListCount] = useState(0);

  const [dataDisplay, setDataDisplay] = useState([]);
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayAddress, setDisplayAddress] = useState("");
  const [displayAbi, setDisplayAbi] = useState("");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signerContract, setSignerContract] = useState([]);
  const [providerContract, setProviderContract] = useState([]);


  function GetCurrentDate() {
    let newDate = new Date()
    let h = newDate.getHours();
    let m = newDate.getMinutes();
    let s = newDate.getSeconds();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return(`${month}/${date}/${year}-${h}:${m}:${s}`);
}

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
        const {data} = await http.post("/election/addEvent", {
          title: contractTitle,
          address: contractAddress,
          abi: contractABI,
          voted: voted,
          voters: voters,
        });
        alert(data);
        clearForm();
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log(error);
        }
    }
    loadElectionData()
    populateTempDataDisplay()
  }

  function clearForm() {
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
  }

  var tempDataDisplay = [];

  function populateTempDataDisplay() {
    for (var i = 0; i < electionListCount; i++) {
      tempDataDisplay[i] = ({
        id: electionList[i]._id,
        title: electionList[i].title,
        address: electionList[i].address,
        abi: electionList[i].abi,
      });
    }
    setDataDisplay(tempDataDisplay);
  }

  function updateEthers() {
    if (typeof window.ethereum != "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      var counter = electionListCount;
      for (var i = 0; i < counter; i++) {
        const sContract = new ethers.Contract(dataDisplay[i].address, dataDisplay[i].abi, signer);
        const pContract = new ethers.Contract(dataDisplay[i].address, dataDisplay[i].abi, provider);

        setSignerContract((previousState) => [...previousState, sContract]);
        setProviderContract((previousState) => [...previousState, pContract]);
      }
      setProvider(provider);
      setSigner(signer);
    }
  }

  function updateStart(e, key) {
    var date = GetCurrentDate();
    const [ name, value ] = e.target;
    setDataDisplay((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function startElection(id) {
    http.put(`/startElection/${dataDisplay[id].id}`, dataDisplay)
      .then((res) => console.log(res))
      .catch((error) => {
        if (error.response && error.response.status === 400) {
            console.log(error);
        }
    })
  }

  useEffect(() => {
    loadElectionData()
    populateTempDataDisplay()
  }, [electionListCount])

  const [visibility, setvisibility] = useState(true);
  const [theId, settheId] = useState(null);

  return (
    <div className='elections'>
        <Sidebar />
        <div className='elections-main-container'>
          <div className='elections-container-top'>
            <h2 onClick={updateEthers}>Election Events</h2>
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
                          <td>{val.voted}/{val.voters}</td>
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
                          <td>{val.voted}/{val.voters}</td>
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
                          <td>{val.voted}/{val.voters}</td>
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
                    </tr>
                  </thead>
                  <tbody>
                    {electionList.map((val, key) => {
                      return (
                        <tr key={key}>
                          <td>{key+1}</td>
                          <td>{val.title}</td>
                          <td>{val.voted}</td>
                          <td>{val.voters}</td>
                          <td><button onClick={()=>updateStart(key)} className='btn btn-warning'>Start</button></td>
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
                  </div>
                  <div className='row btnRow'>
                    <button onClick={handleAdd} className='btn btn-warning btnAdd'>Add</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Elections