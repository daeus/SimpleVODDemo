Simple Video on Demand Demo
====
VOD
---
This is a simple Media App VOD (Video On-Demand) application demo that also keeps track of 
a list of videos the user has watched.  

Playlist can be controlled by keyboard arrow keys and enter, mouse or touch screen with scroll.

Backend API End point
----
The backend consists of two method manipulate data of watched video by user. 
Data is saved as session in MySQL database. 


POST watched title to backend
```
POST backend/api

Data
String title(required)
```

GET the session data of user
```
GET backend/api
```
