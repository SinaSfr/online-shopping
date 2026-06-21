# Architecture Overview

## Project Goal

This project is a portfolio-grade e-commerce platform built for learning modern backend and frontend engineering practices.

The platform is designed as a generic online shop and should be able to support different product categories such as books, electronics, clothing, accessories, and other physical products.

The primary focus is learning:

* FastAPI
* PostgreSQL
* SQLAlchemy
* Redis
* Celery
* Docker
* Authentication & Authorization
* REST API Design
* E-Commerce Architecture
* System Design

---

# High Level Architecture

```text
Frontend (React + Vite)
          |
          v
Backend (FastAPI)
          |
          v
PostgreSQL
```

Future integrations:

```text
Frontend
    |
    v
FastAPI
    |
    +-- PostgreSQL
    +-- Redis
    +-- Celery Workers
    +-- Object Storage (MinIO)
    +-- Search Engine (Elasticsearch)
```

---

# Repository Structure

```text
online-shopping/

├── backend/
├── frontend/
├── docs/
├── infrastructure/
├── docker-compose.yml
└── README.md
```

---

# Backend Structure

```text
backend/

├── app/
│   ├── api/
│   ├── application/
│   ├── core/
│   ├── db/
│   ├── domain/
│   ├── infrastructure/
│   └── main.py
│
├── requirements/
├── tests/
└── alembic/
```

### api/

Contains HTTP routes and API versioning.

### application/

Contains application use cases and business workflows.

### core/

Application configuration and shared utilities.

### db/

Database configuration and session management.

### domain/

Business entities and domain logic.

### infrastructure/

External integrations such as repositories, caching, messaging, and storage.

---

# Frontend Structure

```text
frontend/

├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
```

The frontend is built using:

* React
* Vite
* TailwindCSS

---

# API Strategy

All endpoints are versioned.

Example:

```text
/api/v1/health
/api/v1/products
/api/v1/orders
```

Future versions can be introduced without breaking existing clients.

---

# Git Workflow

Main branches:

```text
main
develop
```

Feature development:

```text
feature/project-foundation
feature/backend-configuration
feature/authentication
feature/product-catalog
```

Workflow:

```text
feature branch
      |
      v
develop
      |
      v
main
```

---

# Docker Strategy

Development environment is fully containerized.

Services:

* Frontend
* Backend
* PostgreSQL

Run locally:

```bash
docker compose up --build
```

---

# Current Phase

Project Foundation

Completed:

* Repository restructuring
* Backend architecture setup
* FastAPI initialization
* API versioning
* Docker environment
* PostgreSQL container
* Health check endpoint

Next:

* Environment configuration
* Database connection
* SQLAlchemy setup
* Alembic migrations

```
```
