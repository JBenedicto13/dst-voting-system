const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

//User Information
router.get("/", auth, async (req, res) => {
    const profile = await Admin.findById(req.admin._id);
    res.send(profile);
})

// Register User
router.post("/", async (req, res) => {

    // const { email } = req.body;
    const { lastName, firstName, email, walletAddress } = req.body;
    //Hash Password
    const password = bcrypt.hashSync(req.body.password, 10);
    // Checking User
    let admin = await Admin.findOne({ email });
    if (admin) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    admin = new Admin({ lastName, firstName, email, walletAddress, password });
    await admin.save();

    //generate JWT token
    const jwtData = {_id: admin.id, name: admin.email, walletAddress: admin.walletAddress}
    const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "2h"})
    sessionStorage.setItem('admin-wallet', admin.walletAddress)

    res.send(token);
});


module.exports = router;
