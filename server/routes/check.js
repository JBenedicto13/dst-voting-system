const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/email", async (req, res) => {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send("User already exists with this email");
    }
})

// router.post("/wallet", async (req, res) => {
//     const { walletAddress } = req.body;
//     let user = await User.findOne({ walletAddress });
//     // let user = await  User.find({'walletAddress': { $regex: new RegExp("^" + walletAddress.toLowerCase(), "i") }});
//     // let user = await  User.find({"walletAddress" : { '$regex':'^'+walletAddress+'$'}});
   
//     if (user) {
//         return res.send("User already exists with this wallet address");
//     }
//     // else {
//     //     return res.status(400).send("User not found");
//     // }
// })

router.post("/wallet", async (req, res) => {
    const { walletAddress } = req.body;
    const newWallet = ("/^" + walletAddress + "/i");
    // let user = await User.findOne({ "walletAddress" : new RegExp(newWallet) });
    let user = await User.find({ 'walletAddress' : {$regex: newWallet} });
    // let user = await User.find({"walletAddress": new RegExp('^' + {walletAddress} + '$', 'i')});
    // let user = await User.findOne({ walletAddress });
   
    if (user) {
        return res.send("User already exists with this wallet address");
    }
    else {
        return res.status(400).send("User not found");
    }
})

router.post("/password", async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        const match = bcrypt.compareSync(password, user.password);
        
        if (match) {
            return (
                res.send(match)
            )
        }
    }
})

module.exports = router;
