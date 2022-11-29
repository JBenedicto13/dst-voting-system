const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/test", async (req, res) => {
    const { email } = req.body;
    return res.send(email);
})

router.post("/email", async (req, res) => {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).send("User already exists with this email");
    }
})

router.post("/wallet", async (req, res) => {
    const { walletAddress } = req.body;
    let user = await User.findOne({ walletAddress }).collation({locale: 'en', strength: 1});
   
    if (user) {
        return res.status(400).send("User already exists with this wallet address");
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