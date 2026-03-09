const API = "http://127.0.0.1:8000/api/event/"
const token = localStorage.getItem("token")

/* ===== CHECK LOGIN ===== */

if (!token) {
    window.location.href = "login.html"
}


/* ===== CREATE EVENT ===== */

document
.getElementById("createEventForm")
.addEventListener("submit", async function (e) {

    e.preventDefault()

    const eventName = document.getElementById("eventName").value
    const description = document.getElementById("description").value

    let startTime = document.getElementById("startTime").value
    let endTime = document.getElementById("endTime").value

    /* Fix datetime format (add seconds) */

    if (startTime) {
        startTime = startTime + ":00"
    }

    if (endTime) {
        endTime = endTime + ":00"
    }

    try {

        const res = await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + token
            },

            body: JSON.stringify({
                eventName: eventName,
                description: description,
                startTime: startTime,
                endTime: endTime
            })

        })

        const data = await res.json()

        console.log(data)

        if (res.ok) {

            alert("Event created successfully")

            window.location.href = "dashboard.html"

        } else {

            alert("Error creating event")

        }

    } catch (error) {

        console.log(error)

        alert("Server error")

    }

})