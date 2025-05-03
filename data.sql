-- Insert sample teachers
INSERT INTO Teachers (name, email, subject) VALUES
('John Doe', 'john.doe@example.com', 'Mathematics'),
('Jane Smith', 'jane.smith@example.com', 'Science'),
('Alice Johnson', 'alice.johnson@example.com', 'History');
-- 3 teachers added with unique emails and subjects

-- Insert sample classes
-- Assumes teacher_ids 1, 2, 3 from the Teachers table
INSERT INTO Classes (name, teacher_id) VALUES
('Algebra 101', 1),  -- Taught by John Doe
('Physics 101', 2),  -- Taught by Jane Smith
('World History', 3), -- Taught by Alice Johnson
('Calculus 101', 1); -- Taught by John Doe
-- 4 classes added, linked to existing teachers

-- Insert sample students
INSERT INTO Students (name, email, date_of_birth) VALUES
('Bob Brown', 'bob.brown@example.com', '2005-01-15'),
('Charlie Davis', 'charlie.davis@example.com', '2004-03-22'),
('Diana Evans', 'diana.evans@example.com', '2005-07-30'),
('Evan Foster', 'evan.foster@example.com', '2006-02-10'),
('Fiona Green', 'fiona.green@example.com', '2005-11-05');
-- 5 students added with unique emails and birth dates

-- Insert sample enrollments
-- Assumes student_ids 1-5 and class_ids 1-4
INSERT INTO Enrollments (student_id, class_id) VALUES
(1, 1),  -- Bob in Algebra 101
(1, 2),  -- Bob in Physics 101
(2, 2),  -- Charlie in Physics 101
(2, 3),  -- Charlie in World History
(3, 1),  -- Diana in Algebra 101
(3, 4),  -- Diana in Calculus 101
(4, 2),  -- Evan in Physics 101
(4, 4),  -- Evan in Calculus 101
(5, 3),  -- Fiona in World History
(5, 1);  -- Fiona in Algebra 101
-- 10 enrollments added, linking existing students and classes