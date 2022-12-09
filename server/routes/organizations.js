const express = require("express");
const router = express.Router();
const Organizations = require("../models/Organizations");

router.get("/load", async (req, res) => {
    Organizations.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", async (req, res) => {

    const { orgName } = req.body;

    organization = new Organizations({  orgName });
    await organization.save();
    
    res.send("Organization Added!");
});

module.exports = router;
