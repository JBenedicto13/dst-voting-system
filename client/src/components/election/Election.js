import React from "react";
import "../../styles/election.css";

import { useNavigate } from 'react-router-dom';

function Election() {
    const navigate = useNavigate();
    return (
        <>
        <div className="election row">
            <div className="electionHeader col">
                <h1>Web-based Voting System DHVSU Sto. Tomas</h1>
                <p>
                    This was developed to provide online access to voting and it was integrated with the blockchain for added security through the help of a voting smart contract.
                </p>
            </div>
            <div className="chooseEvent col">
                <div className="listbox row">
                    <div className="eventList row">
                        <h1>Choose an Election Event</h1>
                        <div className="list-group event-list-group">
                            <button  onClick={() => navigate("/vote")} type="button" className="list-group-item list-group-item-action" aria-current="true">
                                Student Council
                            </button>
                            <button type="button" className="list-group-item list-group-item-action" disabled>College of Computing Studies</button>
                            <button type="button" className="list-group-item list-group-item-action" disabled>College of Education</button>
                            <button type="button" className="list-group-item list-group-item-action" disabled>College of Hospitality and Management</button>
                            <button type="button" className="list-group-item list-group-item-action" disabled>College of Business Studies</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <Outlet /> */}
        </div>
        </>
        
    )
}
export default Election