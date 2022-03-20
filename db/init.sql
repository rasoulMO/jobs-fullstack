CREATE TABLE Student(
	student_id INT PRIMARY KEY AUTO_INCREMENT,
	student_name VARCHAR(60),
	student_age INT
);

INSERT INTO Student(student_name, student_age) VALUES("Shubham verma", 21);
INSERT INTO Student(student_name, student_age) VALUES("Utkarsh verma", 23);

CREATE TABLE Project(
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255),
);

INSERT INTO Project(title) VALUES("project 1");
INSERT INTO Project(title) VALUES("project 2");

CREATE USER 'root@localhost' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
