# Doctor Appointments API

A lightweight REST API that manages **doctors**, **patients**, and **appointments**.
It supports CRUD for core entities and conflict-aware appointment booking.

## API Stack

This API is developed using Node.js + Express.js + MySQL DB

## Entities & Endpoints (brief)

### Doctors

- `GET /doctors` &rarr; Lists existing doctors
- `POST /doctors` &rarr; Creates a new doctor object

### Patients

- `GET /patients` &rarr; Lists existing patients
- `POST /patients` &rarr; Creates a new patient object

### Appointments

- `GET /appointments?doctor_id=` &rarr; Lists booked appointments for given doctor
- `POST /appointments` &rarr; Creates a new appointment

### Availability

- `GET /availability` &rarr; Lists available slots
- `POST /availability` &rarr; Adds a new slot for a doctor

## Local Installation & Run

### 1) Clone Repository

```
git clone https://github.com/serafeimdossas/doctor-appointments-api.git
cd doctor-appointments-api
docker compose -f docker-compose.yml up -d --build
```

### 2) Set Environment Variables (.env)

Don't forget to set these env variables in the .env file

```
PORT=
NODE_ENV=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

### 3) Test API with the following requests

1. Create a doctor:

```
curl -X POST {baseUrl}/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Richard",
    "last_name": "Roe",
    "specialty": "Cardiology",
    "address": "413 Noble St",
    "phone": "123-45678",
    "email": "r.richard@email.com"
  }'
```
