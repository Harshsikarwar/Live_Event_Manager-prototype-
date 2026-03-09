const API = "http://127.0.0.1:8000/api/event/"
const USER_API = "http://127.0.0.1:8000/auth/user/"

const token = localStorage.getItem("token")

/* =========================
   CHECK LOGIN
========================= */

if(!token){
    window.location.href = "login.html"
}


/* =========================
   LOAD USERNAME
========================= */

async function loadUser(){

    try{

        const res = await fetch(USER_API,{
            headers:{
                "Authorization":"Token " + token
            }
        })

        const data = await res.json()

        document.getElementById("usernameBox").innerText = data.username

    }catch(err){
        console.log("User fetch error")
    }

}


/* =========================
   LOAD EVENTS
========================= */

async function loadEvents(){

    try{

        const res = await fetch(API,{
            headers:{
                "Authorization":"Token " + token
            }
        })

        const events = await res.json()

        const container = document.getElementById("eventsList")

        container.innerHTML = ""

        events.forEach(event => {

            const div = document.createElement("div")

            div.className = "event-item"

            div.innerHTML = `
            
            <span>${event.eventName}</span>

            <div class="event-actions">

                <button class="edit-btn"
                onclick="editEvent(${event.id})">
                Edit
                </button>

                <button class="delete-btn"
                onclick="deleteEvent(${event.id})">
                Delete
                </button>

            </div>
            
            `

            container.appendChild(div)

        })

    }catch(err){
        console.log("Event loading error")
    }

}


/* =========================
   DELETE EVENT
========================= */

async function deleteEvent(id){

    if(!confirm("Delete this event?")) return

    await fetch(API + id + "/",{

        method:"DELETE",

        headers:{
            "Authorization":"Token " + token
        }

    })

    loadEvents()

}


/* =========================
   EDIT EVENT
========================= */

function editEvent(id){

    window.location.href = `edit_event.html?id=${id}`

}


/* =========================
   LOGOUT
========================= */

document
.getElementById("logoutBtn")
.addEventListener("click",function(){

    localStorage.removeItem("token")

    window.location.href = "login.html"

})


/* =========================
   INITIAL LOAD
========================= */

loadUser()
loadEvents()