const express = require("express");
const router = express.Router();
const COC = require("../models/COC");

router.get("/load", async (req, res) => {
    COC.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", async (req, res) => {

    const { email, walletAddress, lastName, firstName, cyls, electionName, position, politicalParty, dp } = req.body;

    const coc = new COC({  email, walletAddress, lastName, firstName, cyls, electionName, position, politicalParty, dp });
    await coc.save();
    
    res.send("COC Added!");
});

router.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } else {
    let uploadedFiles = req.files.filereqs;
    let len = req.files.filereqs.length;

    for (let i = 0; i < len; i++) {

      uploadedFiles[i].mv(__dirname + '/../uploads/' + uploadedFiles[i].name, function(err) {
        if (err) {
          return res.status(500).send("One or more files failed to upload")
        }
        console.log(uploadedFiles[i].name + " has been Uploaded!")
      })
    }
    res.send("Files Uploaded!");
  }
})

router.post('/dpupload', function(req, res) {
  let gendpname = req.body.gendpname;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No image was uploaded');
  } else {
    let uploadedImage = req.files.dpname;

    uploadedImage.mv(__dirname + '/../dp_uploads/' + gendpname, function(err) {
      if (err) {
        return res.status(500).send("One or more files failed to upload")
      }
      res.send("Files Uploaded!");
    })
    
  }
})

module.exports = router;
