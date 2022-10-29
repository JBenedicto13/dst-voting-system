import {React, useState, useEffect} from 'react';
import '../../styles/vote.css';
import candidate1 from '../../assets/candidate1.png';
import candidate2 from '../../assets/candidate2.png';
import dstsc_logo from '../../assets/logos/dstsc-logo.png';

import { ethers } from 'ethers';
import ElectionSrc from '../../artifacts/contracts/Election.sol/Election.json';

const ElectionContract = "0x88b32d322cE8e39f3Ef960545d403013f81E1236";

const Vote = () => {
  const [selectedValue, setSelectedValue] = useState("Test");
  const [chairperson, setChairperson] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidatesInput, setCandidatesInput] = useState("");
  const [uint, setUint] = useState(null);

  const updateEthers = async () => {
    if (typeof window.ethereum != "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ElectionContract, ElectionSrc.abi, signer);

      setProvider(provider);
      setSigner(signer);
      setContract(contract);

      console.log(contract.address);
    }
  }

  const getCandidate = async (data) => {
    const _contract = new ethers.Contract(ElectionContract, ElectionSrc.abi, signer);
    var callPromise = await _contract.vote(data.uint);
    
    console.log(callPromise);
    // console.log(data.uint);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("votes: ", selectedValue);
  };
  
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
        <form className='voteForm' onSubmit={handleSubmit}>
          <div className='positionGroup mb-3'>
            <div className='titleDiv'>
              <h1>Governor</h1>
            </div>
            <div className='cardsGroup'>
              <div className='candidateCard' id='candidateCard1'>
                <div className='card'>
                    <div className='elipseBg'><img src={candidate1} alt='candidate'></img></div>
                    <div className='candidateInfo'>
                      <h2>Maria Clara</h2>
                      <h3>Sample Partylist</h3>
                    </div>
                </div>
                <div className='btnRadio'>
                  <input className='btn-check' type="radio" name="gender" value="Male" id='govCandidate1' onChange={e => setSelectedValue(e.target.value)} autoComplete="off" />
                  <label className="btn btn-outline-danger" htmlFor="govCandidate1">Select</label>
                </div>
              </div>

              <div className='candidateCard' id='candidateCard2'>
                <div className='card'>
                    <div className='elipseBg'><img src={candidate2} alt='candidate'></img></div>
                    <div className='candidateInfo'>
                      <h2>Juan Dela Cruz</h2>
                      <h3>Sample Partylist</h3>
                    </div>
                </div>
                <div className='btnRadio'>
                  <input className='btn-check' type="radio" name="gender" value="Female" id='govCandidate2' onChange={e => setSelectedValue(e.target.value)} autoComplete="off" />
                  <label className="btn btn-outline-danger" htmlFor="govCandidate2">Select</label>
                </div>
              </div>
            </div>
          </div>
            <button className="btn btn-warning btnCastSubmit" type="submit">Cast Vote</button>
        </form>
        <div className='mb-5'>
          <button onClick={() => updateEthers()} className='btn btn-danger' type='button'>Update</button><br/>
        </div>
        <div className='mb-5'>
          <input type="text" onChange={e => setUint(e.target.value)}/><br/>
          <button onClick={() => getCandidate({uint})} className='btn btn-primary' type='button'>Candidates</button>
        </div>
    </div>
  )
}

export default Vote