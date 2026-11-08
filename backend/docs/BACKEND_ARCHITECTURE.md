# MITRA — Production Backend Architecture

This document defines the architectural blueprints, technical layers, integration patterns, and security boundaries for the MITRA backend.

---

## 1. Architectural Philosophy

The MITRA backend is designed according to **Clean Architecture** and **Domain-Driven Design (DDD)** principles:
- **Presentation Layer (FastAPI Routers)**: Thin HTTP controllers handling validation, response serialisation, status codes, and routing.
- **Service Layer**: Business logic, workflow orchestration, AI processing, and third-party API communication.
- **Data Access Layer (SQLAlchemy 2.0 & Repositories)**: Strongly-typed models, relationship mappings, atomic transaction handling, and schema migrations.
- **Security & Authorization**: Supabase JWT verification, role-based access control (RBAC), multi-tenant organization boundaries, and data ownership enforcement.

```
                    +--------------------------------+
                    |    Next.js 16 Client Portal    |
                    +--------------------------------+
                                   |
                             HTTPS / JSON
                                   v
+-------------------------------------------------------------------------+
|                              FastAPI Core                               |
|                                                                         |
|  +--------------------+   +---------------------+   +----------------+  |
|  |  CORS Middleware   |   |   Rate Limiter      |   | Audit Logger   |  |
|  +--------------------+   +---------------------+   +----------------+  |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |                   Security & Auth Dependencies                    |  |
|  |     (Supabase JWT Verification, Role Guards, Tenant Isolation)    |  |
|  +-------------------------------------------------------------------+  |
|                                   |                                     |
|  +-------------------------------------------------------------------+  |
|  |                           API Routers                             |  |
|  |  - Auth         - Students      - Recruiters    - Institutions    |  |
|  |  - Opportunities- Applications  - AI Intelligence                 |  |
|  |  - Mentorship   - Research      - Events        - Messaging       |  |
|  +-------------------------------------------------------------------+  |
|                                   |                                     |
|  +-------------------------------------------------------------------+  |
|  |                          Service Layer                            |  |
|  |  - StudentService  - MatchingEngine  - AIIntelligenceService      |  |
|  |  - ApplicationSvc  - StorageService  - AnalyticsService           |  |
|  +-------------------------------------------------------------------+  |
|                                   |                                     |
|  +-------------------------------------------------------------------+  |
|  |                     Data Access / Repositories                    |  |
|  |                     (SQLAlchemy 2.0 Async/Sync)                   |  |
|  +-------------------------------------------------------------------+  |
+-----------------------------------|-------------------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
+------------------------+                      +-----------------------+
| Supabase PostgreSQL DB |                      | Google Gemini 1.5/2.0 |
| (Auth, Storage, RLS)   |                      | (AI Career & Resumes) |
+------------------------+                      +-----------------------+
```

---

## 2. Directory Structure

```
backend/
├── app/
│   ├── main.py                     # Application factory & router mounts
│   ├── core/
│   │   ├── config.py               # Pydantic Settings & environment variables
│   │   ├── security.py             # Supabase JWT verification, principal models
│   │   ├── database.py             # SQLAlchemy engine & session factory
│   │   ├── dependencies.py         # Shared FastAPI route dependencies
│   │   ├── permissions.py          # Role & permission predicates
│   │   ├── exceptions.py           # Custom API exceptions & handlers
│   │   └── logging.py              # Structured JSON logging & audit hooks
│   ├── api/
│   │   └── v1/
│   │       ├── router.py           # Unified v1 API router assembly
│   │       └── endpoints/
│   │           ├── auth.py         # Current user & profile management
│   │           ├── students.py     # Student profile & Skill Passport
│   │           ├── recruiters.py   # Recruiter profile & talent search
│   │           ├── institutions.py # University profiles & department analytics
│   │           ├── opportunities.py# Opportunity creation, search & filtering
│   │           ├── applications.py # Candidate applications & status lifecycle
│   │           ├── ai.py           # Gemini-backed skill-gap & resume analysis
│   │           ├── mentorship.py   # Mentor sessions & booking
│   │           ├── research.py     # Research projects & grants
│   │           ├── events.py       # Workshops & campus hackathons
│   │           ├── messaging.py    # Direct messages & notifications
│   │           └── admin.py        # Verification queue & system health
│   ├── models/
│   │   ├── base.py                 # Declarative base & timestamp mixins
│   │   ├── user.py                 # Users, roles, profiles
│   │   ├── student.py              # Student profiles, skills, skill passport
│   │   ├── company.py              # Companies, recruiters, memberships
│   │   ├── institution.py          # Universities, departments, faculty
│   │   ├── opportunity.py          # Opportunities, requirements
│   │   ├── application.py          # Applications, status transitions, events
│   │   ├── mentorship.py           # Mentor sessions & reviews
│   │   ├── research.py             # Projects, publications, grants
│   │   ├── communication.py        # Messages, notifications
│   │   └── audit.py                # Audit trail & system telemetry
│   ├── schemas/
│   │   ├── auth.py                 # User & token schemas
│   │   ├── student.py              # Skill passport & student schemas
│   │   ├── opportunity.py          # Opportunity request/response schemas
│   │   ├── application.py          # Application request/response schemas
│   │   ├── ai.py                   # Skill-gap & resume analysis schemas
│   │   ├── institution.py          # Department & institution schemas
│   │   └── common.py               # Pagination & generic response wrappers
│   ├── services/
│   │   ├── auth_service.py         # Profile sync & Supabase Auth reconciliation
│   │   ├── student_service.py      # Skill passport & readiness calculation
│   │   ├── matching_engine.py      # Deterministic & explainable applicant matching
│   │   ├── ai_service.py           # Gemini 1.5 Pro / Flash integration
│   │   ├── opportunity_service.py  # Opportunity listing & indexing
│   │   └── storage_service.py      # Supabase Storage signed URLs & upload
│   └── integrations/
│       ├── supabase.py             # Supabase Auth & Storage client
│       └── gemini.py               # Google GenAI SDK wrapper
├── migrations/                     # Alembic migration scripts
├── tests/                          # Automated Pytest suite
├── docs/                           # Architecture & API specifications
├── Dockerfile                      # Multi-stage production container
├── requirements.txt                # Pinned production dependencies
└── .env.example                    # Environment variable template
```

---

## 3. Technology Stack Justification

| Component | Selected Technology | Technical Justification |
| :--- | :--- | :--- |
| **Framework** | FastAPI 0.115+ | High throughput async Python, automatic OpenAPI generation, Pydantic v2 validation. |
| **Language** | Python 3.12+ | High performance, typed syntax, modern async capabilities. |
| **ORM** | SQLAlchemy 2.0 | Explicit `select()`, type-safe Mapped models, relationship caching, async/sync flexibility. |
| **Migrations** | Alembic 1.15+ | Tracked, reversible schema migrations for continuous integration. |
| **Authentication** | Supabase Auth (JWT) | Secure token verification via JWKS/HMAC, decentralized identity without plain-text passwords. |
| **Database** | Supabase PostgreSQL | Managed relational database with RLS policies, native UUID support, and full-text search. |
| **AI Engine** | Google Gemini API | Structured output extraction, career pathway planning, skill gap analysis. |
| **File Storage** | Supabase Storage | S3-compatible private buckets with time-limited signed download URLs. |
