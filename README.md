# Live Event Manager(prototype)
The Live Event Manager is a web software that's manage changing orders
of programmes of ongoing event which help to coordinate between team 
members and notify correct sequence of upcoming program to audience.

## Technology For Prototype
* __Frontend :__ HTML, CSS and JS
* __Backend :__ Django, Django Rest Framework
* __Database :__ SQLLite

## Entity And Relations
* __Entity_1 :__ Event(eventName, discription, startTime, endTime)
* __Entity_2 :__ Program(event, programOrderNumber, programName, discription)
* __Relation :__ Event -(1 to many)-> Program