const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

// Serve frontend files from public folder
app.use(express.static("public"));


// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("Blog Module 3 API is running!");
});


// ===============================
// AUTH ROUTES
// ===============================

app.use("/api/auth", require("./routes/auth"));


// ===============================
// BLOG ROUTES
// ===============================

// We will create routes/blogs.js next
app.use("/api/blogs", require("./routes/blogs"));


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
    .catch((error) => {

        console.log("MongoDB connection failed:");
        console.log(error.message);

    });