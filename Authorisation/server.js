const express = require("express");
const path = require("path");

const connectToDatabase = require("./Database/database");


const app = express();
const PORT = 3000;
connectToDatabase();



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.listen(PORT, () => {
    console.log("Server started MF!");
});
