const mongoose = require("mongoose");
mongoose.pluralize(null);

const cocSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    walletAddress: { type: String, required: true, unique: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    cyls: { type: String, required: true },
    election: { type: String },
    position: { type: String },
    politicalParty: { type: String },
    dp: { type: String }
});

module.exports = mongoose.model("cocData", cocSchema);
