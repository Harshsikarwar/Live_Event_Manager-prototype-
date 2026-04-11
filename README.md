# 🎤 Live Event Manager (SyncStage)

A dynamic web-based solution designed to manage real-time changes in live events.  
This system helps organizers, team members, and audiences stay synchronized with the latest program flow.

---

## 📌 Problem Statement

In live events, schedules often change due to delays, cancellations, or adjustments.  
These updates are usually communicated manually, leading to:

- Confusion among organizers and teams  
- Miscommunication with the audience  
- Inefficient coordination  

---

## 🚀 Solution

**Live Event Manager (SyncStage)** provides a centralized platform where:

- Events can be created and managed easily  
- Programs can be reordered dynamically  
- Updates are reflected in real-time  
- All stakeholders stay informed instantly  

---

## ✨ Features

- 📅 Create and manage events  
- 🧩 Add multiple programs under an event  
- 🔄 Real-time program reordering  
- ✏️ Update or delete programs instantly  
- 📡 Live synchronization across users  
- 🤝 Better coordination between team and audience  

---

## 🛠️ Tech Stack

**Frontend**
- HTML  
- CSS  
- JavaScript  

**Backend**
- Django  
- Django REST Framework  

**Database**
- SQLite  

---

## 🧱 System Design

### Entities

- **Event**
  - organizer  
  - eventName  
  - description  
  - startTime  
  - endTime  

- **Program**
  - event (Foreign Key)  
  - programOrderNumber  
  - programName  
  - description  

### Relationship

- One **Event** ➝ Many **Programs**  
  *(1:N relationship)*  

---

## ⚖️ Comparison with Existing Solutions

| Feature                | Traditional Tools | Live Event Manager |
|----------------------|------------------|-------------------|
| Real-time updates     | ❌ No             | ✅ Yes            |
| Centralized system    | ❌ No             | ✅ Yes            |
| Dynamic reordering    | ❌ No             | ✅ Yes            |
| Manual communication  | ✅ Required       | ❌ Not needed     |

---

## 🎯 Use Cases

- College fests  
- Conferences & seminars  
- Cultural events  
- Hackathons  
- Any live program-based event  

---

## 📈 Future Improvements

- 🔔 Push notifications for updates  
- 📱 Mobile app integration  
- 👥 Role-based access control  
- 🌐 WebSocket-based real-time updates  
- 📊 Analytics dashboard  

---

## 📌 Conclusion

Live Event Manager simplifies handling of dynamic event schedules by providing real-time updates and a centralized system.  
It reduces confusion, improves coordination, and enhances the overall event experience.
