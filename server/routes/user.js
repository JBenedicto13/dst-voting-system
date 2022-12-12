const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

//User Information
router.get("/", auth, async (req, res) => {
    const profile = await User.findById(req.user._id);
    res.send(profile);
})

// Register User
router.post("/", async (req, res) => {

    const {lastName, firstName, course, yearLevel, section, isCandidate, candidate, email, username, walletAddress } = req.body;
    //Hash Password
    const password = bcrypt.hashSync(req.body.password, 10);
    // Checking User
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    user = new User({  lastName, firstName, course, yearLevel, section, isCandidate, candidate, email, username, walletAddress, password });
    await user.save();

    //generate JWT token
    const jwtData = {_id: user.id, name: user.username, walletAddress: user.walletAddress}
    const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "2h"})

    res.send(token);
});

router.post("/getEmail", async (req, res) => {

    const { email } = req.body;

    await User.findOne({email})
       .then((result) => res.send(result.walletAddress))
       .catch((error) => res.send(error))
});

router.post("/expiry", async (req, res) => {

    const { email } = req.body;

    await User.findOne({email})
       .then((result) => res.send(result))
       .catch((error) => res.send(error))
});

router.post("/expirywallet", async (req, res) => {

    const { walletAddress } = req.body;

    await User.findOne({walletAddress})
       .then((result) => res.send(result))
       .catch((error) => res.send(error))
});

router.post("/addVoter", async (req, res) => {

    const { lastName, firstName, course, yearLevel, section, isCandidate, candidate, email, username, walletAddress } = req.body;
    //Hash Password
    const password = bcrypt.hashSync(req.body.password, 10);
    // Checking User
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    user = new User({  lastName, firstName, course, yearLevel, section, isCandidate, candidate, email, username, walletAddress, password });
    await user.save();
    
    res.send("User Registered");
});

router.get("/view", async (req, res) => {
    User.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/deleteVoter/:id", async (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => {
        console.log(doc);
        res.send("User Deleted Successfully");
    })
    .catch((err) => console.log(err));
});

router.put("/editVoter/:id", async (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        course: req.body.course,
        yearLevel: req.body.yearLevel,
        section: req.body.section,
        email: req.body.email,
        walletAddress: req.body.walletAddress,
    })
    .then((doc) => {
        console.log(doc);
        res.send("User Updated Successfully");
    })
    .catch((err) => console.log(err));
});

router.get("/viewNonCandidate", async (req, res) => {
    const noncandidates = await User.find({"isCandidate": false});
    res.send(noncandidates);
})

router.get("/viewCandidate", async (req, res) => {
    const candidates = await User.find({"isCandidate": true});
    res.send(candidates);
})

router.post("/forDeployment", async (req, res) => {
    const {electionName} = req.body;
    const candidates = await User.find({"candidate.electionName": electionName, "candidate.isDeployed": false});
    res.send(candidates);
})

router.post("/makeCandidate", async (req, res) => {
    const { email, id, electionName, position, partyList, votes } = req.body;

    await User.updateOne(
        {"email": email}, 
        {$set: {"candidate": {
            "id": id,
            "electionName": electionName,
            "position": position,
            "partyList": partyList,
            "votes": votes,
            "isDeployed": false
        }}
        }
    ).then(
        await User.updateOne(
            {"email": email}, 
            {$set: {"isCandidate": true}}
        ),
        res.send("Candidate Added Successfully")
    )
});

router.post("/deployCandidate/", async (req, res) => {
    const { walletAddress, id, electionName, position, partyList, votes } = req.body;
    User.findOneAndUpdate(
        {"walletAddress" : walletAddress},
        {$set: {"candidate": {
            "id": id,
            "electionName": electionName,
            "position": position,
            "partyList": partyList,
            "votes": votes,
            "isDeployed": true
        }}}
        )
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
});

router.post("/view/deployed", async (req, res) => {
    User.find(
        {"isCandidate": true} && {"candidate.isDeployed": true}
    )
        .then((result) => res.send(result))
        .catch((error) => res.send(error))
});

router.post("/removeCandidate", async (req, res) => {
    const { id } = req.body;

    await User.updateOne(
        {"_id": id}, 
        {$set: {"candidate": {
            "electionName": "",
            "position": "",
            "partyList": "",
            "votes": 0,
            "isDeployed": null
        }}
        }
    ).then(
        await User.updateOne(
            {"_id": id}, 
            {$set: {"isCandidate": false}}
        ),
        res.send("Candidate Removed Successfully")
    )
});

router.post("/updateCandidate", async (req, res) => {
    const { id, electionName, position, partyList, votes } = req.body;

    await User.updateOne(
        {"_id": id}, 
        {$set: {"candidate": {
            "electionName": electionName,
            "position": position,
            "partyList": partyList,
            "votes": votes,
            "isDeployed": false
        }}
        }
    )
    res.send("Candidate Added Successfully")
});

router.post("/candidate/updatevotes", async (req, res) => {
    const { walletAddress, electionName, votes } = req.body;

    await User.updateOne(
        {"walletAddress": walletAddress, "candidate.electionName": electionName}, 
        {$set: 
            {"candidate.$.votes": votes}
        }
    )
    res.send("Votes Updated Successfully");
});



module.exports = router;
