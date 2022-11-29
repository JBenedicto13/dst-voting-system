const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDB");
const app = express();
const PORT = process.env.PORT;

// import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const checkRoutes = require("./routes/check");
const adminRoutes = require("./routes/admin");
const electionRoutes = require("./routes/election");

app.use(express.json());
app.use(cors());

// defining routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/check", checkRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/election", electionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
