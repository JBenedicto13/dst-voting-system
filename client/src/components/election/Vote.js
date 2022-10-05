import React from "react";
import '../styles/vote.css';
import Nav from './Nav';

function Vote() {
    return (
        <>
            <Nav />
            <div className="vote">
                <div className="voteHeader">
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
            </div>
        </>
    )
}

export default Vote