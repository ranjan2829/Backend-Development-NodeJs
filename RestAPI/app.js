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
app.put("/update/:id",(req,res)=>{
    const find=books.find(
        (bookitem) =>bookitem.id ===req.params.id
    );
    if(find){
        find.title=req.body.title || find.title;
    
        res.status(200).json({
            message:"Book id updated",
            data:find
        });
    }
    else{
        res.status(404).json({
            message:"Book not Found",
        });
    }


});
app.delete("/delete/:id",(req,res)=>{
    const find=books.findIndex(
        (item)=>item.id===req.params.id
    );
    if(find!==-1){
        const deleteBook=books.splice(find,1);
        res.status(200).json({
            message:"Book deleted",
            data:deleteBook[0],

        });


    }
    else{
        res.status(404).json({
            message:"Book not Found",
        });
    }

});
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log("Server started!");
});
