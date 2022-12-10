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

router.post("/members/add", async (req, res) => {
    const { orgName, email } = req.body;

    await Organizations.updateOne(
        {"orgName": orgName}, 
        {$push: {"members": {
            "email": email, "isVoted": false
        }}
        }
    )
    .then(() => res.send("Member Added Successfully"))
    .catch((err) => res.send(err))

});

router.post("/members/castvote", async (req, res) => {
    const { orgName, email } = req.body;

    await Organizations.findOneAndUpdate(
        {"orgName": orgName, "members.email": email},
        {$set: 
            {"members.$.isVoted": true}
        }
    )
    .then((res) => res.send("You voted successfully. Please wait for the final result in the tally page"))
    .catch((err) => res.send(err))
});

router.post("/members/isVoted", async (req, res) => {
    const { orgName, email } = req.body;
    await Organizations.findOne(
        {"orgName": orgName, "members.email": email},
        {
            "members.$": 1
        }
    )
    .then((doc) => {
        if (doc) {
            res.send(doc.members);
        } else {
            res.send("No matching document found");
        }
    })
    .catch((err) => res.send(err))
    

});
//"walletAddress": { $regex: req.body.walletAddress, $options: 'i'}

module.exports = router;
