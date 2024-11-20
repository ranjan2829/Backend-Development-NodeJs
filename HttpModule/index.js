const http=require("http");
const server=http.createServer((req,res)=>{
    console.log(req,"req");
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("hi");

})
server.listen(3001);