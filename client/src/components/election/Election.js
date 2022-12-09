import { React, useState, useEffect } from "react";
import { ethers } from 'ethers';
import http from "../../utils/http";
import "../../styles/election.css";
import { Link, useNavigate } from 'react-router-dom';

function Election() {
    const navigate = useNavigate();

    const [electionList, setElectionList] = useState([]);
    const [electionListCount, setElectionListCount] = useState(0);
    const [dataDisplay, setDataDisplay] = useState([]);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [signerContract, setSignerContract] = useState([]);
    const [providerContract, setProviderContract] = useState([]);


    const loadElectionData = async () => {
        http.get("/election/load")
        .then((res) => {
          setElectionList(res.data);
          setElectionListCount(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    var tempDataDisplay = [];

    function populateTempDataDisplay() {
        for (var i = 0; i < electionListCount; i++) {
        tempDataDisplay[i] = ({
            id: electionList[i]._id,
            title: electionList[i].title,
            address: electionList[i].address,
            abi: electionList[i].abi,
        });
        }
        setDataDisplay(tempDataDisplay);
    }

    function updateEthers() {
        if (typeof window.ethereum != "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            var counter = electionListCount;

            for (var i = 0; i < counter; i++) {
                const sContract = new ethers.Contract(tempDataDisplay[i].address, tempDataDisplay[i].abi, signer);
                const pContract = new ethers.Contract(tempDataDisplay[i].address, tempDataDisplay[i].abi, provider);

                setSignerContract((previousState) => [...previousState, sContract]);
                setProviderContract((previousState) => [...previousState, pContract]);
            }
            setProvider(provider);
            setSigner(signer);
        }
    }

    useEffect(() => {
        loadElectionData()
        populateTempDataDisplay()
        updateEthers()
    }, [])

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
        </div>
        </>
        
    )
}
export default Election