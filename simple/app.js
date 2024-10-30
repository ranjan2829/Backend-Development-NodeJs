const id=setInterval(()=>console.log("l0l"),2000);

setTimeout(function(){
    clearInterval(id)
    console.log("interval stopped")
},10000)