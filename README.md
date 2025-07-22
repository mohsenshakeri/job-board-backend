# 🧰 Job Board Backend
A modular, scalable backend API for a job board application built with [NestJS](https://nestjs.com/) and PostgreSQL.  
Fully containerized using Docker and ready for deployment or collaboration.

## 🚀 Features

- Modular project structure (auth, users, jobs, applications)
- PostgreSQL database with TypeORM integration
- Environment configuration using `.env`
- Swagger API documentation (coming soon)
- Ready-to-use Docker setup for development

## 🐳 Getting Started (via Docker)

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed

### Run the project

```bash
docker-compose up --build
````

> This will build and run the NestJS backend and PostgreSQL database.

---

## 🔑 Environment Variables

Create a `.env` file in the root of the project:

```env
# App
PORT=3000

# PostgreSQL
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=jobboard_admin
DB_PASSWORD=admin_password
DB_NAME=jobboard

```

## 📁 Project Structure
```
src/
├── auth/
├── users/
├── jobs/
├── applications/
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
├── config/
└── main.ts
```

## 🧩 Tech Stack

* NestJS (TypeScript)
* PostgreSQL
* TypeORM
* Docker & Docker Compose
* Swagger (TBD)

