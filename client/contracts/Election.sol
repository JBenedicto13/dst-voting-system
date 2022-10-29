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

    uint candidateCount;

    struct Voter {
        uint[] vote;
        bool voted;
        uint weight;
    }

    struct Candidate {
        // address addr;
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
    }

    //Authenticate Voters

    function giveRightToVote(address voter) external {
        require( msg.sender == chairperson,
                    'Only the Chairperson can give access to vote');
        require(!voters[voter].voted,
                'The voter has already voted');
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function addCandidates(string[] memory _position, string[] memory _name) external {
        candidateCount = _name.length;
        for (uint i = 0; i < candidateCount; i++) {
            candidates.push(Candidate({
                position: _position[i],
                // party: _party[i],
                name: _name[i],
                voteCount: 0
            }));
        }
        emit NewCandidate(block.timestamp, msg.sender);
    }

    //Voting Function
    function vote(uint[] calldata _candidates) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, 'Has no right to vote');
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