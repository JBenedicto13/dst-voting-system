import { React, useState, useEffect } from "react";
import { ethers } from 'ethers';
import http from "../../utils/http";
import "../../styles/election.css";
import { Link } from 'react-router-dom';
import {GrRefresh} from "react-icons/gr";

function Election() {

    const [electionList, setElectionList] = useState([]);
    const [electionListCount, setElectionListCount] = useState(0);
    const [ElecWallet, setElecWallet] = useState("");
    const [positions, setpositions] = useState([]);
    const [candidatesList, setcandidatesList] = useState([]);
    const [voteCount, setvoteCount] = useState([]);

    const loadElectionData = async () => {
        http.get("/election/load")
        .then((res) => {
          setElectionList(res.data);
          setElectionListCount(res.data.length);
          populateTempDataDisplay();
        })
        .catch((err) => console.log(err))
    }

    async function loadPositionData(address) {
        http.post("/election/loadPositions", {address})
        .then((res) => {
          setpositions(res.data.positions);
          loadCandidatesData()
        })
        .catch((err) => {
          console.log(err);
        })
    }

    const loadCandidatesData = async() => {
        await http.get("/user/viewCandidate")
        .then((res) =>  setcandidatesList(res.data))
        .catch ((err) => {
            if (err.response && err.response.status === 400) {
                console.log(err);
            }
        })
    }

    var tempDataDisplay = [];

    const populateTempDataDisplay = () => {
        for (var i = 0; i < electionListCount; i++) {
        tempDataDisplay[i] = ({
            id: electionList[i]._id,
            title: electionList[i].title,
            address: electionList[i].address,
            abi: electionList[i].abi,
        });
        }
    }


    const refreshResult = async () => {
        setvoteCount([]);
        if (typeof window.ethereum != "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const sContract = new ethers.Contract(electionList[0].address, electionList[0].abi, signer);
            const pContract = new ethers.Contract(electionList[0].address, electionList[0].abi, signer);

            await pContract.candidateCount()
                .then((res) => {
                    let ctr = parseInt(res, 16) + 1;
                    for (let i = 0; i < ctr; i++) {
                        sContract.candidates(i)
                            .then((res) => {
                                var vcount = parseInt(res[3], 16);
                                console.log(vcount)

                                setvoteCount((prev) => [...prev, vcount]);
                                http.post("/user/candidate/updatevotes", {
                                    "walletAddress": candidatesList[i].walletAddress,
                                    "electionName": candidatesList[i].candidate[0].electionName,
                                    "votes": voteCount[i]
                                })
                            })
                            .catch((err) => console.log(err))
                    }
                })
        }
    }

    useEffect(() => {
        loadElectionData()
    })

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
                        {electionList.map((val,key) => {
                            return (
                                <Link
                                key={key}
                                type="button"
                                className={val.isStart ? "list-group-item list-group-item-action" : "list-group-item list-group-item-action disabled-link"}
                                to={{
                                    pathname: `/vote/${val.address}`
                                }}
                                >{val.title}</Link>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="results row">
                <button onClick={() => refreshResult()} type="button" className="btn btn-success" id="btnRefresh"><GrRefresh className="btnRefreshIcon" /></button>
                <div className="resultsHeader">
                    <h1>ELECTION TALLY AND RESULTS</h1>
                </div>
                <div className="resultsContent">
                    <select value={ElecWallet} 
                        onChange={(e) => {
                            setElecWallet(e.target.value)
                            loadPositionData(e.target.value)
                        }} 
                        className="form-select" 
                        name="elecEvent" 
                        aria-label="Default select example"
                    >
                        <option defaultValue="" value="">Select Election Event</option>
                        {electionList.map((val, key) =><option key={key} value={val.address}>{val.title}</option>)}
                    </select>

                    {electionList
                    .filter(el=>el.address === ElecWallet)
                    .map((elec) => {
                        return (
                            <div className="resGroup" key={elec._id}>
                                <h2>{elec.title}</h2>
                                    {positions.map((pos) => {
                                    return (
                                    <div className="resPosGroup" key={pos._id}>
                                        <h3>{pos.posTitle}</h3>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Candidate Name</th>
                                                    <th>Partylist</th>
                                                    <th>Votes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {candidatesList
                                            .filter(cpos => cpos.candidate[0].position === pos.posTitle)
                                            .map((candidate, ckey) => {
                                                return (
                                                    <tr key={ckey}>
                                                        <td>{candidate.candidate[0].id}</td>
                                                        <td>{candidate.lastName}, {candidate.firstName}</td>
                                                        <td>{candidate.candidate[0].partyList}</td>
                                                        <td>{candidate.candidate[0].votes}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                    )})}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
        
    )
}
export default Election