# Live Event Manager(prototype)

## About
The Live Event Manager is a web software that's manage changing orders
of programmes of ongoing event which help to coordinate between team 
members and notify correct sequence of upcoming program to audience.

## Technology For Prototype
Frontend : HTML, CSS and JS
Backend : Django, Django Rest Framework
Database : SQLLite

## Entity And Relations
Entity_1 : Event(eventName, discription, startTime, endTime)
Entity_2 : Program(event, programOrderNumber, programName, discription)
Relation : Event -(1 to many)-> Program