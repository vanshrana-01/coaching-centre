# Coaching Centre

Full-stack coaching centre management project with React/Vite frontend and Express/MongoDB backend.

## Setup

### Backend
1. `cd Backend`
2. `npm install`
3. Copy `.env.example` to `.env` and add your MongoDB, JWT and ImageKit credentials.
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. Optional: create `.env` from `.env.example`.
4. `npm run dev`

Backend API defaults to `http://localhost:5000/api`.

## Main flows
- Student registration/login, course browsing, enrollment, My Courses, assignments, submissions and attendance.
- Teacher course creation, students, assignments, classes and attendance.
- Admin dashboard, users, courses, assignments, payments, reports and settings.

Secrets are intentionally excluded; never commit `.env`.
