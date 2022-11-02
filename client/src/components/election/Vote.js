import {React, useState, useEffect} from 'react';
import '../../styles/vote.css';
import candidate1 from '../../assets/candidate1.png';
import candidate2 from '../../assets/candidate2.png';
import dstsc_logo from '../../assets/logos/dstsc-logo.png';

import { ethers } from 'ethers';
import ElectionSrc from '../../artifacts/contracts/Election.sol/Election.json';

const ElectionContract = "0xb347509c83e4e13799D34CAB20E6b7b3bd29ED47";

const Vote = () => {
  const [selectedValue, setSelectedValue] = useState("Test");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signerContract, setSignerContract] = useState(null);
  const [providerContract, setProviderContract] = useState(null);

  const [candidateList, setCandidateList] = useState([]);

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
      loadCandidates(providerContract)
    }
  }

  const loadCandidates = async (_providerContract) => {
    var tempCandidateList = [];
    const counter = await _providerContract.candidateCount();
    for (var i = 0; i < counter; i++) {
      var result = await _providerContract.candidates(i);
      tempCandidateList[i] = ({
        id: i+1,
        position: result[1],
        name: result[2]
      });

      console.log(tempCandidateList[i]);
    }

    setCandidateList(tempCandidateList)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("votes: ", selectedValue);
  };

  useEffect(()=>{
    updateEthers()
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
        <form className='voteForm' onSubmit={handleSubmit}>
          <div className='positionGroup mb-3'>
            <div className='titleDiv'>
              <h1>Governor</h1>
            </div>
            <div className='cardsGroup'>
                {
                  candidateList.filter(candidate => candidate.position == "Governor")
                  .map((candidate) => {
                    return (
                      <div className='candidateCard' id='candidateCard1' key={candidate.id}>
                        <div className='card'>
                            <div className='elipseBg'><img src={candidate1} alt='candidate'></img></div>
                            <div className='candidateInfo'>
                              <h2>{candidate.name}</h2>
                            </div>
                        </div>
                        <div className='btnRadio'>
                          <input className='btn-check' type="radio" name="candidateRadio" value={candidate.id} id='govCandidate' onChange={e => setSelectedValue(e.target.value)} autoComplete="off" />
                          <label className="btn btn-outline-danger" htmlFor="govCandidate1">Select</label>
                        </div>
                      </div>
                    )
                  })
                }
            </div>
          </div>
            <button className="btn btn-warning btnCastSubmit" type="submit">Cast Vote</button>
        </form>
        <div className='mb-5'>
          <button onClick={() => updateEthers()} className='btn btn-danger' type='button'>Update</button><br/>
        </div>
    </div>
  )
}

export default Vote