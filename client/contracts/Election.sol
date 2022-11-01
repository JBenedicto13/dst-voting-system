// SPDX-License-Identifier: Unlicense

pragma solidity >=0.7.0 < 0.9.0;

contract Election {

    event NewCandidate(
        uint date,
        address indexed from
    );

    event viewCandidate(
        uint date,
        address indexed from
    );

    uint public candidateCount;
    bool public isElectionStart;

    struct Voter {
        uint[] vote;
        bool voted;
        uint weight;
    }

    struct Candidate {
        // address addr;
        uint id;
        string position;
        // string party;
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    mapping(address => Voter) public voters;

    address public chairperson;
    // string[] memory _party,
    constructor() {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        isElectionStart = false;
    }

    //Start/Stop Election
    function startElection() external {
        require (chairperson == msg.sender, 'Only the Chairperson can start the Election');
        require(isElectionStart == false, 'The Election has started already.');
        
        isElectionStart = true;
    }

    function stopElection() external {
        require (chairperson == msg.sender, 'Only the Chairperson can stop the Election');
        require(isElectionStart == true, 'The Election has not yet started.');
        
        isElectionStart = false;
    }

    function addCandidates(string[] memory _position, string[] memory _name) external {
        candidateCount += _name.length;
        for (uint i = 0; i < _name.length; i++) {
            candidates.push(Candidate({
                id: i+1,
                position: _position[i],
                // party: _party[i],
                name: _name[i],
                voteCount: 0
            }));
        }
        emit NewCandidate(block.timestamp, msg.sender);
    }

    //Voting Function
    function vote(bool _validVoter, uint[] calldata _candidates) public {
        require(isElectionStart == true, 'The Election has not yet started.');
        require(_validVoter == true, 'This address has no right to vote');
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, 'Already voted');
        sender.voted = true;

        for (uint i = 0; i < _candidates.length; i++) {
            sender.vote.push(_candidates[i]);
            candidates[_candidates[i]].voteCount += 1;
        }
    }

    //ShowingResults

    function showWinning(string memory _pos) public view returns (uint _winningCandidate, string memory _winningName, uint winningVoteCount) {
        winningVoteCount = 0;
        for (uint i = 0; i < candidateCount; i++) {
            if (keccak256(abi.encodePacked(candidates[i].position)) == keccak256(abi.encodePacked(_pos))) {
                if (candidates[i].voteCount > winningVoteCount) {
                    winningVoteCount = candidates[i].voteCount;
                    _winningCandidate = i;
                }
            }
        }
        _winningName = candidates[_winningCandidate].name;
    }

}