# College Placement Management Portal

A modern, high-performance web application designed for higher education institutions to manage recruitment drives, student academic profiles, and candidate evaluation workflows.

---

## Features

- **Authentication & Security**: Role-Based Access Control (RBAC) supporting Students, Training & Placement Officers (TPO), and Administrators.
- **Academic Profiles**: Management of student academic metrics including CGPA, active backlog tracking, branch, and graduation year.
- **Recruitment Companies**: Corporate partner registration and drive management.
- **Placement Drives & Automated Eligibility Engine**: Dynamic evaluation of student eligibility against drive criteria.
- **Recruitment Workflow**: Controlled state machine tracking candidate progression across evaluation stages.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: React, Vite, Vanilla CSS
- **Authentication**: JSON Web Tokens (JWT), bcrypt

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)

### Environment Configuration

Copy the example environment file and configure your database credentials:

```bash
cp .env.example .env
```

Set the following variables in `.env`:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/placement_portal
TEST_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/placement_portal_test
JWT_SECRET=your_secure_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
```

---

## Installation & Running

### Backend

```bash
cd backend
npm install
npm run migrate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Testing

Run the automated test suite:

```bash
cd backend
npm test
```
