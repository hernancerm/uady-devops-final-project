CREATE DATABASE IF NOT EXISTS uady_sicei;
USE uady_sicei;

CREATE TABLE IF NOT EXISTS course(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    course_name VARCHAR(30) NOT NULL,
    course_tag_id VARCHAR(30) NOT NULL,
    professor_name VARCHAR(30) NOT NULL,  
    class_room_code VARCHAR(30) NOT NULL,
    has_projector TINYINT(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS student(
    enrollment_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_names VARCHAR(30) NOT NULL,
    last_names VARCHAR(30) NOT NULL,
    birth_date DATE NOT NULL,
    sex VARCHAR(1) NOT NULL,
    enrollment_date DATE NOT NULL,
    course_id INTEGER NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (username)
);
