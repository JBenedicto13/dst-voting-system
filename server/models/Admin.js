const mongoose = require("mongoose");
mongoose.pluralize(null);

const adminSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    walletAddress: { type: String },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

module.exports = mongoose.model("adminAccount", adminSchema);
