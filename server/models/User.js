const mongoose = require("mongoose");
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    walletAddress: { type: String, required: true,  collation: {
        locale: 'en', strength: 1
    } },
    password: { type: String, required: true },
});

module.exports = mongoose.model("accountLogin", userSchema);
