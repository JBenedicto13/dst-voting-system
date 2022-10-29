import {React, useState } from 'react';

import { ethers } from 'ethers';
import ElectionSrc from '../../artifacts/contracts/Election.sol/Election.json';

const ElectionContract = "0x3C65685cDB44f2bA55DDBfCE689c4974bdd3370a";

const SmartContract = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signerContract, setSignerContract] = useState(null);
  const [providerContract, setProviderContract] = useState(null);
  const [candidatesInfo, setCandidatesInfo] = useState(null);
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

  const addCandidates = async (data) => {
    const result = await signerContract.addCandidates(data);
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
  
  return (
    <div className='smartContract'>
        <div className="input-group mb-3 mt-3 justify-content-center">
            <h3>Manage Smart Contract</h3>
        </div>
        <div className="input-group mb-3 mt-3 justify-content-between">
            <button onClick={() => updateEthers()} className="btn btn-secondary" type="button" id="button-addon0">Update Contract</button>
            <button onClick={() => getChairperson()} className="btn btn-secondary" type="button" id="button-addon6">chairperson</button>
            <button onClick={() => signMessage()} className="btn btn-secondary" type="button" id="button-addon6">SignMessage</button>
        </div>
        <div className="input-group mb-3">
            <input onChange={(e) => setCandidatesInfo(e.target.value)} type="text" className="form-control" placeholder='["Governor",ViceGovernor],["JB,Diana"]' aria-label="addCandidates" aria-describedby="button-addon1"/>
            <button onClick={() => addCandidates(candidatesInfo)} className="btn btn-outline-secondary" type="button" id="button-addon1">addCandidates</button>
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
            <input type="text" className="form-control" placeholder="[0,3]" aria-label="vote" aria-describedby="button-addon4"/>
            <button className="btn btn-outline-secondary" type="button" id="button-addon4">vote</button>
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