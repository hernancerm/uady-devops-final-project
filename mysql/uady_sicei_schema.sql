CREATE DATABASE IF NOT EXISTS uady_sicei;
USE uady_sicei;

CREATE TABLE course(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    course_name VARCHAR(30) NOT NULL,
    course_tag_id VARCHAR(30) NOT NULL,
    professor_name VARCHAR(30) NOT NULL,    
);

CREATE TABLE student(
    enrollment_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_names VARCHAR(30) NOT NULL,
    last_names VARCHAR(30) NOT NULL,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(id) ON UPDATE CASCADE
);