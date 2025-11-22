# Student Management System

A simple RESTful API for managing students built with Spring Boot.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete students
- **Modern Web UI**: Beautiful, responsive user interface for managing students
- **RESTful API**: Clean REST endpoints for all operations
- **In-memory H2 Database**: Easy setup, no external database required
- **Data Validation**: Input validation for student data
- **CORS Enabled**: Ready for frontend integration

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## How to Run

### Using Maven

1. Navigate to the project directory
2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```

### Using Java

1. First, build the project:
   ```bash
   mvn clean install
   ```

2. Then run the JAR file:
   ```bash
   java -jar target/student-management-system-1.0.0.jar
   ```

The application will start on `http://localhost:8080`

## Access the Web UI

Once the application is running, open your browser and navigate to:
```
http://localhost:8080
```

The web interface provides:
- **Add Students**: Fill out the form to create new students
- **View Students**: See all students in a card-based layout
- **Edit Students**: Click the Edit button to modify student information
- **Delete Students**: Remove students with a confirmation dialog
- **Real-time Updates**: Automatic refresh after operations

## API Endpoints

### Get All Students
```
GET http://localhost:8080/api/students
```

### Get Student by ID
```
GET http://localhost:8080/api/students/{id}
```

### Create a New Student
```
POST http://localhost:8080/api/students
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "age": 20,
  "course": "Computer Science"
}
```

### Update a Student
```
PUT http://localhost:8080/api/students/{id}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "age": 21,
  "course": "Mathematics"
}
```

### Delete a Student
```
DELETE http://localhost:8080/api/students/{id}
```

## H2 Database Console

You can access the H2 database console at:
```
http://localhost:8080/h2-console
```

**Connection Details:**
- JDBC URL: `jdbc:h2:mem:studentdb`
- Username: `sa`
- Password: (leave empty)

## Example API Calls

### Using cURL

**Create a student:**
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 20,
    "course": "Computer Science"
  }'
```

**Get all students:**
```bash
curl http://localhost:8080/api/students
```

**Get student by ID:**
```bash
curl http://localhost:8080/api/students/1
```

**Update a student:**
```bash
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "age": 21,
    "course": "Mathematics"
  }'
```

**Delete a student:**
```bash
curl -X DELETE http://localhost:8080/api/students/1
```

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/example/studentmanagement/
│   │       ├── StudentManagementApplication.java
│   │       ├── config/
│   │       │   └── CorsConfig.java
│   │       ├── controller/
│   │       │   ├── IndexController.java
│   │       │   └── StudentController.java
│   │       ├── model/
│   │       │   └── Student.java
│   │       ├── repository/
│   │       │   └── StudentRepository.java
│   │       └── service/
│   │           └── StudentService.java
│   └── resources/
│       ├── static/
│       │   ├── index.html
│       │   ├── styles.css
│       │   └── app.js
│       └── application.properties
└── pom.xml
```

## Technologies Used

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Maven
- Java 17

### Frontend
- HTML5
- CSS3 (Modern responsive design)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

