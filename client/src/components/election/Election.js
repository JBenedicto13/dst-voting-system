import React from "react";
import "../../styles/election.css";

import { useNavigate, Outlet } from 'react-router-dom';

function Election() {
    const navigate = useNavigate();
    return (
        <>
        <div className="election row">
            <div className="electionHeader col">
                <h1>Web-based Voting System DHVSU Sto. Tomas</h1>
                <p>
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.

                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                </p>
            </div>
            <div className="chooseEvent col">
                <div className="listbox row">
                    <div className="eventList row">
                        <h1>Choose an Election Event</h1>
                        <div className="list-group event-list-group">
                            <button  onClick={() => navigate("/election")} type="button" className="list-group-item list-group-item-action" aria-current="true">
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