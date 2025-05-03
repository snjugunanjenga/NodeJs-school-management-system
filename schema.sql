-- Teachers Table
-- Stores information about teachers
CREATE TABLE Teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    subject VARCHAR(50)
    -- PRIMARY KEY: teacher_id uniquely identifies each teacher
    -- NOT NULL: name and email are required fields
    -- UNIQUE: email ensures no two teachers have the same email address
    -- subject is optional
);

-- Classes Table
-- Stores information about classes, each taught by a teacher
CREATE TABLE Classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    teacher_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id) ON DELETE CASCADE
    -- PRIMARY KEY: class_id uniquely identifies each class
    -- NOT NULL: name and teacher_id are required
    -- FOREIGN KEY: teacher_id links to Teachers table
    -- ON DELETE CASCADE: if a teacher is deleted, their classes are also deleted
);

-- Students Table
-- Stores information about students
CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE
    -- PRIMARY KEY: student_id uniquely identifies each student
    -- NOT NULL: name and email are required fields
    -- UNIQUE: email ensures no two students have the same email address
    -- date_of_birth is optional
);

-- Enrollments Table
-- Represents the many-to-many relationship between students and classes
CREATE TABLE Enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES Classes(class_id) ON DELETE CASCADE,
    UNIQUE (student_id, class_id)
    -- PRIMARY KEY: enrollment_id uniquely identifies each enrollment
    -- NOT NULL: student_id and class_id are required
    -- FOREIGN KEY: student_id links to Students, class_id links to Classes
    -- UNIQUE: prevents a student from enrolling in the same class multiple times
    -- ON DELETE CASCADE: if a student or class is deleted, related enrollments are deleted
);