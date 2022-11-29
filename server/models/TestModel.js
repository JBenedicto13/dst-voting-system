const mongoose = require("mongoose");
mongoose.pluralize(null);

const testSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
});

module.exports = mongoose.model("testModel", testSchema);
