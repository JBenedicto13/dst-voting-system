const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
    const email = req.body.email;
    const profile = await User.findOne({email});
    res.send(profile);
})

module.exports = router;
