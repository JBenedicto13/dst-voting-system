const mongoose = require("mongoose");
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    course: { type: String, required: true },
    yearLevel: { type: String, required: true },
    section: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    walletAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("accountLogin", userSchema);
