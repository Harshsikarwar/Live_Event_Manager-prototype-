const API = "http://127.0.0.1:8000/auth/login/"

document
.getElementById("loginForm")
.addEventListener("submit", async function(e){

e.preventDefault()

const username =
document.getElementById("username").value

const password =
document.getElementById("password").value


try{

const res = await fetch(API,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username:username,
password:password
})

})


const data = await res.json()

if(res.ok){

localStorage.setItem("token",data.token)

alert("Login successful")

window.location.href="home.html"

}else{

alert("Invalid credentials")

}

}catch(err){

alert("Server error")

}

})