# Online Shopping Platform

A portfolio-grade e-commerce platform built to learn modern backend and frontend development practices.

The project is designed as a generic online store and can be adapted to support various product categories such as electronics, books, clothing, accessories, and more.

---

## Tech Stack

### Backend

* FastAPI
* PostgreSQL
* SQLAlchemy 2.x
* Alembic
* Redis (planned)
* Celery (planned)

### Frontend

* React
* Vite
* TailwindCSS

### Infrastructure

* Docker
* Docker Compose

---

## Project Goals

This project focuses on learning:

* Clean Architecture
* REST API Design
* Authentication & Authorization
* PostgreSQL
* SQLAlchemy
* Redis
* Background Tasks
* Docker
* E-Commerce System Design
* Production-Ready Development Practices

---

## Current Status

Project Foundation Completed ✅

Current features:

* Dockerized development environment
* FastAPI backend
* React frontend
* PostgreSQL database
* API versioning
* Health check endpoint

---

## Running the Project

### Start Services

```bash
docker compose up --build
```

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:8000
```

### API Documentation

```text
http://localhost:8000/docs
```

### Health Check

```text
http://localhost:8000/api/v1/health
```

---

## Branch Strategy

```text
main
develop
feature/*
```

Examples:

```text
feature/project-foundation
feature/backend-configuration
feature/authentication
feature-product-catalog
```

---

## Roadmap

### Phase 1

* Project Foundation
* Docker Environment
* API Versioning

### Phase 2

* Environment Configuration
* Database Integration
* SQLAlchemy Setup
* Alembic Migrations

### Phase 3

* Authentication & Authorization

### Phase 4

* Product Catalog

### Phase 5

* Cart & Wishlist

### Phase 6

* Orders & Checkout

### Phase 7

* Reviews & Ratings

### Phase 8

* Admin Dashboard

### Phase 9

* Redis & Background Tasks

### Phase 10

* Production Deployment

---

Built for learning, experimentation, and professional portfolio development.
