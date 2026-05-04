# Todo App — Spring Boot + React + PostgreSQL + Junit

A full-stack todo application with priority levels, live statistics, and filtering.
Built with Spring Boot for the backend, React for the frontend, and PostgreSQL as the database.

---

## Features

- Create, read, update, and delete todos
- Set priority levels: High, Medium, or Low
- Add optional descriptions to each todo
- Filter todos by status (All / Active / Completed) or by priority level
- Real-time stats showing total, done, pending, and completion percentage
- Data is saved permanently in a PostgreSQL database
- Docker support for running PostgreSQL without manual installation

---

## Tech Stack

### Backend
- Java 21
- Spring Boot 4.x
- Spring Data JPA
- Spring Web
- PostgreSQL
- Maven
- JUnit 5 and Mockito — for unit and integration testing
- SpringDoc OpenAPI — Swagger UI available at `/swagger-ui.html`

### Frontend
- React 18 with Vite
- JavaScript (ES6)
- Plain CSS — one file per component
- Fetch API for communicating with the backend

---

## Project Structure

```
todo
├── todo-backend\          — Spring Boot backend
│   ├── src\main\java\com\todo\
│   │   ├── controller\
│   │   ├── service\
│   │   ├── repository\
│   │   ├── model\
│   │   ├── dto\
│   │   └── exception\
│   ├── src\main\resources\
│   │   └── application.properties
│   └── pom.xml
│
└── todo-frontend\     — React frontend
    ├── src\
    │   ├── components\
    │   │   ├── Header.jsx / Header.css
    │   │   ├── TodoForm.jsx / TodoForm.css
    │   │   ├── TodoList.jsx / TodoList.css
    │   │   ├── TodoCard.jsx / TodoCard.css
    │   │   └── FilterBar.jsx / FilterBar.css
    │   ├── services\
    │   │   └── todoService.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── index.css
    └── package.json
```

---

## Prerequisites

Make sure you have these installed before running the project:

- Java 21
- Node.js 18 or higher
- Maven (or use IntelliJ IDEA to run the backend)
- Docker Desktop (recommended for PostgreSQL)

---

## Database Setup

You have two options to run PostgreSQL. Option A using Docker is recommended because it requires no manual installation.

### Option A — Using Docker (Recommended)

1. Make sure Docker Desktop is running on your machine.
2. Open a terminal in the `todo-backend` project folder.
3. Run the following command:

```
docker-compose up -d
```

This automatically starts a PostgreSQL container with the following settings:

| Setting  | Value     |
|----------|-----------|
| Database | tododb    |
| Username | postgres  |
| Password | postgres  |
| Port     | 5432      |

4. To stop the database when you are done:

```
docker-compose down
```

### Option B — Using Local PostgreSQL

1. Install PostgreSQL on your machine if not already installed.
2. Open pgAdmin or any SQL client and run:

```sql
CREATE DATABASE tododb;
```

3. Make sure PostgreSQL is running on `localhost:5432` with username `postgres` and password `postgres`.

---

## Backend Configuration

The file `src/main/resources/application.properties` is already configured.
No changes are needed — it works with both Docker and local PostgreSQL.

```properties
spring.application.name=todo-api
spring.datasource.url=jdbc:postgresql://localhost:5432/tododb
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
springdoc.swagger-ui.path=/swagger-ui.html
```

---

## Running the Application

### Step 1 — Start the Database

If using Docker, run:
```
E:\sss projects\todo\todo-backend> docker compose up -d
```

### Step 2 — Start the Backend

Open the `todo-backend` project in IntelliJ IDEA and click the green Run button.

Or run from terminal:
```
cd "E:\sss projects\todo\todo-backend"
mvn spring-boot:run
```

The backend starts at:
```
http://localhost:8080
```

Swagger UI (API documentation and testing) is available at:
```
http://localhost:8080/swagger-ui.html
```

### Step 3 — Start the Frontend

Open a new terminal and run:
```
cd "E:\sss projects\todo\todo-frontend"
npm install
npm run dev
```

The frontend starts at:
```
http://localhost:5173
```

### Step 4 — Open the App

Open your browser and go to:
```
http://localhost:5173
```

The frontend connects to the backend at `http://localhost:8080/api/todos` automatically.

---

## API Endpoints

| Method | Endpoint           | Description       |
|--------|--------------------|-------------------|
| GET    | /api/todos         | Get all todos     |
| POST   | /api/todos         | Create a new todo |
| PUT    | /api/todos/{id}    | Update a todo     |
| DELETE | /api/todos/{id}    | Delete a todo     |

### Example POST Request Body

```json
{
  "title": "Read a book",
  "description": "Java programming",
  "priority": "MEDIUM",
  "completed": false
}
```

### Priority Values

| Value  | Meaning               |
|--------|-----------------------|
| HIGH   | Urgent, do first      |
| MEDIUM | Normal priority       |
| LOW    | Can be done later     |

---

## Stopping the Application

- Stop the backend: Press `Ctrl + C` in the IntelliJ terminal or stop the run configuration.
- Stop the frontend: Press `Ctrl + C` in the frontend terminal.
- Stop the Docker database:

```
docker-compose down
```

---

## Running Tests

Tests are located in `src/test/java/com/todo/`.

To run all tests in IntelliJ, right-click the test folder and select "Run All Tests".

Or from terminal:
```
mvn test
```

### Test Files

| File                      | What it tests                        |
|---------------------------|--------------------------------------|
| TodoServiceTest.java      | Business logic in the service layer  |
| TodoControllerTest.java   | HTTP endpoints in the controller     |
| TodoRepositoryTest.java   | Connectivity with the Database       |

---

## Possible Improvements

- Add environment variables using a `.env` file instead of hardcoded credentials
- Add user authentication with Spring Security and JWT tokens
- Add due dates and reminder notifications
- Add a dark mode toggle in the frontend
- Deploy to a cloud provider like AWS or Railway

---

## How the App Works — Simple Overview

```
Browser (React)
      |
      | HTTP requests (GET, POST, PUT, DELETE)
      |
Spring Boot API (port 8080)
      |
      | JPA / SQL queries
      |
PostgreSQL inside Docker (port 5432)
```

1. The user interacts with the React frontend in the browser.
2. React sends HTTP requests to the Spring Boot API.
3. Spring Boot processes the request and talks to PostgreSQL.
4. PostgreSQL saves or retrieves the data.
5. Spring Boot sends the response back to React.
6. React updates the UI instantly.

---

## License

This project is open source. Feel free to use and modify it for learning purposes.

---

## About This Project

Built as a full-stack learning project covering:
- REST API design with Spring Boot
- Database management with PostgreSQL and Docker
- Frontend development with React and plain CSS
- Unit testing with JUnit and Mockito
- API documentation with Swagger