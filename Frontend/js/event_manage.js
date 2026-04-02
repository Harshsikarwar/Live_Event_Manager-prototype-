const API = "http://127.0.0.1:8000/api/event/"
const token = localStorage.getItem("token")

const eventId = localStorage.getItem("eventId")

if(!eventId){

alert("Event not found")

window.location.href = "dashboard.html"

}

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

li.dataset.id = program.id

li.innerHTML = `
<span>${program.programOrderNumber}</span>
<span>${program.programName}</span>

<div>
<button onclick="editProgram(${program.id})">Edit</button>
<button onclick="deleteProgram(${program.programOrderNumber})">Delete</button>
</div>
`

container.appendChild(li)

})

}


/* DRAG DROP ORDER */

new Sortable(document.getElementById("programList"),{

animation:150,

onEnd:function(){
updateOrder()
}

})


/* UPDATE ORDER */

async function updateOrder(){

const items = document.querySelectorAll("#programList li")

let newPrograms = []

items.forEach((item,index)=>{

newPrograms.push({
id: item.dataset.id,
order: index + 1
})

})

await fetch(API + eventId + "/program/reorder/",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Token " + token
},

body: JSON.stringify({
programs: newPrograms
})

})

loadPrograms()

}


/* ADD PROGRAM */

async function addProgram(){

const name = prompt("Program name")

if(!name) return

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


/* EDIT PROGRAM */

async function editProgram(id){

const name = prompt("New program name")

if(!name) return

await fetch(API + eventId + "/program/" + id + "/",{

method:"PUT",

headers:{
"Content-Type":"application/json",
"Authorization":"Token " + token
},

body: JSON.stringify({
programName: name
})

})

loadPrograms()

}


/* DELETE PROGRAM */

async function deleteProgram(id){

    if(!confirm("Delete program?")) return

    await fetch(API + eventId + "/program/" + id + "/",{

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


/* INITIAL LOAD */

loadEvent()
loadPrograms()