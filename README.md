Simple Video on Demand Demo
====
VOD
---
This is a simple Media App VOD (Video On-Demand) application demo that also keeps track of 
a list of videos the user has watched.  

Playlist can be controlled by keyboard arrow keys and enter, mouse or touch screen with scroll.

How to install
----
**STEP 1:** Clone the whole project in a apache hosting  

**STEP 2:** run the following SQL in database
```
CREATE TABLE IF NOT EXISTS `ci_sessions` (
        `id` varchar(40) NOT NULL,
        `ip_address` varchar(45) NOT NULL,
        `timestamp` int(10) unsigned DEFAULT 0 NOT NULL,
        `data` blob NOT NULL,
        KEY `ci_sessions_timestamp` (`timestamp`)
);
```
**STEP 3:** Setup database connection in backend/application/config/database.php

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
