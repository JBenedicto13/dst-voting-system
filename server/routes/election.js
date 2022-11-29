const express = require("express");
const router = express.Router();
const Election = require("../models/Election");
const TestModel = require("../models/TestModel");

router.post("/addEvent", async (req, res) => {
    const { title, address, abi, voted, voters, start, end } = req.body;

    let election = await Election.findOne({ title });
    if (election) {
        return res.status(400).send("Event already added");
    }

    election = new Election({ title, address, abi, voted, voters, start, end });
    await election.save();

    res.send("Event Added Successfully");
});

router.get("/load", async (req, res) => {
    Election.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/testAdd", async (req, res) => {
    const { name, email, mobile } = req.body;

    let testModel = await TestModel.findOne({ email });
    if (testModel) {
        return res.status(400).send("User already added");
    }

    testModel = new TestModel({ name, email, mobile });
    await testModel.save();

    res.send("User Added Successfully");
})

router.get("/testView", async (req, res) => {
    TestModel.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/testDelete/:id", async (req, res) => {
    TestModel.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => {
        console.log(doc);
        res.send("User Deleted Successfully");
    })
    .catch((err) => console.log(err));
});

router.put("/testEdit/:id", async (req, res) => {
    TestModel.findByIdAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile
    })
    .then((doc) => {
        console.log(doc);
        res.send("User Updated Successfully");
    })
    .catch((err) => console.log(err));
});

// router.post("/startElection/:id", async (req, res) => {
//     const { date } = req.body;
//     res.send(date);
//     // Election.findByIdAndUpdate({ _id: req.params.id }, {
//     //     start: req.body.date,
//     // })
//     // .then((doc) => {
//     //     console.log(doc);
//     //     res.send("User Updated Successfully");
//     // })
//     // .catch((err) => console.log(err));
// });

router.get("/startElection", async (req, res) => {
    Election.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
