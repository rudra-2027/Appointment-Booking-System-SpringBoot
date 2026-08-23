# Appointment Booking

Spring Boot powers the backend API and the React client lives in a separate `client/` folder. The backend remains in the repository root with `src/` and `pom.xml`.

## 1. Start Backend

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

## 2. Start Client

```bash
cd client
npm install
npm run dev
```

The React app runs at:

```text
http://localhost:5173
```

## 3. Configure Environment Variables

Create `client/.env` from `client/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Only variables prefixed with `VITE_` are exposed to the browser. Do not put backend secrets, database credentials, Firebase service accounts, or email credentials in the React client.

## 4. Access the Application

Open the client and use the API console pages:

```text
Dashboard        /dashboard
Authentication   /authentication
Appointments     /appointments
Provider         /provider
Notifications    /notifications
API Explorer     /api-explorer
Timeline         /timeline
```

The client uses Axios and reads the backend URL from `import.meta.env.VITE_API_BASE_URL`. JWTs from `/auth/login` are attached as `Authorization: Bearer <JWT>` for protected requests.

## 5. API/Swagger URL

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

OpenAPI JSON:

```text
http://localhost:8080/v3/api-docs
```
