const express = require("express");
const router = express.Router();
const COC = require("../models/COC");

router.get("/load", async (req, res) => {
    COC.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", async (req, res) => {

    const { email, walletAddress, lastName, firstName, cyls, election, position, politicalParty, dp, approvalStatus } = req.body;

    const coc = new COC({  email, walletAddress, lastName, firstName, cyls, election, position, politicalParty, dp, approvalStatus });
    await coc.save();
    
    res.send("COC Added!");
});

router.post("/approve", async (req, res) => {
  const { id } = req.body;

  await COC.findOneAndUpdate(
      {"_id": id},
      {$set: 
          {"approvalStatus": "Approved"}
      }
  )
  .then((res) => res.send("COC Approved!"))
  .catch((err) => res.send(err))
});

router.post("/disapprove", async (req, res) => {
  const { id } = req.body;

  await COC.findOneAndUpdate(
      {"_id": id},
      {$set: 
          {"approvalStatus": "Disapproved"}
      }
  )
  .then((res) => res.send("COC Disapproved!"))
  .catch((err) => res.send(err))
});

router.post("/pending", async (req, res) => {
  const { id } = req.body;

  await COC.findOneAndUpdate(
      {"_id": id},
      {$set: 
          {"approvalStatus": "Pending"}
      }
  )
  .then((res) => res.send("COC moved to Pending"))
  .catch((err) => res.send(err))
});

router.post('/upload', function(req, res) {
  let filename = req.body.gendpname;
  filename = filename.substring(0, filename.lastIndexOf("."));
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } else {
    let uploadedFiles = req.files.filereqs;
    let len = req.files.filereqs.length;

    for (let i = 0; i < len; i++) {

      uploadedFiles[i].mv(__dirname + '/../uploads/' + filename + "(" + i + ")" + "_" + uploadedFiles[i].name, function(err) {
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
