console.log(document.querySelector(".first").innerHTML)

const h2=document.createElement("h2")
h2.textContent="heyyyy";
h2.classList.add("greetings");
const body=document.body;
body.appendChild(h2);
console.log(h2);