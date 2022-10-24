import {React, useState} from 'react';
import '../../styles/vote.css';
import candidate1 from '../../assets/candidate1.png';
import candidate2 from '../../assets/candidate2.png';
import dstsc_logo from '../../assets/logos/dstsc-logo.png';

const Vote = () => {
  const [selectedValue, setSelectedValue] = useState("Test");

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
                  <label class="btn btn-outline-danger" for="govCandidate1">Select</label>
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
                  <label className="btn btn-outline-danger" for="govCandidate2">Select</label>
                </div>
              </div>

            </div>
            
          </div>
            <button className="btn btn-warning btnCastSubmit" type="submit" onSubmit={() => handleSubmit()}>Cast Vote</button>
        </form>
    </div>
  )
}

export default Vote