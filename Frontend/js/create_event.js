const API = "http://127.0.0.1:8000/api/event/"
const token = localStorage.getItem("token")

if(!token){
    window.location.href = "login.html"
}

document.getElementById("createEventForm")
.addEventListener("submit", async function(e){

    e.preventDefault()

    const eventName = document.getElementById("eventName").value
    const description = document.getElementById("description").value

    let startTime = document.getElementById("startTime").value
    let endTime = document.getElementById("endTime").value

    if(startTime){
        startTime = startTime + ":00"
    }

    let bodyData = {
        eventName: eventName,
        description: description,
        startTime: startTime
    }

    if(endTime){
        bodyData.endTime = endTime + ":00"
    }

    try{

        const res = await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "Authorization":"Token " + token
            },

            body: JSON.stringify(bodyData)

        })

        const data = await res.json()

        console.log(data)

        if(res.ok){

            alert("Event created successfully")

            window.location.href = "dashboard.html"

        }else{

            alert("Error: " + JSON.stringify(data))

        }

    }catch(err){

        console.log(err)

        alert("Server error")

    }

})