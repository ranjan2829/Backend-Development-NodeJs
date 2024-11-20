const http=require("http");
const server=http.createServer((req,res)=>{
    console.log("server created at port 3000");
    
    const url=req.url;
    if (url==="/"){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("HI Ranjan here!!");

    }
    if(url==="/me"){
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("Routed Page!");

    }


});

server.listen(3002);
