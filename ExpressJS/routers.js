const express = require("express");
const app = express();

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to GOa singham !");
});

// Products route to fetch all products
app.get("/products", (req, res) => {
    const products = [
        { id: 1, label: "Product 1" },
        { id: 2, label: "Product 2" },
        { id: 3, label: "Product 3" },
    ];
    res.json(products);
});

// Route to fetch a single product by ID
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id); // Extract product ID from params
    const products = [
        { id: 1, label: "Product 1" },
        { id: 2, label: "Product 2" },
        { id: 3, label: "Product 3" },
    ];
    const getSingle = products.find(product => product.id === productId);

    if (getSingle) {
        res.json(getSingle); // Return the single product if found
    } else {
        res.status(404).json({ message: "Product not found" }); // Return 404 if not found
    }
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log("The server has started MF!");
});
