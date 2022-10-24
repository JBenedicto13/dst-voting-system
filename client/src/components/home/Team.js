import React from "react";
import "../../styles/team.css";
import memberPic from '../../assets/teamMember.png';
import Almario from '../../assets/team/Almario.png';
import Ardena from '../../assets/team/Ardena.png';
import Benedicto from '../../assets/team/Benedicto.png';
import Lopez from '../../assets/team/Lopez.png';

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
                        <img src={Almario} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Almario,</h5>
                        <h5 className="firstname">Diana Angelica</h5>
                        <ul>
                            <li>Project Manager</li>
                            <li>Documenter</li>
                        </ul>
                    </div>
                </div>

                <div className="memberCard">
                    <div className="col divPic">
                        <img src={Ardena} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Ardeña,</h5>
                        <h5 className="firstname">Renato</h5>
                        <ul>
                            <li>Web Developer</li>
                        </ul>
                    </div>
                </div>

                <div className="memberCard">
                    <div className="col divPic">
                        <img src={Benedicto} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Benedicto,</h5>
                        <h5 className="firstname">John Benedict</h5>
                        <ul>
                            <li>Developer</li>
                        </ul>
                    </div>
                </div>

                <div className="memberCard">
                    <div className="col divPic">
                        <img src={Lopez} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Lopez,</h5>
                        <h5 className="firstname">Janine Rose</h5>
                        <ul>
                            <li>Documenter</li>
                            <li>Blockchain Developer</li>
                        </ul>
                    </div>
                </div>

                <div className="memberCard">
                    <div className="col divPic">
                        <img src={memberPic} alt="..."></img>
                    </div>
                    <div className="col divInfo">
                        <h5 className="surname">Nuqui,</h5>
                        <h5 className="firstname">Joshua Daniel</h5>
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
                        <h5 className="surname">Manalang,</h5>
                        <h5 className="firstname">Juan Paulo</h5>
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
