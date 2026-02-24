# Task Pilot
TaskPilot Backend is a Spring Boot REST API for managing employee task assignments and tracking. Managers can create and assign tasks, while employees can update task status. Built with Java, Spring Boot, JPA, and MySQL, it follows a clean layered architecture for scalability and maintainability.
🚀 TaskPilot Backend
<p align="center">










</p>

📝 Employee Task Assignment & Tracking System
Built with clean architecture using Spring Boot.

📌 Overview

TaskPilot Backend is a RESTful API system designed to manage:

👤 User Registration & Authentication

🗂 Task Creation & Assignment

🔄 Task Updates

❌ Task Deletion

📊 Status Tracking

Designed with scalable backend architecture:

Controller → Service → Repository → Database
🏗 Architecture
src/
 ├── controller/     → REST APIs
 ├── service/        → Business Logic
 ├── repository/     → Data Access Layer
 ├── model/          → Entity Classes
 ├── config/         → Security & App Config
 └── resources/
       └── application.properties
🛠 Tech Stack
Technology	Purpose
Java 17+	Core Language
Spring Boot 3.x	Backend Framework
Spring Data JPA	ORM
MySQL 8+	Database
Maven	Build Tool
Postman	API Testing
⚙️ Local Setup Guide
1️⃣ Clone the Repository
git clone https://github.com/your-username/taskpilot-backend.git
cd taskpilot-backend
2️⃣ Create Database
CREATE DATABASE taskpilot_db;
3️⃣ Configure Database

Update:

src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskpilot_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
server.port=8080
4️⃣ Install Dependencies
mvn clean install
5️⃣ Run Application
mvn spring-boot:run

OR

java -jar target/taskpilot-0.0.1-SNAPSHOT.jar

Application runs at:

http://localhost:8080
🔗 API Endpoints
👤 Authentication
Method	Endpoint	Description
POST	/signup	Register new user
POST	/login	Login user
📝 Task Management
Method	Endpoint	Description
POST	/create-task	Create new task
PUT	/update-task/{id}	Update task
DELETE	/delete-task/{id}	Delete task
GET	/tasks	Fetch all tasks
🧪 Testing with Postman

Base URL:

http://localhost:8080

Example JSON:

{
  "title": "Complete Report",
  "description": "Finish DBMS documentation",
  "status": "PENDING"
}
🌍 Exposing Local Server (Optional)

Use ngrok:

ngrok http 8080

Public URL example:

https://abc123.ngrok-free.app

Useful for:

Mobile frontend testing

Webhook testing

Live demo to clients

🔐 Security Best Practices

Never push real credentials to GitHub

Use .gitignore

Use environment variables

Implement JWT Authentication (recommended for production)

Enable HTTPS in production
