const API = "http://127.0.0.1:8000/api/event/"

const params = new URLSearchParams(window.location.search)

const eventId = params.get("id")


async function loadEvent(){

const res = await fetch(API + eventId + "/")

const data = await res.json()

document.getElementById("eventName").innerText = data.eventName

document.getElementById("eventDescription").innerText = data.description

}


async function loadPrograms(){

const res = await fetch(API + eventId + "/program/")

const programs = await res.json()

const container = document.getElementById("programList")

programs.forEach(program => {

let statusClass = "upcoming"

let statusText = "upcoming"

if(program.status === "live"){
statusClass = "live"
statusText = "Live"
}

if(program.status === "end"){
statusClass = "end"
statusText = "end"
}

const div = document.createElement("div")

div.className = "program-item"

div.innerHTML = `
<div class="program-left">
<strong>${program.programOrderNumber}</strong>
<span>${program.programName}</span>
</div>

<span class="status ${statusClass}">
${statusText}
</span>
`

container.appendChild(div)

})

}

loadEvent()
loadPrograms()