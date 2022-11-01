import {React, useState } from 'react';
import RegCanList from './RegCanList';

import { ethers } from 'ethers';
import ElectionSrc from '../../artifacts/contracts/Election.sol/Election.json';

const ElectionContract = "0x92AB3fCf0d71a43848D47628278A35701632EE3e";

const SmartContract = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signerContract, setSignerContract] = useState(null);
  const [providerContract, setProviderContract] = useState(null);

  const [winningNum, setWinningNum] = useState(null);
  const [numData, setNumData] = useState(null);
  const [votersAddr, setVotersAddr] = useState(null);

  const updateEthers = async () => {
    if (typeof window.ethereum != "undefined") {
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       const signerContract = new ethers.Contract(ElectionContract, ElectionSrc.abi, signer);
       const providerContract = new ethers.Contract(ElectionContract, ElectionSrc.abi, provider);

       setProvider(provider);
       setSigner(signer);
       setProviderContract(providerContract);
       setSignerContract(signerContract);

      console.log(providerContract.address);
    }
  }

  const getChairperson = async () => {
    const result = await providerContract.chairperson();
    console.log(result);
  }

  const giveRight = async (data) => {
    const result = await signerContract.giveRightToVote(data);
    console.log(result);
  }

  const getWinning = async (data) => {
    const result = await providerContract.showWinning(data);
    console.log(result);
  }

  const getCandidate = async (data) => {
    var result = await signerContract.candidates(data);
    console.log(result);
    console.log(result.name);
  }
  
  const getVoter = async (data) => {
    var result = await signerContract.voters(data);
    console.log(result);
    if (result.weight._hex === "0x01") {
        console.log("Has Voter Rights");
    } else {
        console.log("Don't have Voter Rights");
    }
  }

  const signMessage = async () => {
    // var result = await signer();
    var message = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

    // This array representation is 32 bytes long
    var messageBytes = ethers.utils.arrayify(message);
    // Uint8Array [ 221, 242, 82, 173, 27, 226, 200, 155, 105, 194, 176, 104, 252, 55, 141, 170, 149, 43, 167, 241, 99, 196, 161, 22, 40, 245, 90, 77, 245, 35, 179, 239 ]
    console.log(messageBytes);
    // To sign a hash, you most often want to sign the bytes
    var result = await signer.signMessage(messageBytes)
    // '0xece6996952cdb99fdac79a65ec9fd79ebca073cde8355e8049222bf5a2510264558f37c53ad975efb9d9baf357c24749fbbf182f2f93969f45ef8f5afd3d36791b'
    console.log(result);
  }

  const [posInp, setPosInp] = useState('');
  const [nameInp, setNameInp] = useState('');

  const [candidateInfo, setCandidateInfo] = useState([]);
  const [candidatePos, setCandidatePos] = useState([]);
  const [candidateName, setCandidateName] = useState([]);
  const [voteList, setVoteList] = useState([]);
  const [regCandidates, setRegCandidates] = useState([]);
  const [initialState, setInitialState] = useState([]);

  const newCandidate = async (_pos, _name) => {

    setCandidateInfo([
        ...candidateInfo, 
        {
            id: candidateInfo.length,
            position: _pos,
            name: _name
        }
    ]);
    setCandidatePos([...candidatePos, _pos]);
    setCandidateName([...candidateName, _name]);
    setPosInp('');
    setNameInp('');

    console.log(candidateInfo);
    console.log(candidatePos);
    console.log(candidateName);
  }

  const registerCandidates = async () => {
    console.log(candidatePos);
    console.log(candidateName);
    const result = await signerContract.addCandidates(candidatePos, candidateName);
    setPosInp('');
    setNameInp('');
    setCandidatePos(...initialState);
    setCandidateName(...initialState);
    console.log(result);
  }
  const castVote = async (items) => {
    const result = await signerContract.vote(items);
    console.log(result);
  }
  const viewCandidates = async () => {
    
    const counter = await providerContract.candidateCount();
    for (var i = 0; i < counter; i++) {
      var result = await signerContract.candidates(i);
      console.log(result);
      console.log(result.name);
      setRegCandidates([
        ...regCandidates,
        {
          id: i+1,
          position: result[1],
          name: result[2]
        }
      ])
    }
  }

  var sample = [{name: "Apple", color: "Red"}, {name: "Banana", color: "Yellow"}];
  
  return (
    <div className='smartContract'>
        <div className="input-group mb-3 mt-3 justify-content-center">
            <h3>Manage Smart Contract</h3>
        </div>
        <div className="input-group mb-3 mt-3 justify-content-between gap-3">
            <button onClick={() => updateEthers()} className="btn btn-secondary" type="button" id="button-addon0">Update Contract</button>
            <button onClick={() => getChairperson()} className="btn btn-secondary" type="button" id="button-addon6">chairperson</button>
            <button onClick={() => signMessage()} className="btn btn-secondary" type="button" id="button-addon6">SignMessage</button>
        </div>
        <div className='mb-3'>
            <button onClick={() => viewCandidates()} className="btn btn-secondary" type="button" id="button-addon6">View Candidates</button>
            <h5>Candidates to Add</h5>
            <ul>
                {candidateInfo.map(data=>(
                    <li key={data.id}>{data.position + " | " + data.name}</li>
                ))}
            </ul>

            <h5>Candidates Registered</h5>
            <ul>
                {regCandidates.map((regData) => {
                  return <li key={regData.id}>{regData.name}</li>
                })}
            </ul>

            <h5>Sample List</h5>
            <ul>
                {sample.map((sampleData, index) => {
                  return <li key={index}>{sampleData.name + " | " + sampleData.color}</li>
                })}
            </ul>
        </div>
        <div className="mb-3">
            <div className="mb-3">
                <label htmlFor="positionId" className="form-label">Position</label>
                <input id='positionId' value={posInp} onChange={e => setPosInp(e.target.value)} type="text" className="form-control" placeholder='["Governor",ViceGovernor]' aria-label="candidatePos" aria-describedby="button-addon1"/>
            </div>
            <div className="mb-3">
                <label htmlFor="nameId" className="form-label">Name</label>
                <input id='nameId' value={nameInp} onChange={e => setNameInp(e.target.value)} type="text" className="form-control" placeholder='["JB,Diana"]' aria-label="addCandidates" aria-describedby="button-addon1"/>
            </div>

            <div className='input-group mb-3 justify-content-around'>
                <button onClick={() => newCandidate(posInp, nameInp)} className="btn btn-success" type="button" id="button-addon1">+ Add Candidate</button>
                <button onClick={() => registerCandidates()} className="btn btn-warning" type="button" id="button-addon1">Register Candidates</button>
            </div>
        </div>
        <div className="input-group mb-3">
            <input onChange={(e) => setVotersAddr(e.target.value)} type="text" className="form-control" placeholder="0xaaa...ccc" aria-label="giveRightToVote" aria-describedby="button-addon2"/>
            <button onClick={() => giveRight(votersAddr)} className="btn btn-outline-secondary" type="button" id="button-addon2">giveRightToVote</button>
        </div>
        <div className="input-group mb-3">
            <input onChange={(e) => setWinningNum(e.target.value)} type="text" className="form-control" placeholder="Governor, ViceGovernor" aria-label="showWinning" aria-describedby="button-addon3"/>
            <button onClick={() => getWinning(winningNum)} className="btn btn-outline-secondary" type="button" id="button-addon3">showWinning</button>
        </div>
        <div className="input-group mb-3">
            <input onChange={(e) => setVoteList(e.target.value)} type="text" className="form-control" placeholder="[0,3]" aria-label="vote" aria-describedby="button-addon4"/>
            <button onClick={() => castVote(voteList)} className="btn btn-outline-secondary" type="button" id="button-addon4">vote</button>
        </div>
        <div className="input-group mb-3">
            <input onChange={(e) => setNumData(e.target.value)} type="text" className="form-control" placeholder="0" aria-label="candidates" aria-describedby="button-addon5"/>
            <button onClick={() => getCandidate(numData)} className="btn btn-outline-secondary" type="button" id="button-addon5">candidates</button>
        </div>
        <div className="input-group mb-3">
            <input onChange={(e) => setVotersAddr(e.target.value)} type="text" className="form-control" placeholder="0xaaa...bbb" aria-label="voters" aria-describedby="button-addon6"/>
            <button onClick={() => getVoter(votersAddr)} className="btn btn-outline-secondary" type="button" id="button-addon6">voters</button>
        </div>
    </div>
  )
}

export default SmartContract