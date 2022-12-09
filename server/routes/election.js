const express = require("express");
const router = express.Router();
const Election = require("../models/Election");

router.post("/addEvent", async (req, res) => {
    const { title, address, abi, positions, partylists, voted, voters, isStart } = req.body;

    let election = await Election.findOne({ title });
    if (election) {
        return res.status(400).send("Event already added");
    }

    election = new Election({ title, address, abi, positions, partylists, voted, voters, isStart });
    await election.save();

    res.send("Event Added Successfully");
});

router.get("/load", async (req, res) => {
    Election.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

//find election by title
router.post("/loadbytitle", async (req, res) => {
    const {title} = req.body;
    Election.find({title})
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/view", async (req, res) => {
    const { address } = req.body;
    Election.findOne({ address })
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/startElection/:id", async (req, res) => {
    var stats = req.body.isStart;
    Election.findByIdAndUpdate({ _id: req.params.id }, {
        isStart: req.body.isStart
    })
    .then((doc) => {
        console.log(doc);
        res.send(stats ? "Election Started" : "Election Stopped");
    })
    .catch((err) => console.log(err));
});

//Positions

router.post("/loadPositions", async (req, res) => {
    const { address } = req.body;
    Election.findOne({ address })
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/loadPositionsbyTitle", async (req, res) => {
    const { title } = req.body;
    Election.findOne({ title })
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/addPosition", async (req, res) => {
    const { address, posTitle, number } = req.body;

    await Election.updateOne(
        {"address": address}, 
        {$push: {"positions": {
            "posTitle": posTitle, "number": number
        }}
        }
    )

    res.send("Position Added Successfully");
});

router.post("/deletePosition", async (req, res) => {
    
    const { address, posTitle, number } = req.body;
    console.log(address, posTitle, number);
    await Election.updateOne(
        {"address": address}, 
        {$pull: {"positions": {
            "posTitle": posTitle, "number": number
        }}
        }
    )
    res.send("Deleted Successfully");
});

//Partylist

router.post("/loadPartylists", async (req, res) => {
    const { address } = req.body;
    Election.findOne({ address })
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/addPartylist", async (req, res) => {
    const { address, partylistTitle } = req.body;

    await Election.updateOne(
        {"address": address}, 
        {$push: {"partylists": {
            "partylistTitle": partylistTitle,
        }}
        }
    )

    res.send("Partylist Added Successfully");
});

router.post("/deletePartylist", async (req, res) => {
    
    const { address, partylistTitle } = req.body;
    console.log(address, partylistTitle);
    await Election.updateOne(
        {"address": address}, 
        {$pull: {"partylists": {
            "partylistTitle": partylistTitle
        }}
        }
    )
    res.send("Deleted Successfully");
});

module.exports = router;
