# 🏋️ Iron Gym - Membership Registration System

A full-stack gym membership management system built with **React + Java Spring Boot**, containerized with **Docker**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Backend | Java 17, Spring Boot 3.2 |
| Database | H2 (dev) / MySQL 8 (prod) |
| Containerization | Docker + Docker Compose |
| Web Server | Nginx |

---

## 📁 Project Structure

```
gym-app/
├── frontend/               # React App
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── Dashboard.jsx
│   │       ├── Registration.jsx
│   │       └── MemberList.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend/                # Spring Boot App
│   ├── src/main/java/com/gym/membership/
│   │   ├── GymMembershipApplication.java
│   │   ├── controller/MemberController.java
│   │   ├── service/MemberService.java
│   │   ├── repository/MemberRepository.java
│   │   └── model/Member.java
│   ├── Dockerfile
│   └── pom.xml
│
└── docker-compose.yml      # Run everything together
```

---

## 🚀 How to Run

### Option 1: Docker (Recommended for DevOps practice)

```bash
# Clone and navigate to project
cd gym-app

# Build and start all containers
docker-compose up --build

# App will be available at:
# Frontend: http://localhost:80
# Backend API: http://localhost:8080
# H2 Console: http://localhost:8080/h2-console
```

### Option 2: Run Locally (Dev Mode)

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
# Runs at http://localhost:8080
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

---

## 📡 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/members | Get all members |
| GET | /api/members/{id} | Get member by ID |
| POST | /api/members | Register new member |
| PUT | /api/members/{id} | Update member |
| DELETE | /api/members/{id} | Delete member |
| GET | /api/members/status/{status} | Filter by status |
| GET | /api/members/plan/{plan} | Filter by plan |

---

## 🐳 DevOps Learning Points

This project covers:
- ✅ **Docker** - Multi-stage builds for both frontend and backend
- ✅ **Docker Compose** - Multi-container orchestration
- ✅ **Nginx** - Serving React app + reverse proxy to backend
- ✅ **REST API** - Spring Boot endpoints
- ✅ **Database** - JPA with H2/MySQL
- ✅ **Environment Variables** - Config via Docker env

### Next Steps (To extend this project):
1. Add a **Jenkinsfile** for CI/CD pipeline
2. Deploy to **AWS EC2** or **ECS**
3. Add **Kubernetes** manifests (deployment.yaml, service.yaml)
4. Set up **Prometheus + Grafana** monitoring
5. Add **Terraform** to provision AWS infrastructure

---

## 🎯 Membership Plans

| Plan | Price | Features |
|------|-------|----------|
| BASIC | ₹999/mo | Gym floor access |
| PREMIUM | ₹1,799/mo | Gym + Classes + Locker |
| ANNUAL | ₹8,999/yr | All Premium + Personal trainer |
