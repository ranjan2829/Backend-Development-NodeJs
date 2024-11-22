const express=require("express");
const app=express();

app.use(express.json());
let books=[
    {
        id:'1',
        title:"Book 1"
    },
    {
        id:'2',
        title:"Book 2"
    },
    {
        id:'3',
        title:"Book 3"
    },
    {
        id:'4',
        title:"Book 4"
    },
    {
        id:'5',
        title:"Book 5"
    }
];
app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to goa singham !"
    });
})
app.get("get",(req,res)=>{
    res.json(books);
})
const port=3000;
app.listen(port,()=>{
    console.log("started!");
});