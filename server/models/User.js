const mongoose = require("mongoose");
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    course: { type: String, required: true },
    yearLevel: { type: String, required: true },
    section: { type: String, required: true },
    isCandidate: { type: Boolean, required: true},
    candidate: [{
        id: { type: Number },
        electionName: { type: String },
        position: { type: String },
        partyList: { type: String },
        votes: { type: Number },
        isDeployed: { type: Boolean }
    }],
    isVoted: { type: Boolean },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    walletAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    expirationDate: { type: Number }
});

module.exports = mongoose.model("accountLogin", userSchema);
