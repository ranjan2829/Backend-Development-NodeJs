const express = require("express");
const app = express();

// Set the view engine
app.set("view engine", "ejs");

// Middleware to parse JSON body
app.use(express.json());

// Root route (from index.js)
app.get("/", (req, res) => {
    res.send("Hello there from index.js!");
});

// GET route (from modules.js)
app.get("/module", (req, res) => {
    res.send("Hello there from the module route!");
});

// POST route to receive and return sample data (from modules.js)
app.post("/api/data", (req, res) => {
    res.json({
        message: "Data Received",
        data: req.body, // Parsed JSON data
    });
});

// Middleware for error handling (from modules.js)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
