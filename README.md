# Doctor Appointments API

A Node.js + Express API for managing doctors, patients, creating availability slots and booking appointments.

## Live Demo

- Demo version of this API: https://doctors-api.byserafeim.dev/doctors

_Note: Adjust **endpoint** to use the rest of them_

## Technology Stack

- Express HTTP API backed by Sequelize models for doctors, patients, slots, and appointments
- Automatic MySQL schema creation and seed data
- Containerized development stack powered by Docker Compose

## HTTP Endpoints

> Base URL defaults to `http://localhost:8000` when running through Docker Compose.

| Method | Path            | Description                                                                                    |
| ------ | --------------- | ---------------------------------------------------------------------------------------------- |
| `GET`  | `/doctors`      | List registered doctors ordered by last name                                                   |
| `POST` | `/doctors`      | Create a doctor (requires `first_name`, `last_name`, `specialty`, `address`, `phone`, `email`) |
| `GET`  | `/patients`     | List registered patients ordered by last name                                                  |
| `POST` | `/patients`     | Create a patient (requires `first_name`, `last_name`, `phone`, `email`)                        |
| `GET`  | `/availability` | Retrieve future availability slots and their assigned doctor                                   |
| `POST` | `/availability` | Publish a new availability slot for a doctor (`doctor_id`, `start_time`, `end_time`)           |
| `GET`  | `/appointments` | List booked appointments with patient and slot details; filter with `?doctor_id=`              |
| `POST` | `/appointments` | Book an appointment by pairing a `patient_id` with an available `slot_id`                      |

## Run with Docker

1. **Create a `.env` file** in the project root so Docker Compose can inject credentials. Required variables:

   ```ini
   DA_API_PORT=8000
   DA_DB_ROOT_PASS=database_password
   DA_DB_DB=database_name
   DA_DB_USER=database_user
   DA_DB_USER_PASS=database_user_password
   DA_DB_URL=mysql_connection_url
   ```

2. **Start application**

   ```bash
   docker compose up --build
   ```

   - MySQL initializes with the SQL scripts under `db/sql/`
   - The API becomes available at `http://localhost:${DA_API_PORT}` (default `8000`)

3. **Smoke tests** once the containers report healthy:

   ```bash
   curl http://localhost:8000/doctors
   ```

   You should receive the seeded doctor records from the sample data set.

4. **Shut down** when finished:

   ```bash
   docker compose down
   ```

## Example Requests

### Doctors

`GET /doctors` &rarr; Lists existing doctors

```bash
curl -X GET http://localhost:8000/doctors
```

`POST /doctors` &rarr; Creates a new doctor object

```bash
curl -X POST http://localhost:8000/doctors \
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

### Patients

`GET /patients` &rarr; Lists existing patients

```bash
curl -X GET http://localhost:8000/patients
```

`POST /patients` &rarr; Creates a new patient object

```bash
curl -X POST http://localhost:8000/patients \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jack",
    "last_name": "Smith",
    "phone": "+1-555-555-0100",
    "email": "jack.smith@example.com"
  }'
```

### Appointments

`GET /appointments?doctor_id=` &rarr; Lists booked appointments for a given doctor (omit the query parameter to list all)

```bash
curl -X GET "http://localhost:8000/appointments?doctor_id=1"
```

`POST /appointments` &rarr; Creates a new appointment

```bash
curl -X POST http://localhost:8000/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patient_id": 1,
    "slot_id": 1
  }'
```

### Availability

`GET /availability` &rarr; Lists available slots

```bash
curl -X GET http://localhost:8000/availability
```

`POST /availability` &rarr; Adds a new slot for a doctor

```bash
curl -X POST http://localhost:8000/availability \
  -H "Content-Type: application/json" \
  -d '{
    "doctor_id": 1,
    "start_time": "2025-11-01T09:00:00Z",
    "end_time": "2025-11-01T09:30:00Z"
  }'
```
