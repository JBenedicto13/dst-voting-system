const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Login Route
router.post("/", async (req, res) => {
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
        const jwtData = {_id: admin.id, email: admin.username}
        const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "2h"})

        res.send(token);
    } else {
        return res.status(400).send("Invalid Email or Password");
    }
});