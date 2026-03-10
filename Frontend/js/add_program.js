const API = "http://127.0.0.1:8000/api/event/"

const token = localStorage.getItem("token")

const eventId = localStorage.getItem("eventId")

if(!eventId){
alert("Event not found")
window.location.href = "dashboard.html"
}


document.getElementById("programForm")
.addEventListener("submit", async function(e){

e.preventDefault()

const name =
document.getElementById("programName").value

const description =
document.getElementById("description").value

const orderNumber =
document.getElementById("orderNumber").value

const status =
document.getElementById("status").value


const res = await fetch(API + eventId + "/program/",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Token " + token
},

body:JSON.stringify({
programName:name,
description:description,
programOrderNumber:orderNumber,
status:status
})

})

const data = await res.json()

console.log(data)

alert("Program added")

window.location.href =
"event_manage.html?id=" + eventId

})