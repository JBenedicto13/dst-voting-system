import {React, useState, useEffect} from 'react';
import '../../styles/vote.css';
import candidate1 from '../../assets/candidate1.png';
import candidate2 from '../../assets/candidate2.png';
import dstsc_logo from '../../assets/logos/dstsc-logo.png';

import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import http from '../../utils/http';
import Swal from 'sweetalert2';

const Vote = ({user}) => {

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
  
  const {address} = useParams();
  const [walletAddress, setwalletAddress] = useState("");

  var email = "";
  var orgName = "";

  const [emailState, setemailState] = useState("");
  const [orgNameState, setOrgNameState] = useState("");

  const [isVoted, setisVoted] = useState(false);
  const [electionData, setelectionData] = useState({});
  const [selectedValue, setSelectedValue] = useState([]);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signerContract, setSignerContract] = useState(null);
  const [providerContract, setProviderContract] = useState(null);

  const [candidateList, setCandidateList] = useState([]);
  const [positionList, setpositionList] = useState([]);

  const fetchABI = async () => {

    await http.post("/election/view", {address})
        .then((res) => {
          setelectionData(res.data)
          orgName = res.data.organization;
          setpositionList(res.data.positions)
          updateEthers(res.data.abi)
        })
        .catch((err) => {
          console.log(err);
        })
  }

  const checkIsVoted = async (acc) => {
    setemailState(email)
    setOrgNameState(orgName)
    await http.post("/organizations/members/isVoted", {orgName, "email": acc})
    .then((res) => {
      if (res.data[0].isVoted) {
        Swal.fire({
          title: "Already voted",
          text: "You voted already, please proceed to the results.",
          icon: "info",
          timer: 3000
        })
        .then(()=> window.location = "/");
      }
    })
  }

  const updateEthers = async (abi) => {
    if (typeof window.ethereum != "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerContract = new ethers.Contract(address, abi, signer);
      const providerContract = new ethers.Contract(address, abi, provider);

      setProvider(provider);
      setSigner(signer);
      setProviderContract(providerContract);
      setSignerContract(signerContract);
      loadCandidates(providerContract);
    }
  }

  const loadCandidates = async (_providerContract) => {
    var tempCandidateList = [];
    const counter = await _providerContract.candidateCount();
    for (var i = 0; i < counter; i++) {
      var result = await _providerContract.candidates(i);
      tempCandidateList[i] = result
    }

    http.post('/user/view/deployed')
    .then((res) => {
      setCandidateList(res.data)})
    .catch((err) => {
      console.log(err);
    })
    checkIsVoted(email);
  }

  const [posData, setposData] = useState([]);
  const [voteData, setvoteData] = useState([]);
  const [voteListForDisplay, setvoteListForDisplay] = useState([]);

  const confirmVotes = async () => {
    var pos = [];
    var vote = [];

    for (var i = 0; i < positionList.length; i++) {
      pos.push(positionList[i].posTitle);

    }

    for (let i = 0; i < positionList.length; i++) {
      vote.push(selectedValue[pos[i]]);
    }

    setposData(pos);
    setvoteData(vote);

      const newItems = [];
      
      for (let i = 0; i < pos.length; i++) {
        newItems.push(`${pos[i]}: ${vote[i]}`);
      }

      setvoteListForDisplay(newItems);

    pos = JSON.stringify(pos);
    vote = JSON.stringify(vote);
  }

  const handleCastVote = async (_orgName, _email) => {
    try {
      await signerContract.vote(true, voteData).then(() => {
        http.post('/organizations/members/castvote', {"orgName": _orgName, "email": _email})
        .then((res) => {
          document.getElementById('btnCloseModalCandidate').click()
          Swal.fire({
            title: "Vote Casted!",
            text: res,
            icon: "info"
          })
          .then(()=> window.location = "/");
        })
      })
    } catch(err){
      errorAlert(err.error.data.message)
    }
  }

  const handleChangeSelect = (e) => {
    const { name, value } = e.target; //not literally the name state variable
    setSelectedValue((prev) => {
        return {
            ...prev,
            [name]: value,
        };
    });
  }

  useEffect(()=>{
    fetchABI()
    setwalletAddress(user.walletAddress)
    email = (user.username + "@dhvsu.edu.ph")
  },[])
  
  return (
    <div className='vote'>
        <div className='headerVote'>
          <div className='headerContainer'>
            <div className='headerTitle'>
              <h1>Student Council Election{<br/>}A.Y 2022-2023</h1>
              <p>
                  Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
              </p>
            </div>
            <div className='headerLogo'>
              <img src={dstsc_logo} alt='logo'></img>
            </div>
          </div>
        </div>
        
        <form className='voteForm' onSubmit={(e) => {
          e.preventDefault()
        }}>
          {positionList.map((position, key) => {
            return (
              <div className='positionGroup mb-3' key={position._id}>
                <div className='titleDiv'>
                  <h1>{position.posTitle}</h1>
                </div>
                <div className='cardsGroup'>
                  <div className='candidateCard' id='candidateCard1'>
                      <div className='card'>
                          <div className='elipseBg'><img src={candidate2} alt='candidate'></img></div>
                          <div className='candidateInfo'>
                            <h2>NONE</h2>
                          </div>
                      </div>
                      <div className='btnRadio'>
                        <input 
                          className='btn-check' 
                          onChange={handleChangeSelect} 
                          type="radio"
                          value={0}
                          name={position.posTitle} 
                          id={position._id}
                        />
                        <label className="btn btn-outline-danger" htmlFor={position._id}>Select</label>
                      </div>
                  </div>
                    {
                      candidateList.filter(candidate => candidate.candidate[0].position === position.posTitle)
                      .map((candidate, key) => {
                        return (
                          <div className='candidateCard' id='candidateCard1' key={candidate._id}>
                            <div className='card'>
                                <div className='elipseBg'><img src={candidate2} alt='candidate'></img></div>
                                <div className='candidateInfo'>
                                  <h2>{candidate.lastName},{<br></br>}{candidate.firstName}</h2>
                                </div>
                            </div>
                            <div className='btnRadio'>
                              <input 
                                className='btn-check' 
                                onChange={handleChangeSelect} 
                                type="radio"
                                value={candidate.candidate[0].id}
                                name={position.posTitle} 
                                id={candidate._id}
                              />
                              <label className="btn btn-outline-danger" htmlFor={candidate._id}>Select</label>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
              </div>
        )})}
          <button onClick={confirmVotes} className="btn btn-warning btnCastSubmit" type="submit" data-bs-toggle="modal" data-bs-target="#confirmationModal">Cast Vote</button>
        </form>

    {/* Modal for confirmation of votes */}
    <div className="modal fade" id="confirmationModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="sconfirmationModalLabel">Confirm your votes</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
              <div>
              {voteData.map((vote, index) => {
                return (
                  <div key={index}>
                    {candidateList
                    .filter((chosen) => chosen.candidate[0].id == vote)
                    .map((candidate, key) => {
                      return (
                        <p key={candidate._id}><b>{candidate.candidate[0].position}:</b> {candidate.lastName}, {candidate.firstName}</p>
                      )
                    })}
                  </div>
                )
              })}
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" id='btnCloseModalCandidate' data-bs-dismiss="modal">CLOSE</button>
            <button onClick={()=>handleCastVote(orgNameState, emailState)} type="button" className="btn btn-primary">CONFIRM</button>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Vote