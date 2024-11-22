const express = require("express");
const router = express.Router();

// Set EJS as the view engine


// GET route
router.get("/", (req, res) => {
    res.send("Hello there from modules.js!");
});

// POST route to receive and return sample data
router.post("/api/data", (req, res) => {
    res.json({
        message: "Data Received",
        data: req.body, // Parsed JSON data
    });
});

// Middleware for error handling
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

module.exports = router;
