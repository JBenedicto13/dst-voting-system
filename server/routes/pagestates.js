const express = require("express");
const router = express.Router();
const PageStates = require("../models/PageStates");

router.get("/load", async (req, res) => {
  PageStates.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", async (req, res) => {

    const { name, status } = req.body;

    const pagestates = new PageStates({  name, status });
    await pagestates.save();
    
    res.send("PageState Added!");
});

router.post("/changestatus", async (req, res) => {

  const { name, status } = req.body;
  if (status == true) {
    await PageStates.findOneAndUpdate(
      {"name": name},
      {$set: 
          {"status": false}
      }
    )
    .then((res) => res.send("Closed!"))
    .catch((err) => res.send(err))
  } else {
    await PageStates.findOneAndUpdate(
      {"name": name},
      {$set: 
          {"status": true}
      }
    )
    .then((res) => res.send("Open!"))
    .catch((err) => res.send(err))
  }
});

router.post("/find", async (req, res) => {
  const { name, status } = req.body;

  PageStates.findOne({ name })
    .then((items) => res.send(items))
    .catch((err) => res.send(err))

});

module.exports = router;
