const API = "http://127.0.0.1:8000/api/event/"
let allEvents = []

const token = localStorage.getItem("token")

const authBtn = document.getElementById("authBtn")

if(token){

    authBtn.innerText = "Dashboard"
    authBtn.href = "../pages/dashboard.html"

}else{

    authBtn.innerText = "Login"
    authBtn.href = "../pages/login.html"

}


async function loadEvents(){

    const res = await fetch(API)

    const data = await res.json()

    allEvents = data

    displayEvents(allEvents)

}


function displayEvents(events){

    const container = document.getElementById("eventsContainer")

    container.innerHTML = ""

    if(events.length === 0){

        container.innerHTML = "<p>No events found</p>"

        return
    }

    events.forEach(event => {

        const card = document.createElement("div")

        card.className = "event-card"
        
        card.innerHTML = `
        
        <h3>${event.eventName}</h3>
        <b>${event.organizer_name}</b>

        <p>${event.description}</p>

        <a href="../pages/event.html?id=${event.id}" class="watch-btn">
        Watch
        </a>

        `

        container.appendChild(card)

    })

}

document
.getElementById("searchInput")
.addEventListener("keyup", function(){

    const query = this.value.toLowerCase()

    const filteredEvents = allEvents.filter(event =>
        event.eventName.toLowerCase().includes(query)
    )

    displayEvents(filteredEvents)

})


loadEvents()