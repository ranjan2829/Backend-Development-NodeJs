const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    res.send("Welcome to GOa singham !")

});
app.get("/products",(req,res)=>{
    const products=[
        {
            id:1,
            label:"PRoduct 1"
        },
        {
            id:2,
            label:"prod 2"

        },
        {
            id:3,
            label:"prod 3"
        }
    ]
    res.json(products);
})
const port =3000;
app.listen(port,()=>{
    console.log("the server has started MF!");
});