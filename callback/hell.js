const fs=require("fs");
fs.readFile("input.txt","utf8",(err,data)=>{
    if (err){
        console.log("err",err);
        return;
    }
    const mod=data.toUpperCase();
    fs.appendFile("output.txt",mod,(err)=>{
        if (err){
            console.log("err",err);
            return;
        }
        console.log("data donenenenen")


    }
    )
    console.log(mod);
})