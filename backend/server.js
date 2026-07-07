const express = require("express");
const cors = require("cors");
const path = require("path");

const { connectDB } = require("./db");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Home Route
app.get("/", (req, res) => {
    res.send("Student Registration API Running");
});

// Student Routes
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});