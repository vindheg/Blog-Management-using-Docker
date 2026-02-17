# 🐳 Containerized Blog Application with Monitoring

## 📌 Problem Statement

Managing and deploying a web-based application with multiple services (frontend, backend, database, monitoring) can be complex and inconsistent across environments.

This project implements a **containerized blog application** using Docker to ensure portability, scalability, and deployment consistency, along with integrated monitoring using Prometheus and Grafana.

---

## 🎯 Objectives

- Deploy a multi-service web application using Docker
- Integrate monitoring tools for observability
- Track CPU, memory, and HTTP metrics
- Ensure consistent deployment across environments

---

## 🛠 Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (Express.js)
- **Database:** MySQL
- **Containerization:** Docker
- **Monitoring:** Prometheus, Grafana
- **Web Server:** Nginx

---

## 🏗 Architecture Overview

The system consists of 5 Docker containers:

1. **Frontend Container**
   - Served using Nginx
   - Displays blog UI
   - Forwards API requests to backend

2. **Backend Container**
   - Built using Express.js
   - Handles API requests
   - Communicates with MySQL

3. **Database Container**
   - MySQL database
   - Stores blog posts
   - Accessible only by backend

4. **Prometheus Container**
   - Collects system and application metrics
   - Tracks CPU, memory, and HTTP requests

5. **Grafana Container**
   - Visualizes metrics from Prometheus
   - Displays dashboards

---

## ✨ Features

- Add blog posts
- Delete blog posts
- View all blog posts
- Monitor system resources
- View application metrics dashboards

