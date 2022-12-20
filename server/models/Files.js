const mongoose = require("mongoose");
mongoose.pluralize(null);

const filesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { data: Buffer, contentType: String }
});

module.exports = mongoose.model("filesData", filesSchema);
