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
router.post("/register", async (req, res) => {

    // const { email } = req.body;
    const { lastName, firstName, email, walletAddress, role } = req.body;
    //Hash Password
    const password = bcrypt.hashSync(req.body.password, 10);
    // Checking User
    let admin = await Admin.findOne({ email });
    if (admin) {
        return res.status(400).send("User already exists with this email");
    }

    // Save User Into Database
    admin = new Admin({ lastName, firstName, email, walletAddress, password, role });
    await admin.save();

    //generate JWT token
    const jwtData = {_id: admin.id, name: admin.email, walletAddress: admin.walletAddress, role: admin.role}
    const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "2h"})

    res.send(token);
});

router.delete("/delete/:id", async (req, res) => {
    Admin.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => {
        console.log(doc);
        res.send("Admin Deleted Successfully");
    })
    .catch((err) => console.log(err));
});

router.put("/edit/:id", async (req, res) => {
    Admin.findByIdAndUpdate({ _id: req.params.id }, {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        walletAddress: req.body.walletAddress,
    })
    .then((doc) => {
        console.log(doc);
        res.send("User Updated Successfully");
    })
    .catch((err) => console.log(err));
});

router.get("/view", async (req, res) => {
    Admin.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/email", async (req, res) => {
    const { email } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin) {
        return res.status(400).send("User already exists with this email");
    }
});

router.post("/wallet", async (req, res) => {
    const { walletAddress } = req.body;
    let admin = await Admin.findOne({ walletAddress }).collation({locale: 'en', strength: 1});
   
    if (admin) {
        return res.status(400).send("User already exists with this wallet address");
    }
})

router.post("/role", async (req, res) => {
    const { email } = req.body;
    let admin = await Admin.findOne({ email });
    if (admin) {
        return res.send(admin.role)
    }
});

module.exports = router;
