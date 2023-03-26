import { React, useEffect, useState } from "react";
import '../../styles/header.css';
import { useNavigate } from 'react-router-dom';
import UserGuide from "./UserGuide";
import http from "../../utils/http";

function Header({user}) {
    const navigate = useNavigate();
    const [cocState, setcocState] = useState(null);
    
    function getPageStatus() {
        http.post('/pagestates/find', {name: "Filing of COC"})
            .then((res) => setcocState(res.data.status))
    }

    useEffect(() => {
        if (user) {
            navigate("-1");
        }
        getPageStatus()
    },[user, navigate])
    return (
        <section className="headerSec">
            <div className="container contHead">
                <div className="row headerTitle">
                    <h1>Honorians, cast your votes now!</h1>
                </div>
                <div className="row headerButtons">
                    <button onClick={() => navigate("/election")} type="button" className="btnVote">Vote</button>
                    <button onClick={() => navigate("register")} type="button" className="btnRegister">Register</button>
                </div>
                {/* <div className="row pGuide">
                    <p>We prepared a guide for you<br/> . . . </p>
                </div> */}
            </div>
            
            {cocState ? <div className='cocaccepting'>
                <h1>We are now accepting candidates to file for their COC</h1>
                <button onClick={() => navigate("/register/coc")} className="btn btnRegister">File a COC</button>
            </div> : <div className='cocaccepting'>
                <h1>Filing of COC has eneded. We are no longer accepting candidates to file for their COC</h1>
            </div>}
        </section>
    )
}

export default Header