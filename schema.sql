DROP TABLE IF EXISTS student_class;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS students;

CREATE TABLE classes (
    id serial PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL
);

CREATE TABLE teachers (
    id serial PRIMARY KEY,
    teacher_name VARCHAR(255) NOT NULL,
    class_id INT REFERENCES classes(id) -- Teacher belongs to a single class
);

CREATE TABLE students (
    id serial PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL
);

-- Junction table to represent the many-to-many relationship between students and classes
CREATE TABLE student_class (
    id serial PRIMARY KEY,
    student_id INT REFERENCES students(id),
    class_id INT REFERENCES classes(id)
);

-- Seed data for classes
INSERT INTO classes (class_name) VALUES
    ('Math Class'),
    ('Science Class'),
    ('History Class');

-- Seed data for teachers
INSERT INTO teachers (teacher_name, class_id) VALUES
    ('John Smith', 1),
    ('Alice Johnson', 2),
    ('Michael Brown', 1),
    ('Sarah Davis', 3);

-- Seed data for students
INSERT INTO students (student_name) VALUES
    ('Ethan Wilson'),
    ('Olivia Taylor'),
    ('Liam Johnson'),
    ('Ava Davis'),
    ('Noah Smith');

-- Seed data for student_class (Linking students to classes)
INSERT INTO student_class (student_id, class_id) VALUES
    (1, 1), -- Ethan Wilson in Math Class
    (1, 2), -- Ethan Wilson in Science Class
    (2, 1), -- Olivia Taylor in Math Class
    (2, 3), -- Olivia Taylor in History Class
    (3, 2), -- Liam Johnson in Science Class
    (4, 1), -- Ava Davis in Math Class
    (5, 3); -- Noah Smith in History Class