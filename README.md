# TODO Full-Stack Application

A modern full-stack todo application built with Spring Boot, PostgreSQL, and TypeScript.

## 🚧 Development Status

This project is currently under active development. Features and documentation will be updated as development progresses.

# Screenshots

<img width="1474" height="997" alt="Screenshot 2025-09-28 162507" src="https://github.com/user-attachments/assets/1550599b-40c3-4f37-94fa-2aba38422476" />
<img width="1474" height="997" alt="Screenshot 2025-09-28 162507" src="https://github.com/user-attachments/assets/ccae4427-7966-4133-b44f-d2eb5b598687" />



## 🚀 Tech Stack

### Backend
- **Spring Boot** - Java framework for building the REST API
- **PostgreSQL** - Relational database for data persistence
- **Maven/Gradle** - Dependency management

### Frontend
- **TypeScript** - Type-safe JavaScript for the client application
- **React** (or your framework) - UI framework

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Java 17 or higher
- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Maven or Gradle (depending on your setup)

## 🛠️ Installation & Setup

### Database Setup

1. Install and start PostgreSQL
2. Create a new database:
   ```sql
   CREATE DATABASE todo_db;
   ```

3. Update database credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies and run:
   ```bash
   # Using Maven
   mvn clean install
   mvn spring-boot:run

   # Using Gradle
   ./gradlew build
   ./gradlew bootRun
   ```

3. The backend API will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
TODO-FULLSTACK-APP/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml / build.gradle
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
├── postman/
│   └── API collection files
├── LICENSE
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
SERVER_PORT=8080
```

Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:8080/api
```

## 📡 API Endpoints

API documentation and testing collection available in the `postman/` directory.

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
# or
./gradlew test
```

### Frontend Tests
```bash
cd frontend
npm test
# or
yarn test
```


## 📝 License

This project is licensed under the terms specified in the LICENSE file.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Note:** Docker configuration and GitHub workflows are in progress and will be added in future updates.
