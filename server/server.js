const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDB");
const app = express();
const PORT = process.env.PORT;
const fileUpload = require('express-fileupload');



// import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const checkRoutes = require("./routes/check");
const adminRoutes = require("./routes/admin");
const electionRoutes = require("./routes/election");
const organizationsRoutes = require("./routes/organizations");
const cocRoutes = require("./routes/coc");
const pageStates = require("./routes/pagestates");

app.use(express.json());
app.use(cors());
app.use(fileUpload());

// defining routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/check", checkRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/election", electionRoutes);
app.use("/api/organizations", organizationsRoutes);
app.use("/api/coc", cocRoutes);
app.use("/api/pagestates", pageStates);


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
