import React from "react";
import '../../styles/about.css';

function About() {
    return (
        <div className="about">
            <div className="aboutCard">
                <h1>DHVSU Sto. Tomas</h1>
                <p>
                    Don Honorio Ventura State University - Sto. Tomas offers undergraduate courses that is located at Moras Dela Paz, Santo Tomas, San Fernando Pampanga
                </p>
            </div>

            <div className="aboutCard">
                <h1>Voting System</h1>
                <p>
                The main goal of this study is to develop a Web-Based Student Council Election Voting System through blockchain technology for DHVSU Sto. Tomas that can allow students to cast their votes who can provide a fair and reliable election for student council and through the use of blockchain technology which can provide transparency, reliability, voter eligibility, votes accurately recorded and prevent from election fraud.
                </p>
            </div>
        </div>
    )
}

export default About