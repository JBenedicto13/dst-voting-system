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

    const { email, username, walletAddress } = req.body;
    //Hash Password
    const password = bcrypt.hashSync(req.body.password, 10);
    // Checking User
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    user = new User({ email, username, walletAddress, password });
    await user.save();

    //generate JWT token
    const jwtData = {_id: user.id, name: user.username}
    const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "2h"})
    
    res.send(token);
});

module.exports = router;
