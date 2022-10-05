import React from "react";
import "../../styles/team.css";
import memberPic from '../../assets/teamMember.png';

function Team() {
    return(
        <div className="team">
            <div className="teamHeader row">
                <div className="row">
                    <h1>Meet the Team!</h1>
                </div>
                <div className="teamName">
                    <h1>Metaselumna Tech</h1>
                </div>
            </div>

            <div className="teamCard row">
                <div className="memberCard">
                    <div className="col divPic">
                        <img src={memberPic} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Benedicto,</h5>
                        <h5 className="firstname">John Benedict</h5>
                        <ul>
                            <li>Web Developer</li>
                            <li>Blockchain Developer</li>
                        </ul>
                    </div>
                </div>

                <div className="memberCard">
                    <div className="col divPic">
                        <img src={memberPic} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Benedicto,</h5>
                        <h5 className="firstname">John Benedict</h5>
                        <ul>
                            <li>Web Developer</li>
                            <li>Blockchain Developer</li>
                        </ul>
                    </div>
                </div>

                <div className="memberCard">
                    <div className="col divPic">
                        <img src={memberPic} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Benedicto,</h5>
                        <h5 className="firstname">John Benedict</h5>
                        <ul>
                            <li>Web Developer</li>
                            <li>Blockchain Developer</li>
                        </ul>
                    </div>
                </div>

                <div className="memberCard">
                    <div className="col divPic">
                        <img src={memberPic} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Benedicto,</h5>
                        <h5 className="firstname">John Benedict</h5>
                        <ul>
                            <li>Web Developer</li>
                            <li>Blockchain Developer</li>
                        </ul>
                    </div>
                </div>

                <div className="memberCard">
                    <div className="col divPic">
                        <img src={memberPic} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Benedicto,</h5>
                        <h5 className="firstname">John Benedict</h5>
                        <ul>
                            <li>Web Developer</li>
                            <li>Blockchain Developer</li>
                        </ul>
                    </div>
                </div>

                <div className="memberCard">
                    <div className="col divPic">
                        <img src={memberPic} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Benedicto,</h5>
                        <h5 className="firstname">John Benedict</h5>
                        <ul>
                            <li>Web Developer</li>
                            <li>Blockchain Developer</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Team
