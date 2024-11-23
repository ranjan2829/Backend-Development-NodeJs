const express = require("express");
const app = express();

app.use(express.json());

let books = [
    { id: '1', title: "Book 1" },
    { id: '2', title: "Book 2" },
    { id: '3', title: "Book 3" },
    { id: '4', title: "Book 4" },
    { id: '5', title: "Book 5" }
];

// Welcome message
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Goa Singham!"
    });
});

// Get all books
app.get("/get", (req, res) => {
    res.json(books);
});

// Get a book by ID
app.get("/get/:id", (req, res) => {
    const book = books.find(item => item.id === req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Add a new book
app.post("/add", (req, res) => {
    const newBook = {
        id: (books.length + 1).toString(), // Convert ID to string
        title: `Book ${books.length + 1}`
    };
    books.push(newBook);
    res.status(201).json(newBook); // Status 201 for resource creation
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log("Server started!");
});
