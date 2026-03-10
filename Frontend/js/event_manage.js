const API = "http://127.0.0.1:8000/api/event/"
const token = localStorage.getItem("token")

const params = new URLSearchParams(window.location.search)
const eventId = params.get("id")

let programs = []


/* LOAD EVENT */

async function loadEvent(){

const res = await fetch(API + eventId + "/")

const data = await res.json()

document.getElementById("eventName").value = data.eventName
document.getElementById("eventDescription").value = data.description

}


/* LOAD PROGRAMS */

async function loadPrograms(){

const res = await fetch(API + eventId + "/program/")

programs = await res.json()

renderPrograms()

}


/* RENDER PROGRAMS */

function renderPrograms(){

const container = document.getElementById("programList")

container.innerHTML = ""

programs.forEach(program => {

const li = document.createElement("li")

li.dataset.id = program.programOrderNumber

li.innerHTML = `
<span>${program.programOrderNumber}</span>
<span>${program.programName}</span>

<div>
<button onclick="editProgram(${program.programOrderNumber})">Edit</button>
<button onclick="deleteProgram(${program.programOrderNumber})">Delete</button>
</div>
`

container.appendChild(li)

})

}


/* DRAG DROP ORDER */

new Sortable(document.getElementById("programList"),{

animation:150,

onEnd: function(){

updateOrder()

}

})


/* UPDATE ORDER */

async function updateOrder(){

const items = document.querySelectorAll("#programList li")

let order = 1

for(const item of items){

const id = item.dataset.id

await fetch(API + eventId + "/program/" + id + "/",{

method:"PUT",

headers:{
"Content-Type":"application/json",
"Authorization":"Token " + token
},

body:JSON.stringify({
programOrderNumber: order
})

})

order++

}

loadPrograms()

}


/* ADD PROGRAM */

async function addProgram(){

const name = prompt("Program name")

await fetch(API + eventId + "/program/",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Token " + token
},

body:JSON.stringify({
programName:name,
programOrderNumber: programs.length + 1
})

})

loadPrograms()

}


/* DELETE PROGRAM */

async function deleteProgram(order){

await fetch(API + eventId + "/program/" + order + "/",{

method:"DELETE",

headers:{
"Authorization":"Token " + token
}

})

loadPrograms()

}


/* UPDATE EVENT */

async function updateEvent(){

const name = document.getElementById("eventName").value
const desc = document.getElementById("eventDescription").value

await fetch(API + eventId + "/",{

method:"PUT",

headers:{
"Content-Type":"application/json",
"Authorization":"Token " + token
},

body:JSON.stringify({
eventName:name,
description:desc
})

})

alert("Event updated")

}


loadEvent()
loadPrograms()