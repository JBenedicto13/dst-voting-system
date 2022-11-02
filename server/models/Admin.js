const mongoose = require("mongoose");
mongoose.pluralize(null);

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    walletAddress: { type: String },
    password: { type: String, required: true },
});

module.exports = mongoose.model("adminAccount", adminSchema);
