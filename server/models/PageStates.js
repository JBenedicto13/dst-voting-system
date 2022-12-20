const mongoose = require("mongoose");
mongoose.pluralize(null);

const pagestatesSchema = new mongoose.Schema({
    name: { type: String },
    status: { type: Boolean },
});

module.exports = mongoose.model("pagestatesData", pagestatesSchema);
