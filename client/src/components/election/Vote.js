import React from "react";
import '../../styles/vote.css';
import candidate1 from '../../assets/candidate1.png';
import candidate2 from '../../assets/candidate2.png';

function Vote() {
    return (
        <div className="container-fluid ">
          <section className="voteContainer">
          <div className="container">
            <div className="row gx-3 d-flex align-items-center  justify-content-center ">
              <div className="col-sm-12 col-md-10 col-lg-10 col-xl-6">
                <div className="box">
                  <h1>Student Council Election A.Y 2022-2023</h1> 
                </div>
                <div className="box">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi reprehenderit excepturi doloribus in nostrum fugiat.
                    </p>
                 </div>
              </div>
              <div className="col-sm-12 col-md-10 col-lg-10 col-xl-6  ">
                <img src="" class="card-img-top candidate2" alt="LOGO"/>
              </div>
            </div>
          </div>
          </section>
          <section className="govContainer">
          <div className="container">
            <div className="row justify-content-center gx-3 d-flex align-items-center ">
                <div className="col-md-8 col-lg-6 col-xl-8 gov">
                <div className="box1">Governor</div>
                </div>
            </div>
          </div>

          <div class="container govVote ">
        <div class="row justify-content-center gx-3 d-flex align-items-center tryLang">
          <div class="col-xs-4 col-sm-4 justify-content-center gx-3 d-flex align-items-center candidate3 fix">
          <label for="govVote1" class="form-check-label d-flex flex-column-reverse " >
            <div class="card justify-content-center gx-3 d-flex align-items-center" id="change" >
              <img src={candidate1} class="card-img-top candidate2" alt="..."/>
              <div class="card-body">
                <p class="card-text">Dela Cruz, <br/> Juan Ted L.</p>
              </div>
            </div>
          </label>
          <input type="radio" class="form-check-input"  name="govVote" id="govVote1"/>
        </div>
        <div class="col-xs-4 col-sm-4 justify-content-center gx-3 d-flex align-items-center candidate3 fix">
        
          <label for="govVote2" class="form-check-label d-flex flex-column-reverse " >
            <div class="card justify-content-center gx-3 d-flex align-items-center" id="change">
              <img src={candidate2} class="card-img-top candidate2" alt="..."/>
              <div class="card-body">
                <p class="card-text">Dela Cruz, <br/> Juan Ted N.</p>
              </div>
            </div>
          </label>
          <input type="radio" class="form-check-input "  name="govVote" id="govVote2"/>
        </div>
      </div>    
    </div>
    <div class="container">
      <div class="row justify-content-center gx-3 d-flex align-items-center ">
        <div class="col-md-8 col-lg-6 col-xl-8 gov">
          <div class="box1">Vice-Governor</div>
        </div>
      </div>
    </div>

    <div class="container viceVote ">
      <div class="row justify-content-center gx-3 d-flex align-items-center">
        <div class="col-xs-4 col-sm-4 justify-content-center gx-3 d-flex align-items-center candidate3 fix">
        <label for="viceGov1" class="form-check-label d-flex flex-column-reverse " >
          <div class="card justify-content-center gx-3 d-flex align-items-center" >
            <img src={candidate1} class="card-img-top candidate2" alt="..."/>
            <div class="card-body">
              <p class="card-text">Dela Cruz, <br/> Juan Ted L.</p>
            </div>
          </div>
        </label>
        <input type="radio" class="form-check-input"  name="viceGov" id="viceGov1"/>
      </div>
      <div class="col-xs-4 col-sm-4 justify-content-center gx-3 d-flex align-items-center candidate3 fix">
      
        <label for="viceGov2" class="form-check-label d-flex flex-column-reverse " >
          <div class="card justify-content-center gx-3 d-flex align-items-center" >
            <img src={candidate2} class="card-img-top candidate2" alt="..."/>
            <div class="card-body">
              <p class="card-text">Dela Cruz, <br/> Juan Ted L.</p>
            </div>
          </div>
        </label>
        <input type="radio" class="form-check-input "  name="viceGov" id="viceGov2"/>
      </div>
      <div class="container">
      <div class="row justify-content-center gx-3 d-flex align-items-center">
        <div class="col justify-content-center gx-3 d-flex align-items-center">
        <button type="button" class="btn btn-secondary button">Cast Vote</button>
      </div>
      </div>
    </div>

    </div>    
  </div>

        </section>
       </div>
    )
}

export default Vote