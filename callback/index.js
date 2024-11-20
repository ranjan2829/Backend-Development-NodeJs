const fs=require("fs");
function person(name,fn){
    console.log("hi ${name}");
    fn();


}
function address(){
    console.log("addressssssss");
}
person("ranjan",address);
fs.readFile("input.txt","utf8",(err,data)=>{
    if (err){
        console.log("errorororor",err);
        return;

    }
    console.log(data);
});
