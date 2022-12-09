const mongoose = require("mongoose");
mongoose.pluralize(null);

const organizationsSchema = new mongoose.Schema({
    orgName: { type: String, required: true },
    members: [{
        email: { type: String },
        isVoted: { type: Boolean }
    }]
});

module.exports = mongoose.model("organizationsData", organizationsSchema);
