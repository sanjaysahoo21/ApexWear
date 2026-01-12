# ApexWear

A Spring Boot application with JWT authentication and Google OAuth2 integration.

## Prerequisites

- Java 17 or higher
- PostgreSQL database
- Maven 3.6+

## Environment Variables

Create a local `application.properties` file from the example:

```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Then configure these required environment variables or update the properties file:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_USERNAME` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `your-db-password` |
| `JWT_SECRET` | Secret key for JWT signing (min 32 chars) | `your-secret-key-min-32-characters-long` |
| `JWT_EXPIRATION` | JWT token expiration in seconds | `86400` (24 hours) |
| `GOOGLE_CLIENT_ID` | Google OAuth2 Client ID from Google Cloud Console | `xxxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth2 Client Secret | `GOCSPX-xxxx` |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:5174` |

## Google OAuth2 Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI: `http://localhost:8080/login/oauth2/code/google`
6. Copy Client ID and Client Secret to your environment variables

## Database Setup

```sql
CREATE DATABASE apexwear;
```

The application will auto-create tables on startup using Hibernate DDL.

## Running the Application

```bash
mvn spring-boot:run
```

Or build and run:

```bash
mvn clean package
java -jar target/apexwear-0.0.1-SNAPSHOT.jar
```

The backend will start on `http://localhost:8080`

## API Endpoints

### Public Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /oauth2/authorization/google` - Initiate Google OAuth2 login

### Protected Endpoints
- `GET /home` - Requires valid JWT token

## Security

⚠️ **Never commit sensitive credentials to git**
- `application.properties` is ignored by git
- Use environment variables in production
- Rotate secrets regularly
