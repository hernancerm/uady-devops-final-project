USE uady_sicei;

# Insert students
INSERT INTO student (first_names, last_names, birth_date, sex, enrollment_date)
  VALUES ("Juan", "García", "1997-03-01", "M", "2017-08-12");
INSERT INTO student (first_names, last_names, birth_date, sex, enrollment_date)
  VALUES ("Sofía", "Palmira", "1998-07-14", "F", "2017-08-12");
INSERT INTO student (first_names, last_names, birth_date, sex, enrollment_date)
  VALUES ("Pedro", "Escalante", "1998-09-12", "M", "2017-08-12");
INSERT INTO student (first_names, last_names, birth_date, sex, enrollment_date)
  VALUES ("Eduardo", "Montalvo", "1999-03-11", "M", "2017-08-12");

# Insert course
INSERT INTO course (course_name, course_tag_id, professor_name) VALUES ("Física", "F1", "Fernando Físico");
INSERT INTO course (course_name, course_tag_id, professor_name) VALUES ("Biología", "B1", "Luis Botánico");

