# 📦 Changelog

All notable changes to this project will be documented in this file.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and uses [Semantic Versioning](https://semver.org/).

---

## [0.1.0] - 2025-07-22

### Added
- Implemented full authentication module using JWT
- Added register, login, and protected route
- Created `User` entity and database integration with TypeORM
- Configured global validation pipe
- Added DTOs with class-validator
- Configured dynamic TypeORM connection using `.env` and `ConfigModule`
- Dockerized PostgreSQL and backend with shared `.env`

### ✨ Jobs Module Completed

- ✅ `GET /jobs` – Public list of active jobs
- ✅ `GET /jobs/:id` – View job details
- ✅ `POST /jobs` – Create job (admin only)
- ✅ `PATCH /jobs/:id` – Edit job (admin only)
- ✅ `DELETE /jobs/:id` – Delete job (admin only)
- 🔒 Role-based access control for sensitive actions
- 🧾 Swagger documentation for all routes
