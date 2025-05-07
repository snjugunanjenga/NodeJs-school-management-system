-- Insert demo admin user
INSERT INTO Users (email, password_hash, role) VALUES
('admin@school.com', '$2b$10$YourHashedPasswordHere', 'admin');

-- Insert demo teachers (Grade 1-8)
INSERT INTO Users (email, password_hash, role) VALUES
('teacher_Grade1@school.com', '$2b$10$YourHashedPasswordHere', 'teacher'),
('teacher_Grade2@school.com', '$2b$10$YourHashedPasswordHere', 'teacher'),
('teacher_Grade3@school.com', '$2b$10$YourHashedPasswordHere', 'teacher'),
('teacher_Grade4@school.com', '$2b$10$YourHashedPasswordHere', 'teacher'),
('teacher_Grade5@school.com', '$2b$10$YourHashedPasswordHere', 'teacher'),
('teacher_Grade6@school.com', '$2b$10$YourHashedPasswordHere', 'teacher'),
('teacher_Grade7@school.com', '$2b$10$YourHashedPasswordHere', 'teacher'),
('teacher_Grade8@school.com', '$2b$10$YourHashedPasswordHere', 'teacher');

-- Insert demo students (50 students)
INSERT INTO Users (email, password_hash, role) VALUES
('student1@school.com', '$2b$10$YourHashedPasswordHere', 'student'),
('student2@school.com', '$2b$10$YourHashedPasswordHere', 'student'),
-- ... (repeat for all 50 students)
('student50@school.com', '$2b$10$YourHashedPasswordHere', 'student');

-- Insert demo parents (50 parents)
INSERT INTO Users (email, password_hash, role) VALUES
('parent1@example.com', '$2b$10$YourHashedPasswordHere', 'parent'),
('parent2@example.com', '$2b$10$YourHashedPasswordHere', 'parent'),
-- ... (repeat for all 50 parents)
('parent50@example.com', '$2b$10$YourHashedPasswordHere', 'parent');

-- Insert teacher details
INSERT INTO Teachers (user_id, name, subject, class_grade) VALUES
(2, 'John Smith', 'Mathematics', 1),
(3, 'Mary Johnson', 'English', 2),
(4, 'Robert Brown', 'Science', 3),
(5, 'Sarah Davis', 'Social Studies', 4),
(6, 'Michael Wilson', 'Mathematics', 5),
(7, 'Lisa Anderson', 'English', 6),
(8, 'David Taylor', 'Science', 7),
(9, 'Jennifer Martinez', 'Social Studies', 8);

-- Insert student details (sample for first 5 students)
INSERT INTO Students (user_id, name, dob, gender, grade) VALUES
(10, 'Emma Thompson', '2015-05-15', 'female', 1),
(11, 'James Wilson', '2015-08-22', 'male', 1),
(12, 'Sophia Chen', '2015-03-10', 'female', 2),
(13, 'Lucas Rodriguez', '2015-11-30', 'male', 2),
(14, 'Olivia Kim', '2015-07-18', 'female', 3);
-- ... (continue for all 50 students)

-- Insert parent-student relationships
INSERT INTO Parents (user_id, student_id) VALUES
(60, 1),  -- parent1@example.com linked to student1
(61, 2),  -- parent2@example.com linked to student2
-- ... (continue for all 50 parent-student pairs)

-- Insert subjects
INSERT INTO Subjects (name, grade_level) VALUES
('Mathematics', 1),
('English', 1),
('Science', 1),
('Social Studies', 1),
-- ... (repeat for grades 2-8)
('Mathematics', 8),
('English', 8),
('Science', 8),
('Social Studies', 8);

-- Insert sample grades (for first student)
INSERT INTO Grades (student_id, subject_id, term, score) VALUES
(1, 1, 'term1', 85.5),
(1, 2, 'term1', 92.0),
(1, 3, 'term1', 88.5),
(1, 4, 'term1', 90.0);
-- ... (continue for all students and terms)

-- Insert sample attendance (for first student)
INSERT INTO Attendance (student_id, date, status) VALUES
(1, '2024-03-01', 'present'),
(1, '2024-03-02', 'present'),
(1, '2024-03-03', 'absent'),
(1, '2024-03-04', 'late');
-- ... (continue for all students and dates)
