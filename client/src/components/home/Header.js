import { React, useEffect } from "react";
import '../../styles/header.css';
import { useNavigate } from 'react-router-dom';

function Header({user}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("-1");
        }
    },[])
    return (
        <section className="headerSec">
            <div className="container contHead">
                <div className="row headerTitle">
                    <h1>Honorians, cast your votes now!</h1>
                </div>
                <div className="row headerButtons">
                    <button onClick={() => navigate("vote")} type="button" className="btnVote">Vote</button>
                    <button onClick={() => navigate("register")} type="button" className="btnRegister">Register</button>
                </div>
                <div className="row pGuide">
                    <p>We prepared a guide for you<br/> . . . </p>
                </div>
            </div>
        </section>
    )
}

export default Header