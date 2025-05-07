# School Management System - CBC Platform

A full-featured Competency-Based Curriculum (CBC) platform with multi-role access for students, teachers, parents, and administrators.

## Features

- Multi-role authentication (Students, Teachers, Parents, Admin)
- Grade management and tracking
- Attendance monitoring
- Parent portal for student progress
- Teacher dashboard for class management
- Admin panel for system oversight

## Screenshots

### Authentication
![Login Page](screenshots/login.png)
*Login page with role-based access*

### Student Dashboard
![Student Dashboard](screenshots/student-dashboard.png)
*Student dashboard showing grades and attendance*

### Teacher Dashboard
![Teacher Dashboard](screenshots/teacher-dashboard.png)
*Teacher dashboard with class management tools*

### Parent Dashboard
![Parent Dashboard](screenshots/parent-dashboard.png)
*Parent portal showing child's progress*

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)
*Admin panel with system overview*

## Demo Accounts

The system comes with pre-configured demo accounts for testing:

### Admin
- Email: admin@school.com
- Password: AdminDemo123!

### Teachers (Grade 1-8)
- Email: teacher_Grade1@school.com through teacher_Grade8@school.com
- Password: TeachDemo123!

### Students
- Email: student1@school.com through student50@school.com
- Password: StudDemo123!

### Parents
- Email: parent1@example.com through parent50@example.com
- Password: ParentDemo123!

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd school-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=school_management
JWT_SECRET=your_jwt_secret
```

4. Initialize the database:
```bash
mysql -u your_db_user -p your_db_password < schema.sql
mysql -u your_db_user -p your_db_password < data.sql
```

5. Start the server:
```bash
npm start
```

## API Documentation

### Authentication
- POST `/auth/login` - Login with email and password
- Registration is disabled in demo mode

### Student Routes
- GET `/student/grades` - View own grades
- GET `/student/attendance` - View own attendance
- GET `/student/profile` - View own profile

### Teacher Routes
- GET `/teacher/class` - View class students
- GET `/teacher/class/grades` - View class grades
- POST `/teacher/grades` - Add/Update grades
- POST `/teacher/attendance` - Mark attendance
- GET `/teacher/class/attendance` - View class attendance

### Parent Routes
- GET `/parent/child/grades` - View child's grades
- GET `/parent/child/attendance` - View child's attendance
- GET `/parent/child/profile` - View child's profile

### Admin Routes
- GET `/admin/users` - View all users
- GET `/admin/students` - View all students
- GET `/admin/teachers` - View all teachers
- GET `/admin/parents` - View all parents
- GET `/admin/statistics/class/:grade` - View class statistics

## Testing the API

You can test the API using the following curl commands:

1. Login as admin:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@school.com","password":"AdminDemo123!"}'
```

2. Use the returned token to access protected routes:
```bash
curl http://localhost:3000/admin/users \
  -H "Authorization: Bearer <your-token>"
```

## Deployment

The application is configured for deployment on Vercel. Make sure to set the following environment variables in your Vercel project:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`

## License

MIT

#### Author : SNN
#### Github : @snjugunanjenga





