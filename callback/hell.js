const fs=require("fs");
fs.readFile("input.txt","utf8",(err,data)=>{
    if (err){
        console.log("err",err);
        return;
    }
    const mod=data.toUpperCase();
    console.log(mod);
})