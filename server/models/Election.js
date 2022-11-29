const mongoose = require("mongoose");
mongoose.pluralize(null);

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    abi: { type: String, required: true },
    voted: { type: Number },
    voters: { type: Number },
});

module.exports = mongoose.model("eventsData", electionSchema);
