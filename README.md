# School Student Records Management System

A RESTful API for managing school student records using Node.js, Express, and MySQL.

## Features
- CRUD operations for Students, Teachers, Classes, and Enrollments.

## Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/<username>/school-management-system.git
   cd school-management-system

2. **Install dependencies:**
   ```bash 
      npm install

3. **Set up the database:**
   - Create a MySQL database (e.g., school_db).
   - Run schema.sql to create tables.
   - Optionally, run data.sql for sample data.

   - Configure environment variables:
   - Copy .env.example to .env.

   - Update .env with your database credentials:
      ```
         DB_HOST=localhost
         DB_USER=root
         DB_PASS=your_password
         DB_NAME=school_db

4. **Run the server:**
   ```bash
      npm start

      Server runs at http://localhost:3000


### API Endpoints
   - **Students:** /students (GET, POST), /students/:id (GET, PUT, DELETE)

   - **Teachers:** /teachers (GET, POST), /teachers/:id (GET, PUT, DELETE)

   - **Classes:** /classes (GET, POST), /classes/:id (GET, PUT, DELETE)

   - **Enrollments:** /enrollments (GET, POST), /enrollments/:id (GET, PUT, DELETE)

## Deployment
- Deployed on Vercel at: https://school-management-system.vercel.app

## Author: SNN







