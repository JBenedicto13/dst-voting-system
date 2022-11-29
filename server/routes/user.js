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

    const { lastName, firstName, course, yearLevel, section, email, username, walletAddress } = req.body;
    //Hash Password
    const password = bcrypt.hashSync(req.body.password, 10);
    // Checking User
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    user = new User({  lastName, firstName, course, yearLevel, section, email, username, walletAddress, password });
    await user.save();

    //generate JWT token
    const jwtData = {_id: user.id, name: user.username}
    const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "2h"})
    
    res.send(token);
});

router.post("/addVoter", async (req, res) => {

    const { lastName, firstName, course, yearLevel, section, email, username, walletAddress } = req.body;
    //Hash Password
    const password = bcrypt.hashSync(req.body.password, 10);
    // Checking User
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    user = new User({  lastName, firstName, course, yearLevel, section, email, username, walletAddress, password });
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

module.exports = router;
