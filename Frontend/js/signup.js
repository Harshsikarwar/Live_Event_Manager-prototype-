const API = "http://127.0.0.1:8000/auth/signup/"


document
.getElementById("signupForm")
.addEventListener("submit", async function(e){

e.preventDefault()

const username =
document.getElementById("username").value

const email =
document.getElementById("email").value

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
email:email,
password:password
})

})


const data = await res.json()

if(res.ok){

alert("Signup successful!")

localStorage.setItem("token",data.token)

window.location.href="home.html"

}else{

alert("Signup failed")

}

}catch(err){

alert("Server error")

}

})