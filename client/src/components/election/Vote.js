import {React, useState} from 'react';
import '../../styles/vote.css';
import candidate1 from '../../assets/candidate1.png';
import candidate2 from '../../assets/candidate2.png';
import dstsc_logo from '../../assets/logos/dstsc-logo.png';

import { ethers } from 'ethers';
// import ElectionSrc from '../../artifacts/contracts/Election.sol/Election.json';

const ElectionContract = "0x500D68Ce0600AeE6ea671cB9Da0f9d1091f10a6E";

const Vote = () => {
  const [selectedValue, setSelectedValue] = useState("Test");
  const [chairperson, setChairperson] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const fetchChairperson = async () => {
    if (typeof window.ethereum != "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ElectionContract, process.env.ABI, signer);

      setProvider(provider);
      setSigner(signer);
      setContract(contract);

      try {
        const data = await contract.chairperson();
        console.log("data: ", data);
      } catch (error) { 
        console.log(error);
      }
    }
  }

  function handleSubmit (e) {
    alert("Voted: " + selectedValue);
    e.preventDefault();
  }

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
        <form className='voteForm'>
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
          <div className='positionGroup mb-3'>
            <div className='titleDiv'>
              <h1>Vice Governor</h1>
            </div>
            <div className='cardsGroup'>
              <div className='candidateCard' id='candidateCard1'>
                <div className='card'>
                    <div className='elipseBg'><img src={candidate1} alt='candidate'></img></div>
                    <div className='candidateInfo'>
                      <h2>Diana Almario</h2>
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
                      <h2>JB Benedicto</h2>
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
            <button className="btn btn-warning btnCastSubmit" type="submit" onSubmit={() => handleSubmit()}>Cast Vote</button>
        </form>
        <div className='mb-5'>
          <h1>{chairperson}</h1>
          <button onClick={() => fetchChairperson()} className='btn btn-danger' type='button'>GetChairman</button>
        </div>
    </div>
  )
}

export default Vote