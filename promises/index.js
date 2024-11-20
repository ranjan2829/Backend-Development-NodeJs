function pro(time){
    return new Promise((resolve)=>setTimeout(resolve,time));
}
console.log("done and end");
pro(10000).then(()=>{
    console.log('done');
});