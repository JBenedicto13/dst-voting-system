import React from 'react';
import candidate1 from '../../assets/candidate1.png';

const TestVote = () => {
  return (
    <div className='testVote'>
        <h1>TestVote</h1>
        <form>
          <div className='groupGov row mb-3'>
            <h1>Governor</h1>
            <div className='classGov col'>
              <input type="radio" class="btn-check" name="opGovernor" id="opGovernor1" autocomplete="off"/>
              <label class="btn btn-outline-success" for="opGovernor1">Candidate 1</label>
            </div>
            <div className='classGov col'>
              <input type="radio" class="btn-check" name="opGovernor" id="opGovernor2" autocomplete="off"/>
              <label class="btn btn-outline-success" for="opGovernor2">Candidate 2</label>
            </div>
          </div>

          <div className='groupViceGov row mb-3'>
            <h1>Vice-Governor</h1>
            <div className='classViceGov col'>
              <input type="radio" class="btn-check" name="opVice" id="opVice1" autocomplete="off"/>
              <label class="btn btn-outline-success" for="opVice1">Candidate 1</label>
            </div>

            <div className='classViceGov col'>
              <input type="radio" class="btn-check" name="opVice" id="opVice2" autocomplete="off"/>
              <label class="btn btn-outline-success" for="opVice2">Candidate 2</label>
            </div>
          </div>
          
          <button class="btn btn-success" type="submit">Cast Vote</button>
        </form>
    </div>
  )
}

export default TestVote