const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Admin = require("../models/Admin");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Login Route
router.post("/", async (req, res) => {
    const { email } = req.body;
    let validPass = false;
    await User.findOne({ email })
    .then((res) => {
        //validate against hash
        validPass = bcrypt.compareSync(req.body.password, res.password);
    })
    .catch((err) => console.log(err))
    
    if (validPass) {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid Email");

        //generate JWT token
        const jwtData = {_id: user.id, username: user.username, walletAddress: user.walletAddress}
        const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "2h"})

        res.send(token);
    } else {
        return res.status(400).send("Invalid Email or Password");
    }
});



router.post("/wallet", async (req, res) => {
    const { walletAddress } = req.body;
    let user = await User.findOne({ walletAddress }).collation({locale: 'en', strength: 1});
   
    if (user) {
        const jwtData = {_id: user.id, username: user.username, walletAddress: user.walletAddress}
        const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "2h"})

        return res.send(token);
    } else {
        return res.status(400).send("Wallet not registered, please proceed to registration");
    }
});

router.post("/", async (req, res) => {
    const { walletAddress } = req.body;
    let user = await User.findOne({ walletAddress }).collation({locale: 'en', strength: 1});
});

//adminlogin
router.post("/admin", async (req, res) => {
    const { email } = req.body;
    let validPass = false;
    await Admin.findOne({ email })
    .then((res) => {
        //validate against hash
        validPass = bcrypt.compareSync(req.body.password, res.password);
    })
    .catch((err) => console.log(err))
    
    if (validPass) {
        let admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).send("Invalid Email");

        //generate JWT token
        const jwtData = {_id: admin.id, email: admin.email, walletAddress: admin.walletAddress}
        const admintoken = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "2h"})

        res.send(admintoken);
    } else {
        return res.status(400).send("Invalid Email or Password");
    }
});

module.exports = router;
