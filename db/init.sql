CREATE TABLE Project(
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255),
);

INSERT INTO Project(title) VALUES("project 1");
INSERT INTO Project(title) VALUES("project 2");

CREATE USER 'root@localhost' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
