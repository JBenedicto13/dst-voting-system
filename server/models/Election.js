const mongoose = require("mongoose");
mongoose.pluralize(null);

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    abi: { type: String, required: true },
    positions: [{
        posTitle: { type: String },
        number: { type: Number }
    }],
    partylists: [{
        partylistTitle: { type: String },
    }],
    voted: { type: Number },
    voters: { type: Number },
    isStart: { type: Boolean },
});

module.exports = mongoose.model("eventsData", electionSchema);
