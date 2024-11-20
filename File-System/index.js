const fs=require("fs");
const path=require("path");
const dataFolder=path.join(__dirname,"data");
if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
    console.log("Created");
}
const filePath=path.join(dataFolder,"exam.txt");
fs.writeFileSync(filePath,"Hello , !");
console.log("file created !")