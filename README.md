# tacnique Assignment

# Tacnique Task Management API

Welcome to the Tacnique Task Management API! This API is built using Node.js and Express, MongoDB, featuring advanced functionalities such as rate limiting and logging powered by Winston. It's designed to help you manage your tasks efficiently.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Entity Relation Diagram](#entity-relation-diagram)

## Getting Started
Before using the Task Management API, make sure you have Node.js and MongoDB installed on your system.

## Installation
To set up the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/mohammadsaud-0110/tacnique-Assignment.git

# Navigate to the project directory
cd tacnique-Assignment

# Install dependencies
npm install

# Start the Server
npm run server
```

## Usage
Provide examples or instructions on how to use your API here.

## API Endpoints
Explore the powerful API endpoints available in this project:

| No. | API Endpoint          | Feature             | Description                                | req.body                                   |
|---- |----------------------|---------------------|--------------------------------------------|-------------------------------------------|
| 1   | POST /user/register   | User Registration   | Create a new user account.                  | `{ "name": "example", "email": "example@email.com", "password": "example123" }` |
| 2   | POST /user/login      | User Login          | Log in with your credentials.               | `{ "email": "example@email.com", "password": "example123" }` |
| 3   | GET /user/allusers    | All Users           | Retrieve all registered users.             | -                                         |
| 4   | POST /user/logout     | User Logout         | Safely log out from your account.           | -                                         |
| 5   | POST /tasks           | Add Task            | Add a new task to your list.                | `{ "title": "Task Title", "description": "Task Description"` |
| 6   | GET /tasks            | All Tasks           | Retrieve all tasks. (Rate limiting: 15 req every 2 minutes) | - |
| 7   | GET /tasks/:id        | Task by ID          | Find a specific task using its unique ID.   | -                                         |
| 8   | GET /tasks/user/:id   | Tasks by User ID    | Retrieve tasks associated with a specific user. | -                                     |
| 9   | PUT /tasks/:id        | Update Task         | Modify the details of a task.               | `{ "title": "Updated Task Title" / "description": "Updated Task Description" / "status" : "completed" }` |
| 10  | DELETE /tasks/:id     | Delete Task         | Remove a task from your list.               | -                                         |
| 11  | GET /logs             | All Logs            | Retrieve all logs related to API.           | -                                         |

## Authentication
Certain endpoints in this API require authentication to ensure security. To obtain access to these endpoints, you need to obtain a JSON Web Token (JWT) by logging in. Once you have the token, include it in the Authorization header of your requests to access authenticated endpoints.

## Rate Limiting
To ensure fair usage and prevent abuse, this API implements rate limiting. You can make up to 15 requests every 2 minutes, safeguarding the system from excessive traffic.

## Logging
Logging is an integral part of this API, powered by Winston. Every interaction with the API is meticulously tracked and logged. This feature serves as a valuable tool for monitoring and troubleshooting purposes.

## Entity Relation Diagram



